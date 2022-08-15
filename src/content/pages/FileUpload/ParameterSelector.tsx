import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckboxDropdown from './CheckboxDropdown'
import FileUploadButton from './FileUploadButton'

function ParameterSelector({ posteriorKeys, setSelectedKeys }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(1, 1fr)'
            }}
        >
            <Typography variant='h6'>Select parameters</Typography>
            <CheckboxDropdown defaultChecked={[]} keys={posteriorKeys} setSelectedKeys={setSelectedKeys} />
        </Box>
    )
}

export default ParameterSelector
