import React,{useState,useContext} from "react";
import { SingleImgContext } from "../../context/SingleImgCtx";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography
} from "@mui/material";
const Imageinfo =() => {
  const [isCopied, setIsCopied] = useState(false);
  const SingleCtx= useContext(SingleImgContext);
  const mno=SingleCtx.mobileno;
  const email=SingleCtx.email;
  const web=SingleCtx.websites;
  const str=SingleCtx.TextonImg;

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
    var copytext=str;
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
    return(
       <>
        <Accordion>
           <AccordionSummary expandIcon={<ExpandMoreIcon />}
                             aria-controls="panel1a-content"
                             id="panel1a-header">
                <Typography>View Details</Typography>
           </AccordionSummary>
           <AccordionDetails sx={{display:'flex',
                                  flexDirection:'column',
                                  alignItems:'flex-start',
                                  justifyContent:'flex-start'}}>
                  <p>Caption :&emsp;{SingleCtx.caption}</p>
                  <p>Category :&emsp;{SingleCtx.category}</p>
                  <p>Remarks :&emsp;{SingleCtx.remarks}</p>
                  {(str.length!==0?
                  <Accordion disableGutters elevation={0} square >
                      <AccordionSummary   sx={{flexDirection:'row-reverse'}}
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header">
                           <Typography>Text on Image</Typography>
                      </AccordionSummary>                
                     <AccordionDetails>
                       <Typography sx={{display:'flex',
                                        flexDirection:'column',
                                        alignItems:'flex-start',
                                        justifyContent:'flex-start'}}>
                       {(str.length!==0? 
                        <>
                        <span>{isCopied ? 'Copied!' : ' '}</span> 
              
                        <IconButton onClick={handleCopyClick}>
                                 <ContentCopyIcon/>
                        </IconButton>
                              
                       {str.map((item)=>{
                                  return (
                                 <div>
                                          {item}
                                 </div>)
                         })}      
                   </>             
                   :<span>No text Available</span>)}
                 
                 
                        </Typography>
                     </AccordionDetails>
                     </Accordion>:'')}
                      {mno.length>0?
                        <>
                           MobileNo:&emsp;
                            {(mno).map((item)=>{
                               return(
                                  <div style={{color:'rgb(63, 63, 63)',
                                               fontSize:'18px'}}>
                                           {item}
                                  </div>
                                  );
                             })}
                        </>:''}
                      {email.length>0?
                        <>
                          email:&emsp;
                           {(email).map((item)=>{
                              return(
                                 <div onClick={()=>sendmail(item)}
                                      style={{color:'rgb(63, 63, 63)',
                                              fontSize:'18px'}}>
                                       {item}
                                 </div>
                               );
                         })}
                         </>:''}
                      {web.length>0?
                        <>
                        Websites:&emsp;
                         {(web).map((item)=>{
                              return(
                                 <div style={{color:'rgb(63, 63, 63)',
                                            fontSize:'18px'}}>
                                        {item}
                                 </div>
                             );
                        })}
                        </>:''}
                  <p>Location :&emsp;{SingleCtx.location}</p>
                  <p>Uploaded on :&emsp;{SingleCtx.uploadedDate}</p>
                  <p>Uploaded by :&emsp;{SingleCtx.userInfo}</p>
            </AccordionDetails>
        </Accordion>
     
       </>
    );
}
export default Imageinfo;