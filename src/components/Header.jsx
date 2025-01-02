import { useState } from "react";
import AuthDrawer from "./Auth";
import CreatePostDrawer from "./CreatePost";
import { Plus, LogOut, User, Image, X } from 'lucide-react';

const Header = ({ isLoggedIn, onLogout,onNewPost,username  }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SocialApp</div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  Create Post
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <User className="w-6 h-6" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <div  className="block px-4 py-2 hover:bg-gray-100">
                        Welcome {username?<>{username}</>:<></>}
                      </div>
                      <button 
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <span className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)}>
              Sign In
            </button>
            )}
          </div>
        </div>
      </header>

      <AuthDrawer
  isOpen={showAuth}
  onClose={() => setShowAuth(false)}
/>

<CreatePostDrawer
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={onNewPost} 
      />
    </>
  );
};



export default Header;