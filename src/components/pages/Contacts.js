import React,{ useState,useEffect, useRef,useContext } from "react";
import ViewImage from "../ui/ViewImage";
import Imagecard from "../ui/Imagecard";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../ui/PageHeader";
import {
  Box,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material';
 import { fetchContactImages } from "../../store/GetContactImagesSlice";
 import { ImgarrayContext } from "../../context/ImgArrCtx";

const Contacts =() => {
  const dispatch=useDispatch();
  const ImageCtx = useContext(ImgarrayContext);
  const shouldrender=useRef(true);
  const ContactImages=useSelector((state)=>state.getContactImages);
  const Imagedata=ContactImages.imagesArray; 
  
  console.log(Imagedata);
  const [Imageinview, setImageinview]=useState(false);
  

  useEffect(()=>{
    if(shouldrender.current)
    {
      shouldrender.current=false;
      dispatch(fetchContactImages()) 
    }},[dispatch])

  const viewImage=(index) => 
  {
    ImageCtx.setImagesarray(Imagedata);
    ImageCtx.setcurrentindex(index);
    ImageCtx.setsinglefilename(Imagedata[index].fileName); 
    ImageCtx.setcommentsforfname(Imagedata[index].fileName);
    setImageinview(true);
  }

  const setcloseview=()=>
  {
    setImageinview(false);
  }
    return(
      <>
      <PageHeader/>
      { Imageinview && <ViewImage setview={setcloseview}/>}
      <Container>
      
       {ContactImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
        {!ContactImages.loading && 
          ContactImages.error? 
             <Box sx={{width:'70vw',
                       height:'30vw',
                       display: 'flex',
                       justifyContent:'center',
                       alignItems:'center'}}>       
                   {ContactImages.error}
             </Box>:' '}
        {!Imageinview && 
         !ContactImages.loading && 
          Imagedata.length!==0 &&
           <Grid container spacing={1}
                 sx={{position:'relative', marginTop:'5%'}}>
           {Object.keys(Imagedata).map((key, index) => 
                {                 
                 return(
                   <Grid item key={Imagedata[key].fileName} xs={12} sm={6} md={4} lg={3}>
                       <Imagecard image={Imagedata[key].fileName}
                                  typechk={Imagedata[key].multiChatFiles}
                                  cindex={index} 
                                  expandimage={viewImage} />
                  </Grid>
                 )})}
          </Grid>}
          {!Imageinview && 
           !ContactImages.loading && 
            Imagedata.length===0 &&
          <Box sx={{width:'70vw',
                    height:'30vw',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center'}}>
                           No Contacts found
          </Box>
           }
      </Container>
      </> 
    );
}

export default Contacts;