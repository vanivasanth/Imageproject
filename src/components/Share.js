import './Share.css';
//import { useRef } from 'react';
// import { BsFacebook } from "react-icons/bs";
// import { BsLinkedin } from "react-icons/bs";
// import { BsTwitter } from "react-icons/bs";
//import { BsInstagram } from "react-icons/bs";
//import { BsSkype } from "react-icons/bs";
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

const Share = () => {
  

  //const pageUrl='https://www2.executesimple.com/Search';
  // const shareurlfb = () => {
  //   const url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
  //   socialWindow(url, 570, 570);
  // }
  // const shareurltw = () => {
  //   const url = "https://twitter.com/intent/tweet?url=" + pageUrl;
  //   socialWindow(url, 570, 570);
  // }
  // const shareurlln = () => {
  //   const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + pageUrl;
  //   socialWindow(url, 570, 570);
  // }
  // const shareurlIns = () => {
  //   const url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
  //   socialWindow(url, 570, 570);
  // }
  // const shareurlsk = () => {
  //  // const text='share and explore images'
  //   const url = "https://web.skype.com/share?url=" + pageUrl;
  //   socialWindow(url, 570, 570);
  // }
  // const socialWindow=(url, width, height) => {
  //   var left = (window.screen.width - width) / 2;
  //   var top = (window.screen.height - height) / 2;
  //   var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
  //   window.open(url,"",params);
  // }
  return(
      <div className='ShareWeb'>
         
        <div className='Sharecontents'>
          <p>Share Mysnaps </p>
        </div>
        <div className='Sharebuttons'>
            {/* <div className='sbutton'
                 style={{color:'#021864'}}
                 onClick={shareurlfb}>
                <BsFacebook/>
            </div> */}
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
               <FacebookShareButton
                      url={"https://www2.executesimple.com/"}
                      quote={"Share and Explore images"}
                      description={"An image database"}
                      className="Demo__some-network__share-button"
                >
                        <FacebookIcon size={34} round /> 
                </FacebookShareButton>
            </div>
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
                    <WhatsappShareButton
                           url={"https://www2.executesimple.com/"}
                           title={"Share and Explore images"}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
                    </WhatsappShareButton>
            </div>
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
                   <LinkedinShareButton
                              url={"https://www2.executesimple.com/"}
                              title={"Share and Explore images"}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                   </LinkedinShareButton>
            </div>
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
                <TwitterShareButton
                          url={"https://www2.executesimple.com/"}
                          title={"Share and Explore images"}
                          description={"An image database"}
                          className="Demo__some-network__share-button">
                        <TwitterIcon size={34} round />
                </TwitterShareButton>
                 </div>
               
            {/* <div className='sbutton' 
                 style={{color:'#F448B8'}}
                 onClick={shareurlIns}>
                <BsInstagram/>
            </div> */}
            {/* <div className='sbutton' 
                 style={{color:'#1973C0'}}
                 onClick={shareurlsk}>
                <BsSkype/>
            </div> */}
        </div>
      </div>
    );
}

export default Share;