import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToLike =createAsyncThunk('AddToLikes/AddToLike',
  async(fdata,{ rejectWithValue }) => { 
    try{
      const headers = {
        'Authorization':'Bearer '+localStorage.getItem('auth_token')
               };
      const res=  axios.post
                ('https://mysnaps.cognitivemobile.net/service/updateUserLikes',fdata, { headers })
                .then(response=>
                  {         
                      return response
                  })     
                  return res   
        }
        catch(err)
         {
             return rejectWithValue(err.res)
         }
          
})
const AddToLikeSlice= createSlice(
    {
        name:'AddToLikes',
        initialState:{
            loading: false,
            likeres:'',
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(AddToLike.pending, state => {
              state.loading = true
            })
            builder.addCase(AddToLike.fulfilled, (state, action) => {
              state.loading = false
              state.likeres = action.payload
              state.error = ''
            })
            builder.addCase(AddToLike.rejected, (state, action) => {
              state.loading = false
              state.likeres = ''
              state.error = action.error
            })
          
          }
    }
)

export const AddToLikeActions= AddToLikeSlice.actions;
export default AddToLikeSlice;
