import React,{useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import  axios,{ post } from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import {  Box,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import img1 from '../../images/default_profile.webp';
const Registerandsigin =() => {
  let navigate=useNavigate();
  const dispatch = useDispatch();
  
  const [nameerror, setnameerror]=useState(false);
  const [emailfield, setemailfield] = useState(false); 
  const [emailhelpertext, setemailhelpertext]=useState('Enter valid e-Mail id');
  const [otp , setOtp] = useState(); 
  const [otpfs, setotpfs] = useState(true);  
  const [form, setForm] = useState({    
    inputfield: "",    
  })
  const [state, setState] = useState({
    countryCode: ""   
  });

 

  useEffect(() => {
    const getGeoInfo = () => {
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
  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  
  const getOTPhandler = () => {    
    
   var validfields=true;
  
   if(form.inputfield==='')
   {
    validfields=false;
    setnameerror(true);   
    setemailhelpertext('Enter e-mail or phone number');
   }
   if(validfields)
   {     
      let result = form.inputfield.includes("@");
      if(result)
      {
        setemailfield(true);
      let formData = {
        "email":form.inputfield,    
        "type":"web"    
      }   
      post("https://mysnaps.cognitivemobile.net/service/emailValidation", formData)
      .then((response) =>{
            if(response.data.result_code === 0)
               {
                  setotpfs(false);
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
            let mobilen=state.countryCode+form.inputfield;
            setForm({
                 ...form,
                 inputfield:mobilen,
               })
            let formData = {
              "mobileNo":mobilen, 
              "type":"web"         
            }   
            post("https://mysnaps.cognitivemobile.net/service/emailValidation", formData)
            .then((response) =>{
                  if(response.data.result_code === 0)
                     {
                        setotpfs(false);
                        alert(response.data.result_text);
                     }
                  else
                     {
                         alert(response.data.result_text);
                     }
                  })       
          }
     }    
   }
  
  const signformSubmissionHandler = (event) => {  
   
        if(emailfield)
        {
          let formData = {
                  "email":form.inputfield,                  
                  "otp":otp
                    }                    
            post("https://mysnaps.cognitivemobile.net/service/otpValidation", formData)
                  .then((response) =>{
                    if(response.data.result_code === 0)
                    {                        
                      localStorage.setItem('auth_token', response.data.auth_token);
                      localStorage.setItem('profileImage', response.data.user.profileImage);
                      localStorage.setItem('email', response.data.user.email);
                      localStorage.setItem('id', response.data.user.id);
                      localStorage.setItem('firstname', response.data.user.firstName);
                      localStorage.setItem('lastname', response.data.user.lastName);
                      localStorage.setItem('mobile' , response.data.user.mobileNo);
                      localStorage.setItem('gender', response.data.user.gender);
                      localStorage.setItem('dateofbirth',response.data.user.dateOfBirth);
                      localStorage.setItem('username',response.data.user.firstName+' '+response.data.user.lastName);
                      const image=localStorage.getItem('profileImage') ;                
                                          
                      if(image===null)
                      {
                       localStorage.setItem('profileImage',img1);
                      }
                       alert(response.data.result_text); 
                       dispatch(authActions.login());
                       form.inputfield="";
                       navigate('/');
                    }
                   else
                    {
                         alert(response.data.result_text);
                    }
                  })
        }
        else
        {
          let formData = {
            "mobileNo":form.inputfield,                  
            "otp":otp,           
              }
              post("https://mysnaps.cognitivemobile.net/service/otpValidation", formData)
              .then((response) =>{
                if(response.data.result_code === 0)
                {                              
                   localStorage.setItem('auth_token', response.data.auth_token);
                   localStorage.setItem('profileImage', response.data.user.profileImage);
                   localStorage.setItem('email', response.data.user.email);
                   localStorage.setItem('id', response.data.user.id);
                   localStorage.setItem('firstname', response.data.user.firstName);
                   localStorage.setItem('lastname', response.data.user.lastName);
                   localStorage.setItem('mobile' , response.data.user.mobileNo);
                   localStorage.setItem('gender', response.data.user.gender);
                   localStorage.setItem('dateofbirth',response.data.user.dateOfBirth);
                   localStorage.setItem('username',response.data.user.firstName+' '+response.data.user.lastName);
                   const image=localStorage.getItem('profileImage') ;
                   if(image===null)
                   {
                    localStorage.setItem('profileImage',img1);
                   }
                   alert(response.data.result_text); 
                   form.inputfield="";                                   
                }
               else
                {
                     alert(response.data.result_text);
                }
              })  
        }   
   
  }
    return(
     <Grid container>
       <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                            md: "block", 
                                            lg: "block" }}}>

       </Grid>
       
       <Grid item xs={12} sm={12} md={4} lg={4}>
         <Stack spacing={2}>   
         <Typography variant="h5"
                     sx={{textAlign:'center', 
                          padding:{sm:'20 5'},
                          marginTop:'50px' }}>
            Register/Login
        </Typography>
         <TextField id="outlined-basic" 
                    label="e-Mail or mobile number" 
                    variant="outlined"
                    name="inputfield"
                    helperText={emailhelpertext}
                    error={nameerror}
                    autoComplete="off"
                    onChange={updateForm}
                    value={form.inputfield}/>     
         <Box>
            <Button variant="outlined"
                    onClick={getOTPhandler}>Get OTP</Button>
         </Box>
          <TextField id="outlined-basic"
                     disabled={otpfs} 
                     variant="outlined"
                     label="OTP" 
                     onChange={e=>setOtp(e.target.value)}
                     value={otp}
                      />
         <Box>
            <Button  disabled={otpfs}
                     onClick={signformSubmissionHandler}
                     variant="outlined">Register/Login</Button>            
         </Box>
    
     </Stack>
       </Grid>
       <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                              md: "block", 
                                              lg: "block" }}}>

       </Grid>
     </Grid>
      
    );
}

export default Registerandsigin;