import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchLikeImages =createAsyncThunk('getLikeImages/fetchLikeImages',
  async() => { 
    const headers = 
       {
        'Authorization':'Bearer '+ localStorage.getItem('auth_token')
       };
    const api=`https://mysnaps.cognitivemobile.net/service/getUserFiles?search=likes`;
    const res= await fetch(api,{headers})
        .then(
              (data) =>{ 
                        if(data.status===401)
                             {
 
                             }
                             else
                             {
                         var values= data.json(); 
                         return values
                       } 
                    }
             )
             return res.userLikeFiles
            })
const getLikeImageSlice = createSlice(
    {
        name:'getLikeImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => 
           {
            builder.addCase(fetchLikeImages.pending, state =>
                 {
                    state.loading = true
                 })
            builder.addCase(fetchLikeImages.fulfilled, (state, action) => 
                {
                    state.loading = false
                    state.imagesArray = action.payload
                    state.error = ''
                })
            builder.addCase(fetchLikeImages.rejected, (state, action) => 
               {
                    state.loading = false
                    state.imagesArray = []
                    state.error = action.error.message
               })
          }
    }
)

export const getLikeImageActions= getLikeImageSlice.actions;
export default getLikeImageSlice;
