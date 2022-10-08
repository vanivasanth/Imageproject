import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchAdvSearchImages =createAsyncThunk('getAdvSearchImages/fetchAdvSearchImages',
  async(queryparams) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getAllUserSearchFiles?'+queryparams)
                      .then(
                (data) =>{ var values= data.json(); 
                          console.log('response');
                          return values} 
              )
              return res.allUsersChatFiles
})
const getAdvSearchSlice = createSlice(
    {
        name:'getAdvSearchImages',
        initialState:{
            loading: false,
            AdvsearchArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchAdvSearchImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchAdvSearchImages.fulfilled, (state, action) => {
              state.loading = false
              state.AdvsearchArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchAdvSearchImages.rejected, (state, action) => {
              state.loading = false
              state.AdvsearchArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getAdvSearchActions= getAdvSearchSlice.actions;
export default getAdvSearchSlice;
