
import { createContext, useState } from 'react';


export const SingleImgContext = createContext({
  caption:'',
  category:'',
  remarks:'',
  location:'',
  uploadedDate:'',
  userInfo:'',
  islike:false,
  isFav:false,
  viewscount:0,
  Likescount:0,
  Favcount:0,
  Commentscount:0,
  multifilechk:false,
  multiimagearray:[],
  mobileno:[],
  email:[],
  websites:[],
  TextonImg:[],
  
  setImginfo:(details)=>{},
});

export function SingleImgContextProvider(props) {

    const [capt, setcapt]=useState('');
    const [catg, setcatg]=useState('');
    const [rem, setrem]=useState('');
    const [loc, setloc]=useState('');
    const [upldt, setupldt]=useState('');
    const [uinfo, setuinfo]=useState('');
    const [txtOnImg,settxtOnImg]=useState([]);
    const [phone, setphone]=useState([]);
    const [mail, setmail]=useState([]);
    const [web, setweb]=useState([]);
    const [like,setlike]=useState(false);
    const [Fav,setFav]=useState(false);
    const [multichk,setmultichk]=useState(false);
    const [multifiles,setmultifiles]=useState([]);
    const [Vcount,setVcount]=useState(0);
    const [Lcount,setLcount]=useState(0);
    const [Fcount,setFcount]=useState(0);
    const [Ccount,setCcount]=useState(0);

    function Imageinfohandler(details) 
    {      
        var values=JSON.stringify(details);        
        let v=JSON.parse(values);
        console.log(v);
        let lk=v.hasOwnProperty('isLike')?v.isLike:false;
        if(lk===true)
        {
          setlike(true);
        }
        else if(lk===false)
        {
          setlike(false);
        }
        let fv=v.hasOwnProperty('isFavourite')?v.isFavourite:false;
        if(fv===true)
        {
           setFav(true);
        }
        else if(fv===false)
        {
          setFav(false);
        }
        const {chatFileDetails}=v;
        console.log(chatFileDetails);
        const {multiChatFiles}=chatFileDetails;
        if(multiChatFiles && (multiChatFiles.length>0))
        {
         setmultichk(true);
         var array1=[];
         multiChatFiles.forEach(val => {             
           array1.push(val.fileName)
         });
         console.log(array1);
         setmultifiles(array1);
        }
        else
        {
         setmultichk(false);
        }
        let cap=chatFileDetails.hasOwnProperty('caption')?chatFileDetails.caption:'';
        setcapt(cap);
        let cat=chatFileDetails.hasOwnProperty('category')?chatFileDetails.category:'';
        setcatg(cat);
        let remk=chatFileDetails.hasOwnProperty('remarks')?chatFileDetails.remarks:'';
        setrem(remk);
        if(chatFileDetails.viewsCount!==null)
        {
          let {viewsCount}=chatFileDetails;
          console.log('vcount'+viewsCount);
          setVcount(viewsCount.counts);
        }
        else if(chatFileDetails.viewsCount===null)
        {
          setVcount(0);
        }
        if(chatFileDetails.commentsCount!==null)
        {
          let {commentsCount}=chatFileDetails;
          setCcount(commentsCount.counts);
        }
        else if(chatFileDetails.commentsCount===null)
        {
          setCcount(0);
        }
        if(chatFileDetails.favouritesCount!==null)
        {
          let {favouritesCount}=chatFileDetails;
          setFcount(favouritesCount.counts);
        }
        else if(chatFileDetails.favouritesCount===null)
        {
          setFcount(0);
        }
        if(chatFileDetails.likesCount!==null)
        {
          let {likesCount}=chatFileDetails;
          setLcount(likesCount.counts);
        }
        else if(chatFileDetails.likesCount===null)
        {
          setLcount(0);
        }
     
        const {createdDate}=chatFileDetails;
        setupldt(createdDate);

        const {user}=chatFileDetails;
        var name;
        if((user.firstName==null || user.firstName==='') && 
           (user.lastName==null ||user.lastName===''))
          {
              name='unnamed user';
          }
         else if((user.firstName==null ||user.firstName==='')&&
                 (user.lastName!=null ||user.lastName!==''))
          {
               name=user.lastName;
          }
         else if((user.firstName!=null || user.firstName!=='')&&
                 (user.lastName==null || user.lastName===''))
          {
             name=user.firstName;
          }
         else
          {
              name=user.firstName+' '+user.lastName;
          }
          setuinfo(name);
        

        const {location}=chatFileDetails;
        if(location==='')
        {
          setloc('no data');
        }
        else if(location!=='')
        {
          setloc(location.address);
        }
        const {imageTextData}=chatFileDetails;
        if(imageTextData!=="no data")
        {          
           let splitstr=imageTextData.split("\n"); 
           settxtOnImg(splitstr)
        }
        else if(imageTextData==="no data")
        {
          settxtOnImg('');
        }
        const{extractingDetails}=chatFileDetails;
        
        if(extractingDetails && (Object.keys(extractingDetails).length>0))
             {
        let phone1=extractingDetails.hasOwnProperty('phoneNumber')?extractingDetails.phoneNumber:'';
             if(phone1!==null)
                  {
                    let phonearray=[];
                    phone1.forEach(val=>{
                      phonearray.push(val.mobileNo)
                    })
                    setphone(phonearray);
                  }
                else if(phone1===null)
                 {
                  setphone('');
                 }
                
        let email1=extractingDetails.hasOwnProperty('email')?extractingDetails.email:'';
            if(email1!==null)
              {
                let mailarray=[];
                email1.forEach(val=>
                  {
                    mailarray.push(val.email)
                  })
                setmail(mailarray);
              }
              else if(email1===null)
              {
                setmail('')
              }
        let web1=extractingDetails.hasOwnProperty('website')?extractingDetails.website:'';
              if(web1!==null)
                {
                  let webarray=[];
                  web1.forEach(val=>
                    {
                      webarray.push(val.website);
                    })
                  setweb(webarray);
                }
               else if(web1===null)
                {                 
                  setweb('');
                }
              
              } 
        else if(extractingDetails===null)
        {
          setphone('');
          setmail('');
          setweb('');
        }
    }

   
    const context = {
        caption:capt,
        islike:like,
        isFav:Fav,
        viewscount:Vcount,
        Likescount:Lcount,
        Commentscount:Ccount,
        Favcount:Fcount,
        category:catg,
        remarks:rem,
        mobileno:phone,
        email:mail,
        websites:web,
        TextonImg:txtOnImg,
        location:loc,
        uploadedDate:upldt,
        userInfo:uinfo,
        multifilechk:multichk,
        multiimagearray:multifiles,
        setImginfo:Imageinfohandler,
      };

    return (
        <SingleImgContext.Provider value={context}>
          {props.children}
        </SingleImgContext.Provider>
    ); 

}

export default SingleImgContext;