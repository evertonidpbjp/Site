import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon, FacebookIcon, TwitterIcon, InstagramIcon } from '@heroicons/react/24/solid';

interface ImageModalProps {
  currentImage: { url: string; category: string; price: string; details?: string };
  closeModal: () => void;
  formatOptions: string[];
  downloadOptions: { size: string; label: string }[];
  downloadImage: (format: string, size: string) => void;
  showSuccessMessage: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  currentImage,
  closeModal,
  formatOptions,
  downloadOptions,
  downloadImage,
  showSuccessMessage
}) => {
  const [showFormats, setShowFormats] = useState(false);
  const [showResolutions, setShowResolutions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para tratar o carregamento da imagem
  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Erro ao carregar a imagem');
  };

  // Simula a imagem carregando e define o estado
  useEffect(() => {
    setLoading(true);
    setError(null); // Limpa o erro ao iniciar o carregamento

    // Para simular o carregamento da imagem, usa-se um timeout
    // Em um caso real, a verificação pode ser feita no evento onLoad da imagem
    const img = new Image();
    img.src = currentImage.url;
    img.onload = handleImageLoad;
    img.onerror = handleImageError;

  }, [currentImage.url]);

  const zoomImage = () => {
    // Função para zoom da imagem (adapte conforme sua necessidade)
    console.log('Imagem ampliada');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative overflow-auto animate-slide-up">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none transition-transform duration-200 transform hover:scale-110"
          aria-label="Fechar"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        {currentImage && (
          <>
            <div className="relative w-full max-w-3xl mb-6">
              <div className="relative">
                <img
                  src={currentImage.url}
                  alt="Imagem selecionada"
                  className="w-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
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
                  className="flex items-center py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-expanded={showFormats}
                >
                  Formato
                  {showFormats ? (
                    <ChevronUpIcon className="h-5 w-5 ml-2 transition-transform duration-200 transform rotate-180" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 ml-2 transition-transform duration-200 transform rotate-0" />
                  )}
                </button>
                {showFormats && (
                  <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full transition-transform duration-300 transform translate-y-2">
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
                )}
              </div>
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setShowResolutions(!showResolutions)}
                  className="flex items-center py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-expanded={showResolutions}
                >
                  Resolução
                  {showResolutions ? (
                    <ChevronUpIcon className="h-5 w-5 ml-2 transition-transform duration-200 transform rotate-180" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 ml-2 transition-transform duration-200 transform rotate-0" />
                  )}
                </button>
                {showResolutions && (
                  <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full transition-transform duration-300 transform translate-y-2">
                    {downloadOptions.map((option) => (
                      <li
                        key={option.size}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        onClick={() => downloadImage("jpg", option.size)}
                        role="menuitem"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition">
                Compartilhar
              </button>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700 transition">
                  <FacebookIcon className="h-6 w-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 transition">
                  <TwitterIcon className="h-6 w-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 transition">
                  <InstagramIcon className="h-6 w-6" />
                </button>
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
  );
};

export default ImageModal;
