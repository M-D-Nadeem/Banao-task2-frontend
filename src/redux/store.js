import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice.js"

const store=configureStore({
    reducer:{
        auth:authSlice,
       
    },
    devTools:true
})
export default   store