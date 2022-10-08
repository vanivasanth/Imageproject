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
    FacebookShareButton,
    LinkedinShareButton,
    
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

  import { ImgarrayContext } from "../../context/ImgArrCtx";
  
const SingleShareModal=(props) => {
    const ImageCtx = useContext(ImgarrayContext);
    const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
    const shareurl=baseUrl+ImageCtx.singlefilename;
    const [open, setOpen] = useState(props.state);

    const handleClose = () => {
        props.setstate();
        setOpen(false);
      };

    
    return(
        <Dialog       
        open={open}
        onClose={handleClose}
        fullWidth={ true } 
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          
        <DialogContent  >
            
        <Stack spacing={2} direction="row" sx={{justifyContent:'center', 
                                                 margin:'40px 0 0 0'}}>   
         <Box>
           <FacebookShareButton
                      url={shareurl}
                      quote={"Share and Explore images"}
                      description={"An image database"}
                      className="Demo__some-network__share-button">
                        <FacebookIcon size={34} round /> 
                </FacebookShareButton>
         </Box>
        <Box>
            <WhatsappShareButton
                           url={shareurl}
                           title={"Share and Explore images"}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
            </WhatsappShareButton>
        </Box>
        <Box>
                  <LinkedinShareButton
                              url={shareurl}
                              title={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                   </LinkedinShareButton>
        </Box>
        <Box>
                  <TwitterShareButton
                          url={shareurl}
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

export default SingleShareModal;