import './Sidebarmodal.css';

import { NavLink,withRouter } from 'react-router-dom';
//import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
// import SettingsIcon from '@mui/icons-material/Settings';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
//import ShortcutIcon from '@mui/icons-material/Shortcut';

const Sidebarmodal=({location})=> {
   const history = useHistory(); 
    const token=localStorage.getItem('auth_token');

    const logout = () => {
      const article = { title: 'React POST Request Example' };
      const headers = {
          'Authorization':'Bearer '+ localStorage.getItem('auth_token')
      };
      axios.post('https://www2.executesimple.com/userLogout',article, { headers })
          .then(response => {
          console.log("response ", response)
        //  const tempdata= response.data;
        // if(response){

        // }
          if(response.data.result_code===0)
          {
              localStorage.clear();
              history.push('/Logout');          
          }
         else
         {
             console.log(response.data.result_text);
         }         
      });       
}
    return (
        <div className='sidebar_modal'> 
              <div className='sidebar1_menu'>       
              { token=== null &&
              <NavLink to='/' exact activeClassName='active'
                       className='icons'
                       style={{textDecoration:'none'}}>
                 <span>
                    <HomeIcon  style={{marginRight:'10px'}} />  
                 </span>
                 <span>
                     Home
                 </span>
              </NavLink>

             }
                        
                { token!== null &&
                 <NavLink to='/Allsnaps' exact activeClassName='active'
                                             className='icons'
                                             style={{textDecoration:'none'}}>
                 <span>
                      <HomeIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Home
                  </span>
                </NavLink> }
                {
                 token === null &&
                 <NavLink to='/Signup' exact activeClassName='active'
                 className='icons'
                 style={{textDecoration:'none'}}>
                  <span>
                      <PersonIcon  style={{marginRight:'10px'}} />  
                  </span>
                   <span>
                          Register/Login
                   </span>
                 </NavLink>
                 }            
               {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'inactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                  <span>
                        <CameraEnhanceIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span >
                        My Uploads
                  </span>
                     <span className="tooltiptext">Signin to explore</span>
                  </NavLink>
               }
               {
                 token !== null && 
                  <NavLink to='/MyUploads' exact activeClassName='active'
                                                 className={`icons ${token!==null?'uactive':'inactive'} `}
                                                 style={{textDecoration:'none'}}>
                   <span>
                        <CameraEnhanceIcon  style={{marginRight:'10px'}} />  
                    </span>
                    <span>
                        My Uploads
                    </span>
                  <span className="tooltiptext">Signin to explore</span>
                </NavLink>
                }
                 {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'uactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                  <span>
                        <UploadFileIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span >
                          Upload image
                  </span>
                     <span className="tooltiptext">Signin to explore</span>
                  </NavLink>

               }
               {
                 token !== null && 
               <NavLink to='/upload' exact activeClassName='active'
                                                 className={`icons ${token!==null?'uactive':'inactive'} `}
                                                 style={{textDecoration:'none'}}>
                 <span>
                      <UploadFileIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span >
                        Upload image
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
                </NavLink>
                }
                {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'inactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                 <span>
                      <FavoriteBorderIcon style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                       My Favourites
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>                
                }
                {
                 token !== null && 
               <NavLink to='/Favourites' activeClassName='active'
                                         className={`icons ${token!==null?'uactive':'inactive'} `}
                                         style={{textDecoration:'none'}}>
                  <span>
                      <FavoriteBorderIcon style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                       My Favourites
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>
              }
              {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token===null?'inactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                 <span>
                      <ThumbUpAltIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        My Likes
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>  
              }
              {
                 token !== null && 
               <NavLink to='/Likes' activeClassName='active'
                                    className={`icons ${token!==null?'uactive':'inactive'} `}
                                    style={{textDecoration:'none'}}>
                  <span>
                      <ThumbUpAltIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        My Likes
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>
               }
                 {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'uactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                 <span>
                      <PersonIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        My Contacts
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>  
              }
              {
                 token !== null && 
               <NavLink to='/Contacts' activeClassName='active'
                                    className={`icons ${token!==null?'uactive':'inactive'} `}
                                    style={{textDecoration:'none'}}>
                  <span>
                      <PersonIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        My Contacts
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>
               }
              
                 {/* {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'uactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                 <span>
                      <NotificationsNoneIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Notifications
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>  
              }
              {
                 token !== null && 
               <NavLink to='/Notifications' activeClassName='active'
                                    className={`icons ${token!==null?'uactive':'inactive'} `}
                                    style={{textDecoration:'none'}}>
                  <span>
                      <NotificationsNoneIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Notifications
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>
               } 
               
               {
                 token === null && 
                 <NavLink to='/Toastcreate' exact activeClassName='active'
                 className={`icons ${token!==null?'uactive':'inactive'} `}
                 style={{textDecoration:'none'}}>
                 <span>
                      <SettingsIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                         Settings
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>  
              }
              {
                 token !== null && 
               <NavLink to='/Settings' activeClassName='active'
                                    className={`icons ${token!==null?'uactive':'inactive'} `}
                                    style={{textDecoration:'none'}}>
                  <span>
                      <SettingsIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Settings
                  </span>
                  <span className="tooltiptext">Signin to explore</span>
               </NavLink>
               } */}
                 <NavLink to='/Search' activeClassName='active'
                              className='icons'
                              style={{textDecoration:'none'}}>
                         <span>
                            <SearchIcon  style={{marginRight:'10px'}}/>  
                         </span>
                         <span>
                            Search
                         </span>
                      </NavLink>
               <hr/> 
               <p>Communicate</p>
               <NavLink to='/Share' activeClassName='active'
                                    className='icons'
                                    style={{textDecoration:'none'}}>
                  <span>
                      <ShareIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Share
                  </span>
               </NavLink>
               {/* <NavLink to='/getSharedFiles' activeClassName='active'
                                    className='icons'
                                    style={{textDecoration:'none'}}>
                  <span>
                      <ShareIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Multi Share
                  </span>
               </NavLink> */}
               <hr/>
               {
                 token!== null &&
                 <NavLink to='/Logout' exact activeClassName='active'
                                             className='icons'
                                             style={{textDecoration:'none'}}>
                 <span onClick={logout}>
                      <ExitToAppIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span onClick={logout}>
                        Logout
                  </span>
                </NavLink> }
               {/* <NavLink to='/Settings' activeClassName='active'
                               className='icons'
                               style={{textDecoration:'none'}}>
                  <span>
                      <SettingsIcon  style={{marginRight:'10px'}} />  
                  </span>
                  <span>
                        Settings
                  </span>
               </NavLink> */}
              </div>
         </div>
        
   
      
    );
  }

  
  
  export default withRouter(Sidebarmodal);