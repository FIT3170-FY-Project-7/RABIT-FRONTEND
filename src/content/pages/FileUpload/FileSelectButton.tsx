import FileOpenIcon from '@mui/icons-material/FileOpen'
import { Button, Input } from '@mui/material'

export default function FileSelectButton({ updateSelectedFiles }) {
    const changeHandler = event => {
        updateSelectedFiles(event.target.files)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
                inputProps={{ accept: '.json', multiple: true}}
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
    )
}
