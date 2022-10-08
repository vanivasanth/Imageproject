import React from "react";
import { 
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from "react-router-dom";

const Expired=( ) => {
  let navigate=useNavigate();
  const navtosigin=()=>
  {
    navigate('/registerandsignin');
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
                          marginTop:'150px' }}>
           Your LoggedIn session expired <br/>
            <br/> please login to continue
        </Typography>

       </Stack>
         
        <Stack spacing={2} direction="row" sx={{justifyContent:'center',
                                                margin:'40px 0 0 0'}}>   
        <Button onClick={navtosigin}
                variant="outlined" size="large"
                startIcon={<HowToRegIcon/>}  
                sx={{textTransform:'capitalize'}}>
                        Login
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

export default Expired;