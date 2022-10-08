import React from "react";
//import { useSelector } from "react-redux/es/exports";
import { useNavigate,useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
     Box,
    Button,
    Stack,
    Typography
   } from '@mui/material';

const PageHeader=()=> {
    const location=useLocation();
    let navigate=useNavigate();
    const loc=location.pathname;
    // const profimgUrl='https://www2.executesimple.com/uploads/highmessaging/user/';
    // const image=useSelector((state)=>state.auth.image);

    const navtomultishare=()=>
    {
          navigate('/multishare');
    }
    const navtoeditprofile=()=>
    {
      navigate('/editprofile');
    }
    return(
        <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               sx={{padding:'10px', 
                    marginBottom:'5px', 
                    position:'fixed',
                    zIndex:'2',
                    backgroundColor:'#D4E7FC',
                    width:'100%',}}
               spacing={2}>
            <Box sx={{display:'flex', 
                      justifyContent:'space-between',
                      color:'#0c35ed'}}>
             
            {loc==='/' && ( 
                 <Box sx={{display:'flex'}}> 
                   <HomeIcon/>
                   <Typography sx={{marginLeft:'10px'}}> Home</Typography>
               </Box>)
               
             }
            { loc ==='/myuploads' && 
             ( <Stack direction="row">
              <Box sx={{display:'flex', marginTop:'3px'}}>
                   <CameraEnhanceIcon/> 
                   <Typography sx={{marginLeft:'10px'}}> My Uploads</Typography>
              </Box>
              
                   
             </Stack>)}
            
            {loc==='/likes'&& 
                <Box sx={{display:'flex'}}>
                     <ThumbUpIcon/>
                     <Typography sx={{marginLeft:'10px'}}> My Likes</Typography>
                </Box>
              }
              {loc==='/favourites'&&
                <Box sx={{display:'flex'}}>
                  <FavoriteIcon/>
                  <Typography sx={{marginLeft:'10px'}}> My Favourites</Typography>
                </Box>
              }
              {loc==='/contacts'&& 
                 <Box sx={{display:'flex'}}>
                  <PermContactCalendarIcon/>
                  <Typography sx={{marginLeft:'10px'}}> My Contacts</Typography>
                 </Box>
              }
              {loc==='/prescription'&&
                 <Box sx={{display:'flex'}}>
                     <LocalHospitalIcon/>
                     <Typography sx={{marginLeft:'10px'}}> My Prescriptions</Typography>
                 </Box>
              }
              
            
              
              {loc==='/share'&& 
                <Box sx={{display:'flex'}}>
                   <ShareIcon/>
                   <Typography sx={{marginLeft:'10px'}}> Share</Typography>
                </Box>
              }
            
              </Box>
              {loc!=='/multishare' && loc!=='/getSharedFiles/:referenceNumber' &&
                 <Box>
                    <Button sx={{marginTop:'1px',
                                 marginLeft:'10px', 
                                 textTransform:'capitalize',
                                 textSize:'1.2rem',                            
                                 color:'#0c35ed'}}
                            onClick={navtomultishare}
                            variant="text">
                        <Typography>
                             View MultiShare list
                        </Typography>
                   </Button>
                 </Box>
             }
        </Stack>
    );
}

export default PageHeader;