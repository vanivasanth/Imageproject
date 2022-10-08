import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    
  } from "@mui/material";
  import React from "react";
  
  const Sidebar = () => {
    return (
      <Box flex={1} p={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <CameraEnhanceIcon/>
                </ListItemIcon>
                <ListItemText primary="My Uploads" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <UploadFileIcon/>
                </ListItemIcon>
                <ListItemText primary="Upload Image" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ThumbUpIcon/>
                </ListItemIcon>
                <ListItemText primary="Likes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <FavoriteIcon/>
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <PermContactCalendarIcon/>
                </ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <SearchIcon/>
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ShareIcon  />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </ListItemButton>
            </ListItem>
           
          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;