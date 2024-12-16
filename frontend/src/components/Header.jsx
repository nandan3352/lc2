import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
  
  
const Header = () => {
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        //("called ssingout");
        
        try {
            await fetch('/api/auth/signout', {
                method: 'GET',
              });
          
          dispatch(signOut());
        } catch (error) {
          //(error);
        }
      };
    
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/display">
         Topics
        </Link>
        <Link to="/generate">
          Random
        </Link>
        <ul className="flex gap-20">
        <div>
      <span onClick={handleSignOut} className="text-red-800 cursor-pointer">
        Sign out
      </span>
    </div>
        </ul>
        

      </div>
    </div>
  );
};

export default Header;
