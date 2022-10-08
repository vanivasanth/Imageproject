import React,{useState,useContext} from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MmsIcon from '@mui/icons-material/Mms';
import ShareIcon from '@mui/icons-material/Share';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector,useDispatch } from "react-redux";
import {
  Box,
  Tooltip,
  IconButton,
  Stack,
}
from '@mui/material';
import Accessstatus from "../modals/Accessstatus";
import SingleShareModal from "../modals/SingleshareModal";
import Commentmodal from "../modals/Commentmodal";
import { ImgarrayContext } from "../../context/ImgArrCtx";
import { SingleImgContext } from "../../context/SingleImgCtx";
import { AddToLike } from "../../store/Addtolikes";
import { AddToFav } from "../../store/Addtofav";
import Singleimagefullscreen from "./SingleImagefullscreen";
import ExpiredModal from "../modals/ExpModal";

const Socialicons=(props) => 
{  
  const ImageCtx = useContext(ImgarrayContext); 
  const SingleCtx= useContext(SingleImgContext);
  const dispatch= useDispatch();
  const [openModal, setopenModal]=useState(false);
  const [showaccess, setshowaccess]=useState(false);
  const [fullscreenstate, setfullscreenstate]=useState(false);
  const [singlesharemodel, setsinglesharemodel]= useState(false);
  const [errres,seterrres]=useState('');
  const [showcomments, setshowcomments]=useState(false);
  const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
  const favRes=useSelector((state)=>state.AddToFavourites.favres);
  const res=useSelector((state)=>state.AddToLikes.error);
  const fname=ImageCtx.singlefilename;
  //const likest=useSelector((state)=>state.AddToLikes);
  const cmtfilename=ImageCtx.commentsforfname;
  const imgtype=props.type;
  let fav=SingleCtx.isFav;
  let like=SingleCtx.islike;
  let favcount=SingleCtx.Favcount;
  let likesCount=SingleCtx.Likescount;
  //const favst=useSelector((state)=>state.AddToFav);
  
  //const id=useSelector((state)=>state.auth.userId);
  
  const handleModal=()=>
  {
    setopenModal(false);
  }
  const accesstate=()=>
  {
    setshowaccess(false);
  }
  const commentstate=()=>
  {
    setshowcomments(false);
  }
  const addToLikes=()=>
  {
    like=true;
    likesCount=likesCount+1;
    let formData= new FormData(); 
    if(loggedstatus===true)
    {
      formData={"fileName":fname}
      dispatch(AddToLike(formData))
     let b=JSON.stringify(res);
     let a=JSON.parse(b);
     let c=a.message;
     let d=c.includes("401")
     seterrres(d);
      console.log('response'+a)
      console.log(d)
    }
    else
    {
      setshowaccess(true); 
    }
  }
  const addToFav=()=>
  {
    fav=true;
    favcount=favcount+1;
    let formData= new FormData(); 
    if(loggedstatus===true)
    {      
      formData={"fileName":fname}
      dispatch(AddToFav(formData))
     
    }
    else
    {
          setshowaccess(true); 
    }
  }
  
  const viewComment=()=>
  {
    setshowcomments(true);
  }

  const shareSingleImage=()=>
  {
    if(loggedstatus===true)
    {
      setsinglesharemodel(true);
    }
    else
    {
      setshowaccess(true); 
    }
  }

  const sharestate=()=>
    {
       setsinglesharemodel(false);
    }

  const viewFullscreen=()=>
   {
     setfullscreenstate(true);
   }

  const setState=()=>
    {
       setfullscreenstate(false);
    }

    return(
        <>
           {fullscreenstate && <Singleimagefullscreen state={fullscreenstate} 
                                                      setstate={setState}/>}
           {singlesharemodel &&
             <SingleShareModal state={singlesharemodel} setstate={sharestate}/> }
             <Stack direction='row' sx={{display:'flex',                                       
                                         justifyContent:'flex-start'}}>
           
                <Box sx={{margin:{sm:'10px 2px 0 2px',md:'0 20px'}, 
                          padding:{sm:'1px',md:'5px'}}}>
                   
                   <IconButton  sx={{ margin:'10px', padding:'8px', cursor:'default'}}                                
                                edge="start" 
                                aria-label="previous">   
                        <Tooltip title="views" arrow>          
                         <RemoveRedEyeIcon/> 
                         </Tooltip>   
                   </IconButton>{SingleCtx.viewscount}
                  
                  
                   {imgtype!==true? 
                     <>
                      <IconButton sx={{margin:'10px', padding:'8px', color:like?'#09E734':''}}
                                  onClick={addToLikes}
                                  edge="start"
                                  aria-label="next">
                           <Tooltip title="Likes" arrow>          
                               <ThumbUpAltIcon/> 
                            </Tooltip>
                                  
                      </IconButton>{SingleCtx.Likescount}        
                      <IconButton sx={{margin:'10px', padding:'8px',color:fav?'#09E734':''}}
                                  edge="start"
                                  onClick={addToFav}
                                  aria-label="next">
                              <Tooltip title="favourites" arrow>          
                                  <FavoriteBorderIcon/>
                              </Tooltip>
                                 
                     </IconButton>{SingleCtx.Favcount}
                     <IconButton sx={{margin:'10px', padding:'8px'}}
                                 onClick={viewComment}
                                 edge="start"
                                 aria-label="close">
                            <Tooltip title="comments" arrow>          
                                 <MmsIcon/>
                           </Tooltip>
                                 
                     </IconButton>{SingleCtx.Commentscount}
                     <IconButton sx={{ margin:'10px', padding:'8px'}}
                                 onClick={shareSingleImage}
                                 edge="start"
                                 aria-label="next">
                        <Tooltip title="Share image" arrow>          
                            <ShareIcon/>
                        </Tooltip>
                                
                     </IconButton>
                  </>
                 :' '}
           
                <IconButton sx={{margin:'10px', padding:'8px'}}
                            onClick={viewFullscreen}
                            edge="start"
                            aria-label="next">
                              <Tooltip title="view full screen" arrow>          
                                 <FullscreenIcon/>
                              </Tooltip>
                               
                </IconButton>           
            </Box>           
           </Stack>
           {showaccess &&
              <Accessstatus setstate={accesstate} state={showaccess}/>
           }
           {showcomments &&
              <Commentmodal setstate={commentstate} 
                            filenam={cmtfilename}
                            state={showcomments}/>
           }
           {
            errres && <ExpiredModal state={openModal}
                                    setState={handleModal} />
           }
        </>
    );
}
export default Socialicons;