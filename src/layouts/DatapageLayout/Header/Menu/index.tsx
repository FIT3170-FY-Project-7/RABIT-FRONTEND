import {
  Box,
  TextField
} from '@mui/material';

import EditIon from '@mui/icons-material/Edit';


function DataTitle() {
  return (
    <Box  sx={{ display: 'flex', alignItems: 'flex-end', width:250  }}>
      <TextField fullWidth id="dataplot-title" size = "medium" label="Enter Plot Title" variant="standard" />
      <EditIon/> 
    
    </Box>
  );
}

export default DataTitle;
