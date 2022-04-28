import React, { useState, useEffect } from 'react';
import { TextField, Input } from '@mui/material';
import FileSelectButton from './FileSelectButton';
import FileUploadButton from './FileUploadButton';

export default function UploadPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [enableDescription, setEnableDescription] = useState(false);
    const [enableUpload, setenableUpload] = useState(false);

    const updateSelectedFile = (state) => {
        setSelectedFile(state);
        setFileName(state.name);
        setEnableDescription(true);
    };

    console.log(enableDescription);

    useEffect(() => {
        if (description != '' && title != '') {
            setenableUpload(true);
        }
    }, [title, description]);

    return (
        <>
            <h1>Upload data</h1>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem', justifyContent: 'center' }}>
                <FileSelectButton updateSelectedFile={updateSelectedFile}></FileSelectButton>
                <TextField
                    defaultValue={fileName}
                    disabled={!enableDescription}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    label="Title"
                    variant="outlined"
                />
                <TextField
                    disabled={!enableDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={5}
                />
                <FileUploadButton enableButton={enableUpload} selectedFile={selectedFile}></FileUploadButton>
            </div>
        </>
    );
}
