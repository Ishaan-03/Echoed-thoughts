import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailedBlogPost from './fullblog';
import SkeletonLoader from './skeleton';

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchBlogDetails(id);
    }
  }, [id]);

  const fetchBlogDetails = async (blogId: string) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`https://backend.saxenaishaan03.workers.dev/api/v1/blog/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog data');
      }

      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch blog data');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div><SkeletonLoader/></div>;
  }

  return (
    <DetailedBlogPost
      title={blog.title}
      authorName={blog.author?.name || 'Anonymous'}
      authorBio={blog.author?.bio || 'No bio available'}
      content={blog.content}
      publishedDate={new Date(blog.createdAt).toLocaleDateString()}
    />
  );
};

export default BlogDetailsPage;
