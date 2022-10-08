import './CommentModal.css';
import Uploadcomment from './Uploadcomment';
import Sidebarmodal from './Sidebarmodal';

//import { useHistory } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Imageinfo from './Imageinfo';
//import {useCallback} from 'react'
import axios from 'axios';
import { BsSkype } from "react-icons/bs";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import Searchresults from './Searchresults';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import MmsIcon from '@mui/icons-material/Mms';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
//import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
//import PersonIcon from '@mui/icons-material/Person';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
//import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
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

const CommentModal = (props) =>
{
  //const history = useHistory(); 
  const [showupload, setshowupload] = useState(false);
  const [idFromButtonClick, setIdFromButtonClick] = useState(1);
  const showpopup =()=> 
  {
    setIdFromButtonClick(idFromButtonClick+1);
    if(localStorage.getItem('auth_token')===null ||
    localStorage.getItem('auth_token')===undefined)
    {
      alert('login to continue');
    }
    else
    setshowupload(true);
  }

  
  const finame=props.commentfilesrc;
  const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
  const imgsrc=baseUrl+props.commentfilesrc;
  const [model, setModel] = useState(false);
  const [viewimgsrc, setviewimgsrc]= useState('');
  const [viewcomments, setviewcomments]= useState(false);
  
  const [commentData, setCommentData]= useState('');
  const [imgfullscreen, setimgfullscreen ] = useState(false);
  const [imageindex, setimageindex] = useState(0);
  //const [isActive, setIsActive] = useState(false);
  const [category,setCategory]=useState('');
  const [caption,setCaption]=useState('');
  const [remarks, setRemarks]= useState('');
  const [userInfo,setuserInfo]=useState('');
  
  const [viewinfo, setviewInfo]=useState(false);
  const [showPrev, setshowPrev] = useState(true);
  const [showNext, setshowNext] = useState(true);
  const [favcount, setfavcount]= useState(0);
  
  const [likescount, setLikescount]= useState(0);
  const [clickedfilename, setclickedfilename] = useState('');
  const [isFav, setIsFav] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [shareactive,setshareactive]= useState(false);
  
  const sharehandler = () =>{ setshareactive(!shareactive);   }
  //const usernavhandler = () => setIsActive(!isActive);
  const [sidebar, setSidebar] = useState(false);
    //const [index1, setindex] = useState();
  const showSidebar = () => setSidebar(!sidebar);
  //const showInfo =() =>setviewInfo(!viewinfo);
 // const dropdownRef = useRef(null);
  const controller= new AbortController();
  const signal=controller.signal;

  // const formatday = (dayval) => {
  //   if(dayval<10){
  //        dayval='0'+dayval;
  //   }
  //   return dayval;
  // }

  // const formatmonth = (monval) => {
  //     if(monval<10){
  //         monval='0'+monval;
  //     }
  //     return monval;
  // }

  // const dateformatting =() => {
  //   const current = new Date();
  //   const dayval=`${current.getDate()}`;
  //   const monval=`${current.getMonth()+1}`;
  //   const year = `${current.getFullYear()}`;
  //   const day = formatday(dayval);
  //   const month = formatmonth(monval);
  //   const toDate = year+'-'+month+'-'+day;
  //   const dateval='fromdate=2022-01-01'+'&todate='+toDate;
  //   return dateval;
  // }

  // const datestring=dateformatting();
  async function getcommentData(imagefilename)
         {
              //  console.log('view comments');
               console.log(imagefilename);
               const geturl='https://www2.executesimple.com/getFileSearchDetailLists?';
               const url=geturl+'filename='+imagefilename+ '&search=comments';
               console.log(url);
               const api= url;
               const result=await fetch(api,{signal:signal});
               const getResult= await result.json();
               console.log(getResult.allUsersChatFiles);
               setCommentData(getResult.allUsersChatFiles);
               console.log(commentData);
         }

   // useEffect(() => {
    
  //   },[]);
  useEffect(() => {
    
    console.log('useEffect',viewcomments);
    if(props.comments>=0)
      {
        console.log('if-block',viewcomments);
       getcommentData(props.commentfilesrc);       
       setviewcomments(true);
      }
    else
      {
        setviewcomments(false);
      }
    
    return() => {
      controller.abort();
      }
     },[showupload]);

     async function getsinglefileData(imagefilename)
     {
              const userID= localStorage.getItem('id');
              const geturl='https://www2.executesimple.com/getSingleFileDetails?filename=';
              const url=geturl+imagefilename+'&userId='+userID;
              const api= url;
              const result=await fetch(api,{signal:signal});
              const getResult= await result.json();
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
              counts.push({'favouritesCount':getResult.commentFileDetails.favouritesCount,
                           'likesCount':getResult.commentFileDetails.likesCount,
                                              
                           'user':getResult.commentFileDetails.user,                           
                          });
              
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
              console.log(userInfo);
              setCategory('');
              console.log(category);
              setCaption('comment snap');
              console.log(caption);
              setRemarks('');
              console.log(remarks);
              console.log('counts', counts);
     }
  const onClose = () => {
        //  setdelOpenModal(false);
          props.setcommentOpenModal(false);
        }
    //     const addview=(filename) =>{
      
    //       let formData={"fileName":filename.fileName}
    //         const headers = {
    //          'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    //          };
    //        axios.post('https://www2.executesimple.com/updateUserViews',
    //         formData, { headers })
    //          .then(response => {
    //          console.log("response ", response)
            
    //          if(response.data.result_code===0)
    //          {
    //          console.log('added to views');
    //          }
    //         else
    //         {
    //             console.log(response.data.result_text);
    //         }
    //      });       
  
    //   }
    //   const searchTextHandler=(event) =>
    //   {
    //     setSearchtext(event.target.value)  
    //   }
    //   const onClosesearch = () =>
    //   {
    //     setgotosearch(false)
    //   }
    //   async function searchdata(query, datestr)
    //   {
    //         const queryparams = query+datestr;
    //         const headers = {
    //           'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    //       };
    //       const api=`https://www2.executesimple.com/getSearchFiles?`+queryparams;
    //       const result=await fetch(api,{headers});
                     
    //         const getResult= await result.json();
    //         setsdata(getResult.userChatFiles);
          
    //   }
    //   const searchHandler = (event)=> {
    //    event.preventDefault();
    //    setModel(false); 
    //    setgotosearch(true);
    //    const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
    //    searchdata(query, datestring);   
    // }
     const Fullscreenviewer = () => {
       
         setimgfullscreen(true)
     }
    //  const imageuploadhandler=() => {
    //   setModel(false); 
    //   setModalOpen(true);
    //  }
     
     const closehandler =()=>
     { 
       if(imgfullscreen===true)
       {
         setimgfullscreen(false);
       }
       else
       {
         setModel(false); 
       }       
     } 
     
     const addTofavourites = (filename) =>
      {
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
    alert('added to recent downloads')           
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
  const getimg=(index,imageobjects) =>
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
                   if(index===(commentData.length-1))
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
          const user=imageobjects[index].user.firstName+' '+imageobjects[index].user.lastName;
          setclickedfilename( imageobjects[index].commentFileName);        
          setuserInfo(user);
          setviewimgsrc(baseUrl+imageobjects[index].commentFileName);
          setModel(true);    
          getsinglefileData(imageobjects[index].commentFileName); 
         // getcommentData(imageobjects[index].fileName);
         //  getsinglefileData(imageobjects[index].fileName);
         // addview( imageobjects[index].fileName);           
        }
  //       const handleClick = () => {
  //         const article = { title: 'React POST Request Example' };
  //         const headers = {
  //             'Authorization':'Bearer '+ localStorage.getItem('auth_token')
  //         };
  //         axios.post('https://www2.executesimple.com/userLogout',article, { headers })
  //             .then(response => {
  //             console.log("response ", response)
  //           //  const tempdata= response.data;
  //           // if(response){

  //           // }
  //             if(response.data.result_code===0)
  //             {
  //                 localStorage.clear();
  //                 history.push('/Logout');          
  //             }
  //            else
  //            {
  //                console.log(response.data.result_text);
  //            }
             
  //         });       
  //  }
  const prevImage =() =>   
        {
          var index;
    
          if(imageindex===0)
          {
              index=commentData.length-1;
          }
          else{
              index=imageindex-1;
          }
          setimageindex(index);
          getimg(index,commentData);
         
        }
    
  const nextImage=() =>     
        {
          var index;
    
          if(imageindex===(commentData.length-1))
          {
              index=0;
          }
          else
          {
              index=imageindex+1;
          }
          setimageindex(index);
          getimg(index, commentData);
        }
            
     return(
      <div className="commentmodalBackground">
          <div className="commentmodalContainer">
          
             <div className='comment-close_icon'>
                   <CloseIcon onClick={onClose}/>
             </div>
             <h2>Picture comments </h2>
             <div className='comment-preview-holder'>
                 <img src={imgsrc} alt="" id="img" className="img" /> 
                 <div className='add-comment'
                      onClick={showpopup}> 
                    <p className='addicon'>
                                       <AddIcon/>  
                                       <span className="tooltiptext1">Add Comment</span>
                    </p>
                   
                  </div>
                  {showupload &&
                   <Uploadcomment fname={finame}
                                  setShowmodal={setshowupload}/> }
           
             </div>
             {!viewcomments   &&  <> <p> No Comments</p></>}
             <div className='userprofile'>
     
      <div className={model?"model open":"model"}>
      <div className='preview_header'>
           <div className='menu_icon'
                style={{marginLeft:'-850px'}}>
               {!sidebar && (<MenuIcon onClick={showSidebar}/>)}
                
               {sidebar && (
                <div>
                <CloseIcon onClick={showSidebar}/>
                <Sidebarmodal/>
                </div>
                )}
               
           </div>
           <div className='item' >
              <h1 className='heading' style={{padding:'15px',marginLeft:'10px'}}>MySnaps</h1>
           </div>
           <div className='item'
                style={{marginLeft:'80px'}}>
              <h2>Picture comments of </h2>
            </div>
             <div className='comment-preview-holder-title item'>
                 <img src={imgsrc} alt="" id="img" className="img" /> 
          </div>
       
     </div>

    



   <div 
   className={!imgfullscreen?'viewbox':'showfullscreen'}>             
         {imgfullscreen && (
             <img src={viewimgsrc}
               alt='profile images'
               style={{ height:'100%', marginTop:'10px'}}/>
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
         <div className='image_icon' onClick={downloadimage}>
           <FileDownloadIcon />
         </div> 
         <div className='image_icon' onClick={closehandler}>
           <CloseIcon />
         </div>
     </div>  
     
   </div>
  <div>
   <div className='image-info'>
       <h3 style={{marginLeft:'10px'}}>comment by: <span>{userInfo} </span> 
       {/* {!viewinfo &&
         <button className='viewinfobutton'
                 onClick={showInfo}> view more details</button>
       }
        {viewinfo &&
         <button className='viewinfobutton'
                 onClick={showInfo}> Hide details</button>
       } */}
      </h3>
   </div>
   <div className='viewbox_social_icons'>
            {/* <span className='social_icon'>
                <PersonIcon/>
                {user} 
            </span> */}
             
               
         
         {/* <span className='social_icon' style={{cursor:'default'}}>
            <RemoveRedEyeIcon/>{viewscount}
            <span className="tooltiptext1">views</span>
         </span> */}
         <span className='social_icon'
                style={{color: isLike? 'green':'rgb(70, 69, 69)'}}>
             <ThumbUpAltIcon 
               onClick={()=>addToliked(commentData[imageindex].commentFileName)}/> 
             {likescount}
             <span className="tooltiptext1">click to Like</span>
         </span>
        
         <span className='social_icon'
               style={{color: isFav? 'green':'rgb(70, 69, 69)'}}>
             <FavoriteBorderIcon
              onClick={()=>addTofavourites(commentData[imageindex].commentFileName)}/> 
             {favcount}
             <span className="tooltiptext1">Add to favourites</span>
         </span>
         <span className='social_icon' onClick={Fullscreenviewer}>
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
          
          */}
   </div>    
   </div>
   {viewinfo && 
       <>
       
        <Imageinfo catinfo={category} 
                   captinfo={caption}
                   userinfo={userInfo} 
                   Remarksinfo={remarks}
                   setInfoview={setviewInfo}/>
       </>
        }
   {!imgfullscreen && ( 
         <div className='sideview'>
              {Object.keys(commentData).map((key, index)=> {
                 return(
                          <div className="image-card"
                               style={{marginBottom:'10px'}}
                               key={commentData[key].id}
                               onClick={() => getimg(index,commentData)}>
             
                          <img className='image'
                               src={baseUrl+commentData[key].commentFileName}
                               alt={commentData[key].caption}
                               style={{width:'100%', height:'80%'}} /> 
                          <p className="image-info"
                             style={{color:'grey', fontSize:'16px'}}>
                             {commentData[key].caption}     
                          </p>
                          <p className="image-info"
                             style={{color:'grey', fontSize:'16px',margin:'0'}}>
                             {commentData[key].category}
                          </p>
                         </div>)
                        })}       
         </div>
                  )  }
  
  </div>
  {!viewcomments && <p>No Comment Snaps</p>}
    { viewcomments   &&
             <div className="gallery">
                {/* {gotosearch && 
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
             } */}
                {Object.keys(commentData).map((key, index) => {
         
                 return(
                         <div className="image-card" 
           key={commentData[key].id}>
          <img className='image'
               src={baseUrl+commentData[key].commentFileName}
                alt={commentData[key].caption}
               style={{width:'100%', height:'70%'}} />
            <div className='image__overlay'>
            <div className='image__overlay--icon'> 
               <OpenInFullIcon onClick={() => getimg(index,commentData)}/>
            </div>
            </div>
            <p className="image-info"
                      style={{color:'grey', fontSize:'16px'}}>
                         {commentData[key].user.firstName} 
                         {commentData[key].user.lastName}      
                   </p>
    </div>)
 })}           
</div> }

             </div>  
            </div> 
   </div>  
     )
}

export default CommentModal;