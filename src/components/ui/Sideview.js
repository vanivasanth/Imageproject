
import React, { useContext } from "react";
import Sideimagecard from "./Sideimagecard";
import {
  Drawer,
  Toolbar,
  Grid,
  Box
 } from '@mui/material';

 import { ImgarrayContext } from "../../context/ImgArrCtx";

const Sideview=() => {
  
   const ImageCtx = useContext(ImgarrayContext);
   const Imgarr=ImageCtx.Imagesarray;
   console.log(Imgarr)
  
    return(
        <>
        <Grid container spacing={1} sx={{ marginTop:'15%'}}>
         
        <Drawer 
        sx={{
          mt:{md:'10%'},
          background:'none',
          zIndex:'0',
          border:'none',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
          sx: {
            width: 400,
            border:'none'
          }
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar/>
        <Box sx={{width:'100%', marginTop:'100px'}}>

        </Box>
         {Object.keys(Imgarr).map((key, index) => {                 
            return(
              <Grid item key={index} xs={4} sm={4} md={12} lg={12}>
                 <Sideimagecard image={Imgarr[key].fileName} 
                                cindex={index}/>
              </Grid>
           )})}
           </Drawer>
        </Grid>

        </>
    );
}
export default Sideview;