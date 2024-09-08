import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './pages/blog'
import Signup from './pages/signup'
import Signin from './pages/signin'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={< Blog/>} />
          <Route path="/blog" element={< Blog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App