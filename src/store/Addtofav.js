import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToFav =createAsyncThunk('AddToFavourites/AddToFav',
  async(fdata) => { 
          const headers = {
                 'Authorization':'Bearer '+localStorage.getItem('auth_token')
            };
           axios.post
              ('https://mysnaps.cognitivemobile.net/service/updateUserFavourites',fdata, { headers })
                      .then(response=>
                         {        
                          if(response.status===401)
                          {
                             return response.status
                          } 
                          else
                          {
                            return response
                          }               
                          
                         })     
           
})
const AddToFavSlice= createSlice(
    {
        name:'AddToFavourites',
        initialState:{
            loading: false,
            favres:'',
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(AddToFav.pending, state => {
              state.loading = true
            })
            builder.addCase(AddToFav.fulfilled, (state, action) => {
              state.loading = false
              state.favres = action.payload
              state.error = ''
            })
            builder.addCase(AddToFav.rejected, (state, action) => {
              state.loading = false
              state.favres = action.error.message
              state.error = action.error.message
            })
          }
    }
)

export const AddToFavActions= AddToFavSlice.actions;
export default AddToFavSlice;
