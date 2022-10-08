import React,{useState, useEffect, useRef} from "react";

import { post } from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { Box, 
  Button,
  LinearProgress,
  IconButton,
  ImageList,
  ImageListItem  ,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup, 
  Stack,
  Snackbar,
  TextField,
  Typography} from "@mui/material";
  import MuiAlert from '@mui/material/Alert';
  import GooglePlacesAutocomplete, {
    geocodeByAddress, getLatLng 
  } from "react-google-places-autocomplete";
  import CloseIcon from '@mui/icons-material/Close';
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Imageupload =() => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(10);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude]= useState('');
  const [longitude, setLongitude]= useState('');
  const [selectedMode, setSelectedMode]=useState('public'); 
  const [apiresult, setapiresult]=useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showselectedFiles, setshowSelectedFiles] = useState([]);

  const [form, setForm] = useState({
    category:"",
    remarks:"",
    caption:"",
    imageUploadedDate:moment().format('YYYY-MM-DD HH:mm:ss'),
    timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const updateForm = (e) =>
   {
    console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    
  }
  
  const handlemodeChange =(e) =>
   {
    setSelectedMode(e.target.value);
  }

  async function addressval(val) {
    geocodeByAddress(val.label)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) =>
       {
          setLatitude(lat);
          setLongitude(lng);
          console.log('lattitude',latitude);
          console.log('longitude',longitude);
          console.log('Successfully got latitude and longitude', { lat, lng })
       });
     setAddress(val.label);
     console.log(address);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);

  const navtomyuploads=()=>{
    navigate('/myuploads')
  }
    const uploadmultiImage =(event) =>
     {
       console.log(event.target.files);
       console.log(progress);
       const file=event.target.files;
       let imagefiles=[];
       for (var i = 0; i <file.length; i++) {
        imagefiles.push(event.target.files[i]);
      }
      console.log(imagefiles);
      let imagefiles2=[];
      imagefiles2=selectedFiles.concat(imagefiles);
      console.log('temp files2'+imagefiles2)
       setSelectedFiles(selectedFiles.concat(imagefiles));
       console.log(selectedFiles)
      let images=[];
       for (let i = 0; i < imagefiles2.length; i++) 
         {
            images.push(URL.createObjectURL(imagefiles2[i]))
         }
       console.log(images);
        setshowSelectedFiles(images);       
      
     }
  
     function removeimage(image, index)
     {      
       setSelectedFiles((prevshareImages1)=>
       {
         return prevshareImages1.filter((names, index1)=>index1 !== index);
       });
       setshowSelectedFiles((prevshareImages1)=>
       {
         return prevshareImages1.filter(names=>names !== image);
       });
     
       console.log(selectedFiles);
       console.log(showselectedFiles);
     }
  
    async function uploadSubmit(event) {
      
      event.preventDefault();
      
    if(selectedFiles&&(selectedFiles.length>0))
        { 
          let uniquenumber;        
          
          if(selectedFiles.length===1)
          {
             uniquenumber='';
          }
          else
          {
            let formatdate=moment().valueOf();
            console.log(formatdate);
            uniquenumber=formatdate;
          }
          let formData= new FormData();   
          selectedFiles.forEach((val)=> {
            formData.append('userfile',val); 
           })  
           let data = {
                 "category": form.category,
                 "remarks": form.remarks,
                 "userPrivacy": selectedMode,
                 "caption": form.caption,
                 "imageUploadedDate":form.imageUploadedDate,
                 "clienInfo":"web",
                 "uniquenIdentificationNumber": uniquenumber,
                 "timeZone":form.timeZone,
                 "location":{
                       'type': "Point",
                       'coordinates': [latitude, longitude],
                       'address':address,
                       'city': '',
                       'province': '',
                       'country':''
                             }
                      }
        formData.append('fileDetail', JSON.stringify(data));   
        console.log('formdata'+data)
        setapiresult(true);   
        const config={
         headers: {
           'content-type': 'multipart/form-data',
           'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         }
       }
      post('https://mysnaps.cognitivemobile.net/service/uploadFilesUser',  formData, config) 
       .then((response) => {
           console.log(response.data);
          
           if(response.data.result_code === 0) {
             setOpen(true);
             setapiresult(false); 
            
             
             //toasttext=  response.data.result_text;
             form.category="";
             form.remarks="";
             form.caption="";
             setSelectedMode('public');
             setAddress('');
             setTimeout(()=>{navtomyuploads()}, 3000);
           } 
           else
            {
              setapiresult(false); 
            }
       }, error=>{
        setapiresult(false); 
        alert(error);})
       
       }
      else
      {
        alert("Please select a file!");
        return ;
       }
    
    }
    
    return(
      <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Uploaded successfully!
        </Alert>
      </Snackbar>
      <Grid container>
       <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                            md: "block", 
                                            lg: "block" }}}>

       </Grid>
       
      
       <Grid item xs={12} sm={12} md={4} lg={4}>
       
       {
        (apiresult===true?
          <div>
             <Typography variant='h5' 
                         sx={{margin:'5px',
                              marginLeft:'100px',
                              marginBottom:'30px'}}>
                   Uploading of images in progress
             </Typography>
             <Box sx={{ width: '100%',
                        margin:'20px',
                        marginTop:'20%'}}>
                   <LinearProgress />
             </Box>
          </div>
          : 
         <Stack spacing={2}>    
         <Typography variant="h5" sx={{textAlign:'center', 
                                       padding:{sm:'20 5'},
                                       marginTop:'5px' }}>
              Upload Images
         </Typography>
         <Stack  spacing={1}>       
              <Box> 
                 <Stack direction="row">     
                 <ImageList sx={{ backgroundColor:'grey',                          
                                  height:'auto',
                                  margin:'10px',
                                  marginTop:'5px' }} cols={5} rowHeight={150}>
                 
                 { 
                      showselectedFiles.map((item, index)=>{
                  return( 
                    <ImageListItem sx={{ border:'1px solid white'}} key={{index}}>
                    <IconButton aria-label="remove" 
                                     onClick={()=>removeimage(item,index)}
                                     sx={{ position:'absolute',
                                          backgroundColor:'#A5A0A0', color:'white'}}>
                               <CloseIcon/>
                         </IconButton> 
                            <img src={item}          
                                 style={{objectFit:'cover'}}          
                                 alt='selectedimage'
                                 loading="lazy"/>
                    </ImageListItem>
                ) } ) }  
                  </ImageList>      
                  
           </Stack>
         </Box> 
        </Stack>
        <Box sx={{width:'100%'}}>        
         <Stack direction="row" sx={{margin:'15px'}}>         
         <Box width='200px'>       
           <Button   sx={{textAlign:'center'}}
                     variant="outlined" component="label" color="primary">      
                 Select and preview images
                 <input type="file" hidden                        
                        accept="image/*"
                        multiple
                        onChange={uploadmultiImage}
                        ref={inputRef} />
           </Button>         
       
         </Box>
         <Box sx={{margin:'0px', marginLeft:'30px'}}>
        <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group-label">
                     Mode of upload
              </FormLabel>
              <RadioGroup row
                          aria-labelledby="demo-controlled-radio-buttons-group-label"
                          name="radio-buttons-group"
                          value={selectedMode}
                          onChange={handlemodeChange}>
              <FormControlLabel value="public"
                                control={<Radio />} 
                                label="public" />
              <FormControlLabel value="private" 
                                control={<Radio />}
                                label="private" />      
         </RadioGroup>
         </FormControl>
         </Box>
       
         </Stack>
        
         <Stack spacing={2}sx={{margin:'10px',}}>
         
        
        <TextField id="outlined-basic" 
                    name='caption'
                    label="Caption" 
                    variant="outlined"  
                    onChange={updateForm}
                    value={form.caption}                 
                    autoComplete="off"
                   />
      
       

       <TextField id="outlined-basic" 
                    label="Category" 
                    variant="outlined"                   
                    autoComplete="off"
                    name='category'
                    onChange={updateForm}
                    value={form.category}
                   />
    
       <TextField id="outlined-basic"
                    label="Remarks" 
                    variant="outlined"                    
                    autoComplete="off"
                    name='remarks'
                    onChange={updateForm}
                    value={form.remarks}/>
        
        <GooglePlacesAutocomplete
            apiKey="AIzaSyCTK07AppZAiE0nxsrCtgjK37aGiwv-dqc"
            selectProps={{
              isClearable: true,
              placeholder: 'Select Location',
              address,
              onChange: (val) => {
                 setAddress(val)
                 console.log('location value',val);
                addressval(val);                
              }
            }}
          />
        
         </Stack>
         <Box sx={{marginLeft:'20px'}}>
        <Button  size='large'
                 onClick={uploadSubmit}
                 variant="contained" 
                 component="label"
                 color="primary">      
             Submit
        </Button>  
         </Box>
         </Box>
      
         </Stack>)}
       </Grid>
       <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                              md: "block", 
                                              lg: "block" }}}>

       </Grid>
     </Grid>
     </>
    );
}

export default Imageupload;