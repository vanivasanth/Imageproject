import React,{useContext,useState,useEffect,useRef} from "react";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import {
    Grid,
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
   } from '@mui/material';
import Imagecard from "../ui/Imagecard";
import ViewImage from "../ui/ViewImage";
import {post} from 'axios';
const PubImages=(props) => {
 
    const ImageCtx = useContext(ImgarrayContext);
    const [pubarray,setPubarray]=useState([]);
    const shouldrender=useRef(true);
    const [Imageinview, setImageinview]=useState(false);
    const imagesinfo=props.images
    useEffect(()=>
    {
      const setpubimg=()=>{
       
        for(let i=0;i<imagesinfo.length;i++)
        {          
            const {userPrivacy}=imagesinfo[i];  
            if(userPrivacy==='public')
            {                 
              setPubarray((prevImages)=>{
                console.log(prevImages);
                return prevImages.concat(imagesinfo[i]);
              })                       
            }           
           }  
      }
      if(shouldrender.current)
       {
         shouldrender.current=false;
         setpubimg();
       }     
      },
      [imagesinfo])
      const handlemodeChange= (index)=> {
       
        let filedata= {
            "fileName":pubarray[index].fileName,
            "category":pubarray[index].category,
            "remarks":pubarray[index].remarks,
            "caption":pubarray[index].caption,
            "clienInfo":"web",
            "userPrivacy":"private",
            "isDelete":false
          }
          const headers={
              'Authorization':'Bearer '+ localStorage.getItem('auth_token')
           }
          
         post('https://mysnaps.cognitivemobile.net/service/updateUserFileDetails', filedata,{headers}) 
          .then((response) => {
              console.log(response.data);
              if(response.data.result_code === 0)
               { 
                 props.changetab();
                        
              } 
              else
               {
                alert(response.data.result_text); 
               }
          }, error=>{
           alert(error);})
          
         }
    const viewImage=(index) => 
     {
       ImageCtx.setImagesarray(pubarray);
       ImageCtx.setcurrentindex(index);
       ImageCtx.setsinglefilename(pubarray[index].fileName);
       ImageCtx.setcommentsforfname(pubarray[index].fileName);
         setImageinview(true);
     }
     const setcloseview=()=>
     {
       setImageinview(false);
     }
    return(
        <>
         { Imageinview && <ViewImage setview={setcloseview}/>}
         {!Imageinview && pubarray.length!==0 &&
        <Grid container spacing={1}
                 sx={{position:'relative', marginTop:'5%'}}>
           {Object.keys(pubarray).map((key, index) => 
                {                 
                 return(
                   <Grid item key={pubarray[key].fileName} xs={12} sm={6} md={4} lg={3}>
                     <FormControl sx={{margin:'2px 6px 6px'}}>
                      
                       <RadioGroup  row
                                    onChange={()=>handlemodeChange(index)}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group">
                       <FormControlLabel value="public"
                                         control={<Radio size="small" />} 
                                         label="change to private" />       
                       </RadioGroup>
                     </FormControl>
                  
                       <Imagecard image={pubarray[key].fileName} 
                                  typechk={pubarray[key].multiChatFiles}
                                  cindex={index}
                                  expandimage={viewImage} />
                  </Grid>
                 )})}
          </Grid>
         }
            {!Imageinview && pubarray.length===0 &&
              <Box sx={{width:'70vw',
                        height:'30vw',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center'}}>
                             No Images found
             </Box>       
          }
        </>
    );
}

export default PubImages;