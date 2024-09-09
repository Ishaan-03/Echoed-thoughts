import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogDetailsPage from './components/fetchblogdetails';
import Blog from './pages/blog';
import Signup from './pages/signup';
import Signin from './pages/signin';
import HomePage from './pages/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
