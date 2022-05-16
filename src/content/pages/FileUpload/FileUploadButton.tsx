import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';
import axios from 'axios';
import csvToJson from 'csvtojson';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Percent } from '@mui/icons-material';
import React, { useState, useEffect } from "react";

interface FileUpload {
    enableButton: boolean;
    selectedFile: any;
    buttonMessage: String;
}

export default function FileUploadButton({ enableButton, selectedFile, buttonMessage}: FileUpload) { 
	const [uploadPercentage, setUploadPercentage] = useState(0);
    
    const handleSubmission = () => {

        const results = [];
        const options = {
            onUploadProgress: (progressEvent) => {
                const{loaded, total} = progressEvent;
                let percentage = Math.floor((loaded*100)/total)
                console.log(`${loaded}kb of ${total}kb | ${percentage}%`) //correctly works as a progress bar in console (throttle speed to test or use a big file)

                setUploadPercentage(percentage)
            }
        }


        selectedFile.text().then((csvStr) => {
            csvToJson()
            .fromString(csvStr)
            .then((jsonObj)=>{
            console.log(jsonObj);

            var json = JSON.stringify(jsonObj);
            const data = new FormData();
            const blob = new Blob([json],{type: 'application/json'});
            data.append("file", blob);//
            console.log(data.getAll("file"));
            //dev solution to test upload works
            //run `npx nodemon ./server.tsx` in repo root to run local test server
            axios.post('http://localhost:8000/uploads', data, options).then((res) => {
                console.log(res.statusText);
                console.log(uploadPercentage);
            });

            });
                    // console.log(selectedFile);

        });

    };
    return (
        <div>
        <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button disabled={!enableButton} variant="contained" startIcon={<UploadIcon />} onClick={handleSubmission}>
             {buttonMessage}
        </Button>
        </Box>
        <LinearProgress variant="determinate" value={uploadPercentage} />
        <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${uploadPercentage}%`}</Typography>
      </Box>
        </div>
        
    );
}
