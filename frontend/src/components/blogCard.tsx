interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    authorAvatar?: string; 
    
  }
  
  const BlogCard = ({ authorName, title, content, publishedDate, authorAvatar }: BlogCardProps) => {
    const firstLetter = authorName.charAt(0).toUpperCase();
    
    return (
      <div className="max-w-screen-lg mx-auto bg-white p-10 shadow-lg rounded-lg my-10">
        <div className="flex items-center mb-4">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-white text-xl font-bold">
              {firstLetter}
            </div>
          )}
          <div className="flex justify-between items-center w-full text-lg md:text-xl text-gray-600">
            <span>{authorName}</span>
            <span>{publishedDate}</span>
          </div>
        </div>
        <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </div>
        <div className="text-lg md:text-xl text-gray-700 mb-8">
          {content.slice(0, 200) + "......"}
        </div>
        <div className="inline-block bg-blue-200 text-blue-800 font-semibold text-sm md:text-base px-4 py-2 rounded-full">
          {`Reading Time : ${Math.ceil(content.length / 100)} Minutes`}
        </div>
      </div>
    );
  }
  
  export default BlogCard;
  