import './Imageinfo.css';
import {useState} from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Typography
} from "@mui/material";
const Imageinfo = (props) => 
{

    let mobileno=[];
    let web =[];
    let emails=[];
    mobileno=props.Mobilenumbers;
    web=props.websiteaddress;
    emails=props.Email;
    let str=props.Imagetext;
    let splitstr;
    if(str!=='no data')
    {
      splitstr=str.split("\n"); 
      console.log("splitted string"+splitstr);
      console.log(splitstr.length);
    }

    console.log('props no:'+props.Mobilenumbers)
    let showmobileno=(mobileno.length>0)?true:false;
    console.log('show no'+showmobileno)
    let showweb=(web.length>0)?true:false;
    let showemail=(emails.length>0)?true:false;

    const [isCopied, setIsCopied] = useState(false);
    const [splittedstr,setsplittedstr]= useState(splitstr)
    const closeinfo=() => {
        props.setInfoview(false);
    }

    const sendmail=(mailid)=>{
      window.open(`mailto:${mailid}`);
    }

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }
    
      const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        var copytext=props.Imagetext;
        copyTextToClipboard(copytext)
          .then(() => {
            // If successful, update the isCopied state value
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    return (
        <>
            <div className='info_details'>
                 <h2> Image details </h2>
               <p>Caption     :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {props.captinfo}</span> 
               </p>
               <p>Category     :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {props.catinfo}</span> 
               </p>
               <p>Remarks     :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {props.Remarksinfo}</span> 
               </p>
               {showmobileno && 
                 (mobileno.length>0? 
                  <div>
                    <p>Phone Number    :  </p>
                       {mobileno.map((item)=>{
                           return(
                               <div style={{color:'rgb(63, 63, 63)',
                                            fontSize:'18px'}}>
                                    {item}
                               </div>
                             );
                        })
                     }
                 </div>
                 :'')
                  }
               {showemail && 
               <div> 
              <p>E-Mail     :   </p>
                     {
                         emails.map((item)=>{
                          return(
                               <div onClick={()=>sendmail(item)}
                                    style={{color:'rgb(63, 63, 63)',
                                            margin:'10px',
                                            cursor:'pointer',
                                           fontSize:'18px'}}>
                                     <Tooltip title="Click to send mail">
                                         {item}
                                     </Tooltip>
                                </div>
                              );
                          })
                    }
                   
              

               </div>
                  
               }
               {showweb && 
                    <div> 
             <p>Website     :  </p>
                          {
                            web.map((item)=>{
                             return(
                                <div style={{color:'rgb(63, 63, 63)',
                                             fontSize:'18px'}}>
                                          <a href={item} target='_blank'>{item}</a></div>
                                  );
                                })
                            }
                    
                    </div>
               }
                <Accordion disableGutters elevation={0} square >
                 <AccordionSummary
                   sx={{flexDirection:'row-reverse'}}
                   expandIcon={<ExpandMoreIcon />}
                   aria-controls="panel1a-content"
                   id="panel1a-header"
                  >
                      <Typography>Text on Image</Typography>
                 </AccordionSummary>
                
                <AccordionDetails>
               <Typography>
               {(str!=='no data'? 
                    <div className='TextContainer'
                         style={{marginLeft:'10px',
                                 position:'relative',                                    
                                 width:'600px',
                                 padding:'10px',
                                 fontSize:'18px',
                                 backgroundColor:'rgb(224, 220, 220)',
                                 border:'1px solid grey'}}>
                    <div className='lkButton' 
                         style={{cursor:'pointer',
                                 marginLeft:'550px',
                                 alignSelf:'flex-end'}}>
                        <span>{isCopied ? 'Copied!' : ' '}</span> 
              
                        <button onClick={handleCopyClick}>
                                 <ContentCopyIcon/>
                        </button>
                    </div>            
                       {splitstr.map((item)=>{
                                  return (
                                 <p style={{color:'rgb(63, 63, 63)',
                                            width:'600px',
                                            fontSize:'18px'}}>
                                          {item}
                                 </p>)
                         })}      
                   </div>             
                   :<span>No text Available</span>)}
                 
          </Typography>
        </AccordionDetails>
      </Accordion>
   
                 
               <p>Location    :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {props.locationinfo}</span> 
               </p>
               <p> Uploaded By    :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {(props.userinfo=='null'&& props.userinfo=='')?'unknown user':props.userinfo}</span> 
               </p>
               <p> Uploaded on    :  
                   <span style={{color:'rgb(63, 63, 63)',
                                 fontSize:'18px'}}>
                       {props.dateinfo}</span> 
                 
               </p> 

            </div>                
        </>

    );
}

export default Imageinfo;