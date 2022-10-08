import './navbar.css';
//import { LoginIcon } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreIcon from '@mui/icons-material/MoreVert';
import MuiDrawer from '@mui/material/Drawer';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MuiAppBar from '@mui/material/AppBar';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  ButtonGroup,
  CssBaseline,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
//import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import ApkButton from '../ui/ApkButton';
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down('sm')]: {
    width: 0,
    display:'none',
  },
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const drawerWidth = 220;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

  
const Navbar = (props) => 
{
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const theme = useTheme();
  const profimgUrl='https://mysnaps.cognitivemobile.net/uploads/highmessaging/user/';
  const [open, setOpen] = useState(false); 
  const [menuopen, setmenuOpen] = useState(false);
  const loggedstatus=useSelector((state)=>state.auth.isLoggedIn);
  const image=useSelector((state)=>state.auth.image);

  const navtosigin = () =>{
    navigate('/registerandsignin');
    setmenuOpen(false);
  }
  const navtologout=() =>{
    navigate('/logout');
    setmenuOpen(false);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const navtoeditprofile=()=>
    {
      navigate('/editprofile');
    }

  useEffect(() => {
    const mobile=localStorage.getItem('mobile');
    const email=localStorage.getItem('email'); 
    if((mobile!==null) || (email!==null))
     {
       dispatch(authActions.login());
     }
   else
     {
      dispatch(authActions.logout());
     }
 }, [dispatch]);
  
    return(
      <>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
         <StyledToolbar>
           <Stack direction='row'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon sx={{  margin:'5px',
                             marginTop:'10px' }}/>
             </IconButton>
              <Typography variant="h5" sx={{marginTop:'10px' }}>
                MySnaps
               </Typography>
             </Stack>
            
             <Stack direction='row'>
               <ButtonGroup variant="contained" 
                            disableElevation 
                            sx={{display: { xs:"none",
                                            sm:"none",
                                            md: "none", 
                                            lg: "block" }}}>
                 <ApkButton/>
                 { !loggedstatus &&
                 <Button onClick={navtosigin}
                         startIcon={<HowToRegIcon/>}  
                         sx={{textTransform:'capitalize'}}>
                          SignIn / Register
                  </Button>
                }
                 { loggedstatus &&
                 <Button onClick={navtologout}
                         startIcon={<PowerSettingsNewIcon/>}  
                         sx={{textTransform:'capitalize'}}>
                          Logout
                  </Button>
                }
               </ButtonGroup>           
             
            <Avatar sx={{ marginTop:'8px',
                          cursor:'pointer',
                          width: 30, height: 30 }}
                    onClick={navtoeditprofile}
                    src={profimgUrl+image}/>
             <IconButton
                   size="large"
                   aria-label="show more"
                   aria-haspopup="true"
                   onClick={(e) => setmenuOpen(true)}
                   color="inherit"
                   sx={{ display: { xs: "block", lg: "none" },}}>
              <MoreIcon/>
            </IconButton>
            <Menu
               id="demo-positioned-menu"
               aria-labelledby="demo-positioned-button"
               open={menuopen}
               onClose={(e) => setmenuOpen(false)}
               anchorOrigin={{
                     vertical: "top",
                     horizontal: "right",
                   }}
               transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                 }}>
        
        { !loggedstatus &&
             <MenuItem >
               <Button onClick={navtosigin}
                       startIcon={<HowToRegIcon/>}>
                    SignIn/Register
              </Button>
              </MenuItem>
         
        }
      
       { loggedstatus &&
             <MenuItem >
               <Button onClick={navtologout}
                       startIcon={<PowerSettingsNewIcon/>}>
                   Logout
              </Button>
              </MenuItem>
         
        }
        <MenuItem>
            <ApkButton/>
        </MenuItem>
      </Menu>       
            </Stack>     
         </StyledToolbar>
        </AppBar>
         <Drawer variant="permanent" open={open}>
         <DrawerHeader>
           <IconButton onClick={handleDrawerClose} sx={{color:'white'}}>
             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
           </IconButton>
         </DrawerHeader>
         <List>
         <Link to='/' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              
              <ListItemButton >
                <ListItemIcon>
                <Tooltip title="Home" arrow>
                  <HomeIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>              
            </ListItem>
            </Link>

            <Link to='/myuploads' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="My uploads" arrow>
                  <CameraEnhanceIcon/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="My Uploads" />
              </ListItemButton>
            </ListItem>
            </Link>
           
            <Link to='/Imageupload' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="Upload images" arrow>
                  <UploadFileIcon/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Upload Image" />
              </ListItemButton>
            </ListItem>
            </Link>
            
            <Link to='/likes' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                <Tooltip title="My Likes" arrow>
                  <ThumbUpIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Likes" />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to='/favourites' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="My favourites" arrow>
                  <FavoriteIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to='/contacts' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="My Contacts" arrow>
                  <PermContactCalendarIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItemButton>
            </ListItem>
            </Link>
            <Link to='/prescription' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="My Prescription" arrow>
                  <LocalHospitalIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Prescription" />
              </ListItemButton>
            </ListItem>
            </Link>
            <Divider/>

            <Link to='/search' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="Search images" arrow>
                  <SearchIcon/>
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to='/share' style={{textDecoration:'none', color:'blue'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <Tooltip title="Share MySnaps" arrow>
                  <ShareIcon  />
                </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Share" />
              </ListItemButton>
            </ListItem>  
            </Link>         
          </List>
         </Drawer>
         </>
    );

}

export default Navbar;