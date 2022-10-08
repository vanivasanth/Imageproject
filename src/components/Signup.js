import './signup.css';
//import Modal from "./Modal";
//import Userprofile from './Userprofile';
import {  Box,
          Button,
          IconButton,
          Grid,
          Typography,
          TextField,
          Stack
        } from "@mui/material";
import img1 from '../images/default_profile.webp';
import { useState, useEffect,useContext } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import  axios,{ post } from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();  
  const [nameerror, setnameerror]=useState(false);
  const [emailfield, setemailfield] = useState(false);
  //const [mobilefield, setmobilefield]= useState(false);
  //const [namehelpertext, setnamehelpertext]=useState('');
  const [emailhelpertext, setemailhelpertext]=useState('Enter Mobile Number / E-mail ID');
  //const [mobilehelpertext, setmobilehelpertext]=useState('Enter valid mobilenumber');
  // const [otptomail, setotptomail] = useState(false);
  // const [otptomobile, setotptomobile] = useState(false);
  const [otp , setOtp] = useState();
  //const [data, setData] = useState([]);  
  const [otpfs, setotpfs] = useState(true);  
  const controller= new AbortController();
  const signal=controller.signal;
  const [version, setversion] =useState('');
  const [apkname, setapkname] = useState(' ');
  const baseUrl='https://www2.executesimple.com/uploads/highmessaging/blog/';
  var versionno;
  var name;
  // const MultishareCtx = useContext(MultiShareContext);
  async function getApkDetails()
  {
    const api=`https://www2.executesimple.com/getAndroidVersionDetails`;
    const result=await fetch(api,{signal:signal});
    const getResult= await result.json();
    console.log(getResult);
    const data=getResult.version
      setversion(data.apkVersionNo);
      versionno=data.apkVersionNo;
      setapkname(data.apkName);
      name=data.apkName;
    
    console.log(data.apkVersionNo);
  
    console.log(data.apkName);
  }
  const downloadapk = async()=> {
//apkname
alert('allow to download file');
const url = baseUrl+apkname;
fetch(url, {
    method: 'Get',
    headers: {},
  })
 .then((response) => {
  response.arrayBuffer().then(function (buffer) {
  const url = window.URL.createObjectURL(new Blob([buffer]));
  const link = document.createElement('a');
  link.href = url;
  link.download='MySnaps.apk'; //or any other extension
  document.body.appendChild(link);
  link.click();
});
})
.catch((err) => {
    alert(err);
});
  }
  const [form, setForm] = useState({    
    inputfield: "",    
  })
  const [state, setState] = useState({
    countryCode: ""   
  });

  const getGeoInfo = () => {
    getApkDetails();
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

  useEffect(() => {
    let isApiSubscribed = true;
    getGeoInfo();
    return()=>{
      isApiSubscribed = false;
    }
  }, []);
  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  
  const getOTPhandler = () => {    
    
   var validfields=true;
  //  if(form.fname===''||form.fname===null)
  //  {
  //   setnameerror(true);
  //   setnamehelpertext('Enter your name');
  //   validfields=false;
  //  }
   if(form.inputfield==='')
   {
    validfields=false;
    setnameerror(true);
    //setmobileerror(true);
    setemailhelpertext('Enter e-mail or phone number');
   // setmobilehelpertext('Enter e-mail or phone number');
   }
  // const valid=isvalidnumber(form.mobile);   
  //  let mobilen=state.countryCode+form.mobile;
    
  //  setForm({
  //    ...form,
  //    mobile:mobilen,
  //  })
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
      post("https://www2.executesimple.com/emailValidation", formData)
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
            post("https://www2.executesimple.com/emailValidation", formData)
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
            post("https://www2.executesimple.com/otpValidation", formData)
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
                      //  alert(response.data.result_text); 
                      
                       form.inputfield="";
                       history.push('/Allsnaps');
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
              post("https://www2.executesimple.com/otpValidation", formData)
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
                   history.push('/Allsnaps');
                }
               else
                {
                     alert(response.data.result_text);
                }
              })  
        }   
   
  }
  
  const backtohome= () => {
    history.push('/')
   }
  return (
    <div className='signup'>
      
   
     <Grid container spacing={2}>
      <Grid item sm={1} 
                 md={3} lg={4} sx={{display:{   sm: "none",
                                           md: "block", 
                                           lg: "block" }}}>

      </Grid>
      
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{padding:{ sm:'10px 10px',
                                                              md:'10px 10px'
                                                              },
                                                    margin:'10px'}}>
        <Stack direction='row' sx={{display:'flex',
                                  margin:'5px',
                                  justifyContent:'space-between'}}>
        <Box>
          <IconButton aria-label="back" 
                      variant="outlined"
                      onClick={backtohome}
                    sx={{color:'#3393FF'}}>
             <ArrowBackIcon/>
         </IconButton>
        </Box>
        <Box>
          <Button size="large" 
                  onClick={downloadapk}
                  variant="contained"
                  startIcon={<DownloadIcon/>}>
                   Download APK:{version}
          </Button>
        </Box>
      </Stack>
        <Stack spacing={2}>    
        <Typography variant="h5" sx={{textAlign:'center', padding:'10px 10px',
                                      marginTop:'50px' }}>
              Register/Login
        </Typography>
        <TextField id="outlined-basic" 
                   label="Enter Mobile Number / E-mail ID" 
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
      <Grid item md={3} lg={4} sx={{display:{sm: "none",
                                             md: "block", 
                                             lg: "block" }}}>

      </Grid>
      </Grid>
       
      </div> 
);
}

export default Signup;