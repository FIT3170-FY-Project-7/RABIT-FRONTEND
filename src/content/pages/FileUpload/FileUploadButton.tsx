import UploadIcon from '@mui/icons-material/Upload'
import { Button, Dialog } from '@mui/material'
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
import { modal_style } from './constants'
interface FileUpload {
  enableButton: boolean
  selectedFiles: File[]
  title: string
  description: string
  buttonMessage: string
}

export default function FileUploadButton({
  enableButton,
  selectedFiles,
  title,
  description,
  buttonMessage
}: FileUpload) {
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
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

    for (const [i, file] of selectedFiles.entries()) {
      await chunkUpload(fileIds[i], file)
    }

    setIsUploading(false)

    setIsProcessing(true)
    const plotCollection = await api
      .post('/raw-data/process', {
        title,
        description,
        fileIds
      })
      .then(res => res.data)

    navigate(`/visualise/${plotCollection.id}`)
  }

  if (isUploading || isProcessing) {
    return (
      <div>
        <Modal open={true} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={modal_style}>
            <Box sx={{ display: 'flex', alignItems: 'centre', justifyContent: 'center', margin: '10%' }}>
              <CircularProgress />
            </Box>
            {isUploading && (
              <Box sx={{ paddingTop: 2 }}>
                <LinearProgress variant='determinate' value={uploadPercentage} />
              </Box>
            )}
            <Box sx={{ minWidth: 35 }}>
              <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
            </Box>
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
