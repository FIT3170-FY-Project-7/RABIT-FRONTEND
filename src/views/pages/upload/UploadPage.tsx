import React, { useState } from 'react';
import {TextField, Input } from '@mui/material';
import FileSelectButton from './FileSelectButton';
import FileUploadButton from './FileUploadButton';

export default function UploadPage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileDate, setFileDate] = useState('');

    const updateSelectedFile = (state) => {
        setSelectedFile(state);
        setFileName(state.name);
        setFileType(state.type);
        setFileSize(state.size);
        setFileDate(state.lastModifiedDate.toLocaleDateString());
    }

    return (
        <div>
            <h1>Upload data</h1>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem'}}>
                <TextField onChange={(e) => setTitle(e.target.value)} required label="Title" variant="outlined" />
                <TextField onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" multiline rows={5} />
                <TextField label="File Name" value={fileName} variant="outlined" inputProps={{ style: { backgroundColor: "lightgrey" }, readOnly: true }} />
                <TextField label="File Type" value={fileType} variant="outlined" inputProps={{ style: { backgroundColor: "lightgrey" }, readOnly: true }} />
                <TextField label="File Size" value={fileSize} variant="outlined" inputProps={{ style: { backgroundColor: "lightgrey" }, readOnly: true }} />
                <TextField label="File Date" value={fileDate} variant="outlined" inputProps={{ style: { backgroundColor: "lightgrey" }, readOnly: true }} />
            </div>
            <br/>
            <FileSelectButton
                updateSelectedFile={updateSelectedFile}
            ></FileSelectButton>
            <br/>
            <FileUploadButton
                selectedFile={selectedFile}>
            </FileUploadButton>

        </div>
    );
}
