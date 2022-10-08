import { createContext, useState } from 'react';

export const MultiShareContext = createContext({
  title:'',
  user:'',
  shareLink:'',
  sharetext:'',
  filename: [],
  totalImages: 0,
  versionNo:'',
  settitle:(title)=>{},
  setshareuser:()=>{},
  setversionNo:(vno)=>{},
  setsharelink:(shareLink)=>{},
  setSharetext:(sharet)=>{},
  addToMultishare: (shareImages) => {},
  removeImage: (Imagename) => {},
  clearFilenames:() => {}
});

export function MultiShareContextProvider(props) {

    const[filenames, setfilenames]= useState([]);
    const[sharetitle, setsharetitle]=useState('');
    const[shareurl, setShareurl]=useState('');
    const[shareText, setshareText]=useState('');
    const[shareuser, setshareuser]=useState('');
    const [ctxversionno, setctxversion]= useState('');
    function sharetitlehandler(title) {
      setsharetitle(title);
      console.log(sharetitle);
    }
    function shareuserhandler(shareuser1){
      setshareuser(shareuser1);
      console.log(shareuser)
    }
   function shareurlHandler(shareLink){
    setShareurl(shareLink);
    console.log(shareLink);
   }
   function setctxversionno(vno){
    setctxversion(vno)
   }
   function sharetexthandler(texttoshare){
    setshareText(texttoshare);
    console.log(shareText)
   }
    function addToMultiShareHandler(shareImages)
    {
      const checkexistence=filenames.includes(shareImages);;
      if(checkexistence)
      {
        alert('Image already included');
      }
      else
      {
        setfilenames((prevshareImages)=>{
          return prevshareImages.concat(shareImages);
        });
      }     
      //console.log(filenames);
    }
    function removeFromMultiShareHandler(Imagename)
    {
      setfilenames((prevshareImages1)=>
      {
        return prevshareImages1.filter(names=>names !== Imagename);
      });
    }
    function clearData()
    {
      setfilenames([])
    }

    const context = {
        title:sharetitle,
        versionNo:ctxversionno,
        user:shareuser,
        shareLink:shareurl,
        sharetext:shareText,
        filename:filenames,
        totalImages: filenames.length,
        setversionNo:setctxversionno,
        settitle: sharetitlehandler,
        setshareuser:shareuserhandler,
        setsharelink: shareurlHandler,
        setSharetext: sharetexthandler,
        addToMultishare: addToMultiShareHandler,
        removeImage: removeFromMultiShareHandler,
        clearFilenames: clearData
      };

    return (
        <MultiShareContext.Provider value={context}>
          {props.children}
        </MultiShareContext.Provider>
    ); 

}

export default MultiShareContext;