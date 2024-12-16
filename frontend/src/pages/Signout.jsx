import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const Signout = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    //("called ssingout");
    
    try {
        await fetch('http://localhost:3500/api/auth/signout', {
            method: 'GET',
          });
      
      dispatch(signOut());
    } catch (error) {
      //(error);
    }
  };

  return (
    <div>
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
        Sign out
      </span>
    </div>
  );
};

export default Signout;
