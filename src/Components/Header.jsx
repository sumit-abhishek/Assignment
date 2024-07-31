import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <Link to="/">
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Home
          </button>
        </Link>

        <Link to="/add-user">
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Add User Form
          </button>
        </Link>
        <Link to="/user-list">
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            User List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
