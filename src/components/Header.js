import './header.css';
// import DownloadIcon from '@mui/icons-material/Download';
// import { Link } from 'react-router-dom';
// import { useEffect, useState, useContext } from 'react';


const Header=(props) => {
  // const controller= new AbortController();
  // const signal=controller.signal;
  
  // // const MultishareCtx = useContext(MultiShareContext);
  // const [version, setversion] =useState();
  // const [apkname, setapkname] = useState();
  // const baseUrl='https://www2.executesimple.com/uploads/highmessaging/blog/';
 
//   async function getApkDetails()
//   {
//     const api=`https://www2.executesimple.com/getAndroidVersionDetails`;
//     const result=await fetch(api,{signal:signal});
//     const getResult= await result.json();
//     console.log(getResult);
//     const data=getResult.version;
//     console.log(data);
//     setversion(data.apkVersionNo);     
//       setapkname(data.apkName);
//       console.log(version);  
//       console.log(apkname); 
    
   
//   }
//   const downloadapk = async()=> {
// //apkname
//      alert('allow to download file');
//      const url = baseUrl+apkname;
//      fetch(url, {
//                 method: 'Get',
//                 headers: {},
//          })
//           .then((response) => {
//             response.arrayBuffer().then(function (buffer) 
//             {
//               const url = window.URL.createObjectURL(new Blob([buffer]));
//               const link = document.createElement('a');
//               link.href = url;
//               link.download='MySnaps.apk'; //or any other extension
//               document.body.appendChild(link);
//               link.click();
//             });
//          })
//          .catch((err) => {
//                  alert(err);
//               });
//           }
//   useEffect(()=> 
//   {
//       let controller= new AbortController();
//       getApkDetails();
//       return() => 
//        {        
//          controller.abort();
//        }       
//   },[]);


    return (
        <nav className="navbar">
        {/* <div className='nav_icon' onClick={()=>openSidebar()}>
             <span className='bars'> < MenuIcon/> </span>
        
             </div>  */}
         
         <div className='navbar_right'>
            {/* <Link to="/Login">Sign in</Link> */}
            
            {/* <Link to="/Signup">New User? Register here</Link> */}
            {/* <Link to='#' style={{display:'flex',color:'#0b5481',
                                fontSize:'18px',
                                fontWeight:'700'}}>
                   <div style={{marginTop:'5px'}}>
                     search
                     </div>
                     <div>
                    <SearchIcon style={{ marginLeft:'10px'}}/>
                    </div>
            </Link> */}
               </div>
       
            {/* <div className='apkdownload'
                 onClick={downloadapk}>
             
             <span style={{marginRight:'10px'}}>
                <DownloadIcon/>
             </span>
             <span style={{marginTop:'-10px'}}>
                download apk<br/>
                version: {version}
             </span>
               
           </div>  */}
          
      
        </nav>
    );
  }
  
  export default Header;