import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Appbar";
import BlogCard from "../components/blogCard";
import SkeletonLoader from "../components/skeleton";
import { useBlogs } from "../hooks/useblog";

const Blog = () => {
  const { loading, blogs, error } = useBlogs();
  const navigate = useNavigate();

  if (loading) {
    return <div><SkeletonLoader /></div>;
  }

  if (error) {
    return <div><p>Error: {error}</p></div>;
  }

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div>
      <Navbar 
        logoUrl="https://miro.medium.com/v2/resize:fit:1400/1*b3qxB8ELI-kyQKztCsLwEQ.png" 
        authorName="Ishaan"
        authorAvatar="https://images.unsplash.com/photo-1517993037474-692208825419?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
        sitename="Echoed Thoughts"
      />

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            <BlogCard
              authorName={blog.author?.name || "Anonymous"} 
              title={blog.title}
              content={blog.content || "No content available"}
              publishedDate={new Date(blog.createdAt).toLocaleDateString()}
              authorAvatar={ "https://images.unsplash.com/photo-1517993037474-692208825419?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
