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
const PvtImages=(props) => {
 
    const ImageCtx = useContext(ImgarrayContext);
    const [pvtarray,setPvtarray]=useState([]);
    const shouldrender=useRef(true);
    // const [openModal, setopenModal]=useState(false);
    // const [operation, setoperation]=useState('');
    const [Imageinview, setImageinview]=useState(false);
    const imagesinfo=props.images
    useEffect(()=>
    {
      const setpvtimg=()=>{
       
        for(let i=0;i<imagesinfo.length;i++)
        {          
            const {userPrivacy}=imagesinfo[i];  
            if(userPrivacy==='private')
            {                 
              setPvtarray((prevImages)=>{
                console.log(prevImages);
                return prevImages.concat(imagesinfo[i]);
              })                       
            }           
           }  
      }
      if(shouldrender.current)
       {
         shouldrender.current=false;
         setpvtimg();
       }     
      },
      [imagesinfo])
      const handlemodeChange= (index)=> {
       
        let filedata= {
            "fileName":pvtarray[index].fileName,
            "category":pvtarray[index].category,
            "remarks":pvtarray[index].remarks,
            "caption":pvtarray[index].caption,
            "clienInfo":"web",
            "userPrivacy":"public",
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
        //  const deleteimages =(index)=>
        //  {
        //      setoperation('delete');
        //      setopenModal(true);
        //      let filedata= {
        //        "fileName":pvtarray[index].fileName,
        //        "category":pvtarray[index].category,
        //        "remarks":pvtarray[index].remarks,
        //        "caption":pvtarray[index].caption,
        //        "clienInfo":"web",
        //        "userPrivacy":'private',
        //        "isDelete":true
        //      }
        //      let formData= new FormData();   
        //      formData.append('fileDetail', JSON.stringify(filedata));   
        //      const headers={
        //          'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        //       }
             
        //     post('https://mysnaps.cognitivemobile.net/service/updateUserFileDetails', filedata,{headers}) 
        //      .then((response) => {
        //          console.log(response.data);
        //          if(response.data.result_code === 0)
        //           { 
        //         //   handledialogClose();
        //            alert('file deleted successfully');
        //       //     async function waitforit()
        //       //       {
        //        //         await getData();  
        //       //       }
        //         //    waitforit();
        //          //   setValue(0);
        //           } 
        //          else
        //           {
        //            alert(response.data.result_text); 
        //           }
        //      }, error=>{
        //       alert(error);})
             
        //  }
   
    const viewImage=(index) => 
     {
       ImageCtx.setImagesarray(pvtarray);
       ImageCtx.setcurrentindex(index);
       ImageCtx.setsinglefilename(pvtarray[index].fileName);
       ImageCtx.setcommentsforfname(pvtarray[index].fileName);
         setImageinview(true);
     }
     const setcloseview=()=>
     {
       setImageinview(false);
     }
    return(
        <>
         { Imageinview && <ViewImage setview={setcloseview}/>}
         {!Imageinview && pvtarray.length!==0 &&
        <Grid container spacing={1}
                 sx={{position:'relative', marginTop:'5%'}}>
           {Object.keys(pvtarray).map((key, index) => 
                {                 
                 return(
                   <Grid item key={pvtarray[key].fileName} xs={12} sm={6} md={4} lg={3}>
                     <FormControl sx={{margin:'2px 6px 6px'}}>
                      
                       <RadioGroup  row
                                    onChange={()=>handlemodeChange(index)}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group">
                       <FormControlLabel value="public"
                                         control={<Radio size="small" />} 
                                         label="change to public" />       
                       </RadioGroup>
                     </FormControl>
                   
                       <Imagecard image={pvtarray[key].fileName} 
                                  typechk={pvtarray[key].multiChatFiles}
                                  cindex={index}
                                  expandimage={viewImage} />
                  </Grid>
                 )})}
          </Grid>
         }
            {!Imageinview && pvtarray.length===0 &&
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

export default PvtImages;