import { createContext, useState } from 'react';

export const ImgarrayContext = createContext({
  singlefilename:'',
  commentsforfname:'',
  Imagesarray:[],
  arraylength:0,
  currentindex:0,
  cmtfilename:'',
  cmtarray:[],
  cmtarraylen:0,
  cmtcurrentindex:0,
  searchtext:'',
  setsinglefilename:(fname)=>{},
  setcommentsforfname:(fname)=>{},
  setcmtfilename:(fname)=>{},
  setImagesarray:(temparr)=>{},
  setcurrentindex:(index)=>{},
  setcmtarray:(temparr)=>{},
  setcmtcurrentindex:(index)=>{},
  setsearchtext:(query)=>{}
});

export function ImgarrayContextProvider(props) {

    const[singlefname, setsinglefname]=useState('');
    const[cmtforfname, setcmtforfname]=useState('');
    const[cmtfname, setcmtfname]=useState('');
    const[imgarr,setimgarr]=useState([]); 
    const[commentsarray, setcommentsarray]=useState([]);
    const[arrlen,setarrlen]=useState(0);
    const[cmtarrlen,setcmtarrlen]=useState(0);
    const[curindex,setcurindex]=useState(0);
    const[cmtcurindex,setcmtcurindex]=useState(0);
    const[searchquery,setsearchquery]=useState('');

    function singlefnamehandler(fname) 
    {
      setsinglefname(fname);      
    }

    
    
    function cmtforfnamehandler(fname)
    {
      setcmtforfname(fname);
    }
    
    function setimgarrhandler(temparr)
    {
      var arr=[];
      for(let i=0;i<temparr.length;i++)
      {
        var values=JSON.stringify(temparr[i]);        
        arr[i]=JSON.parse(values)
      }
      setimgarr(arr);
      setarrlen(temparr.length);      
    }

    function searchtexthandler(query)
    {
      setsearchquery(query);
    }

    function setcurindexhandler(index)
    {
      setcurindex(index);
    }

    function cmtfnamehandler(fname)
    {
      setcmtfname(fname);
    }

    function setcmtarrayhandler(temparr)
    {
      var arr=[];
      for(let i=0;i<temparr.length;i++)
      {
        var values=JSON.stringify(temparr[i]);        
        arr[i]=JSON.parse(values)
      }
      setcommentsarray(arr);
      setcmtarrlen(temparr.length);      
    }

    function setcmtcurindexhandler(index)
    {
      setcmtcurindex(index);
    }
    
    const context = {
        singlefilename:singlefname,
        commentsforfname:cmtforfname,
        Imagesarray:imgarr,
        arraylength:arrlen,  
        currentindex:curindex,   
        cmtfilename:cmtfname,
        cmtarray:commentsarray,
        cmtarraylength:cmtarrlen,
        cmtcurrentindex:cmtcurindex,
        searchtext:searchquery,
        setsinglefilename: singlefnamehandler,
        setcommentsforfname:cmtforfnamehandler,
        setcmtfilename:cmtfnamehandler,
        setImagesarray:setimgarrhandler,
        setcmtarray:setcmtarrayhandler,
        setcurrentindex:setcurindexhandler,
        setcmtcurrentindex:setcmtcurindexhandler,
        setsearchtext:searchtexthandler,
      };

    return (
        <ImgarrayContext.Provider value={context}>
          {props.children}
        </ImgarrayContext.Provider>
    ); 

}

export default ImgarrayContext;