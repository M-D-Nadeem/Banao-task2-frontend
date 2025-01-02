import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.js";
import {toast} from "react-hot-toast"



export const createAccount = createAsyncThunk("/user/register", async (data) => {
    try {

        const response = axiosInstance.post("/user/register", data);
        toast.promise(response, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data);
    }
})

export const loginAccount=createAsyncThunk("/user/login",async (data)=>{
    try{
        const response= axiosInstance.post("/user/login",data)
        console.log(response);
        
        toast.promise(response,{
            loading:"Wait! authentication in progress...",
            success: (data) => {
                console.log(data);
                
                return data?.data?.message;
            },
            error:"Failed to Log in"
        })
        return (await response).data
    }
    catch(err){
        toast.error(err?.response?.data)
    }
})

export const logoutAccount=createAsyncThunk("/logout",async ()=>{
    try{
        const response=axiosInstance.get("/user/logout")
        toast.promise(response,{
            loading: "Wait! logout in progress...",
            success: "Log out sucessful",
            error: "Failed to to og out"
        })
        return (await response).data
    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const forgotPassword=createAsyncThunk("/forgotPassword",async (data)=>{
    try{
        const response=axiosInstance.post("/user/forgotPassword",data)
        toast.promise(response,{
            
            success: "Password update sucessful",
            error: "Failed to update password"
        })
        return (await response).data
    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})




const authSlice=createSlice({
    name:"auth",

    initialState:{

        isLoggedIn:  localStorage.getItem("isLoggedIn") || false,
        
        data: (
        localStorage.getItem('data') == undefined || 
        localStorage.getItem('data') == "undefined") 
        ?  {} : JSON.parse(localStorage.getItem('data')) 
    },
    
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(createAccount.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data)),
            localStorage.setItem("isLoggedIn",(action?.payload!=undefined)?true:false),

            state.isLoggedIn=(action?.payload!=undefined)?true:false,
            state.data=action?.payload?.data
        })
        builder.addCase(loginAccount.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data)),
            localStorage.setItem("isLoggedIn",(action?.payload!=undefined)?true:false),

            state.isLoggedIn=(action.payload!=undefined)?true:false,
            state.data=action?.payload?.data
        })
       
        builder.addCase(logoutAccount.fulfilled,(state,action)=>{
            
                localStorage.clear(),

                state.isLoggedIn=false,
                state.data={},
                state.role=""
            
        })
  
    }
})



export const { } = authSlice.actions;
export default authSlice.reducer;


