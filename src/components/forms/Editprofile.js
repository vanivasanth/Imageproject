
import {
  Box,
  Card,
  CardActions,
 
  Grid,
  Typography,
  Button,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField } from "@mui/material";

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import PublishIcon from '@mui/icons-material/Publish';
import React,{ useState,useRef, useEffect} from "react";
import  axios,{ post } from 'axios';
import img1 from '../../images/default_profile.webp';
const Editprofile = () =>
{
  
  const inputRef = useRef();
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/user/';
  const [fname, setfname]= useState('');
  const [lname, setlname]= useState('');
  const [dob, setdob]= useState('');
  const [otp,setotp]=useState('');
  const [otpfs, setotpfs]=useState(true);
  const [otpenable, setotpenable]= useState(false);
  const [email, setemail]= useState('');
  const [mobile, setmobile]= useState('');
  const [emailchange, setemailchange]= useState(false);
  const [mobilechange, setmobilechange]=useState(false);
  const [selectedgender, setselectedgender]=useState('');
  const [profileimage,setprofileimage]= useState(img1);
  const [showimage, setshowimage]=useState(img1);
  
  const token=localStorage.getItem('auth_token');
  const firstname=localStorage.getItem('firstname');
  const lastname=localStorage.getItem('lastname');
  const dateofbir=localStorage.getItem('dateofbirth');
  const gender=localStorage.getItem('gender');
  const profile=localStorage.getItem('profileImage');
  const emaillocal=localStorage.getItem('email');
  const mobilenum=localStorage.getItem('mobile');
  const [state, setState] = useState({
    countryCode: ""   
  });
  const nullcheck = () => {
    if(firstname!=='null')
   {
    setfname(firstname);
    console.log(fname)
   }
   if(lastname!=='null')
   {
    setlname(lastname);
    console.log(lname)
   }
   if(dateofbir!=='null')
   {
    setdob(dateofbir);
    console.log(dob)
   }
   if(gender!=='null')
   {
    setselectedgender(gender);
    console.log(selectedgender)
   }
   if(profile!=='null')
   {
       setprofileimage(profile);
       setshowimage(baseUrl+profile);
       console.log(showimage)
   }
   else if(profile==='null')
   {
    setshowimage(img1);
    console.log(showimage);
   }
   if(emaillocal!=='null')
   {
    let result = emaillocal.includes("@");   
    if(result)
    {
      setemail(emaillocal);
      setemailchange(true); 
    }
    else
    {
      setemailchange(false);
    }    
   }
  else
   {
    setemailchange(false);   
   }
   if(mobilenum!=='null')
   {
    setmobile(mobilenum);
    setmobilechange(true);
   }
   else
   {   
    setmobilechange(false);
   }
   if(mobilechange || emailchange)
   {
     setotpenable(true);
   }
  }
  
  useEffect(()=> {
    const getGeoInfo = () => {
      nullcheck();
      axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          let data = response.data;
          setState({
            ...state,
            countryCode: data.country_calling_code,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getGeoInfo();       
                 
   },[state]);

   const fnamechangehandler = (event) => 
   {
    setfname(event.target.value);
   }
   const lnamechangehandler = (event) => 
   {
    setlname(event.target.value);
   }
   const dobchangehandler= (event) =>
    {
     setdob(event.target.value);
    }
   const genderhandler = (e) => {
    setselectedgender(e.target.value);
    console.log(selectedgender);
   }

   const otpchangehandler=(e) =>
   {
     setotp(e.target.value)
   }
   
    const emailchangehandler = (e) =>{
      setemail(e.target.value);
    }

    const mobilechangehandler = (e) => {
      setmobile(e.target.value);
    }
   const changeprofileimage =(event) => {
    
    const file = event.target.files[0];
    setprofileimage(file);
    const reader = new FileReader();
    reader.onload = () =>{
        if(reader.readyState === 2){
          setshowimage(reader.result)
           }
     }
   reader.readAsDataURL(event.target.files[0])
   }
   const otpHandler=() => {
    setotpfs(false);
      if(!emailchange)
      {
        let formData = {
          "email":email, 
          "type" :"web" 
        }   
        post("https://mysnaps.cognitivemobile.net/service/emailValidation", formData)
        .then((response) =>{
              if(response.data.result_code === 0)
                 {                   
                    alert(response.data.result_text);
                 }
              else
                 {
                     alert(response.data.result_text);
                 }
              })
      }
      else
      {
        let mobilen=state.countryCode+mobile;
       
        let formData = {
          "mobileNo":mobilen,
          "type":"web" 
        }   
        post("https://mysnaps.cognitivemobile.net/service/emailValidation", formData)
        .then((response) =>{
              if(response.data.result_code === 0)
                 {                    
                    alert(response.data.result_text);
                 }
              else
                 {
                     alert(response.data.result_text);
                 }
              })          
      }
   }
   const submitprofile =() => {

    if((!emailchange || !mobilechange) && otp==='')
    {
      alert('Enter OTP');
      return;
    }

     if(profileimage!==img1 && profile==='null')
     {
        if(!emailchange && (email!==' ' || email!=='null')&& otp!=='')
         {
          let data = {
            "firstName":fname,
            "lastName":lname,
            "gender":selectedgender,
            "dateOfBirth":dob,
            "email":email,
            "otp":otp
            }
           let formData = new FormData();
           formData.append('file',profileimage);
           formData.append('userdata', JSON.stringify(data));
           const config={
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer '+token
            }
          }
          post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
          .then((response) => {
              console.log(response.data);
              if(response.data.result_code === 0)
               {               
                alert(response.data.result_text); 
         //       history.push('/Editprofile')
               } 
              else
               {
                alert(response.data.result_text); 
               }
          })
          
         }


        if(!mobilechange && (mobile!==' ' || mobile!=='null') && otp!=='')
         {
          let mobilen=state.countryCode+mobile; 
          let data = {
            "firstName":fname,
            "lastName":lname,
            "gender":selectedgender,
            "dateOfBirth":dob,
            "mobileNo":mobilen,
            "otp":otp
            }
           
           let formData = new FormData();
           formData.append('file',profileimage);
           formData.append('userdata', JSON.stringify(data));
           const config={
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer '+token
            }
          }
          post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
          .then((response) => {
              console.log(response.data);
              if(response.data.result_code === 0)
               {               
                alert(response.data.result_text); 
           //     history.push('/Editprofile')
               } 
              else
               {
                alert(response.data.result_text); 
               }
          })
          
         }


        else
         {
          let data = {
            "firstName":fname,
            "lastName":lname,
            "gender":selectedgender,
            "dateOfBirth":dob            
            }           
           let formData = new FormData();
           formData.append('file',profileimage);
           formData.append('userdata', JSON.stringify(data));
           const config={
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer '+token
            }
          }
          post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
          .then((response) => {
              console.log(response.data);
              if(response.data.result_code === 0)
               {               
                alert(response.data.result_text); 
              //  history.push('/Editprofile')
               } 
              else
               {
                alert(response.data.result_text); 
               }
          })
          
         }
    }
    else
    {
      if(!emailchange && (email!==' ' || email!=='null') && otp!=='')
      {
       let data = {
         "firstName":fname,
         "lastName":lname,
         "gender":selectedgender,
         "dateOfBirth":dob,
         "email":email,
         "otp":otp
         }        
        let formData = new FormData();            
        formData.append('userdata', JSON.stringify(data));
        const config={
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer '+token
          }
        }
        post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
        .then((response) => {
            console.log(response.data);
            if(response.data.result_code === 0)
             {               
              alert(response.data.result_text); 
              //history.push('/Editprofile')
             } 
            else
             {
              alert(response.data.result_text); 
             }
        })        
      }


     if(!mobilechange && (mobile!==' ' || mobile!=='null') && otp!=='')
      {
        let mobilen=state.countryCode+mobile; 
       let data = {
         "firstName":fname,
         "lastName":lname,
         "gender":selectedgender,
         "dateOfBirth":dob,
         "mobileNo":mobilen,
         "otp":otp
         }
        let formData = new FormData();  
              
        formData.append('userdata', JSON.stringify(data));
        const config={
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer '+token
          }
        }
        post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
        .then((response) => {
            console.log(response.data);
            if(response.data.result_code === 0)
             {               
              alert(response.data.result_text); 
          //    history.push('/Editprofile')
             } 
            else
             {
              alert(response.data.result_text); 
             }
        })        
      }
     else
      {
       let data = {
         "firstName":fname,
         "lastName":lname,
         "gender":selectedgender,
         "dateOfBirth":dob           
         }           
        let formData = new FormData();     
           
        formData.append('userdata', JSON.stringify(data));
        const config={
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer '+token
          }
        }
        post('https://mysnaps.cognitivemobile.net/service/updateUserProfile', formData, config) 
        .then((response) => {
            console.log(response.data);
            if(response.data.result_code === 0)
             {               
              alert(response.data.result_text); 
             // history.push('/Editprofile')
             } 
            else
             {
              alert(response.data.result_text); 
             }
        })
        
      }
    }
   }
    return(
      <Grid container>
      <Grid item sm={1} md={3} lg={3} sx={{display:{   sm: "none",
                                           md: "block", 
                                           lg: "block" }}}>

      </Grid>
      
      <Grid item xs={12} sm={12} md={4} lg={7}>
        <Stack spacing={2}>    
        <Typography variant="h5" sx={{textAlign:'center', padding:'0 10px',
                                      marginTop:'50px',marginBottom:'30px' }}>
              Edit Profile
        </Typography>
        </Stack>
        <Stack direction={{sx:"column",md:"row"}}>
          <Box sx={{width:'100%', display:'flex',justifyContent:'center'}}>
          <Card sx={{height:'82%'}}>
                 <CardMedia sx={{objectFit:'contain'}}
                            component='img'
                            height='240'
                            image={showimage}
                            alt='profile image'/>
                 <CardActions sx={{alignItems:'center'}}>
                   <Button  variant="text"
                           htmlFor="contained-button-file"
                           startIcon={<PhotoCameraIcon/>}                         
                           component="label"
                           color="primary">      
                            Change photo
                       <input type="file" 
                              id="contained-button-file"
                              ref={inputRef}
                              onChange={changeprofileimage}
                              accept="image/*"
                              hidden />
                    </Button>          
                 </CardActions>
              </Card>
          </Box>
          <Box sx={{marginLeft:'50px'}}>
                <Stack direction="row" 
                       sx={{marginBottom:'10px'}}
                       spacing={.5} >
                  <Box>
                  <TextField  sx={{width:'300px',margin:'5px'}}
                              id="outlined-basic" 
                              label="Firstname" 
                              variant="outlined"
                              name="fname"
                              onChange={fnamechangehandler}
                              value={fname}
                              autoComplete="off"/>
                  </Box>
                  <Box >
                  <TextField  sx={{width:'300px',margin:'5px'}}
                    id="outlined-basic" 
                    label="e-Mail ID" 
                    variant="outlined"
                    name="email"
                    onChange={emailchangehandler}
                    disabled={emailchange}
                    value={email}
                    autoComplete="off"/>
                  </Box>
                </Stack>
                <Stack direction="row" 
                       sx={{marginBottom:'10px'}}
                       spacing={.5} >
                  <Box >
                  <TextField  sx={{width:'300px', margin:'5px'}}
                              id="outlined-basic" 
                              label="Lastname" 
                              variant="outlined"
                              name="lname"
                              onChange={lnamechangehandler}
                              value={lname}
                              autoComplete="off"/>
                 
                  </Box>
                  <Box >
                  <TextField sx={{width:'300px', margin:'5px'}}
                    id="outlined-basic" 
                    label="MobileNo" 
                    variant="outlined"
                    name="MobileNo"
                    value={mobile}
                    onChange={mobilechangehandler}
                    disabled={mobilechange}
                    autoComplete="off"/>
                  </Box>

                </Stack>
                <Stack direction="row" 
                       sx={{marginBottom:'10px'}}
                       spacing={.5} >
                  <Box>
                  <TextField  id="date"
                              label="Date of Birth"
                              type="date"                           
                              onChange={dobchangehandler}
                              value={dob}
                              sx={{width:'300px',margin:'5px'}}
                              InputLabelProps={{
                                   shrink: true,
                              }}/>
                   
                  </Box>
                  <Box >
                  <Button sx={{margin:'5px',width:'300px',height:'55px'}}
                          variant="outlined"
                          disabled={otpenable}
                          onClick={otpHandler}
                          component="label"
                          color="primary"> 
                        Get OTP
                  </Button>                 
                  </Box>
                </Stack>
                <Stack direction="row" spacing={.5} >
                  <Box>       
                  <FormControl  sx={{width:'300px',margin:'5px'}}>
                   <FormLabel id="demo-controlled-radio-buttons-group-label">
                        Gender
                   </FormLabel>
                   <RadioGroup row
                               aria-labelledby="demo-controlled-radio-buttons-group-label"
                               name="radio-buttons-group"  
                               defaultValue={selectedgender}                             
                               value={selectedgender}
                               onChange={genderhandler}>
                   <FormControlLabel value="male"
                                     control={<Radio />} 
                                     label="male" />
                   <FormControlLabel  value="female" 
                                      control={<Radio />}
                                      label="female" />      
         </RadioGroup>
         </FormControl>
                  </Box>
                  <Box sx={{margin:'0px', marginLeft:'70px'}}>
                  
         <TextField  sx={{width:'300px',margin:'5px'}}
                     id="outlined-basic" 
                     label="OTP" 
                     variant="outlined"
                     name="fname"
                     onChange={otpchangehandler}
                     value={otp} 
                     disabled={otpfs}
                     autoComplete="off"/>
         </Box>
       
                </Stack>
                <Stack direction="row" 
                       sx={{marginBottom:'10px',
                            marginTop:'20px',
                            marginLeft:'200px'}}
                       spacing={5} >              
                  <Box >
                  <Button size="large" 
                          onClick={submitprofile}
                          variant="contained"
                           startIcon={<PublishIcon/>}>
                            Submit
                  </Button>
                  </Box>
                </Stack>
               </Box>          
        </Stack>
      </Grid>
      <Grid item md={3} lg={2} sx={{display:{sm: "none",
                                             md: "block", 
                                             lg: "block" }}}>

      </Grid>
    </Grid>
    );
}

export default Editprofile;