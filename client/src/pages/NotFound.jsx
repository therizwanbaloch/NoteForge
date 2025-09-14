import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-8 text-gray-700">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
