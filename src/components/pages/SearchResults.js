import React, { useState, useContext,useRef,useEffect } from "react";
import ViewImage from "../ui/ViewImage";
import Imagecard from "../ui/Imagecard";

import { useSelector,useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material'; 
import { fetchSearchImages } from "../../store/GetSearchImg";
import { ImgarrayContext } from "../../context/ImgArrCtx";


const SearchResults =() =>
 {  
  const dispatch=useDispatch();
  const ImageCtx = useContext(ImgarrayContext);  
  const shouldrender=useRef(true);
  const SearchImages=useSelector((state)=>state.getSearchImages);   
  const Imagedata=SearchImages.searchArray;  
  console.log(Imagedata);
  const [Imageinview, setImageinview]=useState(false);
  const query=ImageCtx.searchtext;
  useEffect(()=>
  {
    if(shouldrender.current)
     {
       shouldrender.current=false;
       dispatch(fetchSearchImages(query)) 
     }     
    },
    [dispatch])

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
      <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               sx={{padding:'10px', 
                    marginBottom:'10px', 
                    position:'fixed',
                    zIndex:'2',
                    width:'100%',
                    backgroundColor:'#f0f4fa'}}
               spacing={2}>
            <Box sx={{display:'flex', 
                      justifyContent:'space-between',
                      color:'#0c35ed'}}>
             
            <Typography>
              Search Results
            </Typography>
               </Box>       
        </Stack>

        { Imageinview && <ViewImage setview={setcloseview}/>}

          <Container>             
              {SearchImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
               {!SearchImages.loading && 
                 SearchImages.error?
                 <Box sx={{width:'70vw',
                           height:'30vw',
                           display: 'flex',
                           justifyContent:'center',
                           alignItems:'center'}}>       
                       {SearchImages.error}
                 </Box>:' '}
               {!Imageinview && 
                !SearchImages.loading && 
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
                !SearchImages.loading && 
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

export default SearchResults;