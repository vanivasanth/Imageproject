import React,{useContext} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  CardMedia
 } from '@mui/material';
 import { ImgarrayContext } from "../../context/ImgArrCtx";
 import { SingleImgContext } from "../../context/SingleImgCtx";
 //import { AddPhotoAlternateIcon } from '@mui/icons-material';
 
const Sideimagecard =(props)=>
 {
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  let imgsrc=props.image;
  const ImageCtx = useContext(ImgarrayContext);
  const SingleCtx= useContext(SingleImgContext);
  const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
  const userid=useSelector((state)=>state.auth.userId); 
  async function updateViews()
  {
    const headers = {
      'Authorization':'Bearer '+ localStorage.getItem('auth_token')
      };
    let formData={"fileName":ImageCtx.singlefilename}
        axios.post('https://mysnaps.cognitivemobile.net/service/updateUserViews',
       formData, { headers })
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
  const viewimg=()=>
  {
    ImageCtx.setcurrentindex(props.cindex);
    ImageCtx.setsinglefilename(props.image);
    ImageCtx.setcommentsforfname(props.image);  
    if(loggedstatus===true)
      {            
        getsinglefileData();
      }
      else
      {
        getsinglefileDatanon(); 
      }
  }
 
    return(
      <div>
      
       <Card sx={{ margin:'0 5px 5px 0'}}>
           <CardMedia component="img"
                      height="194"
                      sx={{cursor:'pointer'}}                      
                      onClick={viewimg}
                      image={baseUrl+imgsrc}
                      alt="image"/>     
          
       </Card>
       </div>
    );
}

export default Sideimagecard;