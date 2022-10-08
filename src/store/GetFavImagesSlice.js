import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchFavImages =createAsyncThunk('getFavImages/fetchFavImages',
       async() => { 
             const headers = {
               'Authorization':'Bearer '+ localStorage.getItem('auth_token')
              };
             const api=`https://mysnaps.cognitivemobile.net/service/getUserFiles?search=favourites`;
             const res= await fetch(api,{headers})
             .then(
                  (data) =>{
                             if(data.status===401)
                             {
                               console.log('fav data'+data)
                             }
                             else
                             {
                             var values= data.json(); 
                             console.log(values);
                             return values;
                             }
                           })
              return res.userFavouriteFiles;
            })
const getFavImageSlice = createSlice(
    {
        name:'getFavImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchFavImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchFavImages.fulfilled, (state, action) => {
              state.loading = false
              state.imagesArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchFavImages.rejected, (state, action) => {
              state.loading = false
              state.imagesArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getFavImageActions= getFavImageSlice.actions;
export default getFavImageSlice;
