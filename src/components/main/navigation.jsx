import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="fixed w-full top-0 z-10 bg-blue-50 shadow-md">
      <div className="container mx-auto px-20">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden block text-gray-500 focus:outline-none focus:text-gray-700"
              onClick={() => {
                document
                  .getElementById("navbar-menu")
                  .classList.toggle("hidden");
              }}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <a className="text-xl font-bold text-gray-900" href="#page-top">
              React Landing Page
            </a>
          </div>
          <div
            className="hidden md:flex md:items-center"
            id="navbar-menu"
          >
            <ul className="flex flex-col md:flex-row md:ml-auto space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-700 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-700 hover:text-gray-900">
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
