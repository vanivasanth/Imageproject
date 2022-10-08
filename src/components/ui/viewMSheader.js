import React,{useEffect,useRef} from "react";
//import { useSelector } from "react-redux/es/exports";

import {
     Box,
     Button,
     Stack,
     Typography
   } from '@mui/material';

const ViewMSheader=(props)=> {
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';

   
    const title=props.titleInfo;
    const shouldrender=useRef(true);
    const imageNames=props.files;
    console.log(imageNames)
    useEffect(()=>
    {
    if(shouldrender.current)
     {
       shouldrender.current=false;
      //  var fname=user.firstName;
      //  var lname=user.lastName;
      //  console.log('name'+fname+lname);
      //  var name='';
      //  if((fname===null) && (lname===null))
      //    {
      //      name='unknown user';
      //    }
      //  else if((fname===null) && (lname!==null))
      //    {
      //      name=lname;
      //    }
      //  else if((fname!==null) && (lname===null))
      //    {
      //       name=fname;
      //    }
      //  else if((fname!==null) && (lname!==null))
      //    {
      //      name=fname+' '+lname;
      //    }
      //    setuinfo(name);
     }},[])
     
     const gotohome= () => {
        const win=window.open("/", "_blank")
        win.focus();
      }
  
      function downloadAllimages()
      {
        for(let i=0;i<imageNames.length;i++)
        {
            const url = baseUrl+imageNames[i];
            fetch(url, {
                method: 'Get',
                headers: {},
              })
             .then((response) => {
              response.arrayBuffer().then(function (buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'image.jpg'); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
           })
         .catch((err) => {
                console.log(err);
          });
        }
       
      }
      
    return(
        <>
         <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               sx={{padding:'10px', 
                    marginBottom:'10px'}}
               spacing={2}>
           <Box>
            <Typography>Title:&emsp;{title}</Typography>
           
           </Box>
          
        </Stack>
        <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               sx={{marginBottom:'10px'}}
               spacing={2}>
          <Button  size='large'
                   onClick={gotohome}
                   variant="contained" 
                   component="label"
                   color="primary">      
             Go to MySnaps
         </Button>  
         <Button  size='large'
                 onClick={ downloadAllimages}
                 variant="contained" 
                 component="label"
                 color="primary">      
             Download All Images
         </Button>  
        </Stack>
        </>
       
    );
}

export default ViewMSheader;