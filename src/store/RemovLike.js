import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const RemovfromLike =createAsyncThunk('RemovLike/RemovfromLike',
  async(fdata) => { 
          const headers = {
                 'Authorization':'Bearer '+localStorage.getItem('auth_token')
            };
           axios.post
              ('https://mysnaps.cognitivemobile.net/service/removeUserLikes',fdata, { headers })
                      .then(response=>
                         {                        
                          return response
                         })     
           
})
const RemovLikeSlice= createSlice(
    {
        name:'RemovLike',
        initialState:{
            loading: false,
            likeres:'',
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(RemovfromLike.pending, state => {
              state.loading = true
            })
            builder.addCase(RemovfromLike.fulfilled, (state, action) => {
              state.loading = false
              state.likeres = action.payload
              state.error = ''
            })
            builder.addCase(RemovfromLike.rejected, (state, action) => {
              state.loading = false
              state.likeres = ''
              state.error = action.error.message
            })
          }
    }
)

export const RemovLikeActions= RemovLikeSlice.actions;
export default RemovLikeSlice;
