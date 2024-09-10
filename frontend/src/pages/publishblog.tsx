import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; 

interface DecodedToken {
  email: string;
  userId: string;
}

const PublishBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAuthorFromJWT = () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          console.log('Decoded Token:', decoded);
          setAuthorEmail(decoded.email || '');
        } catch (error) {
          console.error('Failed to decode JWT:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    };

    fetchAuthorFromJWT();
  }, []);

  const handlePublish = async () => {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Author Email:', authorEmail);

    if (!title || !content || !authorEmail) {
      alert("Please add a title, content, and ensure you're logged in.");
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to publish a blog');
      return;
    }

    try {
      console.log('Publishing Blog:', { title, content, email: authorEmail });

      const response = await axios.post(
        'https://backend.saxenaishaan03.workers.dev/api/v1/blog',
        {
          title,
          content,
          email: authorEmail,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Publish Response:', response.data);
      alert('Blog published successfully!');

      navigate('/blog');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error publishing the blog:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      alert('Failed to publish the blog');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*b3qxB8ELI-kyQKztCsLwEQ.png"
            alt="Logo"
            className="h-10 w-10 mr-4"
          />
          <p>Echoed Thoughts</p>
        </div>

        <div className="flex items-center">
          <button
            className="bg-black text-white px-4 py-2 rounded-full mr-4"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </header>

      <main className="mt-10">
        <div className="flex items-center text-gray-500">
          <FaPlusCircle size={24} />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="ml-4 text-4xl outline-none border-b w-full"
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your story..."
          className="mt-4 w-full h-96 p-2 text-lg outline-none resize-none"
        ></textarea>
      </main>
    </div>
  );
};

export default PublishBlog;
