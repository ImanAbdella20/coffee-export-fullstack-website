import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../../lib/auth';
import axios from 'axios';
import { log } from 'console';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(''); // Adding username
  const [signingUp, setSigningUp] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningUp(true);
    setError('');

    try {
      // Create the user using Firebase Authentication
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Get the user ID token (to be used for other authenticated requests, if needed)
      const idToken = await user.getIdToken();

      localStorage.setItem('authToken', idToken);
      console.log('Generated id token', idToken)

      // Store the user info in MongoDB via backend (API)
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/signup`, {
        username: userName,
        email: email,
        uid: user.uid,
      });

      navigate('/shippingform');

    } catch (err: any) {

      setError(err.message);
    } finally {
      setSigningUp(false);
    }
  };

  const handleGoogleSignup = async () => {
    setSigningUp(true);
    try {
      // Sign in the user with Google
      await doSignInWithGoogle();

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSigningUp(false);
    }
  };

  return (
    < div className='min-h-screen flex flex-col justify-center items-center'>

      <div className=" loginContainer border-sm relative bottom-15 text-center">
        <h1 className="signupHeaderH2 text-2xl font-bold">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div  className='signupForm bg-gray-50 '>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-[50%] p-2 border border-gray-400 rounded-md"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[50%] p-2 border border-gray-400 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[50%] p-2 border border-gray-400 rounded-md"
            />
            <button
              type="submit"
              disabled={signingUp}
              className="signupBtn "
            >
              {signingUp ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500">Log in</a></p>

          <div className="flex items-center w-full">
            <hr className="w-full border-gray-400" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="w-full border-gray-400" />
          </div>

          <div className='flex flex-col justify-between'>
          <svg
  className="w-5 h-5 relative top-8"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    fill="#4285F4"
  />
  <path
    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    fill="#34A853"
  />
  <path
    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    fill="#FBBC05"
  />
  <path
    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    fill="#EA4335"
  />
</svg>
          <button
            className="bg-slate-700 w-full h-10 rounded-md text-white flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleGoogleSignup}
            disabled={signingUp}
          >
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Signup;
