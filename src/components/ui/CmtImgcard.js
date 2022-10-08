import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  IconButton
 } from '@mui/material';
//import { AddPhotoAlternateIcon } from '@mui/icons-material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { ImgarrayContext } from "../../context/ImgArrCtx";


const CmtImgcard =(props)=>
 {
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  
  let imgsrc=props.image;
  let cuindex=props.cindex;
 
  const viewImage=() =>
   {
     props.expandimage(cuindex);
   }

    return(
      <div>
      
       <Card sx={{ maxWidth: 300}}>
           <CardMedia component="img"
                      height="194"
                      image={baseUrl+imgsrc}
                      alt="image"/>
     
           <CardActions disableSpacing sx={{display:'flex', 
                                            justifyContent:'center'}}>            
               
                  <IconButton aria-label="view" 
                              onClick={viewImage}
                              sx={{color:'#3393FF'}}>
                       <OpenInFullIcon/>
                  </IconButton>
                  
                 
           </CardActions>
         </Card>
       </div>
    );
}

export default CmtImgcard;