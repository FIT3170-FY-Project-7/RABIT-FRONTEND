import React, { useState } from 'react';
import { Button, TextField, Input } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Grid } from '@mui/material';

export default function UploadPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <>
        <Grid container direction="column" alignItems="center">
            <h1>Upload data</h1>
        
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="contained-button-file">
                    <Input inputProps={{ accept: '.csv, .json' }} type="file" />
                    <Button variant="contained" component="span" startIcon={<UploadIcon />}>
                        Upload
                    </Button>
                </label>
            </div>
        </Grid>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
                <TextField onChange={(e) => setTitle(e.target.value)} required label="Title" variant="outlined" />
                <TextField onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" multiline rows={5} />
            </div>
        
        </>
    );
}
