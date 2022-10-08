
import React, {useState,useContext,useEffect} from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import { ImgarrayContext } from "../../context/ImgArrCtx";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector,useDispatch } from "react-redux";
import { downloadImg } from "../../store/Downloadimg";
import Accessstatus from "../modals/Accessstatus";
import {
    Box,
    CardMedia,
    Dialog,
    IconButton,
    Slide,
    Stack,
    Typography,
 }
from '@mui/material';
const Transition =React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Singleimagefullscreen= (props) =>
{
  const [open, setOpen] = useState(props.state);
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/'; 
    const dispatch=useDispatch();
    const ImageCtx = useContext(ImgarrayContext); 
    const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
    const [showaccess, setshowaccess]=useState(false);
    let prevIndexchk=(((ImageCtx.currentindex===0)||
                     (ImageCtx.arraylength===1))?true:false);
    let nextIndexchk=(((ImageCtx.currentindex+1===ImageCtx.arraylength)||
                     (ImageCtx.arraylength===1))?true:false);
    const fname=ImageCtx.singlefilename;

    const prevImge=()=>
      {      
        let index=ImageCtx.currentindex;
        index=index-1;
        ImageCtx.setcurrentindex(index);
        ImageCtx.setsinglefilename(ImageCtx.Imagesarray[index].fileName);      
        ImageCtx.setcommentsforfname(ImageCtx.Imagesarray[index].fileName);
      }
    const nextImge=()=>
      {
         let index=ImageCtx.currentindex;
         index=index+1;
         ImageCtx.setcurrentindex(index);
         ImageCtx.setsinglefilename(ImageCtx.Imagesarray[index].fileName);  
         ImageCtx.setcommentsforfname(ImageCtx.Imagesarray[index].fileName); 
     }
                     
     const accesstate=()=>
     {
       setshowaccess(false);
     }

    const handleClose = () => {
     props.setstate();
     setOpen(false);
    }
    const downloadimage = async() => {
      if(loggedstatus===true)
      {            
            dispatch(downloadImg(fname))
      }
      else
      {
            setshowaccess(true); 
      }     
   
     }

    
    return(
        <>
         <Dialog fullScreen
                 open={open}
                 onClose={handleClose}
                 TransitionComponent={Transition}
          >
           <Stack direction='row' sx={{display:'flex',                                       
                                       justifyContent:'center'}}>
            <Box sx={{margin:'0 20px', padding:'5px'}}>
              <Typography   variant="h6"
                            sx={{ color:'grey',
                            margin:'10px', padding:'8px'}}>
                 {ImageCtx.currentindex+1}/{ImageCtx.arraylength}
              </Typography>
             
            </Box>
            <Box sx={{margin:'0 20px', padding:'5px'}}>
            <IconButton
              sx={{backgroundColor:'black', color:'white',
               margin:'10px', padding:'8px'}}
              edge="start"               
              disabled={prevIndexchk}
              onClick={prevImge}
              aria-label="previous">
                 <ArrowBackIosNewIcon/>
            </IconButton>
            <IconButton
               sx={{backgroundColor:'black', color:'white',
                    margin:'10px', padding:'8px'}}
               edge="start"
               disabled={nextIndexchk}
               onClick={nextImge}
               aria-label="next"
            >
              <ArrowForwardIosIcon/>
            </IconButton>
         
            <IconButton sx={{backgroundColor:'black', color:'white',
                             margin:'10px', padding:'8px'}}
              edge="start"
              disable={loggedstatus}
              onClick={downloadimage}
              aria-label="next">
              <FileDownloadIcon/>
            </IconButton>
            <IconButton
             sx={{backgroundColor:'black', 
                  color:'white',
                  margin:'10px', padding:'8px'}}
              edge="start"
              onClick={handleClose}
              aria-label="close">
                    <CloseIcon />
            </IconButton>
            </Box>           
           </Stack>
           <Stack>
            <Box sx={{width:'90vw', 
                      height:'80vh', display:'flex', justifyContent:'center'}}>
              <CardMedia   component="img"
                           sx= {{objectFit:'contain'}}
                           image={baseUrl+fname}
                           alt="image"/>             
            </Box>
           </Stack>       
      </Dialog>
      {showaccess &&
              <Accessstatus setstate={accesstate} state={showaccess}/>
           }
        </>
    );
}

export default Singleimagefullscreen;