import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Edit2, Trash2, Image, UserRoundPen } from 'lucide-react';

const Post = ({ post, currentUser, onLike, onComment, onEdit, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImage, setEditedImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likedBy?.includes(currentUser));
  }, [post.likedBy, currentUser]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(post._id, currentUser, newComment);
    setNewComment('');
  };

  const handleEdit = () => {
    onEdit(post._id, { 
      title: editedTitle, 
      content: editedContent,
      image: editedImage 
    });
    setIsEditing(false);
  };

  const handleLikeClick = () => {
    onLike(currentUser, post._id, !isLiked);
    setIsLiked(!isLiked); 
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md h-32"
          />
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer p-2 border rounded-md w-fit hover:bg-gray-50">
              <Image className="w-5 h-5" />
              <span>Update Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditedImage(e.target.files[0])}
                className="hidden"
              />
            </label>
            {post.image && !editedImage && (
              <p className="mt-2 text-sm text-gray-600">Current image will be kept if no new image is selected</p>
            )}
            {editedImage && (
              <p className="mt-2 text-sm text-gray-600">New image selected: {editedImage.name}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedImage(null);
              }}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600 text-sm">Posted by {post.author}</p>
            </div>
            {currentUser === post.author && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(post._id)}
                  className="p-2 hover:bg-gray-100 rounded-full text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          <p className="mb-4">{post.content}</p>
          
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-lg mb-4"
            />
          )}
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>

          {showComments && (
            <div className="border-t pt-4">
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </form>
              
              <div className="space-y-4">
                {post.comments.map(comment => (
                  <div key={comment._id} className="flex gap-2">
                    <div className="flex-shrink-0">
                      <UserRoundPen />
                    </div>
                    <div>
                      <p className="font-semibold">{comment.name}</p>
                      <p className="text-gray-600">{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;