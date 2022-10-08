import React from "react";
import './search.css';
import SearchIcon from '@mui/icons-material/Search';
import Searchresults from './Searchresults';
import {useState} from 'react';

const Allusersearch = (props) =>{
  const [showAdvanced, setShowAdvanced]=useState(false);
  const [searchtext, setSearchtext]= useState('');
  const [data, setdata]=useState('');
  const [showresults,setshowresults]= useState(false);
 

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
    const dateval='fromdate=2022-01-01'+'&todate='+toDate;
    return dateval;
  }

  const datestring=dateformatting();
  const [captionchecked, setcaptionchecked]=useState(false);
  const [captiontext, setcaptionText]=useState('');
  const [remarkschecked, setremarksChecked]=useState(false);
  const [remarkstext, setremarksText]=useState('');
  const [categorychecked, setcategoryChecked]=useState(true);
  const [categorytext, setcategoryText]=useState('');
  // const searchval=props.searchval;
  // useEffect(()=> {
  //   if(searchval!=='')
  //   {
  //     setSearchtext(searchval);
  //     setshowresults(true);
  //     const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
  //     searchdata(query, datestring);   
  //   }
  //   else{
  //     return
  //   }

   

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
  }

  async function searchdata(query, datestr)
    {
          const queryparams = query+datestr;
          const api=`https://www2.executesimple.com/getAllUserSearchFiles?`+queryparams;
          const result=await fetch(api);          
          const getResult= await result.json();
          setdata(getResult.allUsersChatFiles);
          console.log(data);
    }

  const advsearchHandler=(event) =>{
    event.preventDefault();
    setshowresults(true);
    if((captiontext===null || captiontext==='') && 
    (remarkstext===null || remarkstext==='') && 
    (categorytext===null || categorytext===''))
      {
         alert('Enter values for search')
         return;
      }
     if(captiontext===null){
            setcaptionText('nodata');
      }
     if(remarkstext===null){
           setremarksText('nodata');
      }
     if(categorytext===null){
            setcategoryText('nodata');
       }
           const query='category='+categorytext+'&caption='+captiontext+'&remarks='+remarkstext+'&';
          searchdata(query, datestring); 
  }
  const searchHandler =(event)=>{
    event.preventDefault();
    setshowresults(true);
   
    if(searchtext===null || searchtext==='') {
      alert('Enter values for search')
      return;
    }
         // console.log('normal')
          const query='category='+ searchtext+'&caption='+ searchtext+'&remarks='+ searchtext+'&';
          searchdata(query, datestring);   
        
  }
  return (
    <div className="search_form">
    <h1 style={{marginLeft:'300px'}}> Search Images</h1>
    <form>
      {showAdvanced===false && showresults===false &&

       <>
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
             Advanced search
           </button>
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
    { showresults&&
      <>
      <button className="backtosearch"
              style={{padding:'8px',
                      margin:'20px'}}
              onClick={searchshowhandler}>
        back 
      </button>
    
      <Searchresults pictures={data}/>
      </>
    }   
  </div>
  )
  }



export default Allusersearch;