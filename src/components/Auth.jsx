import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createAccount, loginAccount } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../redux/authSlice";
import authImg from "../images/authImg.webp"

const AuthDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (isForgotPassword) {
      if (!formData.username || !formData.newPassword) {
        toast.error("Please fill all the fields");
        return;
      }
      try {
        const username=formData.username
        const newPassword=formData.newPassword
        const data={username,newPassword}
        const response=await dispatch(forgotPassword(data))
        
       if(response.payload.success){
        setIsForgotPassword(false);
        setFormData({ ...formData, newPassword: "" });
       }
      } catch (error) {
        toast.error("Failed to update password.");
      }
      return;
    }

    if (isSignIn) {
      if (!formData.username || !formData.password) {
        toast.error("Please fill all the fields");
        return;
      }

      try {
        await dispatch(
          loginAccount({
            username: formData.username,
            password: formData.password,
          })
        ).unwrap();
        toast.success("Logged in successfully!");
        onClose();
      } catch (error) {
        toast.error( "Failed to log in.");
      }
    } else {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        await dispatch(
          createAccount({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();
        toast.success("Account created successfully!");
        setIsSignIn(true);
      } catch (error) {
        toast.error( "Failed to create account.");
      }
    }
  };

  const handleBack = () => {
    setIsForgotPassword(false);
    setFormData({ ...formData, newPassword: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            {isForgotPassword 
              ? "Reset Password" 
              : isSignIn 
                ? "Sign In" 
                : "Create Account"}
          </h2>
          {!isForgotPassword && (
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isSignIn ? "Create new for free!" : "Already have an account? Sign In"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2">
          <div className="pr-8">
            {isForgotPassword ? (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-colors mb-4"
                >
                  Update Password
                </button>
                <button
                  onClick={handleBack}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  Back to Sign In
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="User name"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {!isSignIn && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {!isSignIn && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-colors mb-4"
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                </button>

                {isSignIn && (
                  <button 
                    onClick={() => setIsForgotPassword(true)}
                    className="w-full text-center mt-4 text-gray-600 hover:text-gray-800"
                  >
                    Forgot Password?
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-center">
            <img
              src={authImg}
              alt="Authentication illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {!isSignIn && !isForgotPassword && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            By signing up, you agree to our Terms & conditions, Privacy policy
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthDrawer;