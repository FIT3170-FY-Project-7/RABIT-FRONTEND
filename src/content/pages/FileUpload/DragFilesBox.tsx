import { Box, Button, Input, LinearProgress, Typography } from '@mui/material'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import FileSelectButton from './FileSelectButton'
import React, { useEffect, useState } from 'react'
const CHUNKSIZE = 50000 * 1024
const API = 'http://localhost:8000/upload'

export default function DragFilesBox({ updateSelectedFiles }) {
    const [dropzoneActive, setDropzoneActive] = useState(false)
    const [files, setFiles] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [enableFileTypeError, setEnableFileTypeError] = useState(false)
    const [fileTypeError, setFileTypeError] = useState('')

    // Adds files to variable after each file is dropped
    function handleDrop(e) {
        e.preventDefault()
        var newFiles = e.dataTransfer.files
        var errorOccured = false
        for (var i = 0; i < newFiles.length; i++) {
            if (newFiles[i].type != "application/json") {
                errorOccured = true
            }
        }
        if (errorOccured) {
            setEnableFileTypeError(true)
            setFileTypeError('One or more files were not in format .json and have not been added');
        } else {
            setEnableFileTypeError(false)
        }
        newFiles = [...newFiles].filter((x) => x.type == "application/json")
        updateSelectedFiles(newFiles)
    }


  const changeHandler = event => {
    updateSelectedFiles(event.target.files)
  }

  useEffect(() => console.log(files), [files])

    return (
        <Box>
            <div>
                {enableFileTypeError ? (
                <Button
                type='button'
                variant='outlined'
                color='error'
                style={{
                    maxWidth: 'fit-content',
                    marginTop: 25
                }}
                >
                {fileTypeError}
                </Button>
            ) : null} 
          </div>
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
                border: '2px dashed rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '50px 0',
                textAlign: 'center',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Typography variant='h6'>Drop your files here</Typography>
        </Box>
        <Box
          sx={{
            marginTop: '1rem'
          }}
        >
          <Typography variant='h4' style={{ textAlign: 'center' }}>
            OR
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: '1rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
              inputProps={{ accept: '.json', multiple: true }}
              style={{ display: 'none' }}
              id='file-select-button'
              type='file'
              onChange={changeHandler}
            />
            <label htmlFor='file-select-button'>
              <Button variant='contained' component='span' startIcon={<FileOpenIcon />}>
                Select a File
              </Button>
            </label>
          </div>
        </Box>
      </div>
    </Box>
  )
}
