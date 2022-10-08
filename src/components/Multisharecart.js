import React from "react";
import './Multisharecart.css';
import { post } from 'axios';
import { useState,useEffect,useContext} from 'react';
import { MultiShareContext } from '../context/Multishare-context';
import Sharemodel from "./sharemodel";

const Multisharecart = (props) =>
{
    const [title, settitle]=useState('');
    // const [sharetext,setsharetext]=useState('');
    // const [name, setName]=useState('');
    const [sharemodel, setsharemodel]= useState(false);
   // const [showbutton, setshowbutton]=useState(true);
    const socialshareurl= 'https://www2.executesimple.com/#/getSharedFiles/';
    const baseUrl='https://www2.executesimple.com/uploads/highmessaging/chat/';
    
    const MultishareCtx = useContext(MultiShareContext);
    const shareimage=MultishareCtx.filename;
    const noofImages=MultishareCtx.totalImages;
    
   // const user1=MultishareCtx.user;
    useEffect(()=>{},[])

    const addtitle = (event) => {
       settitle(event.target.value);
        MultishareCtx.settitle(event.target.value);
    }
    function Removefile(item)
     {
        MultishareCtx.removeImage(item)
     }
    const clearall = () => {
        MultishareCtx.clearFilenames();
    }
    const socialshare = () => {
        var callapi=true;
      if(noofImages===0)
      {
          alert('Please include images');
          callapi=false;
      
      }
      if(title==='')
      {
        alert('Please Enter title');
        callapi=false;
      
      }
        const sharetitle =  title;
        if(callapi)
        {
            let data= {
                "title": sharetitle,
                "fileNames":shareimage
            }
            
            const config = {
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('auth_token')
                        }
              }
              post("https://www2.executesimple.com/updateUserShareFiles",data,config)
              .then((response) => {
                    console.log(response.data);
                    if(response.data.result_code === 0)
                     {
                        const result=response.data;
                        const getResult=result;
                        const getreference=getResult.sharedFiles;
                        const refnum=getreference.referenceNumber;
                        const expdate=getreference.expiredDate;
                        const tz=getreference.timezone;
                        let expirdate1=expdate.toString();
                        var exdate= expirdate1.slice(0, 11);
                        let tzne=tz.toString();
                        let strref=refnum.toString();
                        console.log('refnum of block',strref);
                        var userDetails=[];
                        userDetails.push({
                               'user':getreference.user
                        })
                        if(userDetails[0].user)
                        {
                         var fname=userDetails[0].user.firstName;
                         var lname=userDetails[0].user.lastName;
                         var name=fname+' '+lname;
                         MultishareCtx.setshareuser(name)
                        }
                        console.log(name);
                        const linkarg=socialshareurl+strref;
                       
                        const textToshare= name+' '+'shared images via MySnaps will remain upto'+ ' '+exdate+' '+tzne;
                      
                        console.log(textToshare);
                       
                        MultishareCtx.setsharelink(linkarg);
                        MultishareCtx.setSharetext(textToshare)
                        setsharemodel(true);
                       // setshowbutton(false);
                     }
                    else
                    {
                        alert(response.data.result_text);
                    }
                })
        }
       
    }  
    return(
        <>
         <div className='userprofile'>

         { !sharemodel &&
                 <> 
                    <h2 style={{textAlign:'center'}}>
                              List of Images to share
                     </h2>
                    <div className="action-buttons">
                     <div>
                         <input  type='text'
                                 name='title'
                                 placeholder='title to share' 
                                 onChange={addtitle}
                                 value={title}/>
                     </div>
                     <div>
                        <button onClick={socialshare}> Generate Link</button>
                     </div>
                     <div>
                         <button onClick={clearall}> Clear All</button>
                     </div>
                    </div>
                 </> 
             }
             {
                sharemodel &&
                   <Sharemodel setsharemodel={setsharemodel}/>
             } 
 {/* <Sharemodel setsharemodel={setsharemodel}/> */}
             { !sharemodel &&
                    <div className='gallery'>
                         { shareimage.map((item)=> 
                             {
                               return(
                                     <div className="image-card1">
                                           <img className='image'
                                                src={baseUrl+item}
                                                style={{width:'100%', height:'80%'}}
                                                alt={'sharedimage'}/>
                                           <button className='viewbutton1'
                                                   style={{width:'100%',textAlign:'center'}}
                                                   onClick={() => Removefile(item)}>
                                                 Remove
                                           </button>
                                    </div>); 
                            }) }
                   </div>
               }  
           </div>
        </>
    );
}

export default Multisharecart;