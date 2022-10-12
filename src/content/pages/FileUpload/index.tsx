import { useState, useEffect } from 'react'
import { Box, TextField, Typography, Button, Modal, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import FileUploadButton from './FileUploadButton'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DragFilesBox from './DragFilesBox'
import HelpIcon from '@mui/icons-material/Help'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ParameterForm from './ParameterForm'
import { modalStyle } from './modalStyle'
import { createTheme } from '@mui/material'
import { EXAMPLE } from './constants'

const CssTextField = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiFormLabel-asterisk': {
    color: 'red'
  }
}))

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileNames, setFileNames] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedBuckets, setSelectedBuckets] = useState([false, false, false])
  const [sizeLimitError, setsizeLimitError] = useState('') //error message for size error, for now works for amount of files but in future need to implement file size too
  const [enableSizeLimitError, setEnableSizeLimitError] = useState(false)
  const [openFileFormatModal, setOpenFileFormatModal] = useState(false)

  const updateSelectedFiles = state => {
    setSelectedFiles([...selectedFiles, ...state])

    var names = []
    type File = {
      name?: string
    }

    Array.from(state).forEach((file: File) => names.push(file.name))

    setFileNames(names)
  }

  useEffect(() => {
    if (selectedFiles.length < 4) {
      //remove error if less then 4 files again
      setEnableSizeLimitError(false)
    }

    if (selectedFiles.length >= 4) {
      setEnableSizeLimitError(true)
      setsizeLimitError('Keep Files to less then 4 to prevent plotting issues')
    }
  }, [selectedFiles])

  function removeSelectedFile(index) {
    const newFiles = [...selectedFiles] //create new array based off current files
    newFiles.splice(index, 1) //remove selected file
    setSelectedFiles(newFiles) //re-set array
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
        <CssTextField
          margin='dense'
          fullWidth
          defaultValue={fileNames[0]}
          onChange={e => setTitle(e.target.value)}
          label='Title'
          variant='filled'
          required
        />
        <TextField
          margin='dense'
          fullWidth
          onChange={e => setDescription(e.target.value)}
          label='Add a description'
          multiline
          rows={3}
          variant='filled'
        />
        <ParameterForm selectedBuckets={selectedBuckets} setSelectedBuckets={setSelectedBuckets} />
        <Box
          sx={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            maxWidth: 'fit-content',
            cursor: 'pointer'
          }}
          onClick={() => setOpenFileFormatModal(true)}
        >
          <Typography variant='h4'>Bilby Outputs</Typography>
          <Typography variant='h4' sx={{ color: 'red' }}>
            *
          </Typography>
          <HelpIcon sx={{ fontSize: 'medium', marginLeft: '0.25rem' }} />
        </Box>
        <Modal
          open={openFileFormatModal}
          onClose={() => setOpenFileFormatModal(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={modalStyle}>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              sx={{ position: 'absolute', top: '-18px', right: '-18px', fontSize: 'large' }}
              onClick={() => setOpenFileFormatModal(false)}
            >
              <CancelIcon />
            </IconButton>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Required File Format
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Accepted file format: .json
            </Typography>
            <div>
              <pre>{JSON.stringify(EXAMPLE, null, 2)}</pre>
            </div>
          </Box>
        </Modal>
        <DragFilesBox updateSelectedFiles={updateSelectedFiles} />
        <Box style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
          {selectedFiles.map((file, ind) => (
            <div key={ind}>
              <Button
                type='button'
                variant='outlined'
                style={{
                  maxWidth: 'fit-content',
                  marginTop: '5px'
                }}
              >
                {file.name}
              </Button>
              <IconButton style={{ marginTop: '5px' }} aria-label='delete' onClick={() => removeSelectedFile(ind)}>
                <RemoveCircleIcon color='error' />
              </IconButton>
            </div>
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
        </Box>
        <FileUploadButton
          enableButton={selectedFiles?.length > 0 && title && selectedBuckets?.includes(true)}
          selectedFiles={selectedFiles}
          title={title}
          description={description}
          buttonMessage='Upload file(s)'
          selectedBuckets={selectedBuckets}
        />
      </Box>
    </Box>
  )
}
