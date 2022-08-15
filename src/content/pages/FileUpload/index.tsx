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
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [posteriorKeys, setPosteriorKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const updateSelectedFile = state => {
        setSelectedFile(state)
        setFileName(state.name)
    }

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
                <DragFilesBox />
                <Divider />
                <FileDescriptionBox title={title} setTitle={setTitle} setDescription={setDescription} />
                <Divider />
                <ParameterSelector posteriorKeys={posteriorKeys} setSelectedKeys={setSelectedKeys} />
                <FileUploadButton
                    enableButton={true}
                    selectedFile={'a'}
                    selectedKeys={selectedKeys}
                    title={title}
                    description={description}
                    buttonMessage='Upload'
                />
            </Box>
        </Box>
    )
}
