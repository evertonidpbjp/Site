"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { parseCookies, setCookie } from 'nookies';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebaseConfig';
import ImageTabs from '../../components/images/ImageTabs';

// Função para inicializar a autenticação e obter o token
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

// Função para renovar o token
const renewToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    setCookie(null, 'firebaseToken', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
  }
};

export default function Page({ roundedHeaderButton, email = "frontend@gmail.com", password = "Uind!0SETySETy" }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (email && password) {
      initAuth(email, password);
    }
  }, [email, password]);

  return (
    <div className="relative bg-gray-900 text-white">
      <div className="relative bg-opacity-25">
        <div className="flex flex-col items-center py-16 lg:pb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none text-center">
           Banco de Dados de Imagens
          </h1>
          <div className="relative mt-12 w-full max-w-xs sm:max-w-md lg:max-w-lg">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-0 top-0 ml-4 mt-3 text-gray-600"/>
            <input
              type="text"
              placeholder="Busque imagens..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 py-3 rounded-full w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            />

            <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
        ></button>
          </div>
        </div>
        <ImageTabs searchQuery={searchQuery} />
      </div>
    </div>
  );
}
