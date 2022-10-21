import UploadIcon from '@mui/icons-material/Upload'
import { Button, Dialog, IconButton, } from '@mui/material'
import csvToJson from 'csvtojson'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FileUpload, Percent } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api'
import chunkUpload from '../../../utils/chunkUpload'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { modalStyle } from './modalStyle'
import CancelIcon from '@mui/icons-material/Cancel'

interface FileUpload {
  enableButton: boolean
  selectedFiles: File[]
  title: string
  description: string
  buttonMessage: string
  selectedBuckets: boolean[]
}

interface FileIdentifier {
  id: string
  name: string
}

export default function FileUploadButton({
  enableButton,
  selectedFiles,
  title,
  description,
  buttonMessage,
  selectedBuckets
}: FileUpload) {
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSubmission = async () => {
    setIsUploading(true)
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        let percentage = Math.floor((loaded * 100) / total)
        //console.log(`${loaded}kb of ${total}kb | ${percentage}%`)
        //correctly works as a progress bar in console (throttle speed to test or use a big file)

        setUploadPercentage(percentage)
      }
    }
    const fileIds = await api
      .post<{ fileIds: string[] }>('/raw-data/file-ids', { fileCount: selectedFiles.length })
      .then(res => res.data.fileIds)
      .catch(error => {
        setIsError(true)
        setErrorMessage("Network error")
        setIsUploading(false)
        setIsProcessing(false)

      })


    const fileDetails: FileIdentifier[] = []

    for (const [i, file] of selectedFiles.entries()) {
      await chunkUpload(fileIds[i], file)
      fileDetails.push({ id: fileIds[i], name: file.name })
    }

    setIsUploading(false)

    setIsProcessing(true)
    const plotCollection = await api
      .post('/raw-data/process', {
        title,
        description,
        fileDetails,
        selectedBuckets
      })
      .then(res => res.data)
      .catch(error => {
        setIsUploading(false)
        setIsProcessing(false)
        setIsError(true)
        setErrorMessage("Invalid file format")
      })

    navigate(`/visualise/${plotCollection.id}`)
  }

  if(isError && (!isUploading && !isProcessing)){

    return (
      <div>
        <Modal open={true} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={modalStyle}>
            <IconButton
              color='primary'
              component='label'
              sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
              onClick={() => setIsError(false)}
            >
              <CancelIcon />
            </IconButton>

            <Box
                sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div>
                <Typography id='modal-modal-title' variant='h6' component='h2' align='center' color={"red"}>
                  Error Uploading File
                </Typography>
                <Typography id='modal-modal-title' variant='h6' component='h2' align='center' color={"white"}>
                  Reason: {errorMessage}
                </Typography>
                </div>
                
              </Box>
            
          </Box>
        </Modal>
      </div>
    )
  }

  if (isUploading || isProcessing) {
    return (
      <div>
        <Modal open={true} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', alignItems: 'centre', justifyContent: 'center', margin: '10%' }}>
              <CircularProgress />
            </Box>
            {/* {isUploading && (
              <>
                <Box sx={{ paddingTop: 2 }}>
                  <LinearProgress variant='determinate' value={uploadPercentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
                </Box>
              </>
            )} */}
            {isProcessing && (
              <Box
                sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography id='modal-modal-title' variant='h6' component='h2' align='center'>
                  Uploading Complete
                </Typography>
                <CheckCircleIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem' }} />
              </Box>
            )}
            <Box sx={{ marginTop: '1rem' }}>
              <Typography id='modal-modal-title' variant='h6' component='h2' align='center'>
                {`${isProcessing ? 'Processing' : 'Uploading'} please wait...`}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </div>
    )
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'end' }}>
      <Button disabled={!enableButton} variant='contained' startIcon={<UploadIcon />} onClick={handleSubmission}>
        {buttonMessage}
      </Button>
    </Box>
  )
}
