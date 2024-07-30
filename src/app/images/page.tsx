"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/headers/light.js";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  HeartIcon as SolidHeartIcon,
  ChevronDownIcon,
  ChevronUpIcon,

} from "@heroicons/react/24/solid";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import "./styles.css";
import { auth } from "../../../firebaseConfig.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { parseCookies, setCookie } from "nookies";
import Select from 'react-select';

// Função para inicializar a autenticação e obter o token
const initAuth = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário está autenticado, obtenha o token de ID
        const token = await user.getIdToken();
        // Armazene o token em um cookie
        setCookie(null, "firebaseToken", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 dias
          path: "/",
        });
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
    const token = await user.getIdToken(true); // O parâmetro true força a atualização do token
    setCookie(null, "firebaseToken", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 dias
      path: "/",
    });
  }
};

// Função para enviar o token nas solicitações
const sendRequest = async (url, options = {}) => {
  const cookies = parseCookies();
  const token = cookies.firebaseToken;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { ...options, headers });
};

export default function Page({
  roundedHeaderButton,
  email = "frontend@gmail.com",
  password = "Uind!0SETySETy",
}) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [categories] = useState([
    { value: "Todas", label: "Todas" },
    { value: "Esporte", label: "Esporte" },
    { value: "Tecnologia", label: "Tecnologia" },
    { value: "Cultura", label: "Cultura" },
    { value: "Diversidade", label: "Diversidade" },
    { value: "Entretenimento", label: "Entretenimento" },
    { value: "Politica", label: "Política" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const [showResolutions, setShowResolutions] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  // Função para buscar imagens da API
  const fetchImages = async () => {
    try {
      // Renova o token se necessário
      await renewToken();

      // Fazer a requisição para a API usando a função sendRequest
      const response = await sendRequest(`http://localhost:3000/images`);
      const images = await response.json();
      setImages(
        images.map((image) => ({
          url: image.imageUri,
          tags: image.tags, // Altere de category para tags
          description: image.description, // Adicione a descrição
          price: image.exclusivityPrice,
        }))
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // UseEffect para inicializar a autenticação
  useEffect(() => {
    if (email && password) {
      initAuth(email, password);
    }

    // Fetch inicial de imagens
    fetchImages();
  }, [email, password]);

  // Função para buscar e filtrar imagens com base na query
  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = images.filter(image => {
      const description = image.description ? image.description.toLowerCase() : "";
      const tags = image.tags ? image.tags.map(tag => tag.toLowerCase()) : [];
    
      return (
        description.includes(lowerCaseQuery) ||
        tags.some(tag => tag.includes(lowerCaseQuery))
      );
    });
  
    setFilteredImages(filtered);
  };

  // Função para filtrar imagens por categoria
  const filterImages = () => {
    if (selectedCategory === "Todas") {
      return filteredImages.length > 0 ? filteredImages : images;
    }
    return (filteredImages.length > 0 ? filteredImages : images).filter((image) =>
      image.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
    );
  };

  const openModal = (image) => {
    setCurrentImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const downloadImage = (format, size) => {
    const link = document.createElement("a");
    link.href = currentImage.url;
    link.download = `${currentImage.url.split("/").pop().split(".")[0]}-${size}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Erro ao carregar a imagem');
  };

  // Simula a imagem carregando e define o estado
  useEffect(() => {
    if (!currentImage) {
      // Se currentImage for null ou undefined, não execute o restante do código
      setLoading(false);
      return;
    }
  
    setLoading(true);
    setError(null); // Limpa o erro ao iniciar o carregamento
  
    // Cria uma nova imagem e define a URL para carregar a imagem
    const img = new Image();
    img.src = currentImage.url;
  
    // Define os manipuladores de eventos para carregamento e erro
    img.onload = () => {
      setLoading(false); // Define loading como false quando a imagem é carregada
      // Adicione qualquer lógica adicional após o carregamento da imagem aqui
    };
  
    img.onerror = () => {
      setLoading(false); // Define loading como false em caso de erro
      setError('Erro ao carregar a imagem.'); // Define a mensagem de erro
    };
  
    // Limpeza da função de efeito
    return () => {
      // Se necessário, você pode adicionar lógica de limpeza aqui
      // Por exemplo, abortar uma solicitação ou cancelar algum tipo de processamento
    };
  
  }, [currentImage]);
  

  const zoomImage = () => {
    // Função para zoom da imagem (adapte conforme sua necessidade)
    console.log('Imagem ampliada');
  };

  const downloadOptions = [
    { label: "Pequena", size: "500px" },
    { label: "Média",   size: "1000px" },
    { label: "Grande",  size: "2000px" },
  ];

  const formatOptions = ["jpg", "png", "gif"];

  const toggleFavorite = (image) => {
    if (favorites.includes(image.url)) {
      setFavorites(favorites.filter((fav) => fav !== image.url));
    } else {
      setFavorites([...favorites, image.url]);
    }
  };

  return (
    <>
      <div className="relative bg-gray-100 min-h-screen font-inter">
        <div className="flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24">
          <div className="relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left animate-slide-in">
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-tight">
              Banco de Imagens Sofisticadas para{" "}
              <span className="text-primary-500">
                Todos os Seus Projetos
              </span>
            </h1>
            <p className="my-5 lg:my-8 text-lg xl:text-xl text-gray-600">
              Explore uma vasta coleção de imagens de alta qualidade, prontas
              para serem usadas em seus projetos. Compre e baixe imagens
              exclusivas de diversas categorias.
            </p>
            <div className="relative max-w-md text-center mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Buscar imagens"
                className="sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300 focus:border-primary-500 hover:border-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="w-full sm:absolute right-0 top-0 bottom-0 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:from-blue-500 hover:to-blue-800 transition duration-300"
                onClick={handleSearch}
              >
                <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
                Pesquisar
              </button>
            </div>
            <div className="mt-12 lg:mt-20">
              <p className="uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500">
                Clientes Confiáveis
              </p>
              <img
                src="/images/customers-logo-strip.png"
                alt="Clientes Confiáveis"
                className="mt-4 w-full lg:pr-16 xl:pr-32 opacity-50"
              />
            </div>
          </div>
          <div className="relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end animate-slide-in">
            <div className="flex justify-center lg:justify-end items-center">
              <img
                className="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src="/images/design-illustration-2.svg"
                alt="Ilustração de Design"
              />
              <img
                src="/images/svg-decorator-blob-1.svg"
                alt="Decorador Blob"
                className="pointer-events-none opacity-10 absolute left-0 top-0 h-64 transform -translate-x-2/3 -z-10"
              />
              <img
                src="/images/svg-decorator-blob-2.svg"
                alt="Decorador Blob"
                className="pointer-events-none opacity-10 absolute right-0 top-0 h-64 transform translate-x-2/3 -z-10"
              />
            </div>
          </div>
        </div>
        <div className="relative bg-gradient-to-r from-gray-100 via-gray-100 to-gray-100 py-8">
        
          <div className="flex flex-wrap justify-center">
            {filterImages().map((image, index) => (
              <div
                key={index}
                className="m-4 relative cursor-pointer"
                onClick={() => openModal(image)}
              >
                <img
                  src={image.url}
                  alt={`Imagem ${index + 1}`}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full">
                  {favorites.includes(image.url) ? (
                    <SolidHeartIcon
                      className="h-6 w-6 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image);
                      }}
                    />
                  ) : (
                    <HeartIcon
                      className="h-6 w-6 text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {modalIsOpen && (
 
 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center animate-fade-in">
 <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative flex flex-col max-h-screen animate-slide-up">
   
   <button
     onClick={closeModal}
     className="absolute top-6 z-20 right-6 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-red-700 focus:outline-none transition-transform duration-300 transform hover:scale-110"
     aria-label="Fechar"
   >
     <XMarkIcon className="h-6 w-6" />
   </button>

   <div className="flex-grow overflow-auto">
     {currentImage && (
       <>
         <div className="flex justify-center items-center mb-6 overflow-hidden">
           <img
             src={currentImage.url}
             alt="Imagem selecionada"
             className="w-full max-h-[60vh] object-contain rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
             onClick={zoomImage}
             id="image"
           />
           {loading && (
             <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
               <div className="spinner"></div>
             </div>
           )}
           {error && (
             <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10 text-red-500">
               {error}
             </div>
           )}
         </div>

    
         <div className="w-full text-center mb-6">
           <h2 className="text-4xl font-extrabold text-gray-900">
             Categoria: <span className="text-blue-600">{currentImage.category}</span>
           </h2>
           <p className="text-2xl text-gray-700 mt-2">
             Preço: <span className="font-semibold">{currentImage.price}</span>
           </p>
           {currentImage.details && (
             <p className="text-lg text-gray-600 mt-4">
               {currentImage.details}
             </p>
           )}
         </div>

     
         <div className="flex flex-col md:flex-row justify-center items-center mt-4 space-y-4 md:space-y-0 md:space-x-4">
    
           <div className="relative w-full md:w-auto">
             <button
               onClick={() => setShowFormats(!showFormats)}
               className="flex items-center py-2 px-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full shadow-lg hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition transform hover:scale-105"
               aria-expanded={showFormats}
             >
               Formato
               {showFormats ? (
                 <ChevronUpIcon className="h-5 w-5 ml-2 transition-transform duration-300 transform rotate-180" />
               ) : (
                 <ChevronDownIcon className="h-5 w-5 ml-2 transition-transform duration-300 transform rotate-0" />
               )}
             </button>
             {showFormats && (
               <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto transition-transform duration-300 transform translate-y-2">
                 <ul>
                   {formatOptions.map((format) => (
                     <li
                       key={format}
                       className="py-2 px-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                       onClick={() => downloadImage(format, "1000px")}
                       role="menuitem"
                     >
                       {format.toUpperCase()}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
           </div>

           <div className="relative w-full md:w-auto">
             <button
               onClick={() => setShowResolutions(!showResolutions)}
               className="flex items-center py-2 px-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full shadow-lg hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition transform hover:scale-105"
               aria-expanded={showResolutions}
             >
               Resolução
               {showResolutions ? (
                 <ChevronUpIcon className="h-5 w-5 ml-2 transition-transform duration-300 transform rotate-180" />
               ) : (
                 <ChevronDownIcon className="h-5 w-5 ml-2 transition-transform duration-300 transform rotate-0" />
               )}
             </button>
             {showResolutions && (
               <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto transition-transform duration-300 transform translate-y-2 z-10">
               <ul className="list-none p-0 m-0">
                 {downloadOptions.map((option) => (
                   <li
                     key={option.size}
                     className="py-2 px-4 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-lg"
                     onClick={() => downloadImage("jpg", option.size)}
                     role="menuitem"
                   >
                     <span className="text-gray-800">{option.label}</span>
                     <span className="text-gray-500 text-sm">{option.size}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             )}
           </div>
         </div>

       
         {showSuccessMessage && (
           <div className="mt-6 text-green-500 text-center text-lg font-semibold">
             Imagem baixada com sucesso!
           </div>
         )}
       </>
     )}
   </div>
 </div>
</div>

        )}
      </div>
    </>
  );
}
