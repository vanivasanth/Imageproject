import React,{useState,useContext} from "react";
import SearchIcon from '@mui/icons-material/Search';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import {  
    Box,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    TextField,
    Stack,
    Typography,
  } from "@mui/material";

const Search =() => {

  let navigate=useNavigate();
  const [gensearch, setgensearch]=useState('');
  let datestring=moment().format('YYYY-MM-DD');
  const ImageCtx = useContext(ImgarrayContext);
  const [form, setForm] = useState({
    category:"",
    remarks:"",
    caption:"",
    fromDate:"",
    toDate:"",
  });

  const updateForm = (e) =>
   {
    console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })  
  }

  const genSearchvalue=(event)=>
  {
    setgensearch(event.target.value);
  }

  const genSearchHandler=()=>
  {
    if(gensearch===null||gensearch==='')
    {
      alert('Enter search field');
    }
    else
    {
    const query='category='+ gensearch+'&caption='+gensearch+'&remarks='+ gensearch+'&fromdate=2022-06-01&todate='+datestring;
    ImageCtx.setsearchtext(query)
    navigate('/searchres');
    }
  }

  const advSearchHandler=()=>
  {
    let datestr;
    if((form.caption===null || form.caption==='') && 
       (form.remarks===null || form.remarks==='') && 
       (form.category===null || form.category==='')&& 
       (form.fromDate===null ||form.fromDate==='')&&
       (form.toDate===null || form.toDate===''))
      {
         alert('Enter values for search')
         return;
      }
     if(form.caption===null|| form.caption===''){
           setForm({
                 ...form,
             caption: 'nodata',
      })  
           
      }
     if(form.remarks===null||form.remarks===''){
           setForm({
                   ...form,
                  remarks: 'nodata',
                })  
      }
     if(form.category===null|| form.category===''){
            setForm({
                    ...form,
                     category: 'nodata',
                })  
       }
       if( form.fromDate==='' && form.toDate===''){      
          datestr='fromdate=2022-06-01&todate='+datestring;
       }
       if(form.fromDate!==''&& form.toDate!=='')
       {
         datestr='fromdate='+form.fromDate+'&todate='+form.toDate;
       }
       if(form.fromDate!==''&& form.toDate==='')
       {
        datestr='fromdate='+form.fromDate+'&todate='+form.toDate;
       }
       if(form.fromDate===''&& form.toDate!=='')
       {
        datestr='fromdate=2022-06-01'+'&todate='+form.toDate;
       }
       const query='category='+form.category+'&caption='+form.caption+'&remarks='+form.remarks+'&';
       let str=query+datestr
       ImageCtx.setsearchtext(str);
       navigate('/advsearchres');
  }
    return(
        <Grid container>
        <Grid item sm={1} md={2} lg={3} sx={{display:{sm: "block",
                                             md: "block", 
                                             lg: "block" }}}>
 
        </Grid>
        
        <Grid item xs={12} sm={12} md={8} lg={6}>
           <Stack>
               <Typography sx={{fontSize:'20px',
                                margin:'20px'}}>
                      Search Images
               </Typography>
          </Stack>
        
             <Stack direction="row"
                    sx={{marginBottom:'10px'}}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}>
                    <TextField id="outlined-basic" 
                               sx={{width:'80%'}}
                               label="Enter your search keyword" 
                               variant="outlined"
                               name="inputfield"
                               onChange={genSearchvalue}
                               value={gensearch}/>
                    <Button variant="contained" 
                            onClick={genSearchHandler}
                            startIcon={<SearchIcon/>}
                            size="large">
                             search
                    </Button>
             </Stack>
       
      <Accordion>
           <AccordionSummary expandIcon={<ExpandMoreIcon />}
                             aria-controls="panel1a-content"
                             id="panel1a-header">
                   <Typography>Advanced Search</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Stack>            
                 <Box sx={{display:'flex',}}>
                    <TextField id="outlined-basic" 
                               sx={{width:'70%', margin:'10px 5px 10px 5px'}}
                               label="Category" 
                               variant="outlined"
                               name="category"
                               onChange={updateForm}
                               value={form.category}/>
                    <TextField id="outlined-basic" 
                               sx={{width:'70%',  margin:'10px 5px 10px 5px'}}
                               label="Caption" 
                               variant="outlined"
                               name="caption"
                               onChange={updateForm}
                               value={form.caption}/>
                 </Box>
                 <Box>
                      <TextField id="outlined-basic" 
                                 sx={{width:'98%',  margin:'10px 0 10px 0'}}
                                 label="Remarks" 
                                 variant="outlined"
                                 name="remarks"
                                 onChange={updateForm}
                                 value={form.remarks}/>
                 </Box>
           
                 <Box sx={{margin:'10px 0 10px 0'}}>
                   <TextField  id="date"
                               label="From date"
                               name="fromDate"
                               type="date"                           
                               sx={{width:'48%', margin:'6px'}}
                               onChange={updateForm}
                               value={form.fromDate}
                               InputLabelProps={{
                                       shrink: true,
                                }}/>
                   <TextField  id="date"
                              label="To date"
                              name="toDate"
                              type="date"  
                              onChange={updateForm}
                              value={form.toDate}                         
                              sx={{width:'47%', margin:'6px'}}
                              InputLabelProps={{
                                   shrink: true,
                               }}/>
                 </Box>
                 <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                 <Button variant="contained" 
                         onClick={advSearchHandler}
                         startIcon={<ManageSearchIcon/>}
                         size="large">
                             search
                    </Button>
                 </Box>
               </Stack>
           </AccordionDetails>
      </Accordion>    
         
       
       
        </Grid>
        <Grid item md={2} lg={3} sx={{display:{sm: "block",
                                               md: "block", 
                                               lg: "block" }}}>
 
        </Grid>
      </Grid>
        
    );
}

export default Search;