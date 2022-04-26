import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Input } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Grid } from '@mui/material';

export default function UploadPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        console.log(data.getAll('file'));
        axios.post("http://localhost:8000/uploads", data, {})
            .then(res => {
                console.log(res.statusText)
            })
    };

    return (
        <>
            <h1>Upload data</h1>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
                <TextField onChange={(e) => setTitle(e.target.value)} required label="Title" variant="outlined" />
                <TextField onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" multiline rows={5} />
            </div>
            <Grid container direction="column">
                <div style={{ display: 'flex', flexDirection: 'column',marginTop: "25px" }}>
                    <label htmlFor="contained-button-file">
                        <Input
                            inputProps={{ accept: '.csv, .json' }}
                            style={{ display: 'none' }}
                            id="file-select-button"
                            type="file"
                            onChange={changeHandler}
                        />
                        <label htmlFor="file-select-button">
                            <Button 
                                variant="contained"
                                component="span"
                                startIcon={<FileOpenIcon />}>
                                Select a File
                            </Button>
                        </label>
                        {isSelected ? (
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                        <Button variant="contained" component="span" startIcon={<UploadIcon />} onClick={handleSubmission}>
                            Upload
                        </Button>
                    </label>
                </div>
            </Grid>
        </>
    );
}
