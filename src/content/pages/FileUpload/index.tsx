import React, { useState, useEffect } from 'react'
import { Box, TextField, Divider, Typography } from '@mui/material'
import FileSelectButton from './FileSelectButton'
import FileUploadButton from './FileUploadButton'
import { styled } from '@mui/material/styles'
import CheckboxDropdown from './CheckboxDropdown'
import * as d3 from 'd3'
import { CommitSharp } from '@mui/icons-material'

export default function UploadPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [enableDescription, setEnableDescription] = useState(false)
    const [enableUpload, setEnableUpload] = useState(false)
    const [posteriorKeys, setPosteriorKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])

    const updateSelectedFiles =  state => {
        setSelectedFiles(state)
        console.log(state)

        var names = []
        Array.from(state).forEach(file => names.push(file.name));

        console.log(state)
        setFileNames(names)
        setTitle(names[0])
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
                    <Typography variant='h2'>Step 1</Typography>
                    <FileSelectButton updateSelectedFiles={updateSelectedFiles} />
                    <Typography sx={{ marginTop: '1rem' }} variant='h6'>
                        {fileNames.toString()}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(1, 1fr)'
                    }}
                >
                    <Typography variant='h2'>Step 2</Typography>
                    <TextField
                        fullWidth
                        disabled={!enableDescription}
                        defaultValue={fileNames}
                        onChange={e => setTitle(e.target.value)}
                        label='Title'
                        required
                        variant={enableDescription ? 'outlined' : 'filled'}
                    />
                    <TextField
                        fullWidth
                        disabled={!enableDescription}
                        onChange={e => setDescription(e.target.value)}
                        label='Description'
                        variant={enableDescription ? 'outlined' : 'filled'}
                        multiline
                        rows={5}
                    />
                </Box>
                <Divider />
                {/* <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(1, 1fr)'
                    }}
                >
                    <Typography variant='h2'>Step 3</Typography>
                    <Typography variant='h6'>Select parameters</Typography>
                    {enableDescription && (
                        <>
                            <CheckboxDropdown
                                defaultChecked={[]}
                                keys={posteriorKeys}
                                setSelectedKeys={setSelectedKeys}
                            />
                        </>
                    )}
                </Box> */}
                <FileUploadButton
                    enableButton={enableUpload}
                    selectedFiles={selectedFiles}
                    selectedKeys={selectedKeys}
                    title={title}
                    description={description}
                    buttonMessage='Upload'
                />
            </Box>
        </Box>
    )
}
