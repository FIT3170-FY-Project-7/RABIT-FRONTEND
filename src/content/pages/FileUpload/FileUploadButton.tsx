import UploadIcon from '@mui/icons-material/Upload'
import { Button } from '@mui/material'
import axios from 'axios'
import csvToJson from 'csvtojson'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FileUpload, Percent } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface FileUpload {
    enableButton: boolean
    selectedFile: any
    selectedKeys: Array<string>
    buttonMessage: String
}

export default function FileUploadButton({ enableButton, selectedFile, selectedKeys, buttonMessage }: FileUpload) {
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const navigate = useNavigate()

    const handleSubmission = () => {
        const results = []
        const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent
                let percentage = Math.floor((loaded * 100) / total)
                //console.log(`${loaded}kb of ${total}kb | ${percentage}%`)
                //correctly works as a progress bar in console (throttle speed to test or use a big file)

                setUploadPercentage(percentage)
            }
        }

        selectedFile.text().then(async jsonString => {
            var json = JSON.parse(jsonString)
            json.selected_keys = selectedKeys
            console.log(json.selected_keys)

            // console.log(json);
            json = JSON.stringify(json)
            // console.log(jsonMerged);
            const data = new FormData()

            const blob = new Blob([json], { type: 'application/json' })
            console.log(blob)
            data.append('file', blob) //

            //dev solution to test upload works
            //run `npx nodemon ./server.tsx` in repo root to run local test server
            await axios.post('http://localhost:8000/uploads', data, options).then(res => {
                console.log(res.statusText)
                // console.log(uploadPercentage);
            })

            //getting data
            // const filename = "1653141037449";
        })

        navigate('/visualise')
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
