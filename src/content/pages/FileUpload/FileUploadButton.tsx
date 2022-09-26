import UploadIcon from '@mui/icons-material/Upload'
import { Button } from '@mui/material'
import csvToJson from 'csvtojson'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FileUpload, Percent } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api'
import chunkUpload from '../../../utils/chunkUpload'

interface FileUpload {
  enableButton: boolean
  selectedFiles: File[]
  title: string
  description: string
  buttonMessage: string
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
  buttonMessage
}: FileUpload) {
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleSubmission = async () => {
    setIsUploading(true)
    const fileIds = await api
      .post<{ fileIds: string[] }>('/raw-data/file-ids', { fileCount: selectedFiles.length })
      .then(res => res.data.fileIds)

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
        fileDetails
      })
      .then(res => res.data)
    setIsProcessing(false)

    navigate(`/visualise/${plotCollection.id}`)
  }

  if (isUploading) {
    return (
      <div>
        <Box sx={{ paddingTop: 2 }}>
          <LinearProgress variant='determinate' value={uploadPercentage} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
        </Box>
      </div>
    )
  }

  if (isProcessing) {
    return <div>Processing raw data, please wait...</div>
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'end' }}>
      <Button disabled={!enableButton} variant='contained' startIcon={<UploadIcon />} onClick={handleSubmission}>
        {buttonMessage}
      </Button>
    </Box>
  )
}
