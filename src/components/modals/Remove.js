import React,{useState} from "react";
import { useDispatch } from "react-redux";
import {
 Button,
 Card,
 CardMedia,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 Stack
 } from '@mui/material';
 import { RemovfromFav } from "../../store/RemovFav";
 import { RemovfromLike } from "../../store/RemovLike";
 import { useNavigate } from "react-router-dom";
 //import { RemovfromImg } from "../../store/RemovImg";

const Remove =(props) =>
 {
  const dispatch=useDispatch();
  let navigate=useNavigate();
  const baseUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/';
  const [open, setOpen] = useState(props.state);
  const actionstr=props.action;
  let imgsrc=props.image;

  const handleClose = () => 
  {
    props.setState();
    setOpen(false);
  };

  const remove=()=>
  {
    let formData= new FormData(); 
    formData={"fileName":imgsrc}
    if(actionstr==='like')
    {
      dispatch(RemovfromLike(formData));
      window.location.reload(false);
      // dispatch(fetchLikeImages()); 
      props.setState();
     
      navigate('/likes');
     
      setOpen(false);

    }
    else if(actionstr==='fav')
    {
      dispatch(RemovfromFav(formData));
      window.location.reload(false);
      // dispatch(fetchFavImages());
      props.setState();
      window.location.reload(false);
      navigate('/favourites');
      
      setOpen(false);
    }

  }
    return(
      <Dialog open={open}
              
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title">
      <Stack sx={{display:'flex', justifyContent:'center'}} >
      <DialogTitle id="responsive-dialog-title">
               {"Are you sure to remove?"}
          </DialogTitle>
      <DialogContent>
        <Card sx={{display:'flex', justifyContent:'center', border:'none', boxShadow:'none'}}>
           <CardMedia component="img"
                      sx={{ width: 151}}
                      image={baseUrl+imgsrc}
                      alt="Image to remove"/>
        </Card>
    
      </DialogContent>
      <DialogActions>
            <Button autoFocus onClick={remove}>
                      OK
            </Button>
            <Button onClick={handleClose} autoFocus>
                 CANCEL
            </Button>
      </DialogActions>
      </Stack>
        
    </Dialog>
    );
}

export default Remove;