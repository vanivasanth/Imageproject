import './userprofile.css';
import Sidebarmodal from './Sidebarmodal';
import CommentModal from './CommentModal';
//import DelModal from './DelModal';
import PropTypes from 'prop-types';
import axios,{post} from 'axios';
import {useState, useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { MultiShareContext } from '../context/Multishare-context';
import EditIcon from '@mui/icons-material/Edit';

import Imageinfo from './Imageinfo';
//import Modal from "./Imageupload";

// import { BsFacebook } from "react-icons/bs";
// import { BsLinkedin } from "react-icons/bs";
// import { BsTwitter } from "react-icons/bs";
//import { BsInstagram } from "react-icons/bs";
import { BsSkype } from "react-icons/bs";
import MultiImagetile from './Multiimagetile';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Searchresults from './Searchresults';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MmsIcon from '@mui/icons-material/Mms';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
//import PersonIcon from '@mui/icons-material/Person';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  FacebookIcon, 
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
 } from "react-share";
import {
 //EmailShareButton,
 FacebookShareButton,
 // HatenaShareButton,
 // InstapaperShareButton,
 // LineShareButton,
 LinkedinShareButton,
 // LivejournalShareButton,
 // MailruShareButton,
 // OKShareButton,
 // PinterestShareButton,
 // PocketShareButton,
 // RedditShareButton,
 // TelegramShareButton,
 // TumblrShareButton,
 TwitterShareButton,
 // ViberShareButton,
 // VKShareButton,
 WhatsappShareButton,
// WorkplaceShareButton
} from "react-share";
import {
  Button,
  Container,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
}
from '@mui/material';

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
        <Box sx={{ p: 3 }}>
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

