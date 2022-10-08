import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthSlice';
import AddToLikeSlice from "./Addtolikes";
import AddToFavSlice from "./Addtofav";
import downloadImageSlice from "./Downloadimg";
import getAllImageSlice from "./GetAllImagesSlice";
import getApkDetailSlice from "./GetApkversion";
import getApkSlice from "./getAPK";
import getAdvSearchSlice from "./GetAdvSearch";
import getSearchSlice from "./GetSearchImg";
import getCmtSlice from "./Getcmtslice";
import getContactImageSlice from "./GetContactImagesSlice";
import getFavImageSlice from "./GetFavImagesSlice";
import GetMyImagesSlice from "./GetMyImagesSlice";
import getsharedImageSlice from "./GetshareImages";
import getLikeImageSlice from "./GetLikeImagesSlice";
import getPresImageSlice from "./GetPresImagesSlice";
import RemovFavSlice from "./RemovFav";
import RemovImgSlice from "./RemovImg";
import RemovLikeSlice from "./RemovLike";

const store = configureStore({
    reducer:{
        AddToLikes:AddToLikeSlice.reducer,
        AddToFavourites:AddToFavSlice.reducer,
        auth:authSlice.reducer,
        downloadImage:downloadImageSlice.reducer,
        getAdvSearchImages:getAdvSearchSlice.reducer,
        getSearchImages:getSearchSlice.reducer,
        getApkDetails:getApkDetailSlice.reducer,
        getApk:getApkSlice.reducer,
        getAllImages:getAllImageSlice.reducer,
        getsharedImages:getsharedImageSlice.reducer,
        getcmtImages:getCmtSlice.reducer,
        getContactImages:getContactImageSlice.reducer,
        getFavImages:getFavImageSlice.reducer,
        getLikeImages:getLikeImageSlice.reducer,
        GetMyImages:GetMyImagesSlice.reducer,       
        getPresImages:getPresImageSlice.reducer,  
        RemovFav:RemovFavSlice.reducer,
        RemovLike:RemovLikeSlice.reducer,
        RemovImg:RemovImgSlice.reducer,
    }
});

export default store; 