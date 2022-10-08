import React,{ useState,useEffect, useRef,useContext } from "react";
import PropTypes from 'prop-types';
import PubImages from "./PubImages";
import PvtImages from "./PvtImages";
import Expired from "./Expired";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../ui/PageHeader";
import {
  Box,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
 } from '@mui/material';
 import { fetchMyImages } from "../../store/GetMyImagesSlice";
 import { ImgarrayContext } from "../../context/ImgArrCtx";

 function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

 
const Myuploads =() => {
  const dispatch=useDispatch();
  const ImageCtx = useContext(ImgarrayContext);
  
  const shouldrender=useRef(true);
  const datestring='fromdate=2022-06-01&todate='+moment().format('YYYY-MM-DD');
  const MyImages=useSelector((state)=>state.GetMyImages);
  console.log(MyImages);
  const Imagedata=MyImages.imagesArray;
  console.log(Imagedata);
  const [Imageinview, setImageinview]=useState(false);
  
  const [value, setValue] = useState(0);

  const handleChange = (event,newValue) => {  
       
      setValue(newValue);
    };
  
  const changetabhandler=()=>{
    dispatch(fetchMyImages(datestring)); 
    setValue(1);
  } 
  const changetabhandler1=()=>{
    dispatch(fetchMyImages(datestring)); 
    setValue(0);
  } 
  useEffect(()=>{
    if(shouldrender.current){
      shouldrender.current=false;
      dispatch(fetchMyImages(datestring)) 
    }     
    },[dispatch,datestring])

 
    return(
      <>
      <PageHeader/> 
       
       { MyImages.loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
        {!MyImages.loading && 
          MyImages.error? 
             <Box sx={{width:'70vw',
                       height:'30vw',
                       display: 'flex',
                       justifyContent:'center',
                       alignItems:'center'}}>       
                   {MyImages.error}
             </Box>:' '}
        {!Imageinview && 
         !MyImages.loading && !MyImages.error &&
          Imagedata.length!==0 &&
          <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'60px' }}>
               <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                     <Tab label="Private" {...a11yProps(0)} />
                     <Tab label="Public" {...a11yProps(1)} />
               </Tabs>
          </Box>
          <TabPanel value={value} index={0}>          
          <PvtImages images={Imagedata} changetab={changetabhandler}/>
              
           
          </TabPanel>
           <TabPanel value={value} index={1}>
             <PubImages images={Imagedata} changetab={changetabhandler1}/>
           </TabPanel>
           </>
        }
       {!Imageinview && 
        !MyImages.loading && 
        Imagedata.length===0 &&
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

export default Myuploads;