import React from "react";
import { AddPhotoAlternateIcon } from '@mui/icons-material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import {
    Card,
    CardMedia,
    CardActions,
    IconButton,
   } from '@mui/material';
const Imagecard = (props) => {
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/'; 
    const imgsrc=baseUrl+props.imagename;

    return(
          <Card sx={{ maxWidth: 300}}>
               <CardMedia
                        component="img"
                        height="194"
                        image={ imgsrc}
                        alt="image" />
     
               <CardActions disableSpacing sx={{display:'flex', 
                                                justifyContent:'center'}}>
                   <IconButton aria-label="view" sx={{color:'#3393FF', padding:'5px'}}>
                     <OpenInFullIcon/>
                   </IconButton>
                     {/* <IconButton aria-label="Edit">
                               <EditIcon/>
                          </IconButton> */}
                   <IconButton aria-label="share">
                     <ShareIcon />
                   </IconButton> 
                     {/* <IconButton aria-label="Delete">
                             <DeleteIcon/>
                         </IconButton>       */}
                </CardActions>
      </Card>
    );
}

export default Imagecard;