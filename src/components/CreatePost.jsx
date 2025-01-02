import { useState } from "react";
import { Heart, MessageSquare, Edit2, Trash2, Plus, LogOut, User, Image, X } from 'lucide-react';
import { CreatePost } from "../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";

const CreatePostDrawer = ({ isOpen, onClose, onCreatePost }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const response = await dispatch(CreatePost(formData));
      console.log(response);

      if (response?.payload?.post) {
        onCreatePost(response.payload.post);
        
        setTitle('');
        setContent('');
        setImage(null);
        
        onClose();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create New Post</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md"
              disabled={isSubmitting}
              required
            />
            <textarea
              placeholder="Write your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md h-32"
              disabled={isSubmitting}
              required
            />
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer p-2 border rounded-md w-fit">
                <Image className="w-5 h-5" />
                <span>Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
              {image && <p className="mt-2 text-sm text-gray-600">{image.name}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting || !title || !content}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostDrawer;