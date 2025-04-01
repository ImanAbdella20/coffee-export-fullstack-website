import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // Added useLocation for reading state
import { doSignInUserWithEmailAndPassword, doSignInWithGoogle } from '../../../lib/auth';
import axios from 'axios';  // Make sure to use axios to communicate with your backend

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();  // Used for accessing location state (i.e., redirectTo)

  // Get the redirect URL from the state, or default to '/profile'
  const redirectTo = (location.state as { redirectTo?: string })?.redirectTo || '/itempayment' ;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signingIn) return;

    setSigningIn(true);
    setError('');

    try {
      const userCredential = await doSignInUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Store token securely (consider using cookies in production)
      localStorage.setItem('authToken', idToken);

      // Check if user has shipping information in the database
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
        headers: {
          Authorization: `Bearer ${idToken}`, // Send token in the header for authentication
        },
      });

      // If shipping info exists, redirect to profile, otherwise to shipping form
      if (response.data && response.data.shippingdetails?.length > 0) {
        navigate(redirectTo); // Redirect to the stored 'redirectTo' state
      } else {
        navigate('/shippingform'); // Navigate to shipping form if no shipping info
      }

    } catch (err: any) {
      handleFirebaseError(err, setError);
    } finally {
      setSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (signingIn) return;

    setSigningIn(true);
    setError('');

    try {
      const userCredential = await doSignInWithGoogle();
      if (userCredential) {
        // Check for shipping info after Google login
        const idToken = await userCredential.user.getIdToken();
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.data && response.data.shippingInfo) {
          navigate(redirectTo); // Redirect based on redirectTo state
        } else {
          navigate('/shippingform'); // Navigate to shipping form if no shipping info
        }
      }
    } catch (err: any) {
      handleFirebaseError(err, setError);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className='h-screen'>
      <div className="flex flex-col gap-3 items-center bg-gray-200 p-5 rounded-md max-w-[40%] h-[70%]">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`p-2 border rounded-md ${error && !email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-slate-700`}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`p-2 border rounded-md ${error && !password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-slate-700`}
          />
          <button
            type="submit"
            disabled={signingIn}
            className={`bg-slate-700 w-full h-10 rounded-md text-white ${signingIn ? 'bg-gray-500' : 'hover:bg-slate-600'} focus:outline-none`}
          >
            {signingIn ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <h6 className="font-light m-3 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </h6>

        <div className="flex w-full items-center my-4">
          <hr className="flex-grow mt-3" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow mt-3" />
        </div>

        <button
          className={`bg-slate-700 w-full h-10 rounded-md text-white flex items-center justify-center ${signingIn ? 'bg-gray-500' : 'hover:bg-slate-600'} focus:outline-none`}
          onClick={onGoogleSignIn}
          disabled={signingIn}
        >
          <i className="fab fa-google mr-2"></i> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

function handleFirebaseError(err: any, setError: React.Dispatch<React.SetStateAction<string>>) {
  console.error('Firebase Error:', err);

  switch (err.code) {
    case 'auth/invalid-credential':
      setError('The credentials provided are invalid. Please check your email and password.');
      break;
    case 'auth/user-not-found':
      setError('No account found with that email. Please check your email or sign up.');
      break;
    case 'auth/wrong-password':
      setError('Incorrect password. Please try again.');
      break;
    case 'auth/too-many-requests':
      setError('Too many failed attempts. Please try again later.');
      break;
    case 'auth/network-request-failed':
      setError('Network error. Please check your internet connection and try again.');
      break;
    default:
      setError('Something went wrong. Please try again later.');
      break;
  }
}
