import React, { useState,useEffect, useRef, useContext } from "react";
import ViewImage from "../ui/ViewImage";
import Imagecard from "../ui/Imagecard";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material'; 
import { fetchAllImages } from "../../store/GetAllImagesSlice";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import PageHeader from "../ui/PageHeader";

const Home =() =>
 {  
  const dispatch=useDispatch();
  const ImageCtx = useContext(ImgarrayContext);
  
  const shouldrender=useRef(true);
  const datestring='fromdate=2022-06-01&todate='+moment().format('YYYY-MM-DD');
  
  const AllImages=useSelector((state)=>state.getAllImages);   
  const Imagedata=AllImages.imagesArray;  
  console.log(Imagedata);
  const [Imageinview, setImageinview]=useState(false);
  

  useEffect(()=>
  {
    if(shouldrender.current)
     {
       shouldrender.current=false;
       dispatch(fetchAllImages(datestring)) 
     }     
    },
    [dispatch,datestring])

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
               {AllImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
               {!AllImages.loading && 
                 AllImages.error? 
                 <Box sx={{width:'70vw',
                           height:'30vw',
                           display: 'flex',
                           justifyContent:'center',
                           alignItems:'center'}}>       
                       {AllImages.error}
                 </Box>:' '}
               {!Imageinview && 
                !AllImages.loading && 
                 Imagedata.length!==0 &&
                 <Grid container spacing={1} sx={{position:'relative', marginTop:'5%'}}>
                  {
                     Object.keys(Imagedata).map((key, index) => 
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
                !AllImages.loading && 
                 Imagedata.length===0 &&
                 <Box sx={{width:'70vw',
                           height:'30vw',
                           display: 'flex',
                           justifyContent:'center',
                           alignItems:'center'}}>
                                  No images found
                 </Box>
               }      
          </Container>
      </>     
    );
} 

export default Home;