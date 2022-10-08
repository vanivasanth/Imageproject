import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchsharedImages =createAsyncThunk('getsharedImages/fetchsharedImages',
  async(rn) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getSharedFiles?referenceNumber='+rn)
                      .then(
                      (data) =>{ 
                           var values= data.json();                         
                               return values
                         })
                        
              return res.sharedFiles
})

const getsharedImageSlice = createSlice(
    {
        name:'getsharedImages',
        initialState:{
            loading: false,
            sharedArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchsharedImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchsharedImages.fulfilled, (state, action) => {
              state.loading = false
              state.sharedArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchsharedImages.rejected, (state, action) => {
              state.loading = false
              state.sharedArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getsharedImageActions= getsharedImageSlice.actions;
export default getsharedImageSlice;
