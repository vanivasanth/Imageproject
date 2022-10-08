import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchCmtImages =createAsyncThunk('getcmtImages/fetchCmtImages',
  async(fname) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getFileSearchDetailLists?filename='+fname+ '&search=comments')
                      .then(
                (data) =>{ var values= data.json(); 
                          console.log('response');
                          return values} 
              )
              return res.allUsersChatFiles
})
const getCmtSlice = createSlice(
    {
        name:'getcmtImages',
        initialState:{
            loading: false,
            cmtArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchCmtImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchCmtImages.fulfilled, (state, action) => {
              state.loading = false
              state.cmtArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchCmtImages.rejected, (state, action) => {
              state.loading = false
              state.cmtArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getCmtActions= getCmtSlice.actions;
export default getCmtSlice;
