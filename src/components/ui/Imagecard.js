import React, { useState,useContext } from "react";
import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip
 } from '@mui/material';
 //import { AddPhotoAlternateIcon } from '@mui/icons-material';
 import OpenInFullIcon from '@mui/icons-material/OpenInFull';
 
 import Remove from "../modals/Remove";
 import ClearIcon from '@mui/icons-material/Clear';
 import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
 import ShareIcon from '@mui/icons-material/Share';
 import CheckBoxIcon from '@mui/icons-material/CheckBox';
 import { useLocation } from 'react-router-dom';
 import './Imagecard.css';
 import { MultiShareContext } from '../../context/Multishare-context';

const Imagecard =(props)=>
 {
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  const MultishareCtx = useContext(MultiShareContext);
  const shareimage=MultishareCtx.filename;
  const location = useLocation();
  const loc=location.pathname;
  const [openModal, setopenModal]=useState(false);
  const [operation, setoperation]=useState('');
  let imgsrc=props.image;
  let cuindex=props.cindex;
  let imgtype=props.typechk;

  const handleModal=()=>
  {
    setopenModal(false);
  }

  const removefromLikes=() => 
  {
    setoperation('like');
    setopenModal(true);
  }

  const removefromFavourites=()=>
  {
    setoperation('fav');
    setopenModal(true);
  }
 
  const viewImage=() =>
   {
     props.expandimage(cuindex);
   }
 
  const addToMshare = () =>
     {
        MultishareCtx.addToMultishare(imgsrc);
     }
  
  const removefromsharelist=() => 
     {
        MultishareCtx.removeImage(imgsrc);
     }

    return(
      <div className={`${shareimage.includes(imgsrc)?'image-cardselected':' '}`}>
      
       <Card sx={{ maxWidth: 300}} >
       { shareimage.includes(imgsrc) && 
                      
                      <div style={{position:'absolute',
                                   margin:'5px',
                                   backgroundColor:'rgb(2, 210, 16)',
                                   color:'white',
                                   cursor:'pointer'}}
                           onClick={removefromsharelist}> 
                         <CheckBoxIcon/>
                      </div>
        }

            {imgtype!==null && 
             loc !=='/getSharedFiles/'&&
             loc !=='/likes' &&
             loc !=='/favourites' && 
                 <div className='image_icon1'>
                   <IconButton  sx={{ color:'white',
                                      margin:'10px', padding:'0px'}}
                                
                               edge="start" 
                               aria-label="previous">
                            <AddPhotoAlternateIcon/>
                   </IconButton>                        
                 </div>
             }       

           <CardMedia component="img"
                      height="194"
                      image={baseUrl+imgsrc}
                      alt="image"/>
     
           <CardActions disableSpacing sx={{display:'flex', 
                                            justifyContent:'center'}}>            
               
                  <IconButton aria-label="view" 
                              onClick={viewImage}
                              sx={{color:'#3393FF'}}>
                      <Tooltip title="View Image" arrow>   
                       <OpenInFullIcon/>
                      </Tooltip>
                  </IconButton>
                  
                  <IconButton aria-label="view" 
                              onClick={addToMshare}
                              sx={{color:'#3393FF'}}>
                      <Tooltip title="Add to Multishare" arrow>   
                          <ShareIcon/>  
                      </Tooltip>        
                  </IconButton>
                 
                  { loc ==='/likes' && 
                     <IconButton aria-label="view" 
                                 onClick={ removefromLikes}
                                 sx={{color:'#3393FF'}}>
                        <Tooltip title="Remove from likes" arrow>   
                            <ClearIcon/>    
                        </Tooltip>
                    </IconButton>
                  }
                  { loc ==='/favourites' && 
                     <IconButton aria-label="view" 
                                 onClick={removefromFavourites}
                                 sx={{color:'#3393FF'}}>
                          <Tooltip title="Remove from favourites" arrow>   
                            <ClearIcon/>    
                          </Tooltip>
                    </IconButton>
                  }       
           </CardActions>

           {openModal && 
             <Remove state={openModal}
                     setState={handleModal}     
                     image={imgsrc}
                     action={operation}    
                      />}
         </Card>
       </div>
    );
}

export default Imagecard;