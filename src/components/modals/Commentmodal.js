import React,{useState,useRef,useContext,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {post} from 'axios';
import {  
    Box, 
    Card,
    CircularProgress,
    CardActions,
    CardMedia,
    Container,
    Dialog,
    Grid,
    Tooltip,
    IconButton,
    Slide,
    Stack,
    Typography
 }
from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import img1 from '../../images/image2.jpg';
import Viewcmts from "./Viewcmts";
import CmtImgcard from "../ui/CmtImgcard";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import { fetchCmtImages } from "../../store/Getcmtslice";

import Accessstatus from "./Accessstatus";
const Transition =React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Commentmodal=(props) => {
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
    const ImageCtx = useContext(ImgarrayContext);
    const fname=ImageCtx.commentsforfname;
    const dispatch=useDispatch();
    const inputRef = useRef();
    const shouldrender=useRef(true);
    const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
    const CmtImages=useSelector((state)=>state.getcmtImages);   
    const Cmtdata=CmtImages.cmtArray; 
    console.log(Cmtdata);
    const [open, setOpen] = useState(props.state);
    const [showaccess, setshowaccess]=useState(false);
    const [showimage, setshowimage]=useState(img1);
    const [imgtoupload, setimgtoupload]=useState('');
    const [Imageinview, setImageinview]=useState(false);
  
    useEffect(()=>
    {
      if(shouldrender.current)
       {
         shouldrender.current=false;
         dispatch(fetchCmtImages(fname)) 
       }     
      },[dispatch,fname])
      
    const accesstate=()=>
      {
        setshowaccess(false);
      }
    const viewCommentImages=()=>{
      setImageinview(false);
    }
    const viewImage=(index) =>
      {    
        ImageCtx.setcmtarray(Cmtdata);
        ImageCtx.setcmtcurrentindex(index);
        ImageCtx.setcmtfilename(Cmtdata[index].commentFileName);
        setImageinview(true);  
      }
    const setcloseview=()=>
      {
        setImageinview(false);
      }
    const chooseImage=(event) =>
    {
      const file = event.target.files[0];
      setimgtoupload(file);
      const reader = new FileReader();
      reader.onload = () =>
       {
          if(reader.readyState === 2)
           {
            setshowimage(reader.result)
           }
       }
      reader.readAsDataURL(event.target.files[0])
   }
   const uploadImage=(event) =>
   {
     if(loggedstatus===true)
     {
      let data={
        'fileName':fname
      }
      let formData = new FormData();
      formData.append('commentfile', imgtoupload);
      formData.append('commentDetail',JSON.stringify(data));
      console.log(formData);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        }
      }
      post("https://mysnaps.cognitivemobile.net/service/updateUserComments", formData, config)
        .then((response) => {
          console.log(response);
          if(response.data.result_code === 0) {
            alert(response.data.result_text);
            dispatch(fetchCmtImages(fname)) 
          } 
          else
           {
            alert(response.data.result_text);
           }
      })
     }
     else
     {
       setshowaccess(true);
     }
   }
   const handleClose = () =>
       {
          props.setstate();
          setOpen(false);
       };
    return(
        <Dialog fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
        <Stack direction='row'
               sx={{display:'flex', 
                    width:'100%',                                      
                    justifyContent:'end'}}>  
                  
           <IconButton sx={{backgroundColor:'white', 
                            color:'black',
                            margin:'10px', 
                            marginRight:'20px',
                            padding:'8px'}}
                       edge="start"
                       onClick={handleClose}
                       aria-label="close">
                        <CloseIcon/>
           </IconButton>            
        </Stack>
        <Stack direction={'row'}>
            <Box sx={{display:'flex',
                      marginLeft:'10px'}}>
               <Typography>Comments of</Typography>
               <Card sx={{marginLeft:'10px', height:'100px'}}>
                  <CardMedia sx={{objectFit:'contain'}}
                             component='img'
                             height='100'
                             image={baseUrl+fname}
                             alt='Select Image'>

                  </CardMedia>
               </Card>
            </Box>
            <Box sx={{width:'10%', marginLeft:'10px'}}>
            <Card sx={{marginLeft:'10px', height:'100px'}}>
                 <CardMedia sx={{objectFit:'contain'}}
                            component='img'
                            height='60'
                            image={showimage}
                            alt='Select Image'/>
                 <CardActions sx={{display:'flex', 
                                   justifyContent:'center'}}>
                   <IconButton sx={{marginLeft:'5px'}}
                           htmlFor="contained-button-file"                       
                           component="label"
                           color="primary"> 
                           <Tooltip title="Select an image" arrow>        
                            <PhotoCameraIcon/>
                          </Tooltip>
                       <input type="file" 
                              id="contained-button-file"
                              ref={inputRef}
                              onChange={chooseImage}
                              accept="image/*"
                              hidden />
                    </IconButton>   
                    <IconButton onClick={uploadImage}
                                color="primary">
                          <Tooltip title="upload comment" arrow>   
                            <PublishIcon/>
                          </Tooltip>
                     </IconButton>       
                 </CardActions>
              </Card>
            </Box>         
   </Stack>
   <Stack> 
      <hr style={{width:'100%'}}/>
      <Typography>Comment Images</Typography>
      { Imageinview && <Viewcmts state={Imageinview} setstate={viewCommentImages} setview={setcloseview}/>}
          <Container>             
              {CmtImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
               {!CmtImages.loading && 
                 CmtImages.error? 
                 <Box sx={{width:'70vw',
                           height:'30vw',
                           display: 'flex',
                           justifyContent:'center',
                           alignItems:'center'}}>       
                       {CmtImages.error}
                 </Box>:' '}
               {!Imageinview && 
                !CmtImages.loading && 
                 Cmtdata.length!==0 &&
                 <Grid container spacing={1}>
                  {
                     Object.keys(Cmtdata).map((key, index) => 
                      {   
                                  
                        return(
                             <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                              
                                <CmtImgcard image={Cmtdata[key].commentFileName}
                                       
                                            cindex={index}
                                            expandimage={viewImage} />

                             </Grid>
                             )})}
                 </Grid>}
               {!Imageinview && 
                !CmtImages.loading && 
                 Cmtdata.length===0 &&
                 <Box sx={{width:'70vw',
                           height:'30vw',
                           display: 'flex',
                           justifyContent:'center',
                           alignItems:'center'}}>
                                  No comments found
                 </Box>
               }      
          </Container>

   </Stack>  
      {showaccess &&
              <Accessstatus setstate={accesstate} state={showaccess}/>
           }
</Dialog>
    );
}

export default Commentmodal;