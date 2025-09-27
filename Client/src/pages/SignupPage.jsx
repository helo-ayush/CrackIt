import { Eye, EyeClosed, PersonStanding, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const SignupPage = () => {
  const [message, setMessage] = useState({ text: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

   // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', isError: false });

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'All fields are required', isError: true });
      setIsLoading(false);
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', isError: true });
      setIsLoading(false);
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long', isError: true });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Your actual signup logic would go here
      console.log('Signup attempt:', formData);
      setMessage({ text: 'Account created successfully!', isError: false });
      
    } catch (err) {
      setMessage({ text: 'Signup failed. Please try again.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );


  return (
    <div className='h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 flex items-center justify-center p-4 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">

        {/* Glass Effect */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 space-y-5 max-h-[95vh] overflow-y-auto">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-15 h-15 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-3">
              <User className='text-white font-black'/>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 text-sm">Join us and start your journey</p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`p-3 rounded-xl text-sm font-medium ${
              message.isError 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Signup Form */}
          <div className="space-y-4">

             {/* Username Input */}
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/60 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                           transition duration-200 placeholder-gray-400"
                  placeholder="Choose a username"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <User className='w-4 text-gray-400'/>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/60 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                           transition duration-200 placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/60 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                           transition duration-200 placeholder-gray-400 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  {showPassword ? <Eye className='w-5 cursor-pointer text-gray-400' /> : <EyeClosed  className='w-5 cursor-pointer text-gray-400'/>}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/60 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                           transition duration-200 placeholder-gray-400 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  {showConfirmPassword ? <Eye className='w-5 cursor-pointer text-gray-400' /> : <EyeClosed  className='w-5 cursor-pointer text-gray-400'/>}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold 
                       py-2.5 px-4 rounded-xl hover:from-purple-600 hover:to-pink-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       transform hover:scale-[1.02] transition duration-200 shadow-lg
                       disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>


          </div>
          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login" 
                className="font-medium text-purple-600 hover:text-purple-800 transition duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </div>


    </div>
  )
}

export default SignupPage