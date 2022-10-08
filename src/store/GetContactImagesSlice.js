import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchContactImages =createAsyncThunk('getContactImages/fetchContactImages',
  async() => { 
        const headers = {
                'Authorization':'Bearer '+ localStorage.getItem('auth_token')
              };
        const api=`https://mysnaps.cognitivemobile.net/service/getImageTextBasedSearchFiles`;
        const res= await fetch(api,{headers})
                        .then(
                             (data) =>{ 
                                        var values= data.json(); 
                                        return values
                                      })
                          return res.allUsersChatFiles
            })
const getContactImageSlice = createSlice(
    {
        name:'getContactImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchContactImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchContactImages.fulfilled, (state, action) => {
              state.loading = false
              state.imagesArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchContactImages.rejected, (state, action) => {
              state.loading = false
              state.imagesArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getContactImageActions= getContactImageSlice.actions;
export default getContactImageSlice;
