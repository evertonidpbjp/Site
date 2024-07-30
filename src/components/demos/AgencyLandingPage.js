import React from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";

const AgencyLandingPage = () => (
  <AnimationRevealPage>
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Agency</h1>
          <p className="text-lg mb-8">We provide exceptional services for your business.</p>
          <a href="#" className="bg-white text-primary-500 py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Features</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Feature One</h3>
                <p className="text-gray-700">Description of the first feature goes here.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Feature Two</h3>
                <p className="text-gray-700">Description of the second feature goes here.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Feature Three</h3>
                <p className="text-gray-700">Description of the third feature goes here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </AnimationRevealPage>
);

export default AgencyLandingPage;
