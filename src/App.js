//import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Signup from './components/Signup';
import Userprofile from './components/Userprofile';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Search from './components/Search';
import Modal from "./components/Imageupload";
//import Modal1 from './components/imageupload2';
import Allsnaps from './components/Allsnaps';
import Multisharecart from './components/Multisharecart';
import Contacts from './components/Contacts';
//import Bookmarks from './components/Bookmarks';
import Favourites from './components/Favourites';
//import Starred from './components/Starred';
import Likes from './components/Likes';
import Share from './components/Share';
import Home from './components/Home';
import Viewsharedimages from './components/Viewsharedimages';
import { Route, Redirect,withRouter, Switch } from 'react-router-dom';
//import { useEffect } from 'react';
import Toastcreate from './components/Toastcreate';
import Editprofile from './components/Editprofile';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Forgot from './components/ForgotPassword';
import Allusersearch from './components/Allusersearch';
//import { useState, useEffect } from 'react';
import './App.css';
//import { toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App= ({location}) => {

  

const token=localStorage.getItem('auth_token');

 // const[navbarOpen, setNavbarOpen] = useState(false);
 // const[sidebarOpen, setSidebarOpen] = useState(false);

  
  // const navbarHandler = () => {
  //   setNavbarOpen(true);
  //   setSidebarOpen(true);
  // }

  // const sidebarHandler=() => {
  //   setSidebarOpen(false);
  // }

  return (
    
    <div className="App container"> 

      {/* <Header/>   
       <Sidebar/> */}
      {
        // location.pathname !== '/Login' && 
        // location.pathname !== '/Userprofile'&&
        // location.pathname !== '/Signup' && 
        // location.pathname !== '/Favourites' &&
        location.pathname === '/' &&  (<Header/>)
      }     
      {
        location.pathname !== '/Login' &&
        location.pathname !== '/getSharedFiles/:referenceNumber' &&
        location.pathname !== '/Signup' && (<Sidebar/>) }  
   
   <Switch>
     
     <Route exact path='/'>
        {  token!== null? <Redirect to="/Allsnaps"/>:<Home/> }
          
      </Route>
     
     <Route path='/Logout'>
       <Logout/>
     </Route>
     <Route path='/Signup'>
       <Signup/>
     </Route>
     <Route path='/upload'>
       <Modal/>
     </Route>
     <Route path='/Allsnaps'>
       <Allsnaps/>
     </Route>
     <Route path="/MyUploads" exact>
         <Userprofile/>
     </Route>         
     <Route path='/Likes' exact>
         <Likes/>
     </Route>
     <Route path='/Favourites'>
         <Favourites/>
     </Route>
     <Route path='/Contacts'>
        <Contacts/>
     </Route>
     <Route path='/Search'>
        <Search/>
     </Route>
     <Route path='/Multisharecart'>
        <Multisharecart/>
     </Route>
     <Route path='/Share'>
        <Share/>
     </Route>
     <Route path='/Toastcreate'>
        <Toastcreate/>
     </Route>
     <Route path='/Forgot'>
        <Forgot/>
     </Route>
     <Route path='/Editprofile'>
         <Editprofile/>
     </Route>
     <Route path='/Notifications'>
        <Notification/>
     </Route>
     <Route path='/getSharedFiles/:referenceNumber'>
       <Viewsharedimages/>
     </Route>
     <Route path='/Settings'>
        <Settings/>
     </Route>
     <Route path='/AlluserSearch'>
        <Allusersearch/>
     </Route>
     <Route path='*'>
        <NotFound/>
     </Route>
   </Switch>   
    </div>
  
  );
}

export default withRouter(App);
