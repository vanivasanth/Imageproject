import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchApk =createAsyncThunk('getApk/fetchApk',
  async(apkName) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/uploads/highmessaging/blog/'+apkName,
                              {
                                method: 'Get',
                                headers: {},
                              })
                      .then((response) => {
                        response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(new Blob([buffer]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.download='MySnaps.apk'; //or any other extension
                        document.body.appendChild(link);
                        link.click();
                      });
                      }
                      
              )
              return res;
})
const getApkSlice = createSlice(
    {
        name:'getApk',
        initialState:{
            loading: false,
            apk:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchApk.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchApk.fulfilled, (state, action) => {
              state.loading = false
              state.apk = action.payload
              state.error = ''
            })
            builder.addCase(fetchApk.rejected, (state, action) => {
              state.loading = false
              state.apk = []
              state.error = action.error.message
            })
          }
    }
)

export const getApkActions= getApkSlice.actions;
export default getApkSlice;
