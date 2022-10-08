import React,{useState} from "react";
import MultiImagecard from "./MultiImagecard";
import Multiimagefullscreen from "./MultiImagefullscreen";
import {
  IconButton, 
  ImageList,   
   } from '@mui/material';
   import CloseIcon from '@mui/icons-material/Close';
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
       <div style={{width:'70%'}}>   
              <ImageList sx={{ backgroundColor:'grey',                          
                               height:'auto',
                               margin:'20px',
                               marginTop:'70px' }} cols={5} rowHeight={150}>
           {images.map((key, index) => {                 
              return(                
                  <MultiImagecard setindex={indexHandler}
                                  imageindex={index}
                                  imagename={key}/>
               )})}
        </ImageList>
        </div> }
        </>
    );
}

export default MultiImagetile;