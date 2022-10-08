import React ,{useState, useContext} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AppsIcon from '@mui/icons-material/Apps';
import Accessstatus from "../modals/Accessstatus";
import axios from "axios";
import {
  Box,
  IconButton,
  Tooltip,
  Stack,
  Typography,
}
from '@mui/material';
import { downloadImg } from "../../store/Downloadimg";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import { SingleImgContext } from "../../context/SingleImgCtx";
import { useSelector,useDispatch } from "react-redux";

const Imageheader=(props) => 
{
const [showaccess, setshowaccess]=useState(false);
const dispatch=useDispatch();
const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
const userid=useSelector((state)=>state.auth.userId); 
const ImageCtx = useContext(ImgarrayContext); 
const SingleCtx= useContext(SingleImgContext);
const fname=ImageCtx.singlefilename;

let prevIndexchk=(((ImageCtx.currentindex===0)||
                     (ImageCtx.arraylength===1))?true:false);
let nextIndexchk=(((ImageCtx.currentindex+1===ImageCtx.arraylength)||
                     (ImageCtx.arraylength===1))?true:false);

                     async function updateViews()
                     {
                        const headers = {
                              'Authorization':'Bearer '+ localStorage.getItem('auth_token')
                              };
                       let formData={"fileName":ImageCtx.singlefilename}
                           axios.post('https://mysnaps.cognitivemobile.net/service/updateUserViews',
                          formData,{ headers })
                        .then(response => {
                             console.log("response ", response)            
                             if(response.data.result_code===0)
                              {
                                  console.log('added to views');
                              }
                             else
                             {
                                console.log(response.data.result_text);
                             }
                          });       
                     }

async function getsinglefileDatanon()
      {
         const geturl='https://mysnaps.cognitivemobile.net/service/getSingleFileDetails?filename=';
         const url=geturl+ImageCtx.singlefilename;
         const api= url;
         const result=await fetch(api);
         const getResult= await result.json();
         updateViews();
         SingleCtx.setImginfo(getResult);   
      }

async function getsinglefileData()
      {
         const geturl='https://mysnaps.cognitivemobile.net/service/getSingleFileDetails?filename=';
         const url=geturl+ImageCtx.singlefilename+'&userId='+userid;
         const api= url;
         const result=await fetch(api);
         const getResult= await result.json();
         SingleCtx.setImginfo(getResult);   
         updateViews();
      }

const downloadImage=()=>{
   
      if(loggedstatus===true)
      {            
            dispatch(downloadImg(fname))
      }
      else
      {
            setshowaccess(true); 
      }
}
const accesstate=()=>{
      setshowaccess(false);
}
const prevImge=()=>
{      
         let index=ImageCtx.currentindex;
         index=index-1;
         ImageCtx.setcurrentindex(index);
         ImageCtx.setsinglefilename(ImageCtx.Imagesarray[index].fileName);      
         ImageCtx.setcommentsforfname(ImageCtx.Imagesarray[index].fileName);
         if(loggedstatus===true)
          {            
            getsinglefileData();
          }
         else
          {
            getsinglefileDatanon();
          }
}

const nextImge=()=>
{
         let index=ImageCtx.currentindex;
         index=index+1;
         ImageCtx.setcurrentindex(index);
         ImageCtx.setsinglefilename(ImageCtx.Imagesarray[index].fileName);  
         ImageCtx.setcommentsforfname(ImageCtx.Imagesarray[index].fileName); 
         if(loggedstatus===true)
         {            
            getsinglefileData();
         }
         else
         {
            getsinglefileDatanon();
         }     
}

const closeview=() => 
  {
     props.setviewimg(false);
  }
    return(
      <>
      <Stack direction='row' sx={{display:'flex',  
                                  marginTop:'7%',                                     
                                  justifyContent:'center'}}>
         <Box sx={{margin:{sm:'2px 2px 0 2px',
                           md:'0 20px'}, 
                   padding:{sm:'1px',
                            md:'5px'}}}>
            <Typography   variant="h6"
                          sx={{ color:'grey',
                                margin:{sm:'10px 2px 2px 2px',
                                        md:'10px'},
                                padding:{sm:'5px',
                                         md:'8px'}}}>
          
                 {ImageCtx.currentindex+1}/{ImageCtx.arraylength}
             
            </Typography>
         </Box>

         <Box sx={{margin:{sm:'0 5px',md:'0 20px'},
                   padding:{sm:'1px',md:'5px'}}}>
            <IconButton sx={{backgroundColor:'white', 
                             color:'black',
                             margin:'10px', 
                             padding:'8px'}}
                        disabled={prevIndexchk}
                        edge="start" 
                        onClick={prevImge}
                        aria-label="previous">
                  <Tooltip title="Previous" arrow>   
                    <KeyboardArrowLeftIcon/>
                  </Tooltip>
            </IconButton>
            <IconButton sx={{backgroundColor:'white',
                             color:'black',
                             margin:'10px',
                             padding:'8px'}}
                        disabled={nextIndexchk}
                        onClick={nextImge}
                        edge="start"
                        aria-label="next">
                  <Tooltip title="Next" arrow>   
                   <KeyboardArrowRightIcon/>
                  </Tooltip>
            </IconButton>
            <IconButton sx={{backgroundColor:'white',
                             color:'black',
                             margin:'10px', 
                            padding:'8px'}}
                        onClick={downloadImage}
                        edge="start"
                        aria-label="next">
                  <Tooltip title="Download an image" arrow>   
                  <FileDownloadIcon/>
                  </Tooltip>
            </IconButton>
            <IconButton sx={{backgroundColor:'white', 
                             color:'black',
                             margin:'10px',
                             padding:'8px'}}
                        onClick={closeview}
                        edge="start"
                        aria-label="close">
                  <Tooltip title="Back to tile view" arrow>   
                  <AppsIcon/>
                  </Tooltip>
            </IconButton>
         </Box>           
       </Stack>
       {showaccess &&
            <Accessstatus setstate={accesstate} state={showaccess}/>
       }
       </>
    );
}
export default Imageheader;