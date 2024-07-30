"use client"
import React, { useEffect, useState } from 'react';
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from '../headers/llightNews';
import ResponsiveVideoEmbed from '../helpers/ResponsiveVideoEmbed.js';
import './heroNews.css'; // Adicione um arquivo CSS para as animações

const HeroNews = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Animação após o carregamento
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative -mx-8 -mt-8 bg-center bg-cover hero-container ${isVisible ? 'slide-in' : 'hidden'}`} style={{ backgroundImage: "url('/images/hero/banner1.jpg')" }}>
      <div className="z-10 absolute inset-0 bg-primary-200 opacity-5" />
      <div className="z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto">
        <Header
          links={[
            <div key={1} className="flex space-x-12 mt-10">
              <NavLink href="#" className="text-gray-100 hover:border-blue-400 hover:text-blue-400">About</NavLink>
              <NavLink href="#" className="text-gray-100 hover:border-blue-400 hover:text-blue-400">Blog</NavLink>
              <NavLink href="#" className="text-gray-100 hover:border-blue-400 hover:text-blue-400">Locations</NavLink>
              <NavLink href="#" className="text-gray-100 hover:border-blue-400 hover:text-blue-400">Pricing</NavLink>
            </div>,
          <div key={2} className="flex space-x-8">
          <a
            href="#"
            className="inline-flex items-center px-8 py-3 mt-8 bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Entrar
          </a>
        </div>
          ]}
        />
        <div className="pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row">
          <div className="flex flex-col items-center lg:block">
            <span className="inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-700 font-medium text-sm">
              Agora, com operações em todo o Nordeste
            </span>
            <h1 className="text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none">
              <span className="inline-block mt-2 mb-6">Jornalismo de Qualidade </span>
              <br />
              <span className="relative text-primary-500 px-4 -mx-4 py-2 before:content-[''] before:absolute before:inset-0 before:bg-gray-100 before:transform before:-skew-x-12 before:-z-10">
               Melhor Equipe 
              </span>
            </h1>
            <button
  className="inline-flex items-center px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
>
  Principais Manchetes
</button>

          </div>
          <div className="w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8">
            {/* <ResponsiveVideoEmbed
              url="//player.vimeo.com/video/374265101?title=0&portrait=0&byline=0&autoplay=0&responsive=1"
              background="transparent"
              className="rounded"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroNews;
