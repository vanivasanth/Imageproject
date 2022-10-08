import './Searchresults.css';
import './gallery.css';
import CommentModal from './CommentModal';
import MultiImagetile from './Multiimagetile';
//import DelModal from './DelModal';
import Sidebarmodal from './Sidebarmodal';
import axios from 'axios';
import {useState,useEffect} from 'react';
//import { useHistory } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Imageinfo from './Imageinfo';
import MmsIcon from '@mui/icons-material/Mms';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
//import PersonIcon from '@mui/icons-material/Person';
//import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
//import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const Searchresults = (props) => {
 // const history = useHistory();
  
  const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
  const Data = props.pictures;
  console.log(Data);
  const [multiimagechk, setmultiimagechk]=useState(false);
  const [multiimagelist, setmultiimagelist] = useState([]);
  const [imageindex, setimageindex] = useState(0);
  const [zeroData, setzeroData]=useState(false);
  const [createdTime, setcreatedTime]=useState('');
  const [phoneNo, setphoneNo]= useState([]);
  const [emailId, setemail]=useState([]);
  const [websites, setwebsites]=useState([]);
  const [textOnImage, settextOnImage]=useState('');


 
  //const objLength=0;
    // = ()=>{
  //   var x;
  //   (Data===undefined ? x= 0 :x=(Object.keys(Data).length))
  //   return x; 
    
  // }
