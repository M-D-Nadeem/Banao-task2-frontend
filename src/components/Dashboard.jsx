import { useEffect, useState } from "react";
import Post from "./Post";
import Header from "./Header";
import CreatePost from "./CreatePost";
import { addComments, addDislike, addLike, DeletePost, editPost, getAllPost } from "../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutAccount } from "../redux/authSlice";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
        const data=useSelector((state) => state.auth.data);

        const dispatch = useDispatch();
      
        const fetchPost = async () => {
            const response = await dispatch(getAllPost());
            console.log(response);
            if(response?.payload?.posts){
              setPosts(response?.payload?.posts)
            }
          
        };
      
        useEffect(() => {
          fetchPost();
        }, []);

    const currentUser = data?.username;
 
  
    const handleLike =async (username,id,isLiked) => {
      if(isLiked==true){
      const response=await dispatch(addLike({username,id}))
      console.log(response);
      
      if (response?.payload?.post) {
      setPosts(prev => prev.map(post =>
        post._id === id ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  }
  else{
    const response=await dispatch(addDislike({username,id}))
      console.log(response);
      
      if (response?.payload?.post) {
      setPosts(prev => prev.map(post =>
        post._id === id ? { ...post, likes: post.likes - 1 } : post
      ));
    }
  }
    };
  
    const handleComment =async (id, name, message) => {
      const data={name,message}
      const response=await dispatch(addComments({data,id}))
      
      if (response?.payload?.post) {
        setPosts(prev =>
          prev.map(post =>
            post._id === id
              ? { ...post, comments: response.payload.post.comments }
              : post
          )
        );
      }
   
    };
  
    const handleEdit =async (id, updates) => {
      const formData = new FormData();
      formData.append("title", updates.title);
      formData.append("content", updates.content);
      if (updates.image) {
        formData.append("image", updates.image);
      }
      const response = await dispatch(editPost({formData,id}));
      console.log(response); 
       if(response.payload?.post){
      setPosts(prev => prev.map(post =>
        post._id === id ? { ...post, title:updates.title,content:updates.content,image:response.payload?.post?.image } : post
      ));
    };
  }  
  
    const handleDelete =async (id) => {
      const response = await dispatch(DeletePost(id));      
      if(response.payload?.success){
      setPosts(prev => prev.filter(post => post._id !== id));
      }
    };
    const handleNewPost = (newPost) => {
      setPosts(prevPosts => [newPost, ...prevPosts]); 
    };

    const handelLogOut=async ()=>{
      const response=await dispatch(logoutAccount())
      
    }
  
    return (
      <div className="min-h-screen bg-gray-100">
       <Header
        isLoggedIn={isLoggedIn}
        onLogout={handelLogOut}
        onNewPost={handleNewPost} 
        username={data?.username}
      />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.map((post,idx) => (
            <Post
              key={idx}
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onComment={handleComment}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
    );
  };
  
  export default Dashboard;