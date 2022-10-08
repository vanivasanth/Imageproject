import {
  Box
} from "@mui/material";
import React from "react";
import Home from "./components/pages/Home";
import Registerandsigin from "./components/forms/Register-Sigin";
import Contacts from "./components/pages/Contacts";
import Prescription from "./components/pages/Prescription";
import Likes from "./components/pages/Likes";
import Favourites from "./components/pages/Favourites";
import Myuploads from "./components/pages/Myuploads";
import Imageupload from "./components/forms/ImageUpload";
import Multisharecart from "./components/pages/Multisharecart";
import Search from "./components/forms/Search";
import Share from "./components/pages/Share";
import Notfound from "./components/pages/Notfound";
import Logout from "./components/pages/Logout";
import Navbar from './components/layouts/Navbar';
import AdvSearchResults from "./components/pages/AdvSearchres";
import SearchResults from "./components/pages/SearchResults";
import Viewmultishare from "./components/pages/Viewmultishare";
import Editprofile from './components/forms/Editprofile';
import Access from "./components/pages/Access";
import { Route, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";
import './App.css';

function App() { 
 
  const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
 
  return (
    <div className="App">
   
           <Box sx={{ display: 'flex' }}>
             <Navbar/>      
             <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:'60px'}}>
             <Routes>
                <Route exact path='/' element={<Home/>}/> 
                <Route path='/registerandsignin'  element={<Registerandsigin/>}/>
                <Route path='/contacts' element={loggedstatus?<Contacts/>:<Access/>}/>
                <Route path='/prescription' element={loggedstatus?<Prescription/>:<Access/>}/>
                <Route path='/likes' element={loggedstatus?<Likes/>:<Access/>}/>
                <Route path='/favourites' element={loggedstatus?<Favourites/>:<Access/>}/>
                <Route path='/myuploads' element={loggedstatus?<Myuploads/>:<Access/>}/>
                <Route path='/Imageupload' element={loggedstatus?<Imageupload/>:<Access/>}/>
                <Route path='/multishare' element={loggedstatus?<Multisharecart/>:<Access/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/share' element={<Share/>}/>
                <Route path='/searchres' element={<SearchResults/>}/>
                <Route path='/advsearchres' element={<AdvSearchResults/>}/>
                <Route path='/getSharedFiles/:referenceNumber' element={<Viewmultishare/>}/>
                <Route path='/editprofile' element={<Editprofile/>}/> 
               
                <Route path='/logout'  element={<Logout/>}/>
                <Route path='*'  element={<Notfound/>}/>
          
     {/* 
    
     <Route path='/getSharedFiles/:referenceNumber'>
       <Viewsharedimages/>
     </Route>
    */}
             </Routes>        
          </Box>
         </Box>
          
    </div>
  );
}

export default App;