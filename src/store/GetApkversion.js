import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchApkDetails =createAsyncThunk('getApkDetails/fetchApkDetails',
  async() => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getAndroidVersionDetails')
                      .then(
                (data) =>{ var values= data.json(); 
                          
                           return values} 
              )
              return res.version
})
const getApkDetailSlice = createSlice(
    {
        name:'getApkDetails',
        initialState:{
            loading: false,
            apkDetails:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchApkDetails.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchApkDetails.fulfilled, (state, action) => {
              state.loading = false
              state.apkDetails = action.payload
              state.error = ''
            })
            builder.addCase(fetchApkDetails.rejected, (state, action) => {
              state.loading = false
              state.apkDetails = []
              state.error = action.error.message
            })
          }
    }
)

export const getApkDetailActions= getApkDetailSlice.actions;
export default getApkDetailSlice;
