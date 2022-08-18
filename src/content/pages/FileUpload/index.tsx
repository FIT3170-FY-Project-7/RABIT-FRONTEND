import React, { useState, useEffect } from 'react'
import { Box, TextField, Divider, Typography, Button } from '@mui/material'
import FileSelectButton from './FileSelectButton'
import FileUploadButton from './FileUploadButton'
import { styled } from '@mui/material/styles'
import CheckboxDropdown from './CheckboxDropdown'
import * as d3 from 'd3'
import { CommitSharp } from '@mui/icons-material'
import DragFilesBox from './DragFilesBox'
import FileDescriptionBox from './FileDescriptionBox'
import ParameterSelector from './ParameterSelector'

export default function UploadPage() {
    const [fileUploaded, setFileUploaded] = useState(false)

    const [selectedFiles, setSelectedFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [enableDescription, setEnableDescription] = useState(false)
    const [enableUpload, setEnableUpload] = useState(true)
    const [posteriorKeys, setPosteriorKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [keys, setKeys] = useState([])

    const updateSelectedFiles = state => {
        setSelectedFiles([...selectedFiles, ...state])

        var names = []
        type File = {
            name?: string
        }

        Array.from(state).forEach((file: File) => names.push(file.name))

        console.log('state', state)
        console.log('select', selectedFiles)
        setFileNames(names)
        setEnableDescription(true)
    }

    useEffect(() => console.log(selectedFiles), [selectedFiles])
    const renderList = fileNames.map((item, index) => (
        <div key={index}>
            {item}
            <TextField
                margin='dense'
                fullWidth
                disabled={!enableDescription}
                defaultValue={fileNames[index]}
                onChange={e => setTitle(e.target.value)}
                label='Title'
                required
                variant={enableDescription ? 'outlined' : 'filled'}
            />
            <TextField
                margin='dense'
                fullWidth
                disabled={!enableDescription}
                onChange={e => setDescription(e.target.value)}
                label='Description'
                variant={enableDescription ? 'outlined' : 'filled'}
                multiline
                rows={3}
            />
        </div>
    ))

    return (
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    display: 'grid',
                    minWidth: '80vh',
                    gap: 4,
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    marginTop: '2rem',
                    margin: '1rem'
                }}
            >
                <DragFilesBox selectedFiles={selectedFiles} updateSelectedFiles={updateSelectedFiles} />
                <Box style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
                    {selectedFiles.map((file, ind) => (
                        <Button
                            key={ind}
                            variant='outlined'
                            style={{
                                maxWidth: 'fit-content',
                                marginTop: ind > 0 ? '1rem' : ''
                            }}
                        >
                            {file.name}
                        </Button>
                    ))}
                </Box>
                <Divider />

                <Typography variant='h2'>
                    Upload Description | ToDo: prepare information to be saved to database alongside file location link
                    <Typography sx={{ marginTop: '1rem' }} variant='h6'>
                        <TextField
                            margin='dense'
                            fullWidth
                            disabled={!enableDescription}
                            defaultValue={fileNames[0]}
                            onChange={e => setTitle(e.target.value)}
                            label='Title'
                            required
                            variant={enableDescription ? 'outlined' : 'filled'}
                        />
                        <TextField
                            margin='dense'
                            fullWidth
                            disabled={!enableDescription}
                            onChange={e => setDescription(e.target.value)}
                            label='Description'
                            variant={enableDescription ? 'outlined' : 'filled'}
                            multiline
                            rows={3}
                        />
                    </Typography>
                </Typography>
                <Divider />

                <Typography variant='h2'>
                    Step 3: Upload File | ToDo: save file link and metadata to database after upload
                </Typography>
                <FileUploadButton
                    setFileUploaded={setFileUploaded}
                    enableButton={enableUpload}
                    selectedFiles={selectedFiles}
                />
            </Box>
        </Box>
    )
}
