import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://backend.saxenaishaan03.workers.dev/api/v1/user/signin', {
        email,
        password,
      });

      setSuccess('Signin successful!');
      localStorage.setItem('token', response.data.token);

      navigate('/blog/:'); 
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Signin failed');
      } else {
        setError('An error occurred during signin.');
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;

export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center px-4">
      <div className="max-w-xl bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-2xl italic font-semibold text-gray-800 mb-6">
          "Innovate, create, and conquer. Your potential knows no bounds. Join us today and be a part of something greater!"
        </p>
        <div className="text-xl font-medium text-gray-700">Ishaan Saxena</div>
        <div className="text-sm text-gray-500 mt-2">Founder, Echoed-Thoughts Inc</div>
      </div>
    </div>
  );
};
