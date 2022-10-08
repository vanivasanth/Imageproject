import React from 'react';
import {useState, useEffect} from 'react';
import Sidebarmodal from './Sidebarmodal';
import Imageinfo from './Imageinfo';
import CommentModal from './CommentModal';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MmsIcon from '@mui/icons-material/Mms';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MultiImagetile from './Multiimagetile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { BsSkype } from "react-icons/bs";
import PropTypes from 'prop-types';
import {
  FacebookIcon, 
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
 } from "react-share";
import {
 FacebookShareButton,
 LinkedinShareButton,
 TwitterShareButton,
 WhatsappShareButton
} from "react-share";

import './Contacts.css';
import {
  Container,
  CircularProgress,
  Grid,
  Tabs,
  Tab,
  Typography,
  Box
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

const Contacts = () => {
  
    
    const [fileData, setfileData]=useState('');
    const [data, setdata]=useState('');
    const [tocomment, settocomment]= useState();
    const [showsearchresult, setshowsearchresult]=useState(false);
    const [searchtext, setSearchtext]= useState('');
    const controller= new AbortController();
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
    const [loading, setloading]=useState(false);
    const [prescriptiondata, setprescriptiondata]=useState('');
    const [model, setModel] = useState(false);
    const [viewimgsrc, setviewimgsrc]= useState('');
   // const [current, setCurrent] = useState(0);
    const [imgfullscreen, setimgfullscreen ] = useState(false);
    //const [currentobj, setcurrentobj]= useState();
   // const [objLength, setobjectLength]= useState(0);    
    const [objLength, setobjectLength]= useState(true);
    const [phoneNo, setphoneNo]= useState([]);
    const [emailId, setemail]=useState([]);
    const [websites, setwebsites]=useState([]);
    const [caption,setCaption]=useState('');
    const [category,setCategory]=useState('');
    
    const [viewinfo, setviewInfo]=useState(false);
    const [showPrev, setshowPrev]= useState(true);
    const [showNext, setshowNext]= useState(true);
    const [multiimagechk, setmultiimagechk]=useState(false);
    const [multiimagelist, setmultiimagelist] = useState([]);
    const [imageindex, setimageindex] = useState(0);
    //State variables To open model popup
    const [location, setlocation]= useState('');
    const [clickedfilename, setclickedfilename] = useState('');
    
   // const [singlefileData, setsinglefileData]= useState('')
    const [prescriptionId, setprescriptionId]=useState('');
    const [prescriptionName, setprescriptionName]=useState('');
    const [prescriptionDosage, setprescriptionDosage]=useState('');
    const [sidebar, setSidebar] = useState(false);
    //const [index1, setindex] = useState();
    const showSidebar = () => setSidebar(!sidebar);
    const showInfo =() =>setviewInfo(!viewinfo);
    const [shareactive,setshareactive]= useState(false);
    const [value, setValue] = useState(0);
    const [commentmodalOpen, setcommentModalOpen] = useState(false);
    const [favcount, setfavcount]= useState(0);
    const [viewscount, setviewscount]= useState(0);
    const [likescount, setLikescount]= useState(0);
    const [commentscount, setCommentsCount]= useState(0);
    const [isFav, setIsFav] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [createdTime, setcreatedTime]=useState('');
    const [remarks, setRemarks]= useState('');
    const [userInfo,setuserInfo]=useState('');
    const [textOnImage, settextOnImage]=useState('');
    const signal=controller.signal;
    const sharehandler = () =>{ setshareactive(!shareactive);   }   
    const firstname=localStorage.getItem('firstname');
    const lastname=localStorage.getItem('lastname');
    const setusername=() => {
      var name;
      if((firstname=='null' || firstname==='') && (lastname=='null' || lastname===''))
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
    async function getprescriptiondata()
    {
      setloading(true);
      const headers ={
        'Authorization':'Bearer '+ localStorage.getItem('auth_token')
       };   
      const api=`https://www2.executesimple.com/getPrescriptionSearchFiles`;
      const result=await fetch(api,{headers},{signal:controller.signal});
      const getResult= await result.json();    
      console.log(getResult.usersPrescriptionChatFiles);
      if(getResult.usersPrescriptionChatFiles &&( getResult.usersPrescriptionChatFiles.length>0 ))
      {
        setprescriptiondata(getResult.usersPrescriptionChatFiles);
        console.log(prescriptiondata);
        setobjectLength(true);
      }
      else
      {
        setobjectLength(false);
      }
      setloading(false)
    }
    async function getData()
    {
      
        setloading(true);
        const headers = {
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        };
       
        const api=`https://www2.executesimple.com/getImageTextBasedSearchFiles`;
        const result=await fetch(api,{headers},{signal:controller.signal});
        const getResult= await result.json();
        console.log(getResult.allUsersChatFiles);
        if(getResult.allUsersChatFiles &&( getResult.allUsersChatFiles.length>0 ))
        {
        setfileData(getResult.allUsersChatFiles);
        console.log(fileData);
        setobjectLength(true);
        }
        else
        {
          setobjectLength(false);
        }
        setloading(false);
    }
   
    useEffect(()=> {
        let controller= new AbortController();
  
        // const timer = setInterval(() => 
        // {
          getData();
        //  }, 1000);
        return() => 
        {
        //   clearInterval(timer);
          controller.abort();
        }},[]);
    async function searchdata(query)
    {
      const headers = {
        'Authorization':'Bearer '+ localStorage.getItem('auth_token')
       };
        const api=`https://www2.executesimple.com/getImageTextBasedSearchFiles?`+query;
        const result=await fetch(api,{headers});          
        const getResult= await result.json();
        setdata(getResult.allUsersChatFiles);
        console.log(data);
        setshowsearchresult(true);
        setSearchtext('');
    }
    const handleChange = (event, newValue) => {
     
      setValue(newValue);
      if(newValue==1)
      {
        getprescriptiondata();
      }
    };

    const searchTextHandler=(event) =>
    {
      setSearchtext(event.target.value)  
    }

    const searchHandler =(event)=>
    {
        event.preventDefault();
        
             if(searchtext===null||searchtext==='')
             {
                 alert('Enter values for search')
             }
             else
             {
              const query='imageText='+ searchtext;
              searchdata(query);  
             }
            }         
    const Fullscreenviewer = () => {
      
      setimgfullscreen(true)
  }
  const commentSnaps=() => {
    settocomment(clickedfilename);
    setcommentModalOpen(true);   
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

    if(imageindex===0)
    {
        index=fileData.length-1;
    }
    else{
        index=imageindex-1;
    }
    setimageindex(index);
    getimg(index, fileData);
  }

  const nextImage=() =>     
  {
    var index;

    if(imageindex===(fileData.length-1))
    {
        index=0;
    }
    else
    {
        index=imageindex+1;
    }
    setimageindex(index);
    getimg(index, fileData);
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
}
async function getsinglefileData(imagefilename)
    {
             const userID= localStorage.getItem('id');
             const geturl='https://www2.executesimple.com/getSingleFileDetails?filename=';
             const url=geturl+imagefilename+'&userId='+userID;
             const api= url;
             const result=await fetch(api,{signal:signal});
             const getResult= await result.json();
             console.log(getResult);
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
                //  setphoneNo();
                //  setemail('');
                //  setwebsites('');
             }
             const {prescriptionDetails}=getResult.chatFileDetails;
             if(prescriptionDetails && (prescriptionDetails.length>0))
             {
                prescriptionDetails.map(item=>{
                 setprescriptionId(item.commercial_Name_Id);
                 setprescriptionName(item.commercial_Name);
                 setprescriptionDosage(item.route_and_Dosage_of_Drug);
                  })
                console.log(prescriptionId);
                console.log(prescriptionName);
                console.log(prescriptionDosage);
                if(prescriptionId===null || prescriptionId=== undefined)
                  {
                     setprescriptionId('not available');
                   }
                if(prescriptionName===null || prescriptionName=== undefined)
                  {
                     setprescriptionId('not available');
                  }
                if(prescriptionDosage===null || prescriptionDosage=== undefined)
                   {
                      setprescriptionId('not available');
                   } 
             }
              else
             {
              
             }
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
             
             if(counts[0].createddate)
               {
                 setcreatedTime(counts[0].createddate)
               }
             console.log(createdTime);
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
              console.log('current view count ',viewscount);
             }           
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
            
             if(counts[0].commentsCount===null)
             {
               setCommentsCount(0);
           
             }
             else
             {
              setCommentsCount(counts[0].commentsCount.counts);
              
             }
             console.log('current comment count ',commentscount);
            
             console.log('counts', counts);
    }

    const getprescriptionimg=(index, imageobjects)=>
    {
      console.log(imageobjects[index]);     
      let length=imageobjects.length;
      if(length===1)
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
      if(index===(fileData.length-1))
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
     
      setimageindex(index);     
      setviewimgsrc(baseUrl+imageobjects[index].fileName);
      setModel(true); 
      getsinglefileData(imageobjects[index].fileName);
    }
    const getimg=(index, imageobjects) =>
    {   
     // console.log(imageobjects[index].extractingDetails)
     
      setimageindex(index);       
      let length=imageobjects.length;
      if(length===1)
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
      if(index===(fileData.length-1))
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
     // getsinglefileData(imageobjects[index].fileName);
    
     }

     const addToliked = (filename) => {
      //setclickedfilename(filename);
     
      console.log(filename);
     let formData={"fileName":filename}
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

    const addTofavourites = (filename) => {
    
      setclickedfilename(filename);
     // console.log(clickedfilename);
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
     async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
    //  const handleCopyClick = () => {
    //   // Asynchronously call copyTextToClipboard
    //   var copytext='Phone Number:'+phoneNo +' e-Mail:'+emailId;
    //   copyTextToClipboard(copytext)
    //     .then(() => {
    //       // If successful, update the isCopied state value
    //       //setIsCopied(true);
    //       setTimeout(() => {
    //        // setIsCopied(false);
    //       }, 1500);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
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
    return(
        <>
          <div className='userprofile'>
              <div className='profile_header'
                   style={{backgroundColor:'white', 
                           color:'black'}} >
                <div className='flex-item heading'
                     style={{marginLeft:'10px', width:'20vw'}}> 
                       Welcome {Username}
                </div>
              <div className="searchbox">
              <div className="search">
            
              <input className='searchiteminput'
                     type="search"
                     placeholder="search"
                     name="search"
                     value={searchtext}
                     onChange={searchTextHandler}/>
              <button className='searchicon'
                      type='submit'
                      style={{background:'none',
                              padding:'5px',
                              cursor:'pointer'}}
                      onClick={searchHandler}>
                         Search Contacts     
              </button> 
            </div>
             </div>
         
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

                   <div className="item" style={{marginLeft:'auto'}}>
                    </div>
              </div>

              {multiimagechk && <>     
                 <div className='viewbox_icons'>
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
                      <div className='image_icon'
                           onClick={closehandler}>
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
                                             style={{ height:'100%',
                                                      width:'90%',
                                                      marginTop:'10px', 
                                                      objectFit:'contain'}}/>
                               )}           
                              {!imgfullscreen && (
                                         <img src= {viewimgsrc}
                                              alt='profile images'
                                              style = {{height:'65%'}}/>)}  
                
                                         <div className='viewbox_icons'>
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
                                              <div className='image_icon'
                                                   onClick={downloadimage}>
                                                 <FileDownloadIcon />
                                              </div> 
                                              <div className='image_icon' 
                                                   onClick={closehandler}>
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
                    <span className='social_icon' style={{cursor:'default'}}>
                            <RemoveRedEyeIcon/>{viewscount}
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
                    <span className='social_icon'
                          onClick={sharehandler}>
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
         <hr/>
         {/* {viewcomments &&
          <div className='commentview'>
              {Object.keys(commentData).map((key, index)=> {
                 return(
                          <div className="image-card"
                               style={{marginBottom:'10px'}}
                               key={commentData[key].id}>
             
                          <img className='image'
                               src={baseUrl+Data[key].fileName}
                               alt={Data[key].caption}
                               style={{width:'100%', height:'80%'}} /> 
                          </div>)
                        })}       
           </div> }
           {!viewcomments && <p>No Comment Snaps</p>}
          */}
               </div>    
          </div>
          {viewinfo && 
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
  
          }
        
           {!imgfullscreen &&  !showsearchresult && 
             (value===0?             
              <div className='sideview'>
                    {Object.keys(fileData).map((key, index)=> {
                       return(
                          <div className="image-card"
                               style={{marginBottom:'10px'}}
                               key={fileData[key].id}
                               onClick={() => getimg(index,fileData)}>
                          <img className='image'
                               src={baseUrl+fileData[key].fileName}
                               alt={[key].caption}
                               style={{width:'100%', height:'80%'}} /> 
                           {(fileData[key].type!='single')&&
                                   <div className='image_icon1'>
                                      <AddPhotoAlternateIcon/>
                                                  </div>
                                            }
                          <p className="image-info"
                             style={{color:'grey', fontSize:'16px'}}>
                             {fileData[key].category}     
                          </p>
                           {/* <p className="image-info"
                                 style={{color:'grey', fontSize:'16px',margin:'0'}}>
                                 {fileData[key].caption}
                               </p> */}
                         </div>)
                      })}       
               </div>  :
                <div className='sideview'>
                   {Object.keys(prescriptiondata).map((key, index)=> {
                     return(
                        <div className="image-card"
                             style={{marginBottom:'10px'}}
                             key={prescriptiondata[key].id}
                             onClick={() => getprescriptionimg(index,prescriptiondata)}>
               
                           <img className='image'
                                src={baseUrl+prescriptiondata[key].fileName}
                                alt={prescriptiondata[key].caption}
                                style={{width:'100%', height:'80%'}} /> 
                           {(prescriptiondata[key].type!='single')&&
                                                 <div className='image_icon1'>
                                                      <AddPhotoAlternateIcon/>
                                                  </div>
                                            }
                           <p className="image-info"
                              style={{color:'grey', fontSize:'16px'}}>
                               {prescriptiondata[key].category}     
                           </p>
                            {/* <p className="image-info"
                                style={{color:'grey', fontSize:'16px',margin:'0'}}>
                                {fileData[key].caption}
                             </p> */}
                        </div>)
                           })}       
                </div> )
           }
            {!imgfullscreen &&  showsearchresult && ( 
                 <div className='sideview'>
                      {Object.keys(data).map((key, index)=> {
            return(
             <div className="image-card"
                  style={{marginBottom:'10px'}}
                  key={data[key].id}
                  onClick={() => getimg(index,data)}>
                     
                  <img className='image'
                      src={baseUrl+data[key].fileName}
                      alt={data[key].id}
                      style={{width:'100%', height:'80%'}} /> 
                  
                  {/* <p className="image-info"
                     style={{color:'grey', fontSize:'16px',margin:'0'}}>
                       {fileData[key].caption}
                   </p> */}
                 </div>)
          })}       
                             </div>
                          )  }
          
          </div>
           {
               !showsearchresult && 
               <Box sx={{ width: '100%' }}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Contacts" {...a11yProps(0)} />
                          <Tab label="Prescription" {...a11yProps(1)} />
                    </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
               <Container>
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
                    {!loading && Object.keys(fileData).map((key, index) => {
                      return( 
                          <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                             <div className="image-card"
                                  key={fileData[key].id}>
                             <img className='image'
                                  src={baseUrl+fileData[key].fileName}
                                  alt={fileData[key].id}
                                  style={{width:'100%', height:'70%'}} />
                                  {(fileData[key].type!='single')&&
                                  <div className='image_icon1'>
                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
                             <div className='viewbutton' style={{position:'static', width:'auto'}}>
                                 <button className='viewbuttonicons'>
                                       <OpenInFullIcon onClick={()=>getimg(index,fileData)}/>
                                 </button>
                               <span></span>
                             </div>
                            </div> 
                      </Grid> )
                   } )}
                           
                    </Grid>
                </Container>
               </TabPanel>
                <TabPanel value={value} index={1}>
                <Container>
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
                  {!loading && Object.keys(prescriptiondata).map((key, index) => {
                      return( 
                          <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                             <div className="image-card"
                                  key={prescriptiondata[key].id}>
                             <img className='image'
                                  src={baseUrl+prescriptiondata[key].fileName}
                                  alt={prescriptiondata[key].id}
                                  style={{width:'100%', height:'70%'}} />
                             {(prescriptiondata[key].type!='single')&&
                                  <div className='image_icon1'>
                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
                             <div className='viewbutton' style={{position:'static', width:'auto'}}>
                                 <button className='viewbuttonicons'>
                                       <OpenInFullIcon onClick={()=>getprescriptionimg(index,prescriptiondata)}/>
                                 </button>
                               <span></span>
                             </div>
                            </div> 
                      </Grid> )
                   } )}
                           
                                      
                           
                    </Grid>
                </Container>
                </TabPanel>
                </Box>

              
           }
           {
               showsearchresult && 
               <>
               <div >
               <h3 style={{marginInlineStart:'30px'}}> searchResults </h3>
               </div>
                <div className='gallery'>
                     
                {objLength &&
                  Object.keys(fileData).map((key, index) => {
                   return( 
                      <div className="image-card"
                           key={fileData[key].id}>
                        <img className='image'
                             src={baseUrl+fileData[key].fileName}
                             alt={fileData[key].id}
                             style={{width:'100%', height:'70%'}} />
                        {(fileData[key].type!='single')&&
                          <div className='image_icon1'>
                          <AddPhotoAlternateIcon/>
                          </div>
                        }
                      <div className='viewbutton'  style={{position:'static'}}>
                        <button className='viewbuttonicons'>
                           <OpenInFullIcon onClick={()=>getimg(index,fileData)}/>
                       </button>
                      <span></span>
                                   
                   </div>
                      </div>  )
               }
             )}
              {!objLength && <span> No images found </span>}   
               </div>
               </>
              
            }
            {commentmodalOpen && 
              <CommentModal 
                   setcommentOpenModal={setcommentModalOpen}
                   commentfilesrc={tocomment}
                   comments={commentscount}/>}
        </div>    
        </>
    );
}

export default Contacts;
