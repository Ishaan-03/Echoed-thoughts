import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/homenavbar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNavbar sitename="Echoed Thoughts" />

      <main className="flex flex-col justify-center items-center text-center mt-10 md:mt-20 p-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 mb-6 md:mb-10">
          Welcome to Echoed Thoughts
        </h1>
        <p className="text-lg md:text-2xl lg:text-4xl text-gray-600 max-w-xl md:max-w-3xl mb-8 md:mb-12">
          A place where your thoughts come to life. Share your stories, connect with minds alike, and explore a world of words. Join the journey today.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          <button 
            className="bg-black text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-lg hover:bg-gray-800"
            onClick={() => navigate('/Signup')}
          >
            Start Writing
          </button>
          <button 
            className="bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-lg hover:bg-gray-700"
            onClick={() => navigate('/Signup')}
          >
            Explore Blogs
          </button>
        </div>
      </main>

      <footer className="mt-10 md:mt-20 bg-gray-200 py-4 md:py-6">
        <p className="text-center text-gray-700 text-sm md:text-base">
          © 2024 Echoed Thoughts. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
