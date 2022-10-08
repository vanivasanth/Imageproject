import React,{useState} from "react";
import MultiImagecard from "./MultiImagecard";
import Multiimagefullscreen from "../modals/MultiFullscreen";
import {
   Grid
   } from '@mui/material';

const MultiImagetile=(props) => 
{
  const [fullscreenstate, setfullscreenstate]=useState(false);
  const [currentindex, setcurrentindex]=useState(1);
 
  const closehandler=()=>
  {
    setfullscreenstate(false);
  }
  const indexHandler=(indexvalue)=>{
    setcurrentindex(indexvalue);
    setfullscreenstate(true);
  }
  const images=props.imagearray;
    return(
      <>
      {fullscreenstate &&
            <> <Multiimagefullscreen state={fullscreenstate}
                                     imagesarray={images}
                                     imageindex={currentindex}
                                     setstate={closehandler}/> </>}
      {!fullscreenstate &&
       <div style={{width:'100%'}}>   
              <Grid container spacing={1} sx={{position:'relative', marginTop:'2%'}}>
               {images.map((key, index) => {                 
                  return(   
                    <Grid item key={key} xs={12} sm={6} md={4} lg={3}>             
                        <MultiImagecard setindex={indexHandler}
                                        imageindex={index}
                                        imagename={key}/>
                      </Grid>
                  )})}
             </Grid>
        </div> }
        </>
    );
}

export default MultiImagetile;