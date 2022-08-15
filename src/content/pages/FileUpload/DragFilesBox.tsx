import { Box, Button, LinearProgress, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FileSelectButton from './FileSelectButton'
import UploadIcon from '@mui/icons-material/Upload'

const CHUNKSIZE = 50000 * 1024
const API = 'http://localhost:8000/upload'

export default function DragFilesBox({updateSelectedFiles}) {
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
        updateSelectedFiles(e.dataTransfer.files)
        console.log(files)
    }

    useEffect(() =>
    console.log(files)
    , [files])

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
        </Box>
    )
}
