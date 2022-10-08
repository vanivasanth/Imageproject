import React,{useContext,useState} from "react";

//import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Box,
  CardMedia
 } from '@mui/material';
 import SocialIcons from './SocialIcons';
 
 import Imageheader from './Imageheader';
 import { ImgarrayContext } from "../../context/ImgArrCtx";
const ViewCmtimage=(props) => 
   {
     const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
     const ImageCtx = useContext(ImgarrayContext);
     
     const setimgview=()=> {
      props.setview(false);
     }
    return(
       <Stack  direction={{ xs: 'column',sm:'column', md: 'row' }}
               sx={{width:'100%'}}
               spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box sx={{width:{xs:'100%', sm:'100%', md:'55%'},
                  height:'50%',
                  backgroundColor:'#E2EFFE'}}>
          <Imageheader filetype={props.type} setviewimg={setimgview}/>          
           
              <CardMedia   component="img"
                           sx= {{objectFit:'contain'}}
                           image={baseUrl+ImageCtx.cmtfilename}
                           alt="image"/>               
              
         <SocialIcons filetype={props.type} />
        </Box>
       
         

        
       </Stack>
    );
}
export default ViewCmtimage;