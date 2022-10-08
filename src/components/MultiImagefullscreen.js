
import React, {useState,useEffect} from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

const Multiimagefullscreen= (props) =>
{
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/'; 
    
    const token=localStorage.getItem('auth_token');
    const images=props.imagesarray;
 
    const arraylength=images.length;
    const [open, setOpen] = useState(props.state);
    const [currentindex, setcurrentindex]= useState(props.imageindex);
    let showindex=currentindex+1;
    const [showprev, setshowprev]=useState(currentindex!=0?false:true);
    const [shownext, setshownext]=useState(currentindex>arraylength?false:true);
    const [loggedIn, setLoggedIn]=useState(false);
    const [clickedfilename, setclickedfilename]=useState(images[currentindex]);
    
    const previmage =() =>
    {
      if(currentindex===0)
      {
        setshowprev(true);
      }
      else
      {
         setshowprev(false);
         setcurrentindex(currentindex-1);
      }
      console.log(currentindex);
      setclickedfilename(images[currentindex]);
      console.log(clickedfilename);      
    }

    const nextimage =() =>
    {
      if(currentindex>=arraylength-1)
      {
        setshownext(true);
      }
      else
      {
        setshownext(false);
        setcurrentindex(currentindex+1);
      }
      console.log(currentindex);
      setclickedfilename(images[currentindex]); 
      console.log(clickedfilename)
     
    }
    const handleClose = () => {
     props.setstate();
     setOpen(false);
    };
    const downloadimage = async() => {
        
      const url = baseUrl+clickedfilename;
      fetch(url, {
          method: 'Get',
          headers: {},
        })
       .then((response) => {
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
    let formData={"fileName":clickedfilename};
    const headers = {
     'Authorization':'Bearer '+ token
   };
   axios.post('https://www2.executesimple.com/updateUserDownloads',formData, { headers })
     .then(response => {
     console.log("response ", response)
    
     if(response.data.result_code===0)
     {
      console.log('added to recent downloads')           
     }
    else
    {
        console.log(response.data.result_text);
    }
    
 });       
     };

     useEffect(()=> {
      let controller= new AbortController();         
          if(token===null || token==='null')
          {
             setLoggedIn(true);
          }
          else
          {
             setLoggedIn(false);
          }
                   
      return() => 
      {       
        controller.abort();
      }
        },[]);
    
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
              {showindex}/{arraylength}
              </Typography>
             
            </Box>
            <Box sx={{margin:'0 20px', padding:'5px'}}>
            <IconButton
              sx={{backgroundColor:'black', color:'white',
               margin:'10px', padding:'8px'}}
              edge="start"  
              disable={showprev}            
              onClick={previmage}
              aria-label="previous">
                 <ArrowBackIosNewIcon/>
            </IconButton>
            <IconButton
               sx={{backgroundColor:'black', color:'white',
               margin:'10px', padding:'8px'}}
              edge="start"
              disable={shownext}
              onClick={nextimage}
              aria-label="next"
            >
              <ArrowForwardIosIcon/>
            </IconButton>
         
            <IconButton sx={{backgroundColor:'black', color:'white',
                             margin:'10px', padding:'8px'}}
              edge="start"
              disable={loggedIn}
              onClick={downloadimage}
              aria-label="next">
              <FileDownloadIcon/>
            </IconButton>
            <IconButton
             sx={{backgroundColor:'black', color:'white',
             margin:'10px', padding:'8px'}}
              edge="start"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            </Box>           
           </Stack>
           <Stack>
            <Box sx={{width:'90vw', 
                      height:'80vh', display:'flex', justifyContent:'center'}}>
              <CardMedia   component="img"
                           sx= {{objectFit:'contain'}}
                           image={baseUrl+images[currentindex]}
                           alt="image"/>             
            </Box>
           </Stack>       
      </Dialog>
        </>
    );
}

export default Multiimagefullscreen;