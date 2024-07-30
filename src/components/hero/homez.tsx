"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import 'tailwindcss/tailwind.css';

const slides = [
  { id: 1, title: 'Comunicações Oficiais', image: '/images/hero/empresarial.jpg' },
  { id: 2, title: 'Jornal da União', image: '/images/hero/banner8.jpg' },
  { id: 3, title: 'Rádios Tabajara e Parahyba FM', image: '/images/hero/radio.jpg' },
  { id: 4, title: 'Serviço de API de Notícias', image: '/images/hero/banner4.jpg' },
];

const Heading = ({ children }) => (
  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-100 leading-tight mb-6">
    {children}
    <span className="block mt-4 text-xl sm:text-2xl text-gray-300">
      Discover the best events in town
    </span>
  </h1>
);

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);

  // Intervalo para mudar automaticamente de slide a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 55000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Função para ir ao próximo slide
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  // Função para ir ao slide anterior
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  // Função para ir a um slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-full w-full overflow-hidden font-poppins " style={{height: '100vh'}}>

      {/* Menu do topo */}
      <div className={`absolute top-0 left-0 right-0 ${menuVisible ? 'block' : 'hidden'} z-20`}>
        <div className="flex  justify-center items-center px-20 py-2 bg-black bg-opacity-5">
          {/* <h1 className="text-2xl font-extrabold text-white hover:text-blue-400">Menu</h1> */}
          <div className="space-x-12 text-lg font-bold text-sm text-center">
            {/* <div className="relative group"> */}
              <a href="#" className=" relative text-white hover:text-blue-400 group">
              Home
                <span className="absolute left-0 bottom-0 block w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>

              </a>
              {/* <div className="absolute hidden group-hover:block bg-white text-black p-4 space-y-2 rounded shadow-lg">
                <a href="#" className="block">Submenu 1</a>
                <a href="#" className="block">Submenu 2</a>
              </div> */}
            {/* </div> */}
            
              <a href="#" className="relative text-white hover:text-blue-400 group">
                Listing
                <span className="absolute left-0 bottom-0 block w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-white hover:text-blue-400 group">
                Property
                <span className="absolute left-0 bottom-0 block w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-white hover:text-blue-400 group">
                Blog
                <span className="absolute left-0 bottom-0 block w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-white hover:text-blue-400 group">
                Pages
                <span className="absolute left-0 bottom-0 block w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>

            <a
            href="#"
            className="inline-flex items-center px-8 py-3 mt-8 bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Entrar
          </a>
          
            {/* <button className="relative rounded-full py-2 px-4 overflow-hidden bg-white shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 group">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              <span className="relative text-gray-900 group-hover:text-white font-bold text-lg transition-colors duration-300 ease-in-out">Login</span>
           </button> */}



          </div>
          {/* <button onClick={() => setMenuVisible(!menuVisible)} className="focus:outline-none ">
            {menuVisible ? <ChevronUpIcon className="h-6 w-6 text-white" /> : <ChevronDownIcon className="h-6 w-6 text-white" />}
          </button> */}
        </div>
      </div>

      {/* Slides */}

      <div className="h-full w-full transition-transform duration-1000" style={{ transform: `translateY(-${currentIndex * 100}%)`}}>
        {slides.map((slide) => (
          <div key={slide.id} className="min-h-screen flex-shrink-0 w-full bg-cover bg-center  bg-black bg-opacity-10 relative" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-opacity-75"></div> {/* Camada de opacidade */}
            <div className="flex flex-col justify-between h-full p-20">
              <div className="text-left mt-40"> {/* Movendo o título para baixo */}
              <h2 className="text-white font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-snug mb-6">
  {slide.title}
</h2>

                <button className="relative py-2 px-4 rounded-full overflow-hidden bg-white shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 group">
  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
  <span className="relative text-gray-900 group-hover:text-white font-bold text-lg transition-colors duration-300 ease-in-out">Explore</span>
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Círculos em miniatura */}
      <div className="absolute top-1/2 right-12 mr-64 mt-16 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        {slides.map((slide, index) => (
          <button key={slide.id} onClick={() => goToSlide(index)} className={`h-12 w-12 rounded-full border-2 ${currentIndex === index ? 'border-white' : 'border-gray-400'} bg-white opacity-75`}>
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover rounded-full" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
