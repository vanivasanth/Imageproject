import React from "react";
import {
    Card,
  CardMedia,
   } from '@mui/material';

const MultiImagecard=(props) => {
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/'; 
    const imgsrc=baseUrl+props.imagename;
    const fullscreen=()=>
    {
        props.setindex(props.imageindex);
    }

    
    return(
       <Card>
          <CardMedia component="img"
                     height="194"
                     onClick={fullscreen}                  
                     sx={{cursor:'pointer'}} 
                     image={imgsrc}/>
          
       </Card>
    );
}

export default MultiImagecard;