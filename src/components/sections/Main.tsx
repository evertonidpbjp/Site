"use client";
import PreviewCard from '../cards/PreviewCard';

export default function Section() {
  return (
    <div className="container mx-auto p-8 ">
      <div className="text-center mb-8">
      <h2 className="text-4xl font-bold text-white mb-4 inline-block bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-md">
          Seção Principal
        </h2>
        <p className="text-lg text-gray-600">Explore as principais funcionalidades e serviços</p>
      </div>
      <div className="text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        
      <PreviewCard
          title="Banco de Imagens"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="/images/demo/fotografia.jpg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />


        <PreviewCard
          title="Jornal A União"
          description="Our templates are easy to setup, understand and customize."
          image="/images/demo/jornal.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />
        
        <PreviewCard
          title="API de Notícias"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="/images/demo/api.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />


        <PreviewCard
          title="Rádio Tabajara"
          description="Our templates are easy to setup, understand and customize."
          image="/images/demo/radio.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />

   

        <PreviewCard
          title="Diário Oficial"
          description="We've been in the hotels business across the world."
          image="/images/demo/oficial.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />
        <PreviewCard
          title="Parahyba FM"
          description="Our templates are easy to setup, understand and customize."
          image="/images/demo/parahyba.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />
        <PreviewCard
          title="Eventos"
          description="Our templates are easy to setup, understand and customize."
          image="/images/demo/eventos.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />

      <PreviewCard
          title="Loja Virtual"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="/images/demo/livros.jpeg"
          link="/images/demo/HotelTravelLandingPage.jpeg"
        />
      </div>
    </div>
  );
}
