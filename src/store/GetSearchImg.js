import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchSearchImages =createAsyncThunk('getSearchImages/fetchSearchImages',
  async(queryparams) => { 
            console.log(queryparams);
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getAllUserSearchFiles?'+queryparams)
                      .then(
                (data) =>{ var values= data.json(); 
                          console.log('response');
                          return values} 
              )
              return res.allUsersChatFiles
})
const getSearchSlice = createSlice(
    {
        name:'getSearchImages',
        initialState:{
            loading: false,
            searchArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchSearchImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchSearchImages.fulfilled, (state, action) => {
              state.loading = false
              state.searchArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchSearchImages.rejected, (state, action) => {
              state.loading = false
              state.searchArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getSearchActions= getSearchSlice.actions;
export default getSearchSlice;
