import React from "react";
import { 
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
const Notfound=( ) => {
  let navigate=useNavigate();
  const dispatch=useDispatch();
  const navtosigin=()=>
  {
    dispatch(authActions.logout());
    navigate('/registerandsignin');
  }

  const navtohome=()=>
  { 
    navigate('/');
  }
    return(
      <Grid container>
       <Grid item sm={1} md={3} lg={4} sx={{display:{   sm: "block",
                                            md: "block", 
                                            lg: "block" }}}>

       </Grid>
       
       <Grid item xs={12} sm={12} md={4} lg={4}>
       <Stack spacing={2}>
       <Typography variant="h5"
                     sx={{textAlign:'center', 
                          padding:{sm:'20 5'},
                          marginTop:'50px' }}>
           404 Page not found
        </Typography>

       </Stack>
         
        <Stack spacing={2} direction="row" sx={{justifyContent:'center', margin:'40px 0 0 0'}}>   
        <Button onClick={navtosigin}
                variant="outlined" size="large"
                startIcon={<HowToRegIcon/>}  
                sx={{textTransform:'capitalize'}}>
                        Login
        </Button>
        <Button onClick={navtohome}
                variant="outlined" size="large"
                startIcon={<HomeIcon/>}  
                sx={{textTransform:'capitalize'}}>
                        Home
        </Button>
       </Stack>
       </Grid>
       <Grid item md={3} lg={4} sx={{display:{sm: "block",
                                              md: "block", 
                                              lg: "block" }}}>

       </Grid>
     </Grid>
    );
}

export default Notfound;