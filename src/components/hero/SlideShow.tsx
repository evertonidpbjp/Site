"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../headers/light";
import './styles.css'; // Certifique-se de que este arquivo existe e está configurado corretamente

const slides = [
  {
    bgImage: "/images/hero/image1.jpg",
    heading: "Comunicações Oficiais da Empresa Paraibana",
    subheading: "Fique por dentro das atualizações do governo",
    action: "Veja os Comunicados",
  },
  {
    bgImage: "/images/image5.jpg",
    heading: "Jornal da União",
    subheading: "Notícias de qualidade para você",
    action1: "Leia o Jornal",
    action2: "Ouça o Podcast",
  },
  {
    bgImage: "/images/hero/image3.jpg",
    heading: "Rádios Tabajara e Parahyba FM",
    subheading: "Ouça as melhores músicas e notícias",
    action1: "Ouça Tabajara",
    action2: "Ouça Parahyba FM",
  },
  {
    bgImage: "/images/hero/image4.jpg",
    heading: "Serviço de API de Notícias",
    subheading: "Integrando notícias em seu aplicativo com facilidade",
    action: "Saiba Mais",
  },
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showPlayer, setShowPlayer] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setFade(true);
      }, 500); // Tempo de transição
    }, 7000); // Tempo de exibição do slide em milissegundos

    return () => clearInterval(interval);
  }, []);

  const handlePlayRadio = (radioUrl) => {
    setShowPlayer(radioUrl);
    if (audioRef.current) {
      audioRef.current.src = radioUrl;
      audioRef.current.play();
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleToggleRadio = () => {
    const newRadioUrl =
      showPlayer === "http://sv13.hdradios.net:7844/000000"
        ? "http://sv12.hdradios.net:7852/000000"
        : "http://sv13.hdradios.net:7844/000000";
    handlePlayRadio(newRadioUrl);
  };

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <div className="relative bg-center bg-cover h-screen min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          height: '100vh',
          backgroundImage: `url(${slides[index].bgImage})`,
          backgroundSize: "100%",
          filter: "brightness(0.7)",
        }}
      ></div>
      <div className="relative h-full flex flex-col justify-center items-center px-6 sm:px-8">
        <Header
          className="pt-8 max-w-none w-full"
          links={
            <div className="absolute top-8 right-8">
              <button
                onClick={toggleMenu}
                className="rounded-full px-8 py-3 text-sm sm:text-base bg-blue-800 text-white font-bold shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                Contrate-nos
              </button>
              {showMenu && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 z-50 transition-opacity duration-300 opacity-100">
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span className="mr-2">🗞️</span> Jornal
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span className="mr-2">⚽</span> Esportes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span className="mr-2">📰</span> Notícias
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span className="mr-2">📻</span> Rádio
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span className="mr-2">🗂️</span> Arquivo
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          }
        />
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{ marginTop: '0%' }}
        >
          <div className="relative w-full max-w-3xl">
            <h1 className={`text-xl sm:text-4xl mt-[-120px] md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4 transform transition-transform duration-1000 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              {slides[index].heading}
            </h1>
            <span className="block text-base sm:text-lg lg:text-xl text-white">
              {slides[index].subheading}
            </span>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
            {slides[index].action && (
              <button className="rounded-full px-8 py-3 text-sm sm:text-base bg-blue-800 text-white font-bold shadow-lg transition-transform duration-300 hover:bg-blue-900 focus:outline-none focus:shadow-outline hover:scale-105 mr-4">
                {slides[index].action}
              </button>
            )}
            {slides[index].action1 && (
              <button
                onClick={() => handlePlayRadio("http://sv13.hdradios.net:7844/000000")}
                className="rounded-full px-8 py-3 text-sm sm:text-base bg-blue-800 text-white font-bold shadow-lg transition-transform duration-300 hover:bg-blue-900 focus:outline-none focus:shadow-outline hover:scale-105 mr-4"
              >
                {slides[index].action1}
              </button>
            )}
            {slides[index].action2 && (
              <button
                onClick={() => handlePlayRadio("http://sv12.hdradios.net:7852/000000")}
                className="rounded-full px-8 py-3 text-sm sm:text-base bg-blue-800 text-white font-bold shadow-lg transition-transform duration-300 hover:bg-blue-900 focus:outline-none focus:shadow-outline hover:scale-105"
              >
                {slides[index].action2}
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-16 right-24 flex flex-col items-center space-y-4">
          {slides.map((slide, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setIndex(slideIndex)}
              className={`relative w-12 h-12 rounded-full border-2 border-white flex items-center justify-center ${
                slideIndex === index ? "bg-blue-600" : "bg-transparent"
              }`}
            >
              <img
                src={slide.bgImage}
                alt={`Thumbnail ${slideIndex}`}
                className={`absolute inset-0 object-cover w-full h-full ${
                  slideIndex === index ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      {showPlayer && (
        <div className="fixed bottom-0 right-0 p-4 bg-white shadow-lg rounded-lg">
          <audio ref={audioRef} controls className="w-full">
            <source src={showPlayer} type="audio/mpeg" />
          </audio>
          <button
            onClick={handleClosePlayer}
            className="absolute top-2 right-2 text-red-600"
          >
            &times;
          </button>
          <button
            onClick={handleToggleRadio}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {showPlayer === "http://sv13.hdradios.net:7844/000000" ? "Ouvir Parahyba FM" : "Ouvir Tabajara"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
