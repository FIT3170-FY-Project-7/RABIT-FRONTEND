import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';
import axios from 'axios';
import csvToJson from 'csvtojson';

interface FileUpload {
    enableButton: boolean;
    selectedFile: any;
    buttonMessage: String;
}

export default function FileUploadButton({ enableButton, selectedFile, buttonMessage }: FileUpload) {
    const handleSubmission = () => {


        const csv = require('csv-parser')
        const results = [];

        selectedFile.text().then((csvStr) => {
            csvToJson()
            .fromString(csvStr)
            .then((jsonObj)=>{
            console.log(jsonObj);

            var json = JSON.stringify(jsonObj);
            const data = new FormData();
            data.append('file', selectedFile);
            console.log(data.getAll('file'));
            //dev solution to test upload works
            //run `npx nodemon ./server.tsx` in repo root to run local test server
            axios.post('http://localhost:8000/uploads', data).then((res) => {
                console.log(res.statusText);
            });

            });
                    // console.log(selectedFile);

        });

        

        





    };
    return (
        <Button disabled={!enableButton} variant="contained" startIcon={<UploadIcon />} onClick={handleSubmission}>
             {buttonMessage}
        </Button>
    );
}
