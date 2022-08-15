import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function FileDescriptionBox({ title, setTitle, setDescription }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(1, 1fr)'
            }}
        >
            <TextField fullWidth defaultValue={title} onChange={e => setTitle(e.target.value)} label='Title' required />
            <TextField
                fullWidth
                onChange={e => setDescription(e.target.value)}
                label='Description'
                multiline
                rows={5}
            />
        </Box>
    )
}

export default FileDescriptionBox
