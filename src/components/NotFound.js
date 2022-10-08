import React from "react";
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
const NotFound=() => {

    const history = useHistory();
    
    const onClose =() =>
    {
        history.push('/')
    }
    return(
        <div className="delmodalBackground">
        <div className="delmodalContainer">
        
           <div className='close_icon'>
               <CloseIcon onClick={onClose}/>
              
           </div>
           <div className='del-content'
                style={{ margin:'15px',
                         marginTop:'100px',
                         fontSize:'24px'}}>
             404 Page not found
           </div>  
             <div >
                 <button className='del-button'
                   onClick={onClose}>
                     Go to Home
                 </button>
             </div>       
           </div>
        </div>
        
    );
}

export default NotFound;