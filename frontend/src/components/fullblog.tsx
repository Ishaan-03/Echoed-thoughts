import React from 'react';

interface BlogPostProps {
  title: string;
  authorName: string;
  authorBio: string;
  content: string;
  publishedDate: string;
}

const DetailedBlogPost: React.FC<BlogPostProps> = ({ title, authorName, authorBio, content, publishedDate }) => {
  return (
    <div className="max-w-screen-lg mx-auto bg-white p-10 shadow-lg rounded-lg my-10">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Section: Title, Date, and Content */}
        <div className="md:w-3/4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-4">Posted on {publishedDate}</p>
          <div className="text-lg md:text-xl text-gray-700 mb-8">
            {content}
          </div>
        </div>

        {/* Right Section: Author Details */}
        <div className="md:w-1/4 flex-shrink-0 mt-6 md:mt-0 md:ml-8 text-right">
          <div className="flex flex-col items-center md:items-end">
            {/* Placeholder for author image or avatar  */}
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
            <h2 className="text-xl font-bold">{authorName}</h2>
            <p className="text-gray-500">{authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBlogPost;
