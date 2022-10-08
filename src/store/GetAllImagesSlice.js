import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchAllImages =createAsyncThunk('getAllImages/fetchAllImages',
  async(datestring) => { 
            const res= await 
                      fetch('https://mysnaps.cognitivemobile.net/service/getAllUserFiles?'+datestring)
                      .then(
                (data) =>{ var values= data.json(); 
                        
                          return values} 
              )
              return res.allUsersChatFiles
})
const getAllImageSlice = createSlice(
    {
        name:'getAllImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchAllImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchAllImages.fulfilled, (state, action) => {
              state.loading = false
              state.imagesArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchAllImages.rejected, (state, action) => {
              state.loading = false
              state.imagesArray = []
              state.error = action.error.message
            })
          }
    }
)

export const getAllImageActions= getAllImageSlice.actions;
export default getAllImageSlice;
