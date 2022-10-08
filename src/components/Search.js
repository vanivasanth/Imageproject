import React from "react";
import './search.css';
import { Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Searchresults from './Searchresults';
import {useState} from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Search = (props) =>{
  const [openEntervalue, setOpenentervalue] = useState(false);
  const [noresults, setnoresults]= useState(false);
  const [showAdvanced, setShowAdvanced]=useState(false);
  const [searchtext, setSearchtext]= useState('');
  const [data, setdata]=useState('');
  
  const [showresults,setshowresults]= useState(false);
  //const [advsearchoption, setadvsearchoption]= useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenentervalue(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setnoresults(false);
  };
  const formatday = (dayval) => {
    if(dayval<10){
         dayval='0'+dayval;
    }
    return dayval;
  }

  const formatmonth = (monval) => {
      if(monval<10){
          monval='0'+monval;
      }
      return monval;
  }

  const dateformatting =() => {
    const current = new Date();
    const dayval=`${current.getDate()}`;
    const monval=`${current.getMonth()+1}`;
    const year = `${current.getFullYear()}`;
    const day = formatday(dayval);
    const month = formatmonth(monval);
    const toDate = year+'-'+month+'-'+day;
    const dateval=toDate;
    return dateval;
  }

  const datestring='fromdate=2022-02-01'+'&todate='+dateformatting();
  const [captionchecked, setcaptionchecked]=useState(false);
  const [captiontext, setcaptionText]=useState('');
  const [remarkschecked, setremarksChecked]=useState(false);
  const [remarkstext, setremarksText]=useState('');
  const [categorychecked, setcategoryChecked]=useState(true);
  const [categorytext, setcategoryText]=useState('');
  const [datechecked, setdatechecked ] =useState(false);
  const [fromdatetext, setfromdatetext ] =useState('');  
  const [todatetext,settodatetext ] =useState('');

const todatehandler=(event)=>{
  settodatetext(event.target.value)
}
  const fromdatehandler=(event)=>{
    setfromdatetext(event.target.value)
  }
 
  const searchTextHandler=(event) =>
  {
    setSearchtext(event.target.value)  
  }

  const searchoptionhandler =() =>
  {
    setShowAdvanced(!showAdvanced);
  }

  const backtosearch = () =>
  {
    setShowAdvanced(!showAdvanced);
  }

  const categoryhandler =(event) => 
  {
    setcategoryText(event.target.value);
   
  }

  const remarkshandler =(event) =>
  {
    setremarksText(event.target.value);
   
  }

  const captionhandler =(event) =>
  {
    setcaptionText(event.target.value);
  }

  const searchshowhandler=() =>{
    setshowresults(!showresults);
    setShowAdvanced(showAdvanced);
  }

  const clearAll=()=>{
    setcategoryText('');
    setremarksText('');
    setcaptionText('');
    setfromdatetext('');
    settodatetext('');
    setcaptionchecked(false);
    setremarksChecked(false);
    setcategoryChecked(false);
    setdatechecked(false);
  }

  async function searchdata(query, datestr)
    {
      const queryparams = query+datestr;
      if(localStorage.getItem('auth_token')!==null)
       {
          const headers = {
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
         };
        const api=`https://www2.executesimple.com/getSearchFiles?`+queryparams;
        const result=await fetch(api,{headers});
                   
          const getResult= await result.json();
      
          if(getResult.userChatFiles &&( getResult.userChatFiles.length>0 ))
          {
            setshowresults(true);
            setdata(getResult.userChatFiles);
            console.log(data);
          }
          else
          {
            setnoresults(true);
          }
       
          // var size= data.length;
          // alert(size);
          // if(size)
          // {
          //   setnoresults(true)
          // }
          // else
          // {
          //   setshowresults(true);
          // }
      }
      else
      {
        const api=`https://www2.executesimple.com/getAllUserSearchFiles?`+queryparams;
        const result=await fetch(api);          
        const getResult= await result.json();
        if(getResult.userChatFiles &&( getResult.userChatFiles.length>0 ))
        {
          setshowresults(true);
          setdata(getResult.userChatFiles);
          console.log(data);
        }
        else
        {
          setnoresults(true)
        }
       
      }    
    }

  const advsearchHandler=(event) =>{
    event.preventDefault();
   
    var datestr;
    if((captiontext===null || captiontext==='') && 
       (remarkstext===null || remarkstext==='') && 
       (categorytext===null || categorytext==='')&& 
       (fromdatetext===null ||fromdatetext==='')&&
       (todatetext===null || todatetext===''))
      {
         alert('Enter values for search')
         return;
      }
     if(captiontext===null|| captiontext===''){
            setcaptionText('nodata');
      }
     if(remarkstext===null||remarkstext===''){
           setremarksText('nodata');
      }
     if(categorytext===null|| categorytext===''){
            setcategoryText('nodata');
       }
       if( fromdatetext==='' && todatetext===''){      
          datestr=datestring;
       }
       if(fromdatetext!==''&& todatetext!=='')
       {
         datestr='fromdate='+fromdatetext+'&todate='+todatetext;
       }
       if(fromdatetext!==''&& todatetext==='')
       {
        datestr='fromdate='+fromdatetext+todatetext;
       }
       if(fromdatetext===''&& todatetext!=='')
       {
        datestr='fromdate=2022-02-01'+'&todate='+'&todate='+dateformatting();
       }
       const query='category='+categorytext+'&caption='+captiontext+'&remarks='+remarkstext+'&';
       searchdata(query, datestr); 
  }
  const searchHandler =(event)=>{
    event.preventDefault();  
    console.log(searchtext);
         if(searchtext===null||searchtext==='')
         {
          setOpenentervalue(true)
         }
         else
         {
          const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
          searchdata(query, datestring);  
         }
          
        
  }
  return (
    <div className="search_form">
      <h1 style={{marginLeft:'450px'}}> Search Images</h1>
      <form>
        {showAdvanced===false && showresults===false &&

         <>
          <div className="searchbox">
          <div className="search">
            
            <input className='searchiteminput'
                   type="search"
                   placeholder="search"
                   name="search"
                   value={searchtext}
                   onChange={searchTextHandler}/>
            <button className='searchicon'
                    type='submit'
                    style={{background:'none',
                            cursor:'pointer'}}
                    onClick={searchHandler}>
                         <SearchIcon/>
             </button> 
            </div>
           
            <div className='searchitem'>
           
            <button  type='button'
                     className='advsearch'
                   
                     onClick={searchoptionhandler}>
              Advanced Search
            </button>
            </div>
          </div>
         </>
         
        }
      {
        showAdvanced===true && showresults===false &&
        <>
        
        <div className="searchoptions">
        <div className="options">
             <label>
             <input type="checkbox" 
                    name="category"
                    checked={categorychecked}
                    onChange={() => {
                         if(categorychecked){
                           setcategoryText('')
                         }
                     setcategoryChecked(!categorychecked)
                       }
                    }/> Category
             </label>
          
            <input
                 name="category"
                 type="search"
                 className='searchtext'
                 disabled={!categorychecked}
                 value={categorytext}
                 onChange={categoryhandler}
             />

         </div>
         <div className="options">
             <label>
             < input type="checkbox" 
                     name="remarks"
                     checked={remarkschecked}
                     onChange={()=>{
                      if(remarkschecked)
                      {
                       setremarksText('')
                      }
                       setremarksChecked(!remarkschecked)
                 
                     }}/> Remarks
             </label>
          
            <input
                 name="Remarks"
                 type="search"
                 className='searchtext'
                 disabled={!remarkschecked}
                 value={remarkstext}
                 onChange={remarkshandler}
             />

         </div>
         <div className="options">
             <label>
             <input type="checkbox" 
                   name="caption"
                   checked={captionchecked}
                   onChange={()=>{
                    if(captionchecked)
                    {
                      setcaptionText('')
                    }
                 
                     setcaptionchecked(!captionchecked)
                   }}/> Caption
             </label>
          
            <input
                 name="caption"
                 type="search"
                 className='searchtext'
                 style={{marginLeft:'15px'}}
                 disabled={!captionchecked}
                 value={captiontext}
                 onChange={captionhandler}
             />

         </div> 
         <div className="options">
             <label  style={{marginLeft:'-155px'}}>
             <input type="checkbox" 
                    name="Date"
                   
                    checked={datechecked}
                    onChange={()=>{
                    if(datechecked)
                    {
                      setfromdatetext('')
                      settodatetext('')
                    }
                 
                     setdatechecked(!datechecked)
                   }}/> Date
             </label>
         </div> 
         <div className="options">
             <label  style={{marginLeft:'47px'}}>
              From 
             </label>
          
            <input
                 name="fromdate"
                 type="date"
                 className='searchtext'
                 style={{marginLeft:'15px',
                         width:'180px'}}
                 disabled={!datechecked}
                 value={fromdatetext}
                 onChange={fromdatehandler}
             />

         </div> 
         <div className="options">
             <label style={{marginLeft:'48px'}}>
              To 
             </label>
          
            <input
                 name="date"
                 type="date"
                 className='searchtext'
                 style={{marginLeft:'30px',
                         width:'180px'}}
                 disabled={!datechecked}
                 value={todatetext}
                 onChange={todatehandler}
             />

         </div> 
         <div className='buttons'>
         <button type='button'
                onClick={backtosearch}>
          back
         </button>
         <button type='button'
                onClick={clearAll}>
          Clear all
         </button>
        <button type='button'
                onClick={advsearchHandler}>
          Search
        </button>
         </div>
        
         </div>
        </>
      }
      </form> 
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }}
                open={openEntervalue} 
                autoHideDuration={2000} 
                onClose={handleClose}>
        <Alert onClose={handleClose} 
               severity="info" 
               sx={{ width: '100%' }}>
          Enter values for search!
        </Alert>
      </Snackbar>  
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }}
                open={noresults} 
                autoHideDuration={5000} 
                onClose={handleClose1}>
        <Alert onClose={handleClose1} 
               severity="info" 
               sx={{ width: '100%' }}>
          No results Found for '{searchtext}'
        </Alert>
      </Snackbar>  
      { showresults&&
        <>
         <div style={{marginLeft:'100px'}}>
         <button className="backtosearch"
                style={{padding:'8px',
                        margin:'20px',
                        }}
                onClick={searchshowhandler}>
           back 
        </button>
          <Searchresults pictures={data}/>
         </div>
        </>
      }   
    </div>
  )
  }



export default Search;