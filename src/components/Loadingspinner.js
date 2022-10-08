import React from "react";
import {CircularProgress, Stack} from '@mui/material';
export default function LoadingSpinner() {
    return (
      <Stack sx={{height:'100%', 
                  width:'100%',
                  display:'flex',
                  marginTop:'100px',
                  marginLeft:'200px',
                  justifyContent:'center',
                  alignItems:'center'}}>
          <CircularProgress color="primary" />
      </Stack>
    );
  }