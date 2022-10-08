//import { margin } from "@mui/system";
import './Viewsharedimages.css'
import React from "react";
import { useEffect,useState } from "react";
//import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
//import queryString from 'query-string';
//import { useHistory } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';

const Viewsharedimages = () => {
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
   // const history = useHistory();
   // const [imageindex, setimageindex] = useState(0);
    const [shareimages, setshareimages]=useState(false)
    const [fileData, setfileData]=useState([]);
    const [title, setTitle]=useState('');
    const [user, setuser]=useState();
    const [name, setName]=useState('');
    const [imgfullscreen, setimgfullscreen ] = useState(false);
    const [viewimgsrc, setviewimgsrc]= useState('');
    // const [showPrev, setshowPrev] = useState(true);
    // const [showNext, setshowNext] = useState(true);
    const [model, setModel] = useState(false);
   // const { search } =useLocation();
   // const { referenceNumber } =queryString.parse(search);
    const { referenceNumber }= useParams();
    const controller= new AbortController();
   
    async function getData() 
    {
        if(referenceNumber===undefined)
        {
            alert('no ref number');
            setshareimages(false);
            return;
        }
        else
        {
          // console.log(referenceNumber);
          setshareimages(true);
          const api=`https://www2.executesimple.com/service/getSharedFiles?referenceNumber=`+referenceNumber;
          console.log(api);
          const result=await fetch(api,{signal:controller.signal});          
          const getResult= await result.json();
          const data=getResult.sharedFiles;
          //const filename = Object.keys(data);
          console.log(data);
          //var sharefiledetails=[];
          // sharefiledetails.push({
          //   'filenames':data.fileNames
          // })
          // if(sharefiledetails[0].filenames)
          // {
            setfileData(data.fileNames);
            setTitle(data.title);
            setuser(data.user);
            console.log(user);
          //}
          // setfileData(sharefiledetails[0].filenames);
          var userDetails=[];
          userDetails.push({
              'user':data.user
            })
            if(userDetails[0].user)
            {
              var fname=userDetails[0].user.firstName;
              var lname=userDetails[0].user.lastName;
              setName(fname+' '+lname);
            }
          console.log(fileData);
          console.log(title);
          console.log(user);
          console.log(name)
          //alert(data.fileNames)
        }
    }
    useEffect(
        ()=>{
          let controller= new AbortController();
            getData();
            return() => 
            {
              // clearInterval(timer);
              controller.abort();
            } 
        }, []
    )

    async function downloadimage(file){
      const url = baseUrl+file;
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
    const closehandler =()=>{ 
     
        setimgfullscreen(false);
      
        setModel(false); 
      }
    const gotohome= () => {
      const win=window.open("/", "_blank")
      win.focus();
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
    const downloadAllimages = ()=> {
      fileData.forEach(downloadimagefromarray)
    }
    const getimg=(index, imageobjects) =>
    {  
      setimgfullscreen(true); 
      setModel(true); 
      setviewimgsrc(baseUrl+index);
      console.log(viewimgsrc);
      let length=imageobjects.length;
      // if(length===1)
      // {
      //   setshowNext(false);
      //   setshowPrev(false);
      //   console.log(showNext,showPrev);
      // }   
      // else
      // {
      //   if(index===0 )
      // {
      //   setshowNext(true);
      //   setshowPrev(false);
       
      //   console.log(showNext,showPrev);
      // }
      // else
      // {
      //   setshowPrev(true);
      //   console.log(showNext,showPrev);
      // }
      // if(index===(fileData.length-1))
      // {
      //   setshowPrev(true);
      //   setshowNext(false);   
      //   console.log(showNext,showPrev);
      // }
      // else
      // {
      //   setshowNext(true);
      //   console.log(showNext,showPrev);
      // }
      // }
     
     }
    //  const prevImage =() =>   
    //  {
    //    var index;
    //    if(imageindex===0)
    //    {
    //        index=fileData.length-1;
    //    }
    //    else{
    //        index=imageindex-1;
    //    }
    //    setimageindex(index);
    //    getimg(index, fileData);
    //  }

    //  const nextImage=() =>     
    //  {
    //    var index;
    //    if(imageindex===(fileData.length-1))
    //    {
    //        index=0;
    //    }
    //    else
    //    {
    //        index=imageindex+1;
    //    }
    //    setimageindex(index);
    //    getimg(index, fileData);
    //  }

    return (
       <>
         <div className='userprofile2'>
         <h1> Shared Images </h1>
             <div className='shareheader'>
               <p>Title: {title}</p>
               <p>Shared By: {name}</p>
               <button className="comment-btn2"
                       onClick={downloadAllimages}>
                  Download all images
                </button>
                <button className="comment-btn2"
                       onClick={gotohome}>
                  Go to MySnaps
                </button>
             </div>
              
              <hr/>
              <div className={model?"model open":"model"}>
              <div className={!imgfullscreen?'viewbox':'showfullscreen'}>             
                 {imgfullscreen && (
                     <img src={viewimgsrc}
                       alt='profile images'
                       style={{ height:'100%', 
                                objectFit:'contain',
                                marginTop:'10px'}}/>
                       )}           
                 {/* {!imgfullscreen && (
                     <img src={viewimgsrc}
                     alt='profile images'
                      style={{height:'65%'}}/>)}  
                 */}
             <div className='viewbox_icons'>
                 {/* <div className='image_icon'
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
                 </div>  */}
                 <div className='image_icon' onClick={closehandler}>
                   <CloseIcon />
                 </div>
             </div>  
             
           </div>
          <div>
           {/* <div className='image-info'>
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
           </div> */}
           {/* <div className='viewbox_social_icons'>
                   
                    {!typecomments &&
                 <span className='social_icon' style={{cursor:'default'}}>
                    <RemoveRedEyeIcon/> 
                    {viewscount}
                    <span className="tooltiptext1">views</span>
                 </span> }
                 <span className='social_icon'
                       style={{color: 'green'}}>
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
 
                
                 <span className='social_icon' onClick={Fullscreenviewer}>
                     <FullscreenIcon/>
                     <span className="tooltiptext1">view fullsize</span>
                 </span> */}
                 {/* <span className='social_icon' onClick={sharehandler}>
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
             
           </div>    */}   
           </div>
           {/* {viewinfo && 
                <>       
                 <Imageinfo catinfo={category} 
                            captinfo={caption}
                            userinfo={userInfo} 
                            Remarksinfo={remarks}
                            locationinfo={location}
                            setInfoview={setviewInfo}/>
               </>
           } */}
           {/* {!imgfullscreen && ( 
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
                   <p className="image-info"
                      style={{color:'grey', fontSize:'16px'}}>
                       {fileData[key].category}     
                   </p>
                  <p className="image-info"
                     style={{color:'grey', fontSize:'16px',margin:'0'}}>
                       {fileData[key].caption}
                   </p>
                   
                 </div>)
          })}       
                             </div>
                          )  } */}
          
              </div>
              {shareimages &&
           <div className="gallery">   
            
              {fileData.map((key) => {    
                   return(
                       <div className="image-card1" 
                            key={key}>
                              <img className='image'
                                   src={baseUrl+key}
                                   alt={key}
                                   style={{width:'100%', height:'80%'}} />
                    <div className='viewbutton'>
                     <button className='viewbuttonicons'>
                        <OpenInFullIcon onClick={() => getimg(key)}/>
                     </button>
                     <span></span>
                     <button className='viewbuttonicons'>
                        <FileDownloadIcon onClick={()=>downloadimage(key)}/>
                     </button>                   
                   </div>
                       </div>)
                })}           
           </div> }

           {!shareimages &&  <p> no data found</p>

           }
         </div>
       
       </>         
    );


}

export default Viewsharedimages;