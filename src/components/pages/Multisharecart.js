import React,{ useState,useContext} from "react";
import { MultiShareContext } from '../../context/Multishare-context';
import  { post } from 'axios';
import LinkIcon from '@mui/icons-material/Link';
import ClearIcon from '@mui/icons-material/Clear';
import { 
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ShareModal from "../modals/ShareModal";

const Multisharecart =() =>
 {
  const MultishareCtx = useContext(MultiShareContext);
  const [nameerror, setnameerror]=useState(false);
  const [sharemodel, setsharemodel]= useState(false);
  const [titlehelpertext, settitlehelpertext]=useState('Enter title');
  const socialshareurl= 'https://mysnaps.cognitivemobile.net/#/getSharedFiles/';
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  const shareimage=MultishareCtx.filename;
  const noofImages=MultishareCtx.totalImages;
  const [title, settitle]=useState('');

  const addtitle = (event) => 
   {
     settitle(event.target.value);
     MultishareCtx.settitle(event.target.value);
   }

  function Removefile(item)
  {
     MultishareCtx.removeImage(item)
  }

 const clearall = () => 
  {
     MultishareCtx.clearFilenames();
  }
 const socialshare = () => {
  var callapi=true;
   if(noofImages===0)
    {
      alert('Please include images');
      callapi=false;
    }
   if(title==='')
    {
      setnameerror(true);
      settitlehelpertext('Please Enter title');
      callapi=false;
    }
  const sharetitle =  title;
   if(callapi)
     {
       let data= {
             "title": sharetitle,
             "fileNames":shareimage
           }      
      const config = {
          headers: {
              'Authorization':'Bearer '+ localStorage.getItem('auth_token')
                  }
             }
        post("https://mysnaps.cognitivemobile.net/service/updateUserShareFiles",data,config)
        .then((response) => {
              console.log(response.data);
              if(response.data.result_code === 0)
               {
                  const result=response.data;
                  const getResult=result;
                  const getreference=getResult.sharedFiles;
                  const refnum=getreference.referenceNumber;
                  const expdate=getreference.expiredDate;
                  const tz=getreference.timezone;
                  let expirdate1=expdate.toString();
                  var exdate= expirdate1.slice(0, 11);
                  let tzne=tz.toString();
                  let strref=refnum.toString();
                  console.log('refnum of block',strref);
                  var userDetails=[];
                  userDetails.push({
                         'user':getreference.user
                  })
                  if(userDetails[0].user)
                  {
                   var fname=userDetails[0].user.firstName;
                   var lname=userDetails[0].user.lastName;
                   var name;
                   if((fname===null) && (lname===null))
                   {
                     name='unknown user';
                   }
                   else if((fname===null) && (lname!==null))
                   {
                     name=lname;
                   }
                   else if((fname!==null) && (lname===null))
                   {
                     name=fname;
                   }
                   else if((fname!==null) && (lname!==null))
                   {
                     name=fname+' '+lname;
                   }
                   MultishareCtx.setshareuser(name)
                  }
                  console.log(name);
                  const linkarg=socialshareurl+strref;
                 
                  const textToshare= name+' '+'shared images via MySnaps will remain upto'+ ' '+exdate+' '+tzne;
                
                  console.log(textToshare);
                 
                  MultishareCtx.setsharelink(linkarg);
                  MultishareCtx.setSharetext(textToshare);
                  setsharemodel(true);

                 // setshowbutton(false);
               }
              else
              {
                  alert(response.data.result_text);
              }
          })
  }
 
}  
 
const sharestate=()=>
{
  setsharemodel(false);
  MultishareCtx.clearFilenames();
}
    return(
       <>
        <Grid container>
       <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                            md: "block", 
                                            lg: "block" }}}>

       </Grid>
       
       <Grid item xs={12} sm={12} md={4} lg={4}>
      
        <Stack>
         <TextField id="outlined-basic" 
                    label="Enter title to share" 
                    variant="outlined"
                    name="inputfield"
                    helperText={titlehelpertext}
                    error={nameerror}
                    autoComplete="off"
                    onChange={addtitle}
                    value={title}/> 
        </Stack>
        <Stack spacing={2} direction="row" 
               sx={{justifyContent:'center', 
                    margin:'5px 0 0 0'}}>   
        <Button onClick={socialshare}
                variant="outlined" size="large"
                startIcon={<LinkIcon/>}  
                sx={{textTransform:'capitalize'}}>
                        Generate Link
        </Button>
        <Button onClick={clearall}
                variant="outlined" size="large"
                startIcon={<ClearIcon/>}  
                sx={{textTransform:'capitalize'}}>
                       Clear All
        </Button>
       </Stack>
       </Grid>
       <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                              md: "block", 
                                              lg: "block" }}}>
            

       </Grid>
     </Grid>
     <hr/>
       <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                            md: "block", 
                                            lg: "block" }}}>

       </Grid>
       
       <Grid item xs={12} sm={12} md={4} lg={4}>
        <Stack spacing={2}>
           <Typography variant="h5"
                       sx={{textAlign:'center', 
                            padding:{sm:'20 5'},
                            margin:'10px 0 10px 0' }}>
                   List of Images to share 
           </Typography>
        </Stack>
        </Grid>
        <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                              md: "block", 
                                              lg: "block" }}}>
            

        </Grid>
        { sharemodel &&
           <ShareModal state={sharemodel} setstate={sharestate}/>}
        { !sharemodel &&
                <Grid container spacing={1} sx={{position:'relative', marginTop:'5%'}}>   
                         { shareimage.map((item)=> 
                             {
                               return(
                                <Card sx={{ maxWidth: 300, margin:'10px'}}>
                                    <CardMedia component="img"

                                               height="194"
                                               sx={{objectFit:'contain'}}  
                                               image={baseUrl+item}
                                               alt="image"/>     
                                    <CardActions disableSpacing 
                                                 sx={{display:'flex', 
                                                      justifyContent:'center'}}>            
                                        <IconButton aria-label="view" 
                                                    onClick={()=>Removefile(item)}
                                                    sx={{color:'#3393FF'}}>
                                               <ClearIcon/>
                                       </IconButton>
                                    </CardActions>
                                </Card>
                                ); 
                            }) }
                </Grid>                  
        }  
               
       </>
    );
}

export default Multisharecart;