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
    const navigate = useNavigate()

    const handleSubmission = async () => {
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
            const fileData = {
                posterior: { content: JSON.parse(content)?.posterior?.content }
            }

            const blob = new Blob([JSON.stringify(fileData)], { type: 'application/json' })
            data.append('file', blob)
        }

        const response = await api.post('/raw-data', data, options)

        navigate(`/visualise/${response.data.id}`)
    }
    return (
        <div>
            {uploadPercentage ? (
                <>
                    <Box sx={{ paddingTop: 2 }}>
                        <LinearProgress variant='determinate' value={uploadPercentage} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
                    </Box>
                </>
            ) : (
                <Box style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        disabled={!enableButton}
                        variant='contained'
                        startIcon={<UploadIcon />}
                        onClick={handleSubmission}
                    >
                        {buttonMessage}
                    </Button>
                </Box>
            )}
        </div>
    )
}
