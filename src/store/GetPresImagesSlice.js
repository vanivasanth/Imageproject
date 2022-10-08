import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchPresImages =createAsyncThunk('getPresImages/fetchPresImages',
  async() => { 
    const headers = {
      'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    };
    const api=`https://mysnaps.cognitivemobile.net/service/getPrescriptionSearchFiles`;
    const res= await fetch(api,{headers})
        .then(
           (data) =>{
                      var values= data.json();           
                      return values
                    })
            return res.usersPrescriptionChatFiles
})
const getPresImageSlice = createSlice(
    {
        name:'getPresImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchPresImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchPresImages.fulfilled, (state, action) => {
              state.loading = false
              state.imagesArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchPresImages.rejected, (state, action) => {
              state.loading = false
              state.imagesArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getPresImageActions= getPresImageSlice.actions;
export default getPresImageSlice;
