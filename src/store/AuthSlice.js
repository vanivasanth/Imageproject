import { createSlice } from "@reduxjs/toolkit";
import img1 from "../images/default_profile.webp";

const authSlice = createSlice(
    {
        name:'auth',
        initialState:{
            isLoggedIn:false,
            authToken:'',
            name:'',
            emailId:'',
            userId:'',
            mobile:'',
            gender:'',
            dob:'',
            image:img1},
        reducers:{
             login(state)
             {
                state.isLoggedIn=true;
                state.authToken=localStorage.getItem('auth_token');
                state.name=localStorage.getItem('firstname')+localStorage.getItem('lastname');
                state.emailId=localStorage.getItem('email');
                state.userId=localStorage.getItem('id');
                state.mobile=localStorage.getItem('mobile');
                state.gender=localStorage.getItem('gender');
                state.dob=localStorage.getItem('dateofbirth');
                state.image=localStorage.getItem('profileImage');                
             },
             logout(state){
                localStorage.clear();
                state.image='';
                state.isLoggedIn=false;
             }
        }
    }
)

export const authActions= authSlice.actions;
export default authSlice;
