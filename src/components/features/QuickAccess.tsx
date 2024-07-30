"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, ChevronDown } from 'react-feather';
import { createPortal } from 'react-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const QuickAccessCards = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(null);

  const sliderSettings = {
    arrows: false,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const cards = [
    { icon: "📜", title: "LGPD", options: ["Option 1", "Option 2"] },
    { icon: "📝", title: "Licitações", options: ["Option 1", "Option 2"] },
    { icon: "🏛️", title: "Institucional", options: ["Option 1", "Option 2"] },
    { icon: "🔍", title: "Transparência", options: ["Option 1", "Option 2"] },
    { icon: "📚", title: "Normativas", options: ["Option 1", "Option 2"] },
    { icon: "📢", title: "Ouvidoria", options: ["Option 1", "Option 2"] },
    { icon: "💬", title: "Contato", options: ["Option 1", "Option 2"] },
    { icon: "🔗", title: "Links úteis", options: ["Option 1", "Option 2"] },
    { icon: "✉️", title: "Carta anual", options: ["Option 1", "Option 2"] },
    { icon: "🎬", title: "Mídia Kit", options: ["Option 1", "Option 2"] },
    { icon: "📅", title: "Presidente (agenda)", options: ["Option 1", "Option 2"] }, // New card for Agenda
  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const openModal = (index) => {
    setModalOpen(index);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'white',
      color: 'black',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        position: 'relative',
        padding: '0 1.5rem',
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <button
            onClick={toggleVisibility}
            style={{
              position: 'relative',
              borderRadius: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: '#1d4ed8',
              color: 'white',
              fontWeight: '700',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, background-color 0.3s',
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              overflow: 'hidden',
            }}
          >
            <span style={{
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: '#1d4ed8',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
            }}>Acesso Rápido</span>
            <ChevronDown style={{
              width: '2rem',
              height: '2rem',
              marginLeft: '1rem',
              transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
              backgroundColor: '#1d4ed8',
              color: 'white',
              borderRadius: '50%',
              padding: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} />
          </button>
        </div>
        <div style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => sliderRef?.slickPrev()}
              style={{
                borderRadius: '50%',
                padding: '0.5rem',
                backgroundColor: '#1d4ed8',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <ChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>
            <button
              onClick={() => sliderRef?.slickNext()}
              style={{
                borderRadius: '50%',
                padding: '0.5rem',
                backgroundColor: '#1d4ed8',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <ChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>
          </div>
          <Slider ref={setSliderRef} {...sliderSettings} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {cards.map((card, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col items-center text-center m-2">
                <div className="text-4xl mb-4">{card.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{card.title}</h3>
                  <button
                    onClick={() => openModal(index)}
                    className="rounded-full py-2 px-4 bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:bg-blue-700 hover:scale-105 cursor-pointer border-none"
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {modalOpen !== null && createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-4/5 max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-full p-2 bg-gray-200 text-gray-800 shadow-md cursor-pointer border-none flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            <div className="text-4xl mb-4">{cards[modalOpen].icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{cards[modalOpen].title}</h3>
            {modalOpen === cards.length - 1 ? (
              <Calendar />
            ) : (
              <p className="mb-4">Conteúdo do modal para {cards[modalOpen].title}.</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default QuickAccessCards;
