import React,{useState} from "react";
import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 Stack,
 Typography
 } from '@mui/material';
 
 import { useNavigate } from "react-router-dom";

const ExpiredModal =(props) =>
 {
  
  const [open, setOpen] = useState(props.state);
  let navigate=useNavigate();
  
  const navtosigin=()=>
  {
    navigate('/registerandsignin');
  }

  const handleClose = () => 
  {
    props.setState();
    setOpen(false);
  };

 
    return(
      <Dialog open={open}              
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title">
      <Stack sx={{display:'flex', justifyContent:'center'}}>
      <DialogTitle id="responsive-dialog-title">
               {"Are you sure to remove?"}
          </DialogTitle>
      <DialogContent>
      <Stack spacing={2}>
       <Typography variant="h5"
                     sx={{textAlign:'center', 
                          padding:{sm:'20 5'},
                          marginTop:'150px' }}>
           Your LoggedIn session expired <br/>
            <br/> please login to continue
        </Typography>

       </Stack>
    
      </DialogContent>
      <DialogActions>
            <Button autoFocus onClick={navtosigin}>
                      Login
            </Button>
            <Button autoFocus onClick={handleClose}>
                      Back
            </Button>
           
      </DialogActions>
      </Stack>
        
    </Dialog>
    );
}

export default ExpiredModal;