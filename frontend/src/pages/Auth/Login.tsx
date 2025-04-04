import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { doSignInUserWithEmailAndPassword, doSignInWithGoogle } from '../../../lib/auth';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path and any cart items from location state
  const { redirectTo = '/itempayment', cartState = [] } = location.state || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signingIn) return;

    setSigningIn(true);
    setError('');

    try {
      const userCredential = await doSignInUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      localStorage.setItem('authToken', idToken);
      await handlePostLoginRedirect(idToken);
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
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', idToken);
        await handlePostLoginRedirect(idToken);
      }
    } catch (err: any) {
      handleFirebaseError(err, setError);
    } finally {
      setSigningIn(false);
    }
  };

  const handlePostLoginRedirect = async (idToken: string) => {
    try {
      // Try to get shipping details (if endpoint exists)
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
        headers: { Authorization: `Bearer ${idToken}` },
      }).catch(() => ({ data: [] })); // Fallback if endpoint fails

      const hasShippingDetails = response.data?.length > 0;
      
      // Navigate with cart state if it exists
      navigate(redirectTo, { 
        state: { 
          selectedItems: cartState,
          hasShippingDetails 
        } 
      });
    } catch (error) {
      // If everything fails, just redirect to the default page
      navigate(redirectTo, { state: { selectedItems: cartState } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center py-12 sm:px-6 lg:px-8 relative bottom-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={signingIn}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${signingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {signingIn ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                onClick={onGoogleSignIn}
                disabled={signingIn}
                className={`w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${signingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
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