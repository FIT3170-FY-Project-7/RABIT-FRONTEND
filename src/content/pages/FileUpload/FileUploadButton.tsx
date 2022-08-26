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
    selectedFile: any
    selectedKeys: Array<string>
    title: string
    description: string
    buttonMessage: string
}

export default function FileUploadButton({
    enableButton,
    selectedFile,
    selectedKeys,
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



        const jsonString = await selectedFile.text()
        const json = {
                selectedKeys,
                title,
                description,
                posterior: { content: JSON.parse(jsonString)?.posterior?.content }
            }

        const data = new FormData()
        data.append('name', title)

        const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
        data.append('file', blob)

        const response = await api.post('/raw-data', data, options)

        navigate(`/visualise/${response.data.id}`)
    }
    return (
        <div>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    disabled={!enableButton}
                    variant='contained'
                    startIcon={<UploadIcon />}
                    onClick={handleSubmission}
                >
                    {buttonMessage}
                </Button>
            </Box>
            <Box sx={{ paddingTop: 2 }}>
                <LinearProgress variant='determinate' value={uploadPercentage} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' color='text.secondary'>{`${uploadPercentage}%`}</Typography>
            </Box>
        </div>
    )
}
