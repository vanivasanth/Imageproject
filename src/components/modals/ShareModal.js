import React,{useState,useContext} from "react";

import {  
    Box, 
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Typography,
 } from '@mui/material';
import {
    FacebookIcon, 
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon
   } from "react-share";
   import {
    //EmailShareButton,
    FacebookShareButton,
    // HatenaShareButton,
    // InstapaperShareButton,
    // LineShareButton,
    LinkedinShareButton,
    // LivejournalShareButton,
    // MailruShareButton,
    // OKShareButton,
    // PinterestShareButton,
    // PocketShareButton,
    // RedditShareButton,
    // TelegramShareButton,
    // TumblrShareButton,
    TwitterShareButton,
    // ViberShareButton,
    // VKShareButton,
    WhatsappShareButton,
   // WorkplaceShareButton
  } from "react-share";
import { MultiShareContext } from '../../context/Multishare-context';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

  
const ShareModal=(props) => {
    const MultishareCtx = useContext(MultiShareContext);
    const Multishareurl = MultishareCtx.shareLink;
    const sharetext = MultishareCtx.sharetext;
    const [isCopied, setIsCopied] = useState(false);
    const [open, setOpen] = useState(props.state);

    const handleClose = () => {
        props.setstate();
        setOpen(false);
      };

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }
    
      const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        var copytext=sharetext+' '+Multishareurl
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
        <Dialog       
        open={open}
        onClose={handleClose}
        fullWidth={ true } 
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          
        <DialogContent  >
               <Typography sx={{display:'flex',
                                flexDirection:'column',
                                alignItems:'flex-start',
                                margin:'10px',
                                border:'1px solid grey',
                                justifyContent:'flex-start'}}>    
              
              
                        <p style={{margin:'10px'}}>{sharetext}</p>
                        <div style={{margin:'10px'}}>
                             {Multishareurl}
                             <IconButton onClick={handleCopyClick}>
                                 <ContentCopyIcon/>
                             </IconButton> 
                           <span>{isCopied ? 'Copied!' : ' '}</span> 
                        </div>
                        
                        
               </Typography>
       
        <Stack spacing={2} direction="row" sx={{justifyContent:'center', 
                                                 margin:'40px 0 0 0'}}>   
         <Box>
         <FacebookShareButton
                      url={Multishareurl}
                      quote={"Share and Explore images"}
                      description={"An image database"}
                      className="Demo__some-network__share-button">
                        <FacebookIcon size={34} round /> 
                </FacebookShareButton>
         </Box>
        <Box>
            <WhatsappShareButton
                           url={Multishareurl}
                           title={"Share and Explore images"}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
                    </WhatsappShareButton>
        </Box>
        <Box>
                  <LinkedinShareButton
                              url={Multishareurl}
                              title={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                   </LinkedinShareButton>
        </Box>
        <Box>
                  <TwitterShareButton
                          url={Multishareurl}
                          title={"Share and Explore images"}
                          description={"An image database"}
                          className="Demo__some-network__share-button">
                        <TwitterIcon size={34} round />
                </TwitterShareButton>
        </Box>
        </Stack>
        </DialogContent>
      </Dialog>
      
    );
}

export default ShareModal;