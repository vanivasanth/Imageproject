import React from "react";
import './previewcard.css'
import { useState } from "react";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const Previewcard=(props)=> {

    
    const closePreview=()=>{
        props.setpreviewModal(false);
    }
    const [selectedimages, setselectedImages]=useState([props. prevselectedfiles]);
    
    const Removefile = (item)=> {
        setselectedImages((prevselectedImages)=>
      {
        return prevselectedImages.filter(names=>names !== item);
      });

    }
    return(
        <>
        <div className="Previewbg">
        <div className="PreviewModalContainer">
           <button className="cancelbutton"
                   onClick={closePreview}>
               <CancelPresentationIcon/>
           </button>
           <div className="PreviewflexContainer">

           {selectedimages.map((item)=>{
            return(
                <div className="image-card1">
                     <img className='image'
                          src={item}
                          style={{width:'100%', height:'80%'}}
                          alt={'sharedimage'}/>
                     <button className='viewbutton1'
                             style={{width:'100%',textAlign:'center'}}
                             onClick={() => Removefile(item)}>
                                                 Remove
                     </button>
                </div>)
            })
          }
           </div>
        </div>
        </div>
        
        </>
    );
}

export default Previewcard;
