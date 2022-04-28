import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';
import axios from 'axios';
import { boolean } from 'yup';

interface FileSelect {
    enableButton: boolean;
    selectedFile: any;
}

export default function FileSelectButton({ enableButton, selectedFile }: FileSelect) {
    const handleSubmission = () => {
        console.log(selectedFile);
        const data = new FormData();
        data.append('file', selectedFile);
        console.log(data.getAll('file'));
        //dev solution to test upload works
        //run `npx nodemon ./server.tsx` in repo root to run local test server
        axios.post('http://localhost:8000/uploads', data, {}).then((res) => {
            console.log(res.statusText);
        });
    };
    return (
        <Button disabled={enableButton} variant="contained" startIcon={<UploadIcon />} onClick={handleSubmission}>
            Upload
        </Button>
    );
}
