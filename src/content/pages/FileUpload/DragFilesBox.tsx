import { Box, Button, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
const CHUNKSIZE = 50000 * 1024
const API = 'http://localhost:8000/upload'

export default function DragFilesBox({ updateSelectedFiles }) {
    const [dropzoneActive, setDropzoneActive] = useState(false)
    const [files, setFiles] = useState([])

    // Adds files to variable after each file is dropped
    function handleDrop(e) {
        e.preventDefault()
        updateSelectedFiles([...e.dataTransfer.files])
        console.log(files)
    }

    useEffect(() => console.log(files), [files])

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
        </Box>
    )
}