const Userprofile = () =>
{
   // let location = useLocation();
   
  //  const [refreshchk, setrefreshchk]= useState('');
  //  const [refreshchkDate, setrefreshchkDate]=useState('');
    const MultishareCtx = useContext(MultiShareContext);
    const shareimage=MultishareCtx.filename;
    const [searchtext, setSearchtext]= useState('');
    const [gotosearch, setgotosearch]= useState(false);
    const [dialogopen, setdialogOpen]= useState(false);
    const [sdata, setsdata]=useState('');
    const history = useHistory(); 
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
    const [createdTime, setcreatedTime]=useState('');
    const [selectedmode, setselectedmode]=useState('');
    const [textOnImage, settextOnImage]=useState('');
    const [model, setModel] = useState(false);
    const [viewimgsrc, setviewimgsrc]= useState('');
    const [loading, setloading]=useState(false);
   // const [current, setCurrent] = useState(0);
    const [imgfullscreen, setimgfullscreen ] = useState(false);
    //const [currentobj, setcurrentobj]= useState();
    const [objLength, setobjectLength]= useState(true);    
    const [shareactive,setshareactive]= useState(false);
    //const [todelete, settodelete]= useState();
    const [category,setCategory]=useState('');
    const [caption,setCaption]=useState('');
    const [remarks, setRemarks]= useState('');
    const [userInfo,setuserInfo]=useState('');
    const [viewinfo, setviewInfo]=useState(false);
    const [showPrev, setshowPrev]= useState(true);
    const [showNext, setshowNext]= useState(true);
    const [favcount, setfavcount]= useState(0);
    const [viewscount, setviewscount]= useState(0);
    const [likescount, setLikescount]= useState(0);
    const [commentscount, setCommentsCount]= useState(0);
    const [phoneNo, setphoneNo]= useState([]);
    const [emailId, setemail]=useState([]);
    const [websites, setwebsites]=useState([]);
    const [privateImages, setprivateImages]=useState([]);
    const [publicImages, setpublicImages]=useState([]);
    
   // const [viewcomments, setviewcomments]= useState(false);
   // const [commentData, setCommentData]= useState('');
    const [tocomment, settocomment]= useState();
    const [imageindex, setimageindex] = useState(0);
    //State variables To open model popup
    const [multiimagechk, setmultiimagechk]=useState(false);
    const [multiimagelist, setmultiimagelist] = useState([]);
    const [clickedfilename, setclickedfilename] = useState('');
    const [isFav, setIsFav] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [location, setlocation]= useState('');
   
   
    //const [delmodalOpen, setdelModalOpen] = useState(false);
    const [commentmodalOpen, setcommentModalOpen] = useState(false);
    const [fileData, setfileData] = useState('');
   // const [singlefileData, setsinglefileData]= useState('')
    const sharehandler = () =>{ setshareactive(!shareactive);   }
    const [sidebar, setSidebar] = useState(false);
    //const [index1, setindex] = useState();
    const showSidebar = () => setSidebar(!sidebar);
    const showInfo =() =>setviewInfo(!viewinfo);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {     
      setValue(newValue);
    };

    const firstname=localStorage.getItem('firstname');
    const lastname=localStorage.getItem('lastname');
    const setusername=() => {
      var name;
      if((firstname=='null'|| firstname==='') && (lastname=='null' || lastname===''))
      {
        name='user';
      }
      else if((firstname=='null' || firstname==='')&& (lastname!='null' || lastname!==''))
      {
       name=lastname;
      }
      else if((firstname!='null' || firstname!=='')&& (lastname=='null' || lastname===''))
      {
        name=firstname;
      }
      else
      {
        name=firstname+''+lastname;
      }
      return name;
    }
    const Username=setusername();
    const formatday = (dayval) => {
      if(dayval<10){
           dayval='0'+dayval;
      }
      return dayval;
    }

    const formatmonth = (monval) => {
        if(monval<10){
            monval='0'+monval;
        }
        return monval;
    }

    const dateformatting =() => {
      const current = new Date();
      const dayval=`${current.getDate()}`;
      const monval=`${current.getMonth()+1}`;
      const year = `${current.getFullYear()}`;
      const day = formatday(dayval);
      const month = formatmonth(monval);
      const toDate = year+'-'+month+'-'+day;
      const dateval='fromdate=2022-01-01'+'&todate='+toDate;
      return dateval;
    }

    const datestring=dateformatting();
    const controller= new AbortController();
    const signal=controller.signal;
   
    const handledialogOpen = (index, imageobjects) =>
     {
      setclickedfilename(imageobjects[index].fileName);
      setdialogOpen(true);
     };
  
    const handledialogClose = () => 
     {
       setdialogOpen(false);
     };
    async function getData() {    
        setloading(true);   
        const headers = {
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        };
       
        const api=`https://www2.executesimple.com/getUserFiles?search=web`;
        const result=await fetch(api,{headers},{signal:signal});
        //console.log(result.result_code);
        const getResult= await result.json();
        // console.log(getResult);
        // console.log(getResult.userChatFiles);
        setprivateImages([]);
        setpublicImages([]);
        if(getResult.userChatFiles &&( getResult.userChatFiles.length>0 ))
        {
          const {userChatFiles} = getResult;
          let filestoshow=[];
          setfileData(userChatFiles)
          console.log(fileData);
          for(let i=0;i<userChatFiles.length;i++)
              {
                
                 if(userChatFiles[i].isDelete!=true)
                 {
                  const {userPrivacy}=userChatFiles[i];  
                  console.log(userPrivacy);           
                  if(userPrivacy==='private')
                  {                 
                    setprivateImages((prevImages)=>{
                      console.log(prevImages);
                      return prevImages.concat(userChatFiles[i]);
                    })                       
                  }
                  else
                  {                
                    setpublicImages((prevImages)=>{
                      console.log(prevImages);
                      return prevImages.concat(userChatFiles[i]);
                    }) 
                  }
                    
                 }
               
              }         
               console.log(privateImages);
               console.log(publicImages);
          
        
          setobjectLength(true);
          setloading(false);
          } 
        else
        {
          setobjectLength(false);
        }
    //    setobjectLength(fileData.length);
        
    }

  
  
    async function getsinglefileData(imagefilename)
    {
                  
                   const userID= localStorage.getItem('id');
                   const geturl='https://www2.executesimple.com/getSingleFileDetails?filename=';
                   const url=geturl+imagefilename+'&userId='+userID;
                   console.log(url);
                   const api= url;
                   const result=await fetch(api,{signal:controller.signal});
                   const getResult= await result.json();
                   const {userPrivacy}=getResult.chatFileDetails;                   
                   setselectedmode(userPrivacy);
                   console.log(selectedmode);
                   const {multiChatFiles}=getResult.chatFileDetails;
                   console.log(multiChatFiles);
                   const {extractingDetails}=getResult.chatFileDetails;            
            
                   if(extractingDetails && (Object.keys(extractingDetails).length>0))
                   {
                        if(extractingDetails.email!==null){
                          let emailarray=[];
                          extractingDetails.email.forEach(val=>{
                            emailarray.push(val.email);
                          })
                          setemail(emailarray);
                        }
                        if(extractingDetails.phoneNumber!==null){
                          let phonearray=[];
                          extractingDetails.phoneNumber.forEach(val=>{
                            phonearray.push(val.mobileNo)
                          })
                          setphoneNo(phonearray);
                        }
                        if(extractingDetails.website!==null){
                          let webarray=[]
                          extractingDetails.website.forEach(val=>{
                            webarray.push(val.website)
                          })
                          setwebsites(webarray);
                        }              
                        console.log(emailId);
                        console.log(phoneNo);
                        console.log(websites);
                   // if((a.length>0)&&(a))
                      // {
                      //   let phoneNoarray=[];
                      //   for(let i=0;i<a.length;i++)
                      //   {
                      //     phoneNoarray[i]=a.mobileNo[i];
                      //   }
                        //console.log(phoneNoarray);
                      //}
                   }
                   else
                   {
                      //  setphoneNo('Not available');
                      //  setemail('Not available');
                      //  setwebsites('not available');
                   }
                  //  const {prescriptionDetails}=getResult.chatFileDetails;
                  //  if(prescriptionDetails && (prescriptionDetails.length>0))
                  //  {
                  //     prescriptionDetails.map(item=>{
                  //      setprescriptionId(item.commercial_Name_Id);
                  //      setprescriptionName(item.commercial_Name);
                  //      setprescriptionDosage(item.route_and_Dosage_of_Drug);
                  //       })
                  //     console.log(prescriptionId);
                  //     console.log(prescriptionName);
                  //     console.log(prescriptionDosage);
                  //     if(prescriptionId===null || prescriptionId=== undefined)
                  //       {
                  //          setprescriptionId('not available');
                  //        }
                  //     if(prescriptionName===null || prescriptionName=== undefined)
                  //       {
                  //          setprescriptionId('not available');
                  //       }
                  //     if(prescriptionDosage===null || prescriptionDosage=== undefined)
                  //        {
                  //           setprescriptionId('not available');
                  //        } 
                  //  }
                  //   else
                  //  {
                    
                  //  }
                  
                   if(multiChatFiles && (multiChatFiles.length>0))
                   {
                    setmultiimagechk(true);
                    var array1=[];
                    multiChatFiles.forEach(val => {             
                      array1.push(val.fileName)
                    });
                    console.log(array1);
                    setmultiimagelist(array1);
                   }
                   else
                   {
                    setmultiimagechk(false);
                   }
                   if(getResult.isLike===true)
                   {
                    setIsLike(true);
                    console.log('likechk--if',isLike);
                   }
                   else
                   {
                    setIsLike(false);
                    console.log('likechk---else',isLike);
                   }
                  if(getResult.isFavourite===true)
                   {
                    setIsFav(true);
                    console.log('favchk--if', isFav)
                   }
                  else
                  {
                    setIsFav(false);
                    console.log('favchk--else', isFav)
                   }
                 
                   console.log('favchk&likechk', isFav,'',isLike)
                   var counts = [];
                   counts.push({'favouritesCount':getResult.chatFileDetails.favouritesCount,
                                'likesCount':getResult.chatFileDetails.likesCount,
                                'viewsCount':getResult.chatFileDetails.viewsCount ,
                                'commentsCount':getResult.chatFileDetails.commentsCount,
                                'category':getResult.chatFileDetails.category,
                                'caption':getResult.chatFileDetails.caption ,
                                'user':getResult.chatFileDetails.user,
                                'Remarks':getResult.chatFileDetails.remarks,
                                'location':getResult.chatFileDetails.location,
                                'Text':getResult.chatFileDetails.imageTextData,
                                'createddate':getResult.chatFileDetails.imageUploadedDate
                               });
                    if(counts[0].location===null)
                    {
                     setlocation('no info');
                    }
                    else
                    {
                      setlocation(counts[0].location.address)
                    }
                    console.log(location);
                    if(counts[0].Text===null)
                    {
                      settextOnImage(' ')
                    }
                    else
                    {
                       settextOnImage(counts[0].Text)
                    }
                    console.log(textOnImage); 
                    if(counts[0].createddate)
                    {
                       setcreatedTime(counts[0].createddate)
                    }
                    console.log(createdTime);
                    if(counts[0].favouritesCount===null)
                    {
                      setfavcount(0);
                    }
                   else
                   {
                     setfavcount(counts[0].favouritesCount.counts);
                   }
                   if(counts[0].favouritesCount===null)
                   {
                     setfavcount(0);
                   }
                   else
                   {
                     setfavcount(counts[0].favouritesCount.counts);
                   }
                   console.log('current fav count ',favcount);
                   if(counts[0].likesCount===null)
                   {
                     setLikescount(0);
                   }
                   else
                   {
                    setLikescount(counts[0].likesCount.counts);
                   }
                   console.log('current like count ',likescount);
                   if(counts[0].viewsCount===null)
                   {
                     setviewscount(0);
                   }
                   else
                   {
                    setviewscount(counts[0].viewsCount.counts);
                   }
                   console.log('current view count ',viewscount);
                   if(counts[0].commentsCount===null)
                   {
                     setCommentsCount(0);
                   }
                   else
                   {
                    setCommentsCount(counts[0].commentsCount.counts);
                   
                   }
                   console.log('current comment count ',commentscount);
                   if(counts[0].category===null)
                   {
                     setCategory('no info');
                   }
                   else
                   {
                    setCategory(counts[0].category);
                   }
                   console.log(category);
                   if(counts[0].caption===null)
                   {
                    setCaption('no info');
                   }
                   else
                   {
                    setCaption(counts[0].caption);
                   }
                   console.log(caption);
                   if(counts[0].Remarks===null)
                   {
                    setRemarks('no info')
                   }
                   else
                   {
                    setRemarks(counts[0].Remarks);
                   }
                   console.log(remarks);
                   if(counts[0].user)
                   {
                     var name;
                    if((counts[0].user.firstName==null || counts[0].user.firstName==='') && 
                       (counts[0].user.lastName==null || counts[0].user.lastName===''))
                      {
                          name='unnamed user';
                      }
                     else if((counts[0].user.firstName==null ||counts[0].user.firstName==='')&&
                             (counts[0].user.lastName!=null || counts[0].user.lastName!==''))
                      {
                           name=counts[0].user.lastName;
                      }
                     else if((counts[0].user.firstName!=null || counts[0].user.firstName!=='')&&
                             (counts[0].user.lastName==null || counts[0].user.lastName===''))
                      {
                         name=counts[0].user.firstName;
                      }
                         else
                      {
                          name=counts[0].user.firstName+' '+counts[0].user.lastName;
                      }
                      setuserInfo(name);
                    } 
                   
                   console.log(userInfo);
                   console.log('counts', counts);
    }
    // async function chkupdate()
    // {
    //              const api=`https://www2.executesimple.com/getRefreshCheckData`;
    //              const result=await fetch(api,{signal:signal});
    //              const getResult= await result.json();
    //              console.log(getResult);
    //              setrefreshchk(getResult.refreshCheckData);
    //              console.log(refreshchk);
    // }
   
    useEffect(()=> {
      let controller= new AbortController();         
           getData();
      return() => 
      {       
        controller.abort();
      }
        },[]);

    
  

    const addview=(filename) =>{
      
        let formData={"fileName":filename.fileName}
          const headers = {
           'Authorization':'Bearer '+ localStorage.getItem('auth_token')
           };
         axios.post('https://www2.executesimple.com/updateUserViews',
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
    const handlemodeChange= (e)=> {
      setselectedmode(e.target.value);
      let tempchange=e.target.value;
     
      let fn=clickedfilename;
      console.log(selectedmode);    
      let filedata= {
          "fileName":clickedfilename,
          "category":category,
          "remarks":remarks,
          "caption":caption,
          "clienInfo":"web",
          "userPrivacy":e.target.value,
          "isDelete":false
        }
        const headers={
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         }
        
       post('https://www2.executesimple.com/updateUserFileDetails', filedata,{headers}) 
        .then((response) => {
            console.log(response.data);
            if(response.data.result_code === 0)
             { 
              
               async function waitforit()
               {
                  await getData();  
               }
              waitforit();
              alert(response.data.result_text); 

              if(tempchange==='public')
              {
                console.log(publicImages);
                console.log(fn);
                setValue(1);                                     
              }
              else
              {
                console.log(privateImages);
                setValue(0); 
              }               
            } 
            else
             {
              alert(response.data.result_text); 
             }
        }, error=>{
         alert(error);})
        
       }

    const deleteimages =()=>
    {
       
        let filedata= {
          "fileName":clickedfilename,
          "category":category,
          "remarks":remarks,
          "caption":caption,
          "clienInfo":"web",
          "userPrivacy":selectedmode,
          "isDelete":true
        }
        let formData= new FormData();   
        formData.append('fileDetail', JSON.stringify(filedata));   
        const headers={
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         }
        
       post('https://www2.executesimple.com/updateUserFileDetails', filedata,{headers}) 
        .then((response) => {
            console.log(response.data);
            if(response.data.result_code === 0)
             { 
              handledialogClose();
              alert('file deleted successfully');
              async function waitforit()
                {
                   await getData();  
                }
               waitforit();
               setValue(0);
             } 
            else
             {
              alert(response.data.result_text); 
             }
        }, error=>{
         alert(error);})
        
    }
    const getpubimg=(index, imageobjects) =>
    {   
      setimageindex(index);       
       //  let length=imageobjects.length;
      let pvtlength=privateImages.length;
      let publength=publicImages.length;
      if((pvtlength===1) && (publength===1))
      {
        setshowNext(false);
        setshowPrev(false);
        console.log(showNext,showPrev);
      }   
      else
      {
        if(index===0 )
         {
            setshowNext(true);
            setshowPrev(false);       
            console.log(showNext,showPrev);
         }
        else
          {
           setshowPrev(true);
           console.log(showNext,showPrev);
          }
       if((index===(pvtlength-1)))
           {
             setshowPrev(true);
             setshowNext(false);   
             console.log(showNext,showPrev);
           }
      else if(value===0 && (index===(publength-1)))
          {
            setshowPrev(true);
            setshowNext(false);   
            console.log(showNext,showPrev);
          }
      else
         {
            setshowNext(true);
           console.log(showNext,showPrev);
         }
      }
      setclickedfilename( imageobjects[index].fileName);        
      setCategory(imageobjects[index].caption);
      setviewimgsrc(baseUrl+imageobjects[index].fileName);
      setModel(true); 
      getsinglefileData(imageobjects[index].fileName);
      addview(imageobjects[index]);
     }
     const getpvtimg=(index, imageobjects) =>
    {   
      setimageindex(index);       
       //  let length=imageobjects.length;
      let pvtlength=privateImages.length;
      let publength=publicImages.length;
      if((pvtlength===1) && (publength===1))
      {
        setshowNext(false);
        setshowPrev(false);
        console.log(showNext,showPrev);
      }   
      else
      {
        if(index===0 )
         {
            setshowNext(true);
            setshowPrev(false);       
            console.log(showNext,showPrev);
         }
        else
          {
           setshowPrev(true);
           console.log(showNext,showPrev);
          }
       if((index===(pvtlength-1)))
           {
             setshowPrev(true);
             setshowNext(false);   
             console.log(showNext,showPrev);
           }
      else if(value===0 && (index===(publength-1)))
          {
            setshowPrev(true);
            setshowNext(false);   
            console.log(showNext,showPrev);
          }
      else
         {
            setshowNext(true);
           console.log(showNext,showPrev);
         }
      }
      setclickedfilename( imageobjects[index].fileName);        
      setCategory(imageobjects[index].caption);
      setviewimgsrc(baseUrl+imageobjects[index].fileName);
      setModel(true); 
      getsinglefileData(imageobjects[index].fileName);
      addview(imageobjects[index]);
     }

     const searchTextHandler=(event) =>
     {
       setSearchtext(event.target.value)  
     }
     const onClosesearch = () =>
     {
       setgotosearch(false)
     }
     async function searchdata(query, datestr)
     {
           const queryparams = query+datestr;
           const headers = {
             'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         };
         const api=`https://www2.executesimple.com/getSearchFiles?`+queryparams;
         const result=await fetch(api,{headers});
                    
           const getResult= await result.json();
           setsdata(getResult.userChatFiles);
         
     }
     const searchHandler = (event)=> {
      event.preventDefault();
      setModel(false); 
      setgotosearch(true);
      const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
      searchdata(query, datestring);   
     }
     const Fullscreenviewer = () => {
      
        setimgfullscreen(true)
     }
    
    const closehandler =()=>{ 
      if(imgfullscreen===true)
      {
        setimgfullscreen(false);
      }
      else{
        setModel(false); 
      }       
    } 
    const prevImage =() =>   
    {
      var index;
      if(value===1)
      {
        if(imageindex===0)
         {
          index=publicImages.length-1;
         }
      else{
          index=imageindex-1;
      }
      setimageindex(index);
      getpubimg(index, publicImages);
      }
      else
      {
        if(imageindex===0)
        {
            index=privateImages.length-1;
        }
        else{
            index=imageindex-1;
        }
        setimageindex(index);
        getpvtimg(index, privateImages);
      }
    }

    const nextImage=() =>     
    {
      var index;
      if(value===1)
      {
        if(imageindex===(publicImages.length-1))
        {
            index=0;
        }
        else
        {
            index=imageindex+1;
        }
        setimageindex(index);
        getpubimg(index, publicImages);
      }
      else
      {
        if(imageindex===(privateImages.length-1))
        {
            index=0;
        }
        else
        {
            index=imageindex+1;
        }
        setimageindex(index);
        getpvtimg(index, privateImages);

      }
     
    }
 
    const addTofavourites = (filename) => {
        
        setclickedfilename(filename);
        console.log(clickedfilename);
        let formData={"fileName":clickedfilename}
        const headers = {
               'Authorization':'Bearer '+ localStorage.getItem('auth_token')
             };
        axios.post('https://www2.executesimple.com/updateUserFavourites',formData, {headers})
        .then(response => {
        console.log("response ", response)
       
        if(response.data.result_code===0)
        {
          setIsFav(true);
          setfavcount(parseInt(favcount)+1);     
        }
       else
       {
           console.log(response.data.result_text);
       }
    });       
    }
    
    const addToliked = (filename) => {
        setclickedfilename(filename);
       
        console.log(clickedfilename);
       let formData={"fileName":clickedfilename}
        const headers = {
         'Authorization':'Bearer '+ localStorage.getItem('auth_token')
       };
       axios.post('https://www2.executesimple.com/updateUserLikes',formData, { headers })
         .then(response => {
         console.log("response ", response)
        
         if(response.data.result_code===0)
         {
          setIsLike(true);
          setLikescount(parseInt(likescount)+1);          
         }
        else
        {
            console.log(response.data.result_text);
        }
        
     });       
 
     }
    // const deleteimage =(item1) => 
    // {
    //     settodelete(baseUrl+item1);
    //     setdelModalOpen(true);
    // }

    const commentSnaps=() => {
       
        settocomment(clickedfilename);
        setcommentModalOpen(true);
        setModel(false);
    } 
    function downloadimagefromarray(value, index, array)
    {
      const url = baseUrl+value;
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
    const downloadMultiimages = (imagearray)=> {
     console.log(imagearray);
    imagearray.forEach(downloadimagefromarray)
    }
    const downloadimage = async() => {
        
        const url = baseUrl+clickedfilename;
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
      let formData={"fileName":clickedfilename};
      const headers = {
       'Authorization':'Bearer '+ localStorage.getItem('auth_token')
     };
     axios.post('https://www2.executesimple.com/updateUserDownloads',formData, { headers })
       .then(response => {
       console.log("response ", response)
      
       if(response.data.result_code===0)
       {
        console.log('added to recent downloads')           
       }
      else
      {
          console.log(response.data.result_text);
      }
      
   });       
       };
    // const shareurlfb = () => {
    //     setshareactive(!shareactive);
    //     const url = "https://www.facebook.com/sharer.php?u=" + viewimgsrc;
    //     socialWindow(url, 570, 570);
    //   }
    //   const shareurltw = () => {
    //     setshareactive(!shareactive);
    //     const url = "https://twitter.com/intent/tweet?url=" + viewimgsrc;
    //     socialWindow(url, 570, 570);
    //   }
    //   const shareurlln = () => {
    //     setshareactive(!shareactive);
    //     const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + viewimgsrc;
    //     socialWindow(url, 570, 570);
    //   }
      // const shareurlIns = () => {
      //   const url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
      //   socialWindow(url, 570, 570);
      // }
      const shareurlsk = () => {
        setshareactive(!shareactive);
       // const text='share and explore images'
        const url = "https://web.skype.com/share?url=" + viewimgsrc;
        socialWindow(url, 570, 570);
      }
      const socialWindow=(url, width, height) => {
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
        window.open(url,"",params);
      }
      const imageclicked = (index,Data) => {
        MultishareCtx.addToMultishare(Data[index].fileName );
      }
      const removefromsharelist=(Data) => {
        MultishareCtx.removeImage(Data);
        }
      const gotomultishare=()=> {
        history.push('/Multisharecart');
      }
      const profileEdit=() => {
        history.push('/Editprofile');
      }
    return (
       <div className='userprofile'>
              <div className='profile_header' >
              <span className='flex-item heading'
                    style={{marginLeft:'-200px',
                            marginRight:'300px'}}> 
                    Welcome {Username}
              </span>
              <div className='flex-item'>
                  <button className='sharebutton'
                          onClick={gotomultishare}>
                          View Share Images List({MultishareCtx.totalImages})
                  </button>
              </div >
              <div className='flex-item'>
                  <button className='sharebutton'
                          onClick={profileEdit}>
                          Edit Profile
                  </button>
              </div >
          {/* <div className='flex-item'>
            <button className='sharebutton'>
              Share Images
            </button>
          </div> */}
              </div>
                     
        
              <div className='snap_updates'>
                   <h1> My Uploads </h1>          
              </div>
              <hr/>
              <div className={model?"model open":"model"}>
              <div className='preview_header'>
                   <div className='menu_icon'>
                       {!sidebar && (<MenuIcon onClick={showSidebar}/>)}
                        
                       {sidebar && (
                        <div>
                          <CloseIcon onClick={showSidebar}/>
                          <Sidebarmodal/>
                        </div>
                        )}
                       
                   </div>
                   <div className='item' >
                      <h1 className='heading' style={{padding:'15px'}}>MySnaps</h1>
                   </div>

                   <div className="item" style={{marginLeft:'20%'}}>
                         <input  style={{width:'350px', padding:'10px'}}
                                 type="search"
                                 placeholder="search"
                                 name="search"
                                 value={searchtext}
                                 onChange={searchTextHandler}/>
                   </div>
                   <div className="item"
                        style={{padding:'5px', border:'1px solid rgb(118, 118, 118)'}}
                        onClick={searchHandler}>
                         <SearchIcon/>
                   </div>
                   <div className="item" style={{marginLeft:'auto'}}>
                    </div>
              </div>
              <div style={{marginLeft:'10px'}}>
              <FormControl>
                     
                        <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"                                 
                                    value={selectedmode}
                                    onChange={handlemodeChange}>
                        
                        <FormControlLabel value="private"
                                          checked={selectedmode==='private'}
                                          control={<Radio />} 
                                          label="Private" />
                        <FormControlLabel value="public" 
                                          checked={selectedmode==='public'}
                                          control={<Radio />} 
                                          label="Public" />       
                        </RadioGroup>
                      
                    </FormControl> 
              </div>
              {multiimagechk && <>
     
     <div className='viewbox_icons' style={{marginTop:'-50px'}}>

     <div className='image_icon'
          onClick={prevImage}
          style={{display: showPrev? '': 'none'}}>
        <KeyboardArrowLeftIcon />
     </div>
       
       <div className='image_icon'
            style={{display: showNext? '': 'none'}}
            onClick={nextImage}>
       <KeyboardArrowRightIcon/>
       </div>
     
     <div className='image_icon'
          onClick={()=>downloadMultiimages(multiimagelist)}>
            <FileDownloadIcon />
     </div> 
     <div className='image_icon' onClick={closehandler}>
       <CloseIcon />
     </div>
 </div>  
 <MultiImagetile   closemultimodel={closehandler}
                   imagearray={multiimagelist}/>
 </>
}

{!multiimagechk &&
           <div className={!imgfullscreen?'viewbox':'showfullscreen'}>             
                 { imgfullscreen && (
                     <img src={viewimgsrc}
                          alt='profile images'
                          style={{ height:'100%', width:'90%',marginTop:'10px', objectFit:'contain'}}/>
                       )}           
                 {!imgfullscreen && 
                 (<>
                     
                                 <img src= {viewimgsrc}
                                      alt='profile images'
                                      style = {{height:'65%'}}/>
                   </>)}  
                
             <div className='viewbox_icons' style={{marginTop:'-60px'}}>
                 <div className='image_icon' 
                      style={{display: showPrev? '': 'none'}}
                      onClick={()=>prevImage()}>
                    <KeyboardArrowLeftIcon />
                 </div>
                 <div className='image_icon'
                      style={{display: showNext? '': 'none'}}
                      onClick={()=>nextImage()}>
                    <KeyboardArrowRightIcon/>
                 </div>
                 <div className='image_icon' onClick={downloadimage}>
                   <FileDownloadIcon />
                 </div> 
                 <div className='image_icon' onClick={closehandler}>
                   <CloseIcon />
                 </div>
             </div>  
             
           </div>
            }
          <div>
           <div className='image-info'>
               <h1 style={{marginLeft:'10px', width:'65%'}}>{caption}
               {!viewinfo &&
                  <button className='viewinfobutton'
                          onClick={showInfo}> view more details</button>
               }
               {viewinfo &&
                    <button className='viewinfobutton'
                            onClick={showInfo}> Hide details</button>
               }
               </h1>
           </div>
           <div className='viewbox_social_icons'>
                    {/* <span className='social_icon'>
                        <PersonIcon/>
                        {user} 
                    </span> */}
                 <span className='social_icon' style={{cursor:'default'}}>
                    <RemoveRedEyeIcon/> {viewscount}
                    <span className="tooltiptext1">views</span>
                 </span>
               
                
                 <span className='social_icon'
                       style={{color: isLike? 'green':'rgb(70, 69, 69)'}}>
                     <ThumbUpAltIcon onClick={()=>addToliked(clickedfilename)}/> 
                     {likescount}
                     <span className="tooltiptext1">click to Like</span>
                 </span>
 
                 <span className='social_icon'
                       style={{color: isFav? 'green':'rgb(70, 69, 69)'}}>
                     <FavoriteBorderIcon onClick={()=>addTofavourites(clickedfilename)}/> 
                     {favcount}
                     <span className="tooltiptext1">Add to favourites</span>
                 </span>
                 <span className='social_icon'>
                     <MmsIcon onClick={()=>commentSnaps(clickedfilename)}/>
                     {commentscount}
                     <span className="tooltiptext1">comment by snaps</span>
                 </span>
                 <span className='social_icon'
                       style={{display:multiimagechk?'none':''}}
                       onClick={Fullscreenviewer}>
                     <FullscreenIcon/>
                     <span className="tooltiptext1">view fullsize</span>
                 </span>
                 <span className='social_icon' onClick={sharehandler}>
                     <ShareIcon/>
                     <span className="tooltiptext1">share to socialmedia</span>
                 </span>
                 <div className={`sharemodel ${shareactive? "active" : "inactive"}`}>
                       <div onClick={sharehandler}
                            style={{marginBottom:'5px'}}>
                         <CloseIcon/>
                       </div>
                       <span className='sbutton'
                           style={{color:'#021864'}}> 
                        <FacebookShareButton
                              url={baseUrl+clickedfilename}
                              quote={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                           <FacebookIcon size={34} round /> 
                        </FacebookShareButton>
                       </span>
                       <span  className='sbutton' 
                            style={{color:'#1141EA'}}> 
                         <WhatsappShareButton
                           url={baseUrl+clickedfilename}
                           title={"Share and Explore images"}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
                         </WhatsappShareButton>
                       </span>
                       <span className='sbutton'
                           style={{color:'#65C4DA'}}>
                        <LinkedinShareButton
                              url={baseUrl+clickedfilename}
                              title={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                       </LinkedinShareButton>
                       </span>
                       <span className='sbutton'
                           style={{color:'#65C4DA'}}>
                        <TwitterShareButton
                          url={baseUrl+clickedfilename}
                          title={"Share and Explore images"}
                          description={"An image database"}
                          className="Demo__some-network__share-button">
                        <TwitterIcon size={34} round />
                       </TwitterShareButton>
                       </span>
                       <span className='sbutton' 
                           style={{color:'#1973C0'}}
                           onClick={shareurlsk}>
                       <BsSkype/>
                       </span>
                   
                 </div>
                
           </div>    
           </div>
           {viewinfo && 
                       <>       
                         <Imageinfo catinfo={category} 
                                    captinfo={caption}
                                    userinfo={userInfo} 
                                    Remarksinfo={remarks}
                                    locationinfo={location}
                                    dateinfo={createdTime}
                                    Imagetext={textOnImage}
                                    Mobilenumbers={phoneNo}
                                    Email={emailId}
                                    websiteaddress={websites}
                                    setInfoview={setviewInfo}/>
                       </>
           }


           {objLength && 
            !imgfullscreen &&
             (value===1?             
             <div className='sideview'>
                   {Object.keys(publicImages).map((key, index)=> {
                      return(
                         <div className="image-card"
                              style={{marginBottom:'10px'}}
                              key={publicImages[key].id}
                              onClick={() => getpubimg(index,publicImages)}>
                         <img className='image'
                              src={baseUrl+publicImages[key].fileName}
                              alt={publicImages[key].caption}
                              style={{width:'100%', height:'80%'}} /> 
                          {(publicImages[key].type!='single')&&
                                  <div className='image_icon1'>
                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
                         <p className="image-info"
                            style={{color:'grey', fontSize:'16px'}}>
                            {publicImages[key].category}     
                         </p>
                          {/* <p className="image-info"
                                style={{color:'grey', fontSize:'16px',margin:'0'}}>
                                {fileData[key].caption}
                              </p> */}
                        </div>)
                     })}       
              </div>  :
               <div className='sideview'>
                  {Object.keys(privateImages).map((key, index)=> {
                    return(
                       <div className="image-card"
                            style={{marginBottom:'10px'}}
                            key={privateImages[key].id}
                            onClick={() => getpvtimg(index,privateImages)}>
              
                          <img className='image'
                               src={baseUrl+privateImages[key].fileName}
                               alt={privateImages[key].caption}
                               style={{width:'100%', height:'80%'}} /> 
                          {(privateImages[key].type!='single')&&
                                                <div className='image_icon1'>
                                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
                          <p className="image-info"
                             style={{color:'grey', fontSize:'16px'}}>
                              {privateImages[key].category}     
                          </p>
                           {/* <p className="image-info"
                               style={{color:'grey', fontSize:'16px',margin:'0'}}>
                               {fileData[key].caption}
                            </p> */}
                       </div>)
                          })}       
               </div> )  }          
          </div>
          <div>                
                 
         
          <Box sx={{ width: '100%' }}>
                   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Private" {...a11yProps(0)} />
                              <Tab label="Public" {...a11yProps(1)} />
                        </Tabs>
                   </Box>
                   <TabPanel value={value} index={0}>
                   <Container>
                   {!loading && !objLength && <span>No images found </span>}  
                   {loading &&
                         <Box sx={{width:'70vw',
                                   height:'30vw',
                                   display: 'flex',
                                   justifyContent:'center',
                                   alignItems:'center'}}>
                                     <CircularProgress />
                         </Box>
                    }
                        <Grid container spacing={1}>
                        {!loading && Object.keys(privateImages).map((key, index) => {
                           return(
                                        <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                                         <div className={` ${shareimage.includes(privateImages[key].fileName)?'image-cardselected':'image-card'}`}
                                              key={privateImages[key].id}>
                                          <img className='image'
                                               src={baseUrl+privateImages[key].fileName}
                                               alt={privateImages[key].caption}
                                               // onClick={()=>imageclicked(index,fileData)}
                                               style={{width:'100%', height:'70%'}} />
                                          { shareimage.includes(privateImages[key].fileName) && 
                                                <div style={{position:'absolute',
                                                             backgroundColor:'rgb(2, 210, 16)',
                                                             color:'white',
                                                             cursor:'pointer'}}
                                                     onClick={()=>removefromsharelist(privateImages[key].fileName)}> 
                                                         <CheckBoxIcon/>
                                                </div>
                                           }
                                           {(privateImages[key].type!='single')&&
                                                <div className='image_icon1'>
                                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
              
                                           <p className="image-info"
                                              style={{color:'grey', fontSize:'16px',overflow:'hidden'}}>
                                             {privateImages[key].category===''? 'no data' : privateImages[key].category}     
                                           </p>
                                           <div className='viewbutton' style={{position:'static', width:'auto'}}>
                                             <button className='viewbuttonicons'>
                                                   <OpenInFullIcon onClick={()=>getpvtimg(index,privateImages)}/>
                                             </button>
                                             <span></span>
                                             <button className='viewbuttonicons'>
                                                    <ShareIcon onClick={()=>imageclicked(index,privateImages)}/>
                                             </button>   
                                             {(privateImages[key].multiChatFiles==null)&&
                                             <button className='viewbuttonicons'>
                                                   <DeleteOutlineIcon onClick={()=>handledialogOpen(index,privateImages)}/>
                                             </button>     
                                             }           
                                            </div>
                                          </div>
                                        </Grid>)})}
                        </Grid>
                    </Container>
                   </TabPanel>
                    <TabPanel value={value} index={1}>
                    <Container>
                    {!loading && !objLength && <span>No images found </span>}  
                    {loading &&
                            <Box sx={{width:'70vw',
                                      height:'30vw',
                                      display: 'flex',
                                      justifyContent:'center',
                                      alignItems:'center'}}>
                                   <CircularProgress />
                            </Box>
                      }
                        <Grid container spacing={1}>
                        {!loading&&Object.keys(publicImages).map((key, index) => {
                           return(
                                        <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                                         <div className={` ${shareimage.includes(publicImages[key].fileName)?'image-cardselected':'image-card'}`}
                                              key={publicImages[key].id}>
                                          <img className='image'
                                               src={baseUrl+publicImages[key].fileName}
                                               alt={publicImages[key].caption}
                                               // onClick={()=>imageclicked(index,fileData)}
                                               style={{width:'100%', height:'70%'}} />
                                          { shareimage.includes(publicImages[key].fileName) && 
                                                <div style={{position:'absolute',
                                                             backgroundColor:'rgb(2, 210, 16)',
                                                             color:'white',
                                                             cursor:'pointer'}}
                                                     onClick={()=>removefromsharelist(publicImages[key].fileName)}> 
                                                         <CheckBoxIcon/>
                                                </div>
                                           }
                                           {(publicImages[key].type!='single')&&
                                                <div className='image_icon1'>
                                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }              
                                           <span className="image-info"
                                              style={{color:'grey', fontSize:'16px',overflow:'hidden'}}>
                                             {publicImages[key].category===''? 'no data' : publicImages[key].category}     
                                           </span>
                                           <div className='viewbutton' style={{position:'static', width:'auto'}}>
                                             <button className='viewbuttonicons'>
                                                   <OpenInFullIcon onClick={()=>getpubimg(index,publicImages)}/>
                                             </button>
                                             <span></span>
                                             <button className='viewbuttonicons'>
                                                    <ShareIcon onClick={()=>imageclicked(index,publicImages)}/>
                                             </button>                   
                                            </div>
                                          </div>
                                        </Grid>)})}
                                   
                        </Grid>
                    </Container>
                    </TabPanel>
                    </Box>
          {dialogopen && <>
            <Dialog
               
                  open={dialogopen}
                  onClose={handledialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
               >
              <DialogTitle id="alert-dialog-title">
                     {"Are you sure to delete?"}
              </DialogTitle>
              <DialogContent>
              <Card sx={{ Width:'300px', padding:'10px' }}>
                <CardMedia
                     component="img"
                     alt="image"
                     height="140"
                     image={baseUrl+clickedfilename}/>
     
               </Card>
              </DialogContent>
             
            
              <DialogActions>
                <Button onClick={deleteimages}>Yes</Button>
                <Button onClick={handledialogClose} autoFocus>
                       No
                </Button>
              </DialogActions>
           </Dialog>
          </>

          }
          {gotosearch && 
              <div className="modalBackground">
               <div className="modalContainer1">
               <div className="close_icon1"
                    style={{margin:'10px',
                            fontSize:'34px'}}>
                    <button onClick={onClosesearch}>
                         X
                    </button>
                 </div>
                 <Searchresults pictures={sdata}/>
               </div>
              </div>
             }
               {commentmodalOpen && 
                 <CommentModal setcommentOpenModal={setcommentModalOpen}
                               comments={commentscount}
                               commentfilesrc={tocomment}/>}
              
             
             
       </div>
       
       </div>
    );
}

export default Userprofile;