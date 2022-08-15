import { Box, Button, LinearProgress, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FileSelectButton from './FileSelectButton'
import UploadIcon from '@mui/icons-material/Upload'

const CHUNKSIZE = 50000 * 1024
const API = 'http://localhost:8000/upload'

export default function DragFilesBox() {
    const [dropzoneActive, setDropzoneActive] = useState(false)
    const [files, setFiles] = useState([])
    const [currentFileIndex, setCurrentFileIndex] = useState(null)
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null)
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null)
    const [uploadPressed, setUploadPressed] = useState(false)
    const [totalChunksProcessed, setTotalChunksProcessed] = useState(0)
    const [totalChunks, setTotalChunks] = useState(0)
    const [progress, setProgress] = useState(0)

    // Adds files to variable after each file is dropped
    function handleDrop(e) {
        e.preventDefault()
        if (files.length < 2) {
            setFiles([...files, ...e.dataTransfer.files])
        }
    }

    // Read file to break into chunks to upload
    function readAndUploadCurrentChunk() {
        const reader = new FileReader()
        const file = files[currentFileIndex]
        if (!file) {
            return
        }
        const from = currentChunkIndex * CHUNKSIZE
        const to = from + CHUNKSIZE
        const blob = file.slice(from, to)
        reader.onload = e => uploadChunk(e)
        reader.readAsDataURL(blob)
    }

    // Uploads chunk
    function uploadChunk(readerEvent) {
        const file = files[currentFileIndex]
        const data = readerEvent.target.result
        const params = new URLSearchParams()
        params.set('name', file.name)
        params.set('size', file.size)
        params.set('currentChunkIndex', currentChunkIndex)
        params.set('totalChunks', Math.ceil(file.size / CHUNKSIZE).toString())
        const headers = { 'Content-Type': 'application/octet-stream' }
        const url = API + '?' + params.toString()
        // console.log(data.slice(0, 100))
        axios.post(url, data, { headers }).then(response => {
            const file = files[currentFileIndex]
            const filesize = files[currentFileIndex].size
            const chunks = Math.ceil(filesize / CHUNKSIZE) - 1
            const isLastChunk = currentChunkIndex === chunks
            if (isLastChunk) {
                file.finalFilename = response.data.finalFilename
                setLastUploadedFileIndex(currentFileIndex)
                setCurrentChunkIndex(null)
            } else {
                setCurrentChunkIndex(currentChunkIndex + 1)
            }
        })
    }

    // Updates the file being uploaded
    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return
        }
        const isLastFile = lastUploadedFileIndex === files.length - 1
        const nextFileIndex = isLastFile ? null : currentFileIndex + 1
        setCurrentFileIndex(nextFileIndex)
    }, [lastUploadedFileIndex])

    // If files length changes set the file index being uploaded
    useEffect(() => {
        if (files.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1)
            }
        }
    }, [files.length])

    // Set the current chunk index to 0 if the current file index has not been set
    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0)
        }
    }, [currentFileIndex])

    // If current chunk index changes read and upload chunk + update progress
    useEffect(() => {
        if (currentChunkIndex !== null && uploadPressed) {
            readAndUploadCurrentChunk()
        }

        setTotalChunksProcessed(totalChunksProcessed + 1)
        setProgress(Math.round((totalChunksProcessed / totalChunks) * 100))
    }, [currentChunkIndex])

    // Uploads the files when the button is pressed
    const uploadFiles = () => {
        setUploadPressed(true)
        setCurrentChunkIndex(0)

        files.forEach(file => {
            setTotalChunks(totalChunks + Math.ceil(file.size / CHUNKSIZE))
        })
        console.log('upload')
    }

    return (
        <Box>
            <div
                onDragOver={e => {
                    setDropzoneActive(true)
                    e.preventDefault()
                }}
                onDragLeave={e => {
                    setDropzoneActive(false)
                    e.preventDefault()
                }}
                onDrop={e => handleDrop(e)}
                style={{
                    marginTop: '1rem',
                    border: '2px dashed rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    padding: '50px 0',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)'
                }}
            >
                Drop your files here
            </div>
            <Box sx={{ marginTop: '1rem' }}>
                <LinearProgress variant='determinate' value={progress} />
            </Box>
            <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant='contained'
                    startIcon={<UploadIcon />}
                    onClick={() => {
                        uploadFiles()
                    }}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    )
}
