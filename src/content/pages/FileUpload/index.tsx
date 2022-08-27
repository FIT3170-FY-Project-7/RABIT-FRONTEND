import React, { useState, useEffect } from 'react'
import { Box, TextField, Divider, Typography, Button } from '@mui/material'
import FileSelectButton from './FileSelectButton'
import FileUploadButton from './FileUploadButton'
import CheckboxDropdown from './CheckboxDropdown'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DragFilesBox from './DragFilesBox'
import FileDescriptionBox from './FileDescriptionBox'
import ParameterSelector from './ParameterSelector'

export default function UploadPage() {
    const [fileUploaded, setFileUploaded] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [enableDescription, setEnableDescription] = useState(false)
    const [enableUpload, setEnableUpload] = useState(true)
    // const [posteriorKeys, setPosteriorKeys] = useState([])
    // const [selectedKeys, setSelectedKeys] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [sizeLimitError, setsizeLimitError] = useState('') //error message for size error, for now works for amount of files but in future need to implement file size too
    const [enableSizeLimitError, setEnableSizeLimitError] = useState(false)
    // const [keys, setKeys] = useState([])

    const updateSelectedFiles = state => {
        setSelectedFiles([...selectedFiles, ...state])

        var names = []
        type File = {
            name?: string
        }

        Array.from(state).forEach((file: File) => names.push(file.name))

        if(selectedFiles.length >= 3){
            console.log('error')
            setEnableSizeLimitError(true)
            setsizeLimitError('Keep Files to less then 4 to prevent plotting issues')
        }

        console.log('state', state)
        console.log('state', selectedFiles.length)
        console.log('select', selectedFiles)
        setFileNames(names)
        setEnableDescription(true)
    }

    const deleteSelectedFile = file => {
        const newFiles = [...selectedFiles];     // make a var for the new array
        newFiles.splice(file, 1);        // remove the file from the array
        setSelectedFiles(newFiles);              // update the state

        if(selectedFiles.length <= 4){ //remove error if less then 4 files again
            setEnableSizeLimitError(false)
        }
      };

    useEffect(() => console.log(selectedFiles), [selectedFiles])

    return (
        <Box style={{ display: 'flex', justifyContent: 'center' }}>

            <Box
                sx={{
                    display: 'grid',
                    minWidth: '80vh',
                    gap: 2,
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    margin: '1rem'
                }}
            >
                <Typography variant='h2'>Step 1: Select Files</Typography>
                <DragFilesBox  updateSelectedFiles={updateSelectedFiles} />
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
                    
                    {
                        enableSizeLimitError?<Button variant="outlined" color="error"
                        style={{
                            maxWidth: 'fit-content',
                            marginTop: 25
                        }}><PriorityHighIcon></PriorityHighIcon>{sizeLimitError}</Button>:null
                    }
                    <Button onClick={deleteSelectedFile}>Delete Last</Button>
                </Box>

                <Typography variant='h4' style={{textAlign: 'center'}}>OR</Typography>
                <Box
                    sx={{
                        margin: '1rem'
                    }}
                >
                    <FileSelectButton updateSelectedFiles={updateSelectedFiles}/>
                </Box>

                <Divider />

                <Typography variant='h2'>
                    Step 2: Create Title
                    <Typography sx={{ marginTop: '1rem' }} variant='h6'>
                        <TextField
                            margin='dense'
                            fullWidth
                            disabled={!enableDescription}
                            defaultValue={fileNames[0]}
                            onChange={e => setTitle(e.target.value)}
                            label='Title'
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
                    Step 3: Upload Files
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
