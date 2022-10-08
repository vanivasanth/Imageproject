import React,{useCallback, useEffect,useRef,useState} from "react";
import DownloadIcon from '@mui/icons-material/Download';

import {
    Button
} from "@mui/material";

import { useSelector,useDispatch } from "react-redux";
import { fetchApkDetails } from "../../store/GetApkversion";
import { fetchApk } from "../../store/getAPK";
const ApkButton =() => 
{
    const dispatch=useDispatch();
    const shouldrender=useRef(true);
    const [versionno, setversionno]=useState('no data');
    const [apkname, setapkname]=useState('no data');
    const data=useSelector((state)=>state.getApkDetails);   
    const versiondetails=data.apkDetails;
    const checkapkdetails=useCallback(()=>{
     if(versiondetails)
      {
        let vno=versiondetails.hasOwnProperty('apkVersionNo')?versiondetails.apkVersionNo:'no data';
        let aname=versiondetails.hasOwnProperty('apkName')?versiondetails.apkName:'no data';
        setversionno(vno);
        setapkname(aname);
      }
   },[versiondetails])
    const apk=useSelector((state)=>state.getApk);   
    useEffect(()=>{
        if(shouldrender.current)
        {
          shouldrender.current=false;
          dispatch(fetchApkDetails()) 
          checkapkdetails();
        }     
       },[dispatch,checkapkdetails])
    const downloadapk=()=>
    {
    if(apkname!=='no data')
      {
        dispatch(fetchApk(apkname))
      }
    else
      {
         alert('Apk not available');
      }
    }
    return(
        <>
        <Button onClick={downloadapk} 
                disabled={apk.loading?true:false}
                variant={apk.loading?'outlined':'contained'}
                startIcon={apk.loading?'':<DownloadIcon/>}>
         {apk.loading && <p>downloading</p>}
         {!apk.loading && 
              <>APK&emsp;{versionno}</>
         }
         {apk.loading && <p>downloading</p>}
                   
        </Button>
        </>
    );
}
export default ApkButton;