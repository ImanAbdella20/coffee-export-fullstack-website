import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { doSignInUserWithEmailAndPassword, doSignInWithGoogle } from '../../../lib/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

      // Redirect after login
      navigate('/');
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
        navigate('/');
      }
    } catch (err: any) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className='flex flex-col gap-3 max-w-[70%] items-center bg-gray-200 border-2 absolute top-[35%] left-[35%] p-5'>
      <h1>Sign In Here</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
      <form className='flex flex-col gap-5 w-full' onSubmit={handleLogin}>
        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='p-2 border rounded'
        />
        <input
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='p-2 border rounded'
        />
        <button
          type="submit"
          disabled={signingIn}
          className='bg-slate-700 w-full h-9 rounded-md text-white border border-black disabled:bg-gray-500'
        >
          {signingIn ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <h6 className='font-light m-3 text-sm'>Don't have an account? <Link to='/signup'>Sign up</Link></h6>

      <div className='flex w-full items-center'>
        <hr className='flex-grow mt-3 mb-3' />
        <span className='mx-3 text-sm'>or</span>
        <hr className='flex-grow mt-3' />
      </div>

      <button
        className='bg-slate-700 w-full h-9 rounded-md text-white flex items-center justify-center disabled:bg-gray-500'
        onClick={onGoogleSignIn}
        disabled={signingIn}
      >
        <i className='fab fa-google mr-2'></i> Login with Google
      </button>
    </div>
  );
};

export default Login;

function handleFirebaseError(err: any, setError: React.Dispatch<React.SetStateAction<string>>) {
  console.error('Firebase Error:', err);
  setError(err.message || 'Something went wrong. Please try again.');
}
