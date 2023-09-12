import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-5xl font-semibold text-red-600 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Oops! Page not found.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default Error404;
