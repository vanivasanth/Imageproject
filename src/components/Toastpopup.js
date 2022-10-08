import './Toastcreate.css';
//import { useLocation } from 'react-router-dom';
import { useHistory} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Toastcreate1 = (props) => 
{
    const history = useHistory();
    //let location = useLocation();
    const loginHandler=()=>
    {
        history.push('/Login');
    }
    const signupHandler =() =>
    {
        history.push('/Signup');
    }
    // const homehandler=()=>
    // {
    //     history.push('/');
    // }
   const closetoast = () => {
    //history.push('/');
     props.settoastOpen(false);
    
   }
    return(
        <div className="toastmodalBackground">
          <div className='toast'>          
          <div onClick={closetoast}
                            style={{margin:'10px'}}>
                         <CloseIcon/>
          </div>  
           <div className='toast_title'>
           <h1> Access denied for non-members</h1>
           </div>
           <div className='toast_content'> 
               <div>
                 <p> Already have an account? Login to continue</p>
                 <button type='button'
                         onClick={loginHandler}> 
                         login 
                 </button>
               </div>
              
               <div>
                 <p> New user? Create an account</p>
                 <button type='button'
                         onClick={signupHandler}> 
                         signup
                 </button> 
               </div>
             
           </div>
        
           {/* <button type='button'
                   onClick={homehandler}> 
                   go to home
           </button> */}
           </div>
        </div>
       
            
        
    )

}

export default Toastcreate1;