import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance.js";
import toast from "react-hot-toast";

const courseSlice=createSlice({
    name:"post",
    initialState:{
        postData:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
        
        state.blogsData=[...action?.payload?.result]
       
       })
       
    }
})

export const getAllPost=createAsyncThunk("/getAll",async ()=>{
    try{
        const response=axiosInstance.get("/post/getAll")
        toast.promise(response,{
            loading:"loading post data...",
            success:"Post loaded successfully",
            error:"Failed to get post"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const getPostById=createAsyncThunk("/getPost",async (id)=>{
    try{
        const response=axiosInstance.get(`/post/getById/${id}`)
        toast.promise(response,{
            loading:"loading post data...",
            success:"Post loaded successfully",
            error:"Failed to get post"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const editPost=createAsyncThunk("/editPost",async ({formData,id})=>{
    try{
        const response=axiosInstance.put(`/post/update/${id}`,formData)
        
        toast.promise(response,{
            loading:"Update on process...",
            success:"Post updated successfully",
            error:"Failed to update Post"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const DeletePost=createAsyncThunk("/deletePost",async (id)=>{
    try{
        const response=axiosInstance.delete(`/post/delete/${id}`)
        
        toast.promise(response,{
            
            success:"Post deleted successfully",
            error:"Failed to delete post"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const CreatePost=createAsyncThunk("/addPost",async (data)=>{
    try{
        const response=axiosInstance.post(`/post/add`,data)
        toast.promise(response,{
            loading:"Creating new post..",
            success:"Post created successfully",
            error:"Failed to create post"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const addComments=createAsyncThunk("/addComments",async ({data,id})=>{
    try{
        const response=axiosInstance.post(`/post/comment/${id}`,data)
        
        toast.promise(response,{
            
            success:"Comment added sucessfully",
            error:"Failed to add comment"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const addLike=createAsyncThunk("/addLike",async ({username,id})=>{
    try{
        const response=axiosInstance.post(`/post/like/${id}`,{username})
        
        toast.promise(response,{
            
            error:"Failed to like the post.."
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const addDislike=createAsyncThunk("/addDislike",async ({username,id})=>{
    try{
        const response=axiosInstance.post(`/post/dislike/${id}`,{username})
        
        toast.promise(response,{
            
            error:"Failed to like the post.."
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})


export const { } = courseSlice.actions;
export default courseSlice.reducer;