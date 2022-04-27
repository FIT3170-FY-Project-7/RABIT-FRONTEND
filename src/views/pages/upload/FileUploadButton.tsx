import React, { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';
import axios from 'axios';

export default function FileSelectButton(props){
    
    const handleSubmission = () => {
        console.log(props.selectedFile);
        const data = new FormData();
        data.append('file', props.selectedFile);
        console.log(data.getAll('file'));
        //dev solution to test upload works
        //run `npx nodemon ./server.tsx` in repo root to run local test server
        axios.post("http://localhost:8000/uploads", data, {}) 
            .then(res => {
                console.log(res.statusText)
            })
    };
    return (
        <Button variant="contained" component="span" startIcon={<UploadIcon />} onClick={handleSubmission}>
            Upload
        </Button>
    )
}