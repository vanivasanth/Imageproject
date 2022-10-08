import './gallery.css';
import CommentModal from './CommentModal';
import Sidebarmodal from './Sidebarmodal';
import Imageinfo from './Imageinfo';
//import { useHistory} from 'react-router-dom';
//import axios from 'axios';
import {useState, useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Searchresults from './Searchresults';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MmsIcon from '@mui/icons-material/Mms';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
//import PersonIcon from '@mui/icons-material/Person';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MultiImagetile from './Multiimagetile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
//import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LoadingSpinner from './Loadingspinner';
//import OfflineShareIcon from '@mui/icons-material/OfflineShare';
//import FeedTwoToneIcon from '@mui/icons-material/FeedTwoTone';
//import NetworkDetector from '../HOC/NetworkDetector';
import Toastcreate1 from './Toastpopup';
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Gallery = () =>
{
   // let location = useLocation();
   // const history = useHistory(); 
   // const [isLoading, setLoading] = useState(false);
    const [searchtext, setSearchtext]= useState('');
    const [gotosearch, setgotosearch]= useState(false);
    const [sdata, setsdata]=useState('');
    const [refreshchk, setrefreshchk]= useState('');
   // const [refreshchkDate, setrefreshchkDate]=useState('');
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
   // const dropdownRef = useRef(null);
    const [model, setModel] = useState(false);
    const [viewimgsrc, setviewimgsrc]= useState('');
    const [loading, setloading]=useState(false);
   // const [current, setCurrent] = useState(0);
    const [imgfullscreen, setimgfullscreen ] = useState(false);
    //const objLength= 0;
   // const [isActive, setIsActive] = useState(false);
   // const [todelete, settodelete]= useState();
    //const [tocomment, settocomment]= useState();
    //State variables To open model popup
   // const [modalOpen, setModalOpen] = useState(false);
    const [clickedfilename, setclickedfilename] = useState('');
    //const [delmodalOpen, setdelModalOpen] = useState(false);
    //const [commentmodalOpen, setcommentModalOpen] = useState(false);
    const [category,setCategory]=useState('');
    const [caption,setCaption]=useState('');
    const [multiimagechk, setmultiimagechk]=useState(false);
    const [multiimagelist, setmultiimagelist] = useState([]);
    const [remarks, setRemarks]= useState('');
    const [userInfo,setuserInfo]=useState('');
    const [viewinfo, setviewInfo]=useState(false);
    const [location, setlocation]= useState('');
    const [favcount, setfavcount]= useState(0);
    const [viewscount, setviewscount]= useState(0);
    const [likescount, setLikescount]= useState(0);
    const [commentscount, setCommentsCount]= useState(0);
    const [createdTime, setcreatedTime]=useState('');
    const [textOnImage, settextOnImage]=useState('');
   // const [viewcomments, setviewcomments]= useState(false);
    //const [commentData, setCommentData]= useState('');
    const [objLength, setobjectLength]= useState(true);
    const [showPrev, setshowPrev] = useState(true);
    const [showNext, setshowNext] = useState(true);
    const [tocomment, settocomment]= useState();
    const [commentmodalOpen, setcommentModalOpen] = useState(false);
    const [fileData, setfileData] = useState('');
   // const [singlefileData, setsinglefileData]= useState('')
    const [imageindex, setimageindex] = useState(0);
    //const usernavhandler = () => setIsActive(!isActive);
    const [sidebar, setSidebar] = useState(false);
    const [showtoast, setshowtoast ]=useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const showInfo =() =>setviewInfo(!viewinfo);
    const controller= new AbortController();
    const signal=controller.signal;
    const [phoneNo, setphoneNo]= useState([]);
    const [emailId, setemail]=useState([]);
    const [websites, setwebsites]=useState([]);
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

      const token=localStorage.getItem('auth_token') ;
      

    async function getData()
    {
       setloading(true)
        const api=`https://www2.executesimple.com/getAllUserFiles?`+datestring;
        const result=await fetch(api,{signal:signal});
        const getResult= await result.json();
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
        console.log(getResult);    
        setloading(false);    
  }
  async function getsinglefileData(imagefilename)
  {
           console.log('view details');
           console.log(imagefilename);
           const geturl='https://www2.executesimple.com/getSingleFileDetails?filename=';
           const url=geturl+imagefilename;
           console.log(url);
           const api= url;
           const result=await fetch(api,{signal:signal});
           const getResult= await result.json();
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
                 if(counts[0].Text)
                   {
                    settextOnImage(counts[0].Text)
                   }
                 console.log(textOnImage); 
                 if(counts[0].createddate)
                   {
                    setcreatedTime(counts[0].createddate)
                   }
                 console.log(createdTime);       
                 if(counts[0].location)
                   {
                     setlocation(counts[0].location.address)
                   }
                 console.log(location); 
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
  async function chkupdate()
    {
                 const api=`https://www2.executesimple.com/getRefreshCheckData`;
                 const result=await fetch(api,{signal:signal});
                 const getResult= await result.json();
                 console.log(getResult);
                 setrefreshchk(getResult.refreshCheckData);
                 console.log(refreshchk);
    }
    useEffect(()=> 
    {
        let controller= new AbortController();
       
        getData();
        // const timer = setInterval(() => 
        //  {
        //   chkupdate();
        //   const prevDate=refreshchkDate;
        //   setrefreshchkDate(refreshchk.createdDate);
        //   console.log(refreshchkDate);
        //    if(prevDate===refreshchkDate)
        //      {
        //           getData();
        //           setLoading(true);
        //      }          
        //  }, 1000);
        return() => 
           {
           //  clearInterval(timer);
             controller.abort();
           }       
    },[]);

    const searchTextHandler=(event) =>
     {
       setSearchtext(event.target.value)  
     }
    const onClosesearch = () =>{
        setgotosearch(false)
     }
    const getimg=(index, imageobjects) =>
    { 
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
        getsinglefileData(imageobjects[index].fileName);
        setModel(true);         
     }
  
     const prevImage =() =>   
     {
       var index;
 
         if(imageindex===0)
         {
             index=fileData.length-1;
         }
         else
         {
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
    const Fullscreenviewer = () =>
    {
        setimgfullscreen(true)
    }
    
    const closehandler =()=>
    { 
        setModel(false); 
        setimgfullscreen(false);
    } 

   const addToliked = (filename) =>
    {
        setshowtoast(true);
    //     setclickedfilename(filename);
    //     console.log(clickedfilename);
    //    let formData={"fileName":clickedfilename}
    //     const headers = {
    //      'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    //    };
    //    axios.post('https://www2.executesimple.com/updateUserLikes',formData, { headers })
    //      .then(response => {
    //      console.log("response ", response)
        
    //      if(response.data.result_code===0)
    //      {
    //       alert('added to Liked images')           
    //      }
    //     else
    //     {
    //         console.log(response.data.result_text);
    //     }
    //  });       
     }

    // const deleteimage =(item1) => 
    // {
    //     settodelete(baseUrl+item1);
    //     setdelModalOpen(true);
    // }

    const commentSnaps=() => {
      settocomment(clickedfilename);
      setcommentModalOpen(true);       
    } 

    const downloadimage = () => {
        setshowtoast(true);
      
    };
    
    const addTofavourites = () => {
        setshowtoast(true);
    }
    async function searchdata(query, datestr)
    {
          const queryparams = query+datestr;
          const api=`https://www2.executesimple.com/getAllUserSearchFiles?`+queryparams;
          const result=await fetch(api);          
          const getResult= await result.json();
          setsdata(getResult.allUsersChatFiles);
    }
   const searchHandler = (event)=> {
      event.preventDefault();
      setModel(false); 
      setgotosearch(true);
      const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
      searchdata(query, datestring);   
   }

    return (
       <div className='userprofile'>
            
                   <div className='flex-item heading'
                        style={{marginRight:'auto',color:'rgb(180, 12, 166)'}}> 
                         Welcome Guest 
                   </div>
            
              <div className='snap_updates'>
                   <h1>  Recent updates </h1>          
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
                        style={{padding:'5px',
                                border:'1px solid rgb(118, 118, 118)'}}
                        onClick={searchHandler}>
                         <SearchIcon/>
                   </div>
               <div className="item" style={{marginLeft:'auto'}}>
                  {/* <button onClick={usernavhandler} className="menu-trigger">
                      <span> <PersonIcon/>  </span>
                      <span> <ArrowDropDownCircleIcon/> </span>
                  </button>
                  <nav  ref={dropdownRef} 
                       className={`menu ${isActive ? "active" : "inactive"}`}>
                       <ul>
                        
                         <li  onClick={imageuploadhandler}>
                              <p>Upload</p>
                         </li>
                         <li onClick={handleClick}>
                            <p  >Logout</p>
                         </li>  
                        </ul>
                 </nav> */}
               </div>
              </div>

              {multiimagechk && <>
     
     <div className='viewbox_icons' style={{marginTop:'-10px'}}>

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
     
     <div className='image_icon' onClick={downloadimage}>
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
                 {imgfullscreen && (
                     <img src={viewimgsrc}
                       alt='profile images'
                       style={{ height:'100%', width:'90%',marginTop:'10px', objectFit:'contain'}}/>
                       )}           
                 {!imgfullscreen && (
                     <img src={viewimgsrc}
                     alt='profile images'
                      style={{height:'65%'}}/>)}  
                
             <div className='viewbox_icons'>
                 <div className='image_icon'
                      style={{display: showPrev? '': 'none'}}
                      onClick={prevImage}>
                    <KeyboardArrowLeftIcon />
                 </div>
                 <div className='image_icon'
                      style={{display: showNext? '': 'none'}}
                      onClick={nextImage}>
                    <KeyboardArrowRightIcon/>
                 </div>
                 <div className={`image_icon ${token!==null?'uactive':'inactive'} `} 
                      onClick={downloadimage}>
                   <FileDownloadIcon />
                   <span className="tooltiptext">Signin to explore</span>
                 </div> 
                 <div className='image_icon' onClick={closehandler}>
                   <CloseIcon/>
                 </div>
             </div>  
             
           </div>
            }
          <div>
           <div className='image-info'>
               <h1 style={{marginLeft:'10px',  width:'65%'}}>
               {caption}
               {!viewinfo &&
                   <button className='viewinfobutton'
                           onClick={showInfo}>
                     view more details
                   </button>
               }
               {viewinfo &&
                   <button className='viewinfobutton'
                           onClick={showInfo}> 
                           Hide details
                   </button>
               }
               </h1>
           </div>
           <div className='viewbox_social_icons'
                style={{marginBottom:'40px'}}>
                    {/* <span className='social_icon'>
                        <PersonIcon/>
                        {user} 
                    </span> */}
                 <span className='social_icon' style={{cursor:'default'}}>
                    <RemoveRedEyeIcon/> {viewscount}
                    <span className="tooltiptext1">views</span>
                 </span>
                 <span 
                    className={`social_icon ${token!==null?'uactive':'inactive'} `}
                    onClick={()=>addToliked()}>
                     <ThumbUpAltIcon />  {likescount}
                     <span className="tooltiptext">Signin to explore</span>
                 </span>
                 
                 <span 
                     className={`social_icon ${token!==null?'uactive':'inactive'} `}
                     onClick={()=>addTofavourites()}>
                     <FavoriteBorderIcon />   {favcount}
                     <span className="tooltiptext">Signin to explore</span>
                 </span>
                 <span
                     className='social_icon'
                     onClick={()=>commentSnaps()}>
                     <MmsIcon />  {commentscount}
                     <span className="tooltiptext">Signin to explore</span>
                 </span>
 
                 <span 
                    className={`social_icon ${token!==null?'uactive':'inactive'} `}
                    onClick={()=>addTofavourites()}>
                     <ShareIcon/>
                     <span className="tooltiptext">Signin to explore</span>
                 </span>
                 <span className='social_icon' 
                       style={{display:multiimagechk?'none':''}}
                       onClick={Fullscreenviewer}>
                     <FullscreenIcon/>
                 </span>
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
           {!imgfullscreen && ( 
                 <div className='sideview'>
                      {Object.keys(fileData).map((key, index)=> {
            return(
             <div className="image-card"
                  style={{marginBottom:'10px'}}
                  key={fileData[key].id}
                  onClick={() => getimg(index,fileData)}>
                     
                  <img className='image'
                       src={baseUrl+fileData[key].fileName}
                       alt={fileData[key].caption}
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
                             </div>
                          )  }
          
          </div>
          <div className="gallery">
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
             { showtoast &&
                   <Toastcreate1  settoastOpen={setshowtoast} />}
              {commentmodalOpen && 
                   <CommentModal 
                                   setcommentOpenModal={setcommentModalOpen}
                                   commentfilesrc={tocomment}
                                   comments={commentscount}/>}
               {loading &&
                   <Box sx={{width:'70vw',
                             height:'30vw',
                             display: 'flex',
                             justifyContent:'center',
                             alignItems:'center'}}>
                            <CircularProgress />
                   </Box>
               }
              {!loading && Object.keys(fileData).map((key, index) => {                 
                 return(
                  <div className="image-card" 
                       key={fileData[key].id}>          
                          
                      <img className='image'
                           src={baseUrl+fileData[key].fileName}
                            alt={fileData[key].caption}
                           style={{width:'100%', height:'70%'}} />
                        {(fileData[key].type!='single')&&
                          <div className='image_icon1'>
                          <AddPhotoAlternateIcon/>
                          </div>
                        }
                        {/* <div className='image__overlay'>
                        <div className='image__overlay--icon'> 
                           <OpenInFullIcon onClick={() => getimg(index,fileData)}/>
                        </div> */}
                        {/* <div className='image__overlay--icon'> 
                              <ThumbUpAltIcon onClick={()=>addTofavourites1(fileData[key])}/>
                            </div>
                        */}
                        {/* </div> */}
                       {/* <p className="image-info"
                          style={{color:'grey', fontSize:'16px'}}>
                                {fileData[key].caption===''? 'no data' : fileData[key].caption}     
                       </p> */}
                       <p className="image-info"
                          style={{color:'grey', fontSize:'16px',overflow:'hidden'}}>
                             {fileData[key].category===''? 'no data' : fileData[key].category}     
                       </p>
                       <button className='viewbutton'
                               style={{position:'static',padding:'6px 0', marginTop:'10px'}}
                               onClick={() => getimg(index,fileData)}>
                           view image
                       </button>
                </div>)
             })}           
          
       </div>
       
       </div>
    );
}

export default Gallery;