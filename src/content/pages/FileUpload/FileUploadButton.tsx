import UploadIcon from '@mui/icons-material/Upload'
import { Button } from '@mui/material'
import axios from 'axios'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FileUpload, Percent } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function FileUploadButton({
    setFileUploaded,
    enableButton,
    selectedFiles
}) {

    const [uploadPercentage, setUploadPercentage] = useState(0)
    const navigate = useNavigate()

    const handleSubmission = async () => {
        const results = []
        const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent
                let percentage = Math.floor((loaded * 100) / total)
                setUploadPercentage(percentage)
            }
        }

         const data = new FormData()
         Array.from(selectedFiles).forEach(file => {
             let blob = new Blob([file], { type: 'application/json' })
             data.append("file", blob)
         })

        await axios.post('http://localhost:8000/uploads', data, options).then(res => {
                console.log(res.statusText)
                console.log(uploadPercentage)
            })
        // await selectedFiles.text().then(async jsonString => {
            
        //     const blob = new Blob([jsonString], { type: 'application/json' })
        //     data.append('file', blob) //

        //     await axios.post('http://localhost:8000/uploads', data, options).then(res => {
        //         console.log(res.statusText)
        //         console.log(uploadPercentage)
        //     })
        // })
        setFileUploaded(true)

        //navigate('/visualise')
    }
    return (
        <div>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={!enableButton} variant='contained' onClick={handleSubmission}>
                    Upload
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
