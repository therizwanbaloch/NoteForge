import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="p-5 bg-indigo-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-semibold">NoteForge</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 w-full justify-end">
          {user ? (
            <>
              <input
                type="text"
                placeholder="Search Notes..."
                className="border text-white px-3 py-2 w-1/3 rounded border-white bg-transparent placeholder-white"
              />
              <div className="flex items-center gap-3 ml-5">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-black">
                  {getInitials(user.name)}
                </div>
                <button
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-5">
              <Link
                to="/login"
                className="px-3 py-2 bg-white text-indigo-500 hover:text-black font-semibold rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 bg-green-500 text-white hover:text-black rounded-lg font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-indigo-600 p-4 rounded-lg">
          {user ? (
            <>
              {/* Centered Search Bar */}
              <div className="mb-4 flex justify-center">
                <input
                  type="text"
                  placeholder="Search Notes..."
                  className="w-full max-w-md px-3 py-2 rounded border border-white bg-transparent text-white placeholder-white"
                />
              </div>

              {/* Avatar & Logout aligned right */}
              <div className="flex justify-end items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-black">
                  {getInitials(user.name)}
                </div>

                <button
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                to="/login"
                className="px-3 py-2 bg-white text-indigo-500 hover:text-black font-semibold rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-2 bg-green-500 text-white hover:text-black rounded-lg font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
