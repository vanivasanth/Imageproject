import React from "react";
import { 
    Box,
    Grid,
    Stack,
    Typography,
  } from "@mui/material";
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
  
const Share =( ) => {

    return(
        <Grid container>
        <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                             md: "block", 
                                             lg: "block" }}}>
 
        </Grid>
        
        <Grid item xs={12} sm={12} md={4} lg={4}>
        <Stack spacing={2}>
        <Typography variant="h5"
                      sx={{textAlign:'center', 
                           padding:{sm:'20 5'},
                           marginTop:'50px' }}>
          Share MySnaps Website Link
         </Typography>
 
        </Stack>
          
         <Stack spacing={2} direction="row" sx={{justifyContent:'center', 
                                                 margin:'40px 0 0 0'}}>   
         <Box>
         <FacebookShareButton
                      url={"https://mysnaps.cognitivemobile.net/"}
                      quote={"Share and Explore images"}
                      description={"An image database"}
                      className="Demo__some-network__share-button"
                >
                        <FacebookIcon size={34} round /> 
                </FacebookShareButton>
         </Box>
        <Box>
            <WhatsappShareButton
                           url={"https://mysnaps.cognitivemobile.net/"}
                           title={"Share and Explore images"}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
                    </WhatsappShareButton>
        </Box>
        <Box>
                  <LinkedinShareButton
                              url={"https://mysnaps.cognitivemobile.net/"}
                              title={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                   </LinkedinShareButton>
        </Box>
        <Box>
                  <TwitterShareButton
                          url={"https://mysnaps.cognitivemobile.net/"}
                          title={"Share and Explore images"}
                          description={"An image database"}
                          className="Demo__some-network__share-button">
                        <TwitterIcon size={34} round />
                </TwitterShareButton>
        </Box>
        </Stack>
        </Grid>
        <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                               md: "block", 
                                               lg: "block" }}}>
 
        </Grid>
      </Grid>
    );
}

export default Share;