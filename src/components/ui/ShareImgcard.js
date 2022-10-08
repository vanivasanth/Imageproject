import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  IconButton
 } from '@mui/material';
 import FileDownloadIcon from '@mui/icons-material/FileDownload';
 import './Imagecard.css';

const ShareImgcard =(props)=>
 {
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  let imgsrc=props.image;
  
  async function downloadimage()
  {
    const url = baseUrl+imgsrc;
    fetch(url, {
        method: 'Get',
        headers: {},
      })
     .then((response) => 
     {
      response.arrayBuffer().then(function (buffer) {
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
    })
    .catch((err) => {
        console.log(err);
    });
  }
  
    return(
    
      
       <Card sx={{ maxWidth: 300}} >
      
           <CardMedia component="img"
                      height="194"
                      image={baseUrl+imgsrc}
                      alt="image"/>
     
           <CardActions disableSpacing sx={{display:'flex', 
                                            justifyContent:'center'}}>            
               
                  
                  <IconButton aria-label="view" 
                              onClick={downloadimage}
                              sx={{color:'#3393FF'}}>
                       <FileDownloadIcon/>
                  </IconButton>
               
                 
           </CardActions>
         
         </Card>
       
    );
}

export default ShareImgcard;