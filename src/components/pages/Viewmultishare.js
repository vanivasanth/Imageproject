import React,{useEffect,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ShareImgcard from "../ui/ShareImgcard";
import {
  Box,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material'; 
 import { fetchsharedImages } from "../../store/GetshareImages";
 import ViewMSheader from "../ui/viewMSheader";
const Viewmultishare =() =>
{
  const { referenceNumber }= useParams();
  const dispatch=useDispatch();
  const shouldrender=useRef(true);
  const sharedImages=useSelector((state)=>state.getsharedImages);  
  const a=JSON.stringify(sharedImages.sharedArray);
  const b=JSON.parse(a) 
  const Imagedata=b;  
  const fnames=Imagedata.fileNames;
  const title=Imagedata.title;

  useEffect(()=>
  {
    if(shouldrender.current)
     {
       shouldrender.current=false;
       if(referenceNumber===undefined)
        {
            alert('no ref number');
        }
        else
        {
          dispatch(fetchsharedImages(referenceNumber))
        }       
     }},
    [dispatch,referenceNumber])

  
    return(
       <>
       {!sharedImages.loading && 
        <ViewMSheader 
                      titleInfo={title} files={fnames}/>
       }
        <Container>             
           {sharedImages.loading &&
               <Box sx={{width:'70vw',
                         height:'30vw',
                         display: 'flex',
                         justifyContent:'center',
                         alignItems:'center'}}>
                          <CircularProgress />
               </Box>
           }
           {!sharedImages.loading && 
             sharedImages.error? 
              <Box sx={{width:'70vw',
                        height:'30vw',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center'}}>       
                       {sharedImages.error}
               </Box>:' '}
          {!sharedImages.loading && 
            Imagedata.length!==0 &&
            <Grid container spacing={1} sx={{position:'relative', marginTop:'5%'}}>
              {
                 fnames.map((key,index) => 
                  {                 
                   return(
                       <Grid item key={fnames[key]} xs={12} sm={6} md={4} lg={3}>
                           <ShareImgcard image={fnames[index]}/>
                       </Grid>
                   )})}
             </Grid>}
           {!sharedImages.loading && 
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

export default Viewmultishare;