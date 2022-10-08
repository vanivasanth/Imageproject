import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchMyImages =createAsyncThunk('GetMyImages/fetchMyImages',
  async({ rejectWithValue }) => { 
       
    try
    {
      const headers = {
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
          };
      const api=`https://mysnaps.cognitivemobile.net/service/getUserFiles?search=web`;
      const res= await fetch(api,{headers})
                .then(
                       (data) =>{ 
                        if(data.status===401)
                        {
                           return data;
                        }
                        else
                         {                          
                            var values= data.json(); 
                            console.log('response');
                            return values
                         }}
                 )
           return res.userChatFiles
       }
       catch (err) 
       {
         console.log('myslice'+err)
         return rejectWithValue(err)
       }
             
})
const GetMyImagesSlice= createSlice(
    {
        name:'GetMyImages',
        initialState:{
            loading: false,
            imagesArray:[],
            error: ''       
           },
           extraReducers: builder => {
            builder.addCase(fetchMyImages.pending, state => {
              state.loading = true
            })
            builder.addCase(fetchMyImages.fulfilled, (state, action) => {
              state.loading = false
              state.imagesArray = action.payload
              state.error = ''
            })
            builder.addCase(fetchMyImages.rejected, (state, action) => {
              state.loading = false
              state.imagesArray = []
              state.error = action.error.message
            })
          }
    }
)

export const GetMyImagesActions= GetMyImagesSlice.actions;
export default GetMyImagesSlice;
