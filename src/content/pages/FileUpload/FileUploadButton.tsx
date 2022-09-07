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
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface FileUpload {
  enableButton: boolean
  selectedFiles: File[]
  title: string
  description: string
  buttonMessage: string
}

const modal_style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
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

    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    for (const selectedFile of selectedFiles) {
      const content = await selectedFile.text()
      const blob = new Blob([content], { type: 'application/json' })
      data.append('file', blob)
    }

    const response = await api.post('/raw-data', data, options).then(res => res.data)
    const fileIds = response.fileIds
    setIsUploading(false)

    setIsProcessing(true)
    await api.post('/raw-data/process', {
      fileIds
    })

    navigate(`/visualise/${response.id}`)
  }

  if (isUploading || isProcessing) {
    return (
      <div>
        <Modal open={true} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={modal_style}>
            <Box sx={{ display: 'flex', alignItems: 'centre', justifyContent: 'center', margin: '10%' }}>
              <CircularProgress />
            </Box>
            <Box sx={{ paddingTop: 2 }}>
              <LinearProgress variant='determinate' value={uploadPercentage} />
            </Box>
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
