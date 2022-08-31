import { useState } from 'react'
import { IconButton, Snackbar } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'

const CopyToClipboardButton = ({ copyText }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(copyText)
    }

    return (
        <>
            <IconButton onClick={handleClick} color='primary'>
                <ShareIcon />
            </IconButton>
            <Snackbar
                message='Link copied to clibboard'
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
            />
        </>
    )
}

export default CopyToClipboardButton
