{modalIsOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-0  overflow-y-auto max-h-full">
      <button
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-red-500 hover:text-white transition duration-300"
        onClick={closeModal}
      >
        <XMarkIcon className="h-6 w-6 text-white-700" />
      </button>
      {currentImage && (
        <>
          <div className="flex justify-center mb-4">
            <img
              src={currentImage.url}
              alt={currentImage.category}
              className="w-full max-w-lg h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">{currentImage.category}</h2>
          <p className="text-lg text-gray-700 mb-4">Preço: ${currentImage.price.toFixed(2)}</p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="bg-primary-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-600 transition duration-300 flex items-center"
              onClick={() => toggleFavorite(currentImage)}
            >
              {favorites.includes(currentImage.url) ? (
                <>
                  <SolidHeartIcon className="h-6 w-6 mr-2 text-red-500" />
                  
                </>
              ) : (
                <>
                  <HeartIcon className="h-6 w-6 mr-2 text-gray-400" />
                 
                </>
              )}
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              onClick={() => downloadImage("jpg", "500px")}
            >
              Baixar Imagem
            </button>
            <div className="relative">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                onClick={() => setShowFormats(!showFormats)}
              >
                Formatos <ChevronDownIcon className={`h-5 w-5 inline-block transition-transform ${showFormats ? "rotate-180" : ""}`} />
              </button>
              {showFormats && (
                <div className="absolute z-10 bg-gray-100 p-4 rounded-lg shadow-lg mt-2 right-0 w-48">
                  {formatOptions.map((format, idx) => (
                    <button
                      key={idx}
                      className="block w-full text-left py-2 px-4 hover:bg-gray-200 rounded-md transition duration-300"
                      onClick={() => downloadImage(format, "500px")}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                onClick={() => setShowResolutions(!showResolutions)}
              >
                Resoluções <ChevronDownIcon className={`h-5 w-5 inline-block transition-transform ${showResolutions ? "rotate-180" : ""}`} />
              </button>
              {showResolutions && (
                <div className="absolute z-10 bg-gray-100 p-4 rounded-lg shadow-lg mt-2 right-0 w-48">
                  {downloadOptions.map((option, idx) => (
                    <button
                      key={idx}
                      className="block w-full text-left py-2 px-4 hover:bg-gray-200 rounded-md transition duration-300"
                      onClick={() => downloadImage("jpg", option.size)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showSuccessMessage && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
              Imagem baixada com sucesso!
            </div>
          )}
        </>
      )}
    </div>
  </div>
)}
