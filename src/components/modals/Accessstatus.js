import React,{useState} from "react";
import {   
    Dialog,
    IconButton,
    Slide,
    Stack
 }
from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Access from '../pages/Access';

const Transition =React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Accessstatus =(props) => {
    const [open, setOpen] = useState(props.state);
   const handleClose = () => {
        props.setstate();
        setOpen(false);
       };
    return(
        <Dialog fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
 >
  <Stack direction='row' sx={{display:'flex',                                       
                              justifyContent:'flexEnd'}}>
  
   <IconButton
    sx={{backgroundColor:'black', color:'white',
    margin:'10px', padding:'8px'}}
     edge="start"
     onClick={handleClose}
     aria-label="close"
   >
     <CloseIcon />
   </IconButton>
            
  </Stack>
      <Access/>
</Dialog>
    );
}

export default Accessstatus;