//console.log(objLength);

  const [viewimgsrc, setviewimgsrc]= useState('');
  const [imgfullscreen, setimgfullscreen ] = useState(false);
   const [model, setModel] = useState(false);
   // const [isActive, setIsActive] = useState(false);
    //const [todelete, settodelete]= useState();
    const [tocomment, settocomment]= useState();
   // const [modalOpen, setModalOpen] = useState(false);
    const [category,setCategory]=useState('');
    const [caption,setCaption]=useState('');
    const [remarks, setRemarks]= useState('');
    const [userInfo,setuserInfo]=useState('');
    const [viewinfo, setviewInfo]=useState(false);
    const [location, setlocation]= useState('');
    const [favcount, setfavcount]= useState(0);
    const [viewscount, setviewscount]= useState(0);
    const [likescount, setLikescount]= useState(0);
    const [commentscount, setCommentsCount]= useState(0);
    //const [viewcomments, setviewcomments]= useState(false);
    //const [commentData, setCommentData]= useState('');
    const [showPrev, setshowPrev] = useState(true);
    const [showNext, setshowNext] = useState(true);
    const [isFav, setIsFav] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [clickedfilename, setclickedfilename] = useState('');
    //const [delmodalOpen, setdelModalOpen] = useState(false);
    const [commentmodalOpen, setcommentModalOpen] = useState(false);
    //const [fileData, setfileData] = useState('');
    const controller= new AbortController();
    const signal=controller.signal;
    //const usernavhandler = () => setIsActive(!isActive);
   // const [lengthval, setlengthval]= useState(false); 
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const showInfo =() =>setviewInfo(!viewinfo);

   
    useEffect(()=>
     {
         if((Data===undefined)||(Data.length===0)||(Data.length===undefined))
          {
            setzeroData(!zeroData);
          }
         else
         { 
            setzeroData(!zeroData);
            console.log(zeroData);
         }
        let controller= new AbortController();     
        return() => 
         {
           controller.abort();
         }
        },[]);
        async function getsinglefileData(imagefilename)
        {
                 const userID= localStorage.getItem('id');
                 const geturl='https://www2.executesimple.com/getSingleFileDetails?filename=';
                 const url=geturl+imagefilename+'&userId='+userID;
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
                 }
                 console.log('current view count ',viewscount);
                 if(counts[0].commentsCount===null)
                 {
                   setCommentsCount(0);
                 }
                 else
                 {
                  setCommentsCount(counts[0].commentsCount.counts);
                 // setviewcomments(true);
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
    const addview=(filename) =>{
    
      let formData={"fileName":filename}
        const headers = {
         'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         };
       axios.post('https://www2.executesimple.com/updateUserViews',
        formData, { headers })
         .then(response => {
         console.log("response ", response)
        
         if(response.data.result_code===0)
         {
          console.log('added to views')           
         }
        else
        {
            console.log(response.data.result_text);
        }
     });       

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
      if(index===(Data.length-1))
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
      addview(imageobjects[index].fileName);           
    }
    
    const Fullscreenviewer = () => {
        setimgfullscreen(true)
    }
    
    const closehandler =()=>{ 
       
        setModel(false); 
        setimgfullscreen(false);
    } 
    const prevImage =() =>   
    {
      var index;

      if(imageindex===0)
      {
          index=Data.length-1;
      }
      else{
          index=imageindex-1;
      }
      getimg(index, Data);
    }

    const nextImage=() =>     
    {
      var index;

        if(imageindex===(Data.length-1))
        {
            index=0;
        }
        else
        {
            index=imageindex+1;
        }
        getimg(index, Data);     
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
                     alert('added to recent downloads')           
                  }
                else
                  {
                        console.log(response.data.result_text);
                  }
  
            });       
      };

    return(
   
      <div className='search_results'>
           <h2>Search results</h2>
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
              <h1 className='heading' style={{padding:'15px'}}>My Snaps</h1>
           </div>
           <div className="item" style={{marginLeft:'auto'}}>
            </div>
           {/* <div className="item" style={{marginLeft:'20%'}}>
                 <input  style={{width:'350px', padding:'10px'}}/>
           </div>
           <div className="item" style={{padding:'5px', border:'1px solid rgb(118, 118, 118)'}}>
                 <SearchIcon/>
           </div> */}      </div>
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
     
     <div className='image_icon' onClick={()=>downloadMultiimages(multiimagelist)}>
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
      }
  <div>
   <div className='image-info'>
       <h1 style={{marginLeft:'10px'}}>{caption}
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
   <div className='viewbox_social_icons'
        style={{marginBottom:'50px'}}>
            {/* <span className='social_icon'>
                <PersonIcon/>
                {user} 
            </span> */}
         <span className='social_icon' style={{cursor:'default'}}>
            <RemoveRedEyeIcon/> {viewscount}
         </span>
        
         <span className='social_icon'
               style={{color: isLike? 'green':'rgb(70, 69, 69)'}}>
             <ThumbUpAltIcon onClick={()=>addToliked(clickedfilename)}/> 
             {likescount}
         </span>
         <span className='social_icon'
                style={{color: isFav? 'green':'rgb(70, 69, 69)'}}>
             <FavoriteBorderIcon onClick={()=>addTofavourites(clickedfilename)}/> 
             {favcount}
         </span>
          
         <span className='social_icon'>
             <MmsIcon onClick={()=>commentSnaps(clickedfilename)}/>
             {commentscount}
         </span>
         <span className='social_icon'>
             <ShareIcon/>
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
   {zeroData && !imgfullscreen && ( 
         <div className='sideview'>
              {Object.keys(Data).map((key, index)=> {
    return(
     <div className="image-card"
          style={{marginBottom:'10px'}}
          key={Data[key].id}
          onClick={() => getimg(index,Data)}>
             
          <img className='image'
              src={baseUrl+Data[key].fileName}
              alt={Data[key].caption}
              style={{width:'100%', height:'80%'}} /> 
             {(Data[key].multiChatFiles!=null)&&
                                  <div className='image_icon1'>
                                     <AddPhotoAlternateIcon/>
                                                 </div>
                                           }
           <p className="image-info"
              style={{color:'grey', fontSize:'16px'}}>
               {Data[key].category}     
           </p>
          <p className="image-info"
             style={{color:'grey', fontSize:'16px',margin:'0'}}>
               {Data[key].caption}
           </p>
         </div>)
  })}       
                     </div>
                  )  }
  
  </div>
   
     <div className="gallery">
     {/* { zeroData && <p>No data Found</p>} */}
     {commentmodalOpen && <CommentModal setcommentOpenModal={setcommentModalOpen}
                                               setviewbox={setModel}
                                  commentfilesrc={tocomment}/>}
     {zeroData && <> {Object.keys(Data).map((key, index) => {
            return(
      <div className="image-card" 
           key={Data[key].id}>
          <img className='image'
               src={baseUrl+Data[key].fileName}
               alt={Data[key].caption}
               style={{width:'100%', height:'70%'}} />
          {(Data[key].type!='single')&&
                          <div className='image_icon1'>
                          <AddPhotoAlternateIcon/>
                          </div>
                        }
            <div className='image__overlay'>
            <div className='image__overlay--icon'> 
               <OpenInFullIcon onClick={() => getimg(index,Data)}/>
            </div>     
          
            </div>
           <p className="image-info"
              style={{color:'grey', fontSize:'16px'}}>
                    {Data[key].category}     
          </p>
          <p className="image-info"
             style={{color:'grey', fontSize:'16px'}}>
                {Data[key].caption}     
          </p>
      </div>)
 })}      </>}
                
   </div>   
    </div>   
         
    );
}

export default Searchresults;