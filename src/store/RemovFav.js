import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const RemovfromFav =createAsyncThunk('RemovFav/RemovfromFav',
  async(fdata) => { 
          const headers = {
                 'Authorization':'Bearer '+localStorage.getItem('auth_token')
            };
           axios.post
              ('https://mysnaps.cognitivemobile.net/service/removeUserFavourites',fdata, { headers })
                      .then(response=>
                         {                        
                          return response
                         })     
           
})
const RemovFavSlice= createSlice(
    {
        name:'RemovFav',
        initialState:{
            loading: false,
            favres:'',
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(RemovfromFav.pending, state => {
              state.loading = true
            })
            builder.addCase(RemovfromFav.fulfilled, (state, action) => {
              state.loading = false
              state.favres = action.payload
              state.error = ''
            })
            builder.addCase(RemovfromFav.rejected, (state, action) => {
              state.loading = false
              state.favres = ''
              state.error = action.error.message
            })
          }
    }
)

export const RemovFavActions= RemovFavSlice.actions;
export default RemovFavSlice;
