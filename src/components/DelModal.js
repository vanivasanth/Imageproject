import './DelModal.css';
import CloseIcon from '@mui/icons-material/Close';

const DelModal = (props) =>
{
    //const[delOpenModal,setdelOpenModal]=useState(props.setdelOpenModal);
    const onClose = () => {
      //  setdelOpenModal(false);
        props.setdelOpenModal(false);

      }

   return(
    <div className="delmodalBackground">
        <div className="delmodalContainer">
        
           <div className='close_icon'>
               <CloseIcon onClick={onClose}/>
              
           </div>
           <div className='del-content'>
           <p>Are you sure want to delete?</p>
           </div>
          
          <div className='preview-holder'>
				  <img src={props.deletefilesrc} alt="" id="img" className="img" /> 
                  </div>  
           
           <div className='del-buttons'>
             <button className='del-button'>
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

export default DelModal;