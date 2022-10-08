import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const downloadImg =createAsyncThunk('getApk/downloadImg',
  async(fname) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/uploads/highmessaging/chat/'+fname,
                              {
                                method: 'Get',
                                headers: {},
                              })
                      .then((response) => {
                        response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(new Blob([buffer]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'image.jpg'); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                      });
                      }
                      
              )
              return res;
          
})
const downloadImageSlice = createSlice(
    {
        name:'downloadImage',
        initialState:{
            loading: false,
            Image:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(downloadImg.pending, state => {
              state.loading = true
            })
            builder.addCase(downloadImg.fulfilled, (state, action) => {
              state.loading = false
              state.Image = action.payload
              state.error = ''
            })
            builder.addCase(downloadImg.rejected, (state, action) => {
              state.loading = false
              state.Image = []
              state.error = action.error.message
            })
          }
    }
)

export const downloadImageActions= downloadImageSlice.actions;
export default downloadImageSlice;
