import './Logout.css';
//import { useLocation } from 'react-router-dom';
import { useHistory} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Logout = () => 
{
    const history = useHistory();
    //let location = useLocation();   
   
    const loginHandler=()=>
    {
        history.push('/Signup');
    }
    
    const onClose =() =>
    {
        history.push('/')
    }
    // const homehandler=()=>
    // {
    //     history.push('/');
    // }

    return(
        <div className='logout'>
            <div className='logout_content'>
            <div className='close_icon'
                 style={{color:'black',
                         backgroundColor:'white',
                         border:'2px solid white'}}>
               <CloseIcon onClick={onClose}/>              
           </div> 
            <div className='logout_links'>
            <p> You are logged out </p>
            <button type='button'
                    onClick={loginHandler}> 
                    login again
            </button>
            {/* <button type='button'
                    onClick={homehandler}> 
                    go to home
            </button> */}
            </div>
            </div>
        </div>
    )

}

export default Logout;