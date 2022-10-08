import React,{ useState,useEffect, useRef,useContext } from "react";
import ViewImage from "../ui/ViewImage";
import Imagecard from "../ui/Imagecard";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../ui/PageHeader";
import Expired from "./Expired";
import {
  Box,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material';
 import { fetchFavImages } from "../../store/GetFavImagesSlice";
 import { ImgarrayContext } from "../../context/ImgArrCtx";
 
const Favourites =() => {
  const dispatch=useDispatch();
  const ImageCtx = useContext(ImgarrayContext);
  
  const shouldrender=useRef(true);
  const FavImages=useSelector((state)=>state.getFavImages);
  const Imagedata=FavImages.imagesArray;
  console.log(Imagedata);
  const [Imageinview, setImageinview]=useState(false);
  

  useEffect(()=>{
    if(shouldrender.current){
      shouldrender.current=false;
      dispatch(fetchFavImages()) 
    }     
    },[dispatch])

  const viewImage=(index) => {
    ImageCtx.setImagesarray(Imagedata);
    ImageCtx.setcurrentindex(index);
    ImageCtx.setsinglefilename(Imagedata[index].fileName);
    ImageCtx.setcommentsforfname(Imagedata[index].fileName);
    setImageinview(true);
  }

  const setcloseview=()=>{
    setImageinview(false);
  }
    return(
      <>
      <PageHeader/>
      { Imageinview && <ViewImage setview={setcloseview}/>}
      <Container>
        
       { FavImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
        {!FavImages.loading && 
          FavImages.error? 
             <Box sx={{width:'70vw',
                       height:'30vw',
                       display: 'flex',
                       justifyContent:'center',
                       alignItems:'center'}}>       
                   {FavImages.error}
             </Box>:''}
        {!Imageinview && 
         !FavImages.loading && 
          Imagedata.length!==0 &&
           <Grid container spacing={1}
                 sx={{position:'relative', marginTop:'5%'}}>
           {Object.keys(Imagedata).map((key, index) => 
                {                 
                 return(
                   <Grid item key={Imagedata[key].fileName} xs={12} sm={6} md={4} lg={3}>
                       <Imagecard image={Imagedata[key].fileName} 
                                  cindex={index}
                                  expandimage={viewImage} />
                  </Grid>
                 )})}
          </Grid>
        }
        {!Imageinview && 
         !FavImages.loading && 
           Imagedata.length===0 &&
           FavImages.error ===undefined &&
         <Box sx={{width:'70vw',
                   height:'30vw',
                   display: 'flex',
                   justifyContent:'center',
                   alignItems:'center'}}>
                          No Favourites found
         </Box>
          }
       
      </Container>
      </> 
    );
}

export default Favourites;