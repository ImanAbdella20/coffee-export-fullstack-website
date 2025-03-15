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
      console.log('Generated id token' , idToken)

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
    < div className='h-screen'>

    <div className="flex flex-col gap-3 items-center  bg-gray-200 p-5 rounded-md max-w-[40%] h-[70%] ">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="p-2 border border-gray-400 rounded-md"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-400 rounded-md"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-400 rounded-md"
        />
        <button
          type="submit"
          disabled={signingUp}
          className="bg-amber-600"
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

      <button
        className="bg-slate-700 w-full h-10 rounded-md text-white flex items-center justify-center gap-2"
        onClick={handleGoogleSignup}
        disabled={signingUp}
      >
        <i className="fab fa-google"></i> Sign up with Google
      </button>
    </div>
    </div>
  );
};

export default Signup;
