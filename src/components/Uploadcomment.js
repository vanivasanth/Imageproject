import React from "react";
import img2 from '../images/image2.jpg';
import { post } from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useRef } from 'react';

const Uploadcomment = (props) => {

    const [image1, setImage1] = useState(img2);
    const [imagefile1, setimagefile1]=useState(img2);
    const inputRef = useRef();

    const onClose = () => {
        props.setShowmodal(false);
    }
    
    const imageHandler=(e) => 
        {
          inputRef.current.click();
        }
   const onInputClick = (event) => 
        {
          const file=event.target.files[0] ;
          setimagefile1(file);
          console.log(file)
          const reader = new FileReader();
          reader.onload = () =>{
            if(reader.readyState === 2){
              setImage1(reader.result)
            }
          }
          reader.readAsDataURL(event.target.files[0])
        }
        const uploadComment= () =>{
            let data={
              'fileName':props.fname
            }
            let formData = new FormData();
            formData.append('commentfile', imagefile1);
            formData.append('commentDetail',JSON.stringify(data));
            console.log(formData);
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Bearer '+ localStorage.getItem('auth_token')
              }
            }
            post("https://www2.executesimple.com/updateUserComments", formData, config)
              .then((response) => {
                console.log(response.data);
                if(response.data.result_code === 0) {
                  alert(response.data.result_text);
                  props.setShowmodal(false);
                } 
                else
                 {
                  alert(response.data.result_text);
                 }
            })
          }
    return(
        <>
         <div className="delmodalBackground">
        <div className="delmodalContainer">
        
           <div className='close_icon'>
               <CloseIcon onClick={onClose}/>
              
           </div>
           <div className='del-content'>
           <p>Upload your Comment</p>
           </div>
          
          <div className='preview-holder'>
				  <img src={image1} alt="" id="img" className="img" /> 
          </div>  
          <input type="file" 
                            id="input"
                            style={{display:'none'}}
                            onChange={onInputClick}
                            ref={inputRef}
                            />  
           <div className='del-buttons'>
             <button className='del-button'
                     type='button'
                     onClick={imageHandler}>
                  Select
             </button>
             <button className='del-button' 
                     type='submit'
                     onClick={uploadComment}>
                   Upload
             </button>
           </div>  
             
        </div> 
    </div>
        </>
    );
}

export default Uploadcomment;