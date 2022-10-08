import './DelModal.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
//import {useState} from 'react';

const Remfavmodal = (props) =>
{
  const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
  //const [removelike, setremovelike]= useState(false);
  const imagsrc=baseUrl+props.deletefilesrc;
    //const[delOpenModal,setdelOpenModal]=useState(props.setdelOpenModal);
    const onClose = () => {
      //  setdelOpenModal(false);
        props.setdelOpenModal(false);

      }

      const removeLike =() =>{
        //console.log(item);
 
        let formData={"fileName":props.deletefilesrc}
        const headers = {
         'Authorization':'Bearer '+ localStorage.getItem('auth_token')
       };
       axios.post('https://www2.executesimple.com/removeUserFavourites',formData, { headers })
         .then(response => {
         console.log("response ", response)
        
         if(response.data.result_code===0)
         {
         // alert('Removed from Likes') ;
         props.setdelOpenModal(false); 
       //  setremovelike(true);         
         }
        else
        {
            console.log(response.data.result_text);
        }
      });       
     }
 
   return(
    <div className="delmodalBackground">
        <div className="delmodalContainer">
        
           <div className='close_icon'>
              <CloseIcon onClick={onClose}/>  
           </div>
           <div className='del-content'>
            <p>Are you sure to remove?</p>
           </div>
          
          <div className='preview-holder'>
			<img src={imagsrc} alt="" id="img" className="img" /> 
          </div>  
           
           <div className='del-buttons'>
             <button className='del-button'onClick={() => removeLike()}>
                  Delete
             </button>
             <button className='del-button' onClick={onClose}>
                    cancel
             </button>
           </div>  
             
        </div> 
    </div>
   )
}

export default Remfavmodal;