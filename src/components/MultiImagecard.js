import React,{useState} from "react";
import {
    ImageListItem  
   } from '@mui/material';

const MultiImagecard=(props) => {
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/'; 
    const imgsrc=baseUrl+props.imagename;
    const fullscreen=()=>
    {
        props.setindex(props.imageindex);
    }

    
    return(
        <ImageListItem sx={{ border:'1px solid white'}}>
             <img src={imgsrc} 
                  onClick={fullscreen}                  
                  style={{objectFit:'cover', cursor:'pointer'}}          
                  alt='image'
                  loading="lazy"/>
        </ImageListItem>
    );
}

export default MultiImagecard;