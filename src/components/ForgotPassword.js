import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
const Forgot=() => {
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
             page under construction
           </div>  
             <div >
                 <button className='del-button'
                   onClick={onClose}>
                     back
                 </button>
             </div>       
           </div>
        </div>
    );
}

export default Forgot;