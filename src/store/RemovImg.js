import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const RemovfromImg =createAsyncThunk('RemovImg/RemovfromImg',
  async(fdata) => { 
          const headers = {
                 'Authorization':'Bearer '+localStorage.getItem('auth_token')
            };
           axios.post
              ('https://mysnaps.cognitivemobile.net/service/updateUserFavourites',fdata, { headers })
                      .then(response=>
                         {                        
                          return response
                         })     
           
})
const RemovImgSlice= createSlice(
    {
        name:'RemovImg',
        initialState:{
            loading: false,
            Imgres:'',
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(RemovfromImg.pending, state => {
              state.loading = true
            })
            builder.addCase(RemovfromImg.fulfilled, (state, action) => {
              state.loading = false
              state.Imgres = action.payload
              state.error = ''
            })
            builder.addCase(RemovfromImg.rejected, (state, action) => {
              state.loading = false
              state.Imgres = ''
              state.error = action.error.message
            })
          }
    }
)

export const RemovImgActions= RemovImgSlice.actions;
export default RemovImgSlice;
