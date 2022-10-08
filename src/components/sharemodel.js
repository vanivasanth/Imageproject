import './Sharemodel.css';
//import { useRef } from 'react';
// import { BsFacebook } from "react-icons/bs";
// import { BsLinkedin } from "react-icons/bs";
// import { BsTwitter } from "react-icons/bs";
//import { BsInstagram } from "react-icons/bs";
import { MultiShareContext } from '../context/Multishare-context';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useState, useContext} from 'react';

// import { BsSkype } from "react-icons/bs";
// import CloseIcon from '@mui/icons-material/Close';
import {
   FacebookIcon, 
   TwitterIcon,
   WhatsappIcon,
   LinkedinIcon
  } from "react-share";
import {
 // EmailShareButton,
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

const Sharemodel = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const MultishareCtx = useContext(MultiShareContext);
  const Multishareurl = MultishareCtx.shareLink;
  const sharetext= MultishareCtx.sharetext;
  console.log(Multishareurl);

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
  //   const url = "https://web.skype.com/share?url=" + Multishareurl;
  //   socialWindow(url, 570, 570);
  // }
  // const socialWindow=(url, width, height) => {
  //   var left = (window.screen.width - width) / 2;
  //   var top = (window.screen.height - height) / 2;
  //   var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
  //   window.open(url,"",params);
  // }

  // const onClose=()=> {
  //     props.setsharemodel(false)
  // }
  return(
    <>
     <div className='linkContainer'>
        <div className='linkContent'>
           <p>{sharetext}</p>
           <p>{Multishareurl}</p>
        </div>
        <div className='linkButton'>
              <button onClick={handleCopyClick}>
                  <ContentCopyIcon/>
              </button>
        </div>
       <div>
       <span>{isCopied ? 'Copied!' : ' '}</span> 
       </div>
    </div> 
    <div className='sharebuttons'>
    <div className='sbutton' 
                 style={{color:'#F448B8'}}>
               <FacebookShareButton
                      url={Multishareurl}
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
                           url={Multishareurl}
                           title={sharetext}
                           description={"An image database"}
                           className="Demo__some-network__share-button">
                             <WhatsappIcon size={34} round /> 
                    </WhatsappShareButton>
            </div>
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
                   <LinkedinShareButton
                              url={Multishareurl}
                              title={sharetext}
                              description={"An image database"}
                              className="Demo__some-network__share-button">
                          <LinkedinIcon size={34} round />
                   </LinkedinShareButton>
            </div>
            <div className='sbutton' 
                 style={{color:'#F448B8'}}>
                <TwitterShareButton
                          url={Multishareurl}
                          title={sharetext}
                          description={"An image database"}
                          className="Demo__some-network__share-button">
                        <TwitterIcon size={34} round />
                </TwitterShareButton>
            </div>
    </div>
    
    </>
    
        // <div className='Sharebuttons'
        //      style={{margin:'auto',
        //              backgroundColor:'white'}}>
            /* <div className='sbutton'
                 style={{color:'#021864'}}
                 onClick={shareurlfb}>
                <BsFacebook/>
            </div> */
           
            
               
            /* <div className='sbutton' 
                 style={{color:'#F448B8'}}
                 onClick={shareurlIns}>
                <BsInstagram/>
            </div> */
            /* <div className='sbutton' 
                 style={{color:'#1973C0'}}
                 onClick={shareurlsk}>
                <BsSkype/>
            </div> */
      // </div>
      );
          }

export default Sharemodel;