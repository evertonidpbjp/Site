// components/cards/PreviewCard.js
import { useState } from 'react';

export default function PreviewCard({ title, image, link }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-160 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full overflow-hidden rounded-t-lg bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h3 className="text-4xl font-semibold text-white">{title}</h3>
        </div>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex justify-center items-center">
          <iframe
            src={link}
            className="w-full h-full border-0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '150%',
              height: '150%',
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              animation: 'scrollPreview 40s linear infinite'
            }}
          ></iframe>
        </div>
      )}
      <button className="absolute bottom-0 left-0 w-full bg-blue-800 text-white py-5 text-center font-semibold hover:bg-blue-900 transition-colors">
        Acesse agora
      </button>
      <style jsx>{`
        @keyframes scrollPreview {
          0% {
            transform: scale(0.75) translateY(0);
          }
          100% {
            transform: scale(0.75) translateY(-100%);
          }
        }
        .h-160 {
          height: 40rem;
        }
      `}</style>
    </div>
  );
}
