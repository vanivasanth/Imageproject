import React,{useState,useContext} from "react";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {  
    Box, 
    Dialog,
    Grid,
    IconButton,
    Slide,
    Stack,
    Typography
 }
from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ImgarrayContext } from "../../context/ImgArrCtx";

const Transition =React.forwardRef(function Transition(props, ref)
 {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const Viewcmts=(props) => {
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
    const [open, setOpen] = useState(props.state);
    const ImageCtx = useContext(ImgarrayContext);
    let prevIndexchk=(((ImageCtx.cmtcurrentindex===0)||
                     (ImageCtx.cmtarraylength===1))?true:false);
    let nextIndexchk=(((ImageCtx.cmtcurrentindex+1===ImageCtx.cmtarraylength)||
                     (ImageCtx.cmtarraylength===1))?true:false);


      const prevImge=()=>
      {            
               let index=ImageCtx.cmtcurrentindex;
               index=index-1;
               ImageCtx.setcmtcurrentindex(index);
               ImageCtx.setcmtfilename(ImageCtx.cmtarray[index].commentFileName);                 
      }
      
      const nextImge=()=>
      {
               let index=ImageCtx.cmtcurrentindex;
               index=index+1;
               ImageCtx.setcmtcurrentindex(index);
               ImageCtx.setcmtfilename(ImageCtx.cmtarray[index].commentFileName);           
      }
      
      const commentstate=()=>
      {
        props.setstate();
        setOpen(false);
      }
   
   
    return(
        <Dialog fullScreen
                open={open}
                onClose={commentstate}
                TransitionComponent={Transition}>
        <Stack direction='row'
               sx={{display:'flex', 
                    width:'100%',                                      
                    justifyContent:'center'}}>  
             <Box sx={{margin:'0 20px', padding:'5px'}}>
                <Typography   variant="h6"
                            sx={{ color:'grey',
                            margin:'10px', padding:'8px'}}>
                      {ImageCtx.cmtcurrentindex+1}/{ImageCtx.cmtarraylength}
                </Typography>             
            </Box>
            <Box sx={{margin:'0 20px',
                      padding:'5px'}}>
            <IconButton
              sx={{backgroundColor:'black',
                   color:'white',
                   margin:'10px', 
                   padding:'8px'}}
              edge="start"  
              disabled={prevIndexchk}            
              onClick={prevImge}
              aria-label="previous">
                 <ArrowBackIosNewIcon/>
            </IconButton>
            <IconButton
               sx={{backgroundColor:'black',
                    color:'white',
                    margin:'10px',
                    padding:'8px'}}
               edge="start"
               disabled={nextIndexchk}
               onClick={nextImge}
               aria-label="next">
                      <ArrowForwardIosIcon/>
            </IconButton>
            <IconButton sx={{backgroundColor:'black', 
                            color:'white',
                            margin:'10px', 
                            padding:'8px'}}
                       edge="start"
                       onClick={commentstate}
                       aria-label="close">
                        <CloseIcon/>
           </IconButton>     
           </Box>     
                
        </Stack>
        <Grid container justifyContent="center" alignItems="center">
        
          <Grid item sm={10} md={10} lg={10}>
         
                    <img src={baseUrl+ImageCtx.cmtfilename} 
                         alt="comment images"/>
               
          </Grid>
         
        </Grid>
       
     </Dialog>
    );
}

export default Viewcmts;