import React, { useState } from 'react'
import { doSignOut } from '../../../lib/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';


interface HeaderProps {
    user: any;
  }

const Setting = ({ user }: HeaderProps) => {
  const [signedIn, setSignedIn] = useState(!!user);

   const navigate = useNavigate();
    
  const handleSignOut = async () => {
    await doSignOut();
    setSignedIn(false);
    navigate('/');
  }
  return (
    <div className='h-screen'>
        <div className='flex flex-col bg-gray-50 gap-4 '>
            <button className='cursor-pointer'>Profile</button>
            <button className='cursor-pointer'>Shipping Address</button>
        </div>

        <div className='flex flex-col bg-gray-100 cursor-pointer gap-4 '>
            <button className='cursor-pointer'>Ship To</button>
            <button className='cursor-pointer'>Language</button>
        </div>

        <button onClick={handleSignOut}>
            Sign out
        </button>
    </div>
  )
}

export default Setting