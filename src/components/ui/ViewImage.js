import React,{useContext,useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Stack,
  Box,
  CardMedia
 } from '@mui/material';
 import SocialIcons from './SocialIcons';
 import Sideview from './Sideview';
 import Imageinfo from "./Imageinfo";
 import Imageheader from './Imageheader';
 import { ImgarrayContext } from "../../context/ImgArrCtx";
 import { SingleImgContext } from "../../context/SingleImgCtx";
 import MultiImagetile from "./Multiimagetile";
 
const ViewImage=(props) => 
   {
     const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
     
     const ImageCtx = useContext(ImgarrayContext);
     const SingleCtx= useContext(SingleImgContext);
     const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
     const userid=useSelector((state)=>state.auth.userId);     
     const multiimagelist=SingleCtx.multiimagearray;

     useEffect(()=>

       {
          async function updateViews()
          {
            const headers = {
               'Authorization':'Bearer '+ localStorage.getItem('auth_token')
               };
            let formData={"fileName":ImageCtx.singlefilename}
                axios.post('https://mysnaps.cognitivemobile.net/service/updateUserViews',
               formData,{ headers })
             .then(response => {
                  console.log("response ", response)            
                  if(response.data.result_code===0)
                   {
                       console.log('added to views');
                   }
                  else
                  {
                     console.log(response.data.result_text);
                  }
               });       
          }
          async function getsinglefileDatanon()
            {
                
                 const geturl='https://mysnaps.cognitivemobile.net/service/getSingleFileDetails?filename=';
                 const url=geturl+ImageCtx.singlefilename;
                 const api= url;
                 const result=await fetch(api);
                 const getResult= await result.json();
                 updateViews();
                 SingleCtx.setImginfo(getResult);   
           }
           
           async function getsinglefileData()
           {               
                const geturl='https://mysnaps.cognitivemobile.net/service/getSingleFileDetails?filename=';
                const url=geturl+ImageCtx.singlefilename+'&userId='+userid;
                const api= url;
                const result=await fetch(api);
                const getResult= await result.json();
                updateViews();
                SingleCtx.setImginfo(getResult);   
           }
           
          if(loggedstatus===true)
             {
                  getsinglefileData();
             }
          else
             {
                getsinglefileDatanon();
             }
              
       },[SingleCtx.multifilechk,ImageCtx.singlefilename])

     const setimgview=()=> 
      {
        props.setview(false);
      }
    return(
      <>
      
  <Stack  direction={{ xs: 'column',sm:'column', md: 'row' }}
               sx={{width:'100%',position:'relative'}}
               spacing={{ xs: 1, sm: 2, md: 4 }}>
         
        <Box sx={{width:{xs:'100%', sm:'100%', md:'65%'}, position:'sticky',
                  height:'auto'}}>
          <Imageheader setviewimg={setimgview}/>          
           
              {SingleCtx.multifilechk===true?
                 <>
                 <MultiImagetile imagearray={multiimagelist}/>
                 </>:
                 <>                   
                     <Box sx={{height:'55vh', display:'flex', justifyContent:'center'}}>
                        <CardMedia   component="img"
                                     sx= {{objectFit:'contain'}}
                                     image={baseUrl+ImageCtx.singlefilename}
                                     alt="image"/>            
                     </Box>
                      
                  </> }
              
                 <SocialIcons type={SingleCtx.multifilechk}/>
                 <Imageinfo/>
        </Box>
       
          <Box sx={{width:{xs:'100%', sm:'100%', md:'24%'},
                   marginTop:{md:'10%',lg:'20%'}}}>
               <Sideview />
          </Box>

        
       </Stack>
      </>
      
    );
}
export default ViewImage;