import Navbar from "../components/Appbar"
import BlogCard from "../components/blogCard"
const Blog = () => {
  return (
    <div>
      <Navbar logoUrl= "https://miro.medium.com/v2/resize:fit:1400/1*b3qxB8ELI-kyQKztCsLwEQ.png" 
      authorName ={"Ishaan"}
       authorAvatar= "https://images.unsplash.com/photo-1517993037474-692208825419?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
       sitename="Echoed Thoughts"
       />
       



      <BlogCard   
    authorName={"Ishaan"}
    title={"title of the blog"}
    content={"content of the blog"}
    publishedDate="2nd Feb 2024"
    authorAvatar="https://images.unsplash.com/photo-1517993037474-692208825419?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      
      />
    
    
    </div>
  )
}

export default Blog