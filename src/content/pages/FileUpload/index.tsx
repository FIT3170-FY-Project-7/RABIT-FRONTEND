import React, { useState, useEffect } from 'react'
import { Box, TextField, Divider, Typography } from '@mui/material'
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

    const updateSelectedFiles = state => {
        setSelectedFiles([...selectedFiles, state])

        var names = []
        Array.from(state).forEach(file => {
            return names.push(file.name)
        })

        console.log(state)
        setFileNames(names)
        //setTitle(names[0])
        setEnableDescription(true)

        // const fileReader = new FileReader()
        // fileReader.readAsText(state)

        // fileReader.onload = e => {
        //     const string = e.target.result as string
        //     const json = JSON.parse(e.target.result as string)
        //     const initialKeys = Object.keys(json['posterior']['content'])
        //     var keys = new Array()

        //     // check for complex entries and exclude them
        //     for (var i = 0; i < initialKeys.length; i++) {
        //         if (!json['posterior']['content'][initialKeys[i]][0]['__complex__']) {
        //             keys.push(initialKeys[i])
        //         }
        //     }
        //     setPosteriorKeys(keys)
        // }
    }

    //useEffect(() => setEnableUpload(title != '' && selectedKeys.length != 0), [title, selectedKeys])
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

    const parameterSelectionList = fileNames.map((item, index) => (
        <div key={index}>
            {item}
            <Box>
                <Typography variant='h6'>Select parameters</Typography>
                {enableDescription && (
                    <>
                        <CheckboxDropdown defaultChecked={[]} keys={posteriorKeys} setSelectedKeys={setSelectedKeys} />
                    </>
                )}
            </Box>
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
                <Box>
                    <Typography sx={{ marginTop: '1rem', marginBottom: '1rem' }} variant='h2'>
                        Step 1: Select Files | ToDo: File Size limit,quantity limit
                    </Typography>
                    <FileSelectButton updateSelectedFiles={updateSelectedFiles} />
                </Box>
                <DragFilesBox updateSelectedFiles={updateSelectedFiles} />
                <Divider />

                <Typography variant='h2'>
                    Step 2: Enter File Information | ToDo: prepare information to be saved to database alongside file
                    location link
                    <Typography sx={{ marginTop: '1rem' }} variant='h6'>
                        {renderList}
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
