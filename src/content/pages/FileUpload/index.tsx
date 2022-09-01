import React, { useState, useEffect } from 'react'
import { Box, TextField, Divider, Typography, Button } from '@mui/material'
import FileSelectButton from './FileSelectButton'
import FileUploadButton from './FileUploadButton'
import CheckboxDropdown from './CheckboxDropdown'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DragFilesBox from './DragFilesBox'
import FileDescriptionBox from './FileDescriptionBox'
import ParameterSelector from './ParameterSelector'

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileNames, setFileNames] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sizeLimitError, setsizeLimitError] = useState('') //error message for size error, for now works for amount of files but in future need to implement file size too
  const [enableSizeLimitError, setEnableSizeLimitError] = useState(false)
  const [enableDeleteLast, setDeleteLast] = useState(false)

  const updateSelectedFiles = state => {
    setSelectedFiles([...selectedFiles, ...state])

    var names = []
    type File = {
      name?: string
    }

    Array.from(state).forEach((file: File) => names.push(file.name))

    console.log('state', state)
    console.log('state', selectedFiles.length)
    console.log('select', selectedFiles)
    setFileNames(names)
  }

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setDeleteLast(true)
    } else if (selectedFiles.length == 0) {
      setDeleteLast(false)
    }

    if (selectedFiles.length < 4) {
      //remove error if less then 4 files again
      setEnableSizeLimitError(false)
    }

    if (selectedFiles.length >= 4) {
      setEnableSizeLimitError(true)
      setsizeLimitError('Keep Files to less then 4 to prevent plotting issues')
    }
  }, [selectedFiles])

  const deleteSelectedFile = file => {
    const newFiles = [...selectedFiles] // make a var for the new array
    newFiles.splice(file, 1) // remove the file from the array
    setSelectedFiles(newFiles) // update the state
  }

  useEffect(() => console.log(selectedFiles), [selectedFiles])

  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gap: 2,
          gridTemplateColumns: 'repeat(1, 1fr)'
        }}
      >
        <Typography variant='h1'>Upload</Typography>
        <TextField
          margin='dense'
          fullWidth
          defaultValue={fileNames[0]}
          onChange={e => setTitle(e.target.value)}
          label='Title'
          variant='filled'
        />
        <TextField
          margin='dense'
          fullWidth
          onChange={e => setDescription(e.target.value)}
          label='Description'
          multiline
          rows={3}
          variant='filled'
        />
        <DragFilesBox updateSelectedFiles={updateSelectedFiles} />
        <Box style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
          {selectedFiles.map((file, ind) => (
            <Button
              type='button'
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

          {enableSizeLimitError ? (
            <Button
              type='button'
              variant='outlined'
              color='error'
              style={{
                maxWidth: 'fit-content',
                marginTop: 25
              }}
            >
              <PriorityHighIcon></PriorityHighIcon>
              {sizeLimitError}
            </Button>
          ) : null}

          {enableDeleteLast ? <Button onClick={deleteSelectedFile}>Delete Last</Button> : null}
        </Box>
        <FileUploadButton
          enableButton={!!selectedFiles?.length}
          selectedFiles={selectedFiles}
          title={title}
          description={description}
          buttonMessage='Upload file(s)'
        />
      </Box>
    </Box>
  )
}
