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
import ErrorIcon from '@mui/icons-material/Error';

interface FileUpload {
  enableButton: boolean
  selectedFiles: File[]
  title: string
  description: string
  buttonMessage: string
  selectedBuckets: boolean[]
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
  const [errorMessage, setErrorMessage] = useState(false)
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
        setErrorMessage(true)
        setIsUploading(false)
        setIsProcessing(false)

      })


    for (const [i, file] of selectedFiles.entries()) {
      await chunkUpload(fileIds[i], file)
    }

    // const paramBuckets = await api
    //   .post<{ buckets: string }>('/raw-data/param-buckets', { buckets: selectedBuckets })
    //   .then(res => res.data.buckets)

    setIsUploading(false)

    setIsProcessing(true)
    const plotCollection = await api
      .post('/raw-data/process', {
        title,
        description,
        fileIds,
        selectedBuckets
      })
      .then(res => res.data)
      .catch(error => {
        setIsUploading(false)
        setIsProcessing(false)
        setErrorMessage(true)
      })

    navigate(`/visualise/${plotCollection.id}`)
  }

  if(errorMessage && (!isUploading && !isProcessing)){

    return (
      <div>
        <Modal open={true} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={modalStyle}>
            <IconButton
              color='primary'
              component='label'
              sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
              onClick={() => setErrorMessage(false)}
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
                <Typography id='modal-modal-title' variant='h6' component='h2' align='center' color={"red"}>
                  Error Uploading File
                </Typography>
                <ErrorIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem', color: "red" }} />
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
            {isUploading && (
              <>
                <Box sx={{ paddingTop: 2 }}>
                  <LinearProgress variant='determinate' value={uploadPercentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
                </Box>
              </>
            )}
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
