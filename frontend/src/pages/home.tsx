import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/homenavbar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNavbar sitename="Echoed Thoughts" />

      <main className="flex flex-col justify-center items-center text-center mt-20 p-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-10">
          Welcome to Echoed Thoughts
        </h1>
        <p className="text-2xl md:text-4xl text-gray-600 max-w-3xl mb-12">
          A place where your thoughts come to life. Share your stories, connect with minds alike, and explore a world of words. Join the journey today.
        </p>

        <div className="space-x-4">
          <button 
            className="bg-black text-white px-8 py-4 text-lg rounded-lg hover:bg-gray-800"
            onClick={() => navigate('/Signup')}
          >
            Start Writing
          </button>
          <button 
            className="bg-gray-800 text-white px-8 py-4 text-lg rounded-lg hover:bg-gray-700"
            onClick={() => navigate('/Signup')}
          >
            Explore Blogs
          </button>
        </div>
      </main>

      <footer className="mt-20 bg-gray-200 py-6">
        <p className="text-center text-gray-700">
          © 2024 Echoed Thoughts. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
