"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { parseCookies, setCookie } from 'nookies';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebaseConfig';

const initAuth = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie(null, 'firebaseToken', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      }
    });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
  }
};

const renewToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    setCookie(null, 'firebaseToken', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
  }
};

const sendRequest = async (url, options = {}) => {
  const cookies = parseCookies();
  const token = cookies.firebaseToken;
  const headers = { ...options.headers, Authorization: `Bearer ${token}` };
  return fetch(url, { ...options, headers });
};

const ImageTabs = ({ heading = "Escolha a categoria", email, password, searchQuery }) => {
  const [activeTab, setActiveTab] = useState("Todas");
  const [tabs, setTabs] = useState({});

  useEffect(() => {
    if (email && password) {
      initAuth(email, password);
    }

    const fetchImages = async () => {
      try {
        await renewToken();
        const response = await sendRequest('http://localhost:3000/images');
        const images = await response.json();

        // Filtra imagens com base na consulta de pesquisa
        const filteredImages = images.filter(image => 
          image.title && image.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const categorizedImages = filteredImages.reduce((acc, image) => {
          image.tags.forEach(tag => {
            if (!acc[tag]) acc[tag] = [];
            acc[tag].push(image);
          });
          if (!acc["Todas"]) acc["Todas"] = [];
          acc["Todas"].push(image);
          return acc;
        }, {});

        setTabs(categorizedImages);
        setActiveTab("Todas");
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, [email, password, searchQuery]);

  const tabsKeys = Object.keys(tabs);

  return (
    <div className="relative bg-gradient-to-r from-gray-200 to-gray-200 p-8 rounded-lg shadow-lg">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-wide text-center text-blue">{heading}</h2>
        </div>

        <div className="flex flex-wrap bg-white rounded-full shadow-lg w-full overflow-x-auto mt-8">
          {tabsKeys.map((tabName, index) => (
            <div
              key={index}
              className={`cursor-pointer px-6 py-2 mx-2 rounded-full text-gray-600 font-medium transition-transform duration-300 transform ${activeTab === tabName ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md scale-105" : "hover:bg-gradient-to-r from-blue-100 to-blue-300"}`}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </div>
          ))}
        </div>

        {tabsKeys.map((tabKey, index) => (
          <motion.div
            key={index}
            className="mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12"
            variants={{
              current: { opacity: 1, scale: 1, display: "flex" },
              hidden: { opacity: 0, scale: 0.8, display: "none" },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <div key={index} className="mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12">
                <motion.a
                  className="bg-white rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 group relative overflow-hidden"
                  href={card.url}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <div
                    className="h-56 xl:h-64 bg-center bg-cover relative rounded-t transition-transform duration-300 ease-in-out"
                    style={{ backgroundImage: `url("${card.imageUri}")` }}
                  >
                    <div className="leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end">
                      <div className="mr-1 text-sm font-bold flex items-end">
                        <svg className="w-4 h-4 fill-current text-orange-400 mr-1" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                        {card.rating}
                      </div>
                      <div className="font-medium text-xs text-gray-600">({card.reviews})</div>
                    </div>
                    <motion.div
                      className="absolute inset-0 flex justify-center items-center bg-blue-500 bg-opacity-40 transition-opacity duration-300"
                      variants={{
                        hover: { opacity: 1 },
                        rest: { opacity: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <button className="px-8 py-3 font-bold rounded bg-blue-600 text-white hover:bg-blue-800 transition duration-300 text-sm">
                        Comprar Agora
                      </button>
                    </motion.div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-lg font-semibold text-gray-800">{card.title}</div>
                    <div className="text-sm text-gray-600 mt-2">{card.description}</div>
                  </div>
                </motion.a>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageTabs;
