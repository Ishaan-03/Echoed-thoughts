import { Link } from "react-router-dom";

interface NavbarProps {
  logoUrl: string;
  authorName: string;
  authorAvatar?: string;
  sitename: string;
}

const Navbar = ({ logoUrl, authorName, sitename, authorAvatar }: NavbarProps) => {
  return (
    <nav className="bg-gray-200 rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt="Logo"
          className="w-12 h-12 mr-4"
        />
        <span className="text-black text-xl font-semibold">
          {sitename}
        </span>
      </div>
      <div className="flex items-center">
       <Link to={'/publish'}>
       <button className="bg-black text-white px-4 py-2 rounded-lg mr-4">
          Create Blog 
        </button>
       </Link>
        {authorAvatar ? (
          <img
            src={authorAvatar}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-bold">
            {authorName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
