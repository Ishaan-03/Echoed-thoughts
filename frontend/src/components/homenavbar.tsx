import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  sitename: string;
}

const HomeNavbar: React.FC<NavbarProps> = ({ sitename }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-200 rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-black text-xl font-semibold">
          {sitename}
        </span>
      </div>
      <div className="flex items-center">
        <button
          className="bg-black text-white px-4 py-2 rounded-lg mr-4"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/signin')}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;
