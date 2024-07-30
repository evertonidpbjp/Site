import React from "react";
import Header from "../headers/light";

const Container = ({ children }) => (
  <div
    className="relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-[600px]"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80')" }}
  >
    {children}
  </div>
);

const OpacityOverlay = () => (
  <div className="z-10 absolute inset-0 bg-black opacity-60" />
);

const HeroContainer = ({ children }) => (
  <div className="z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col justify-center items-center">
    {children}
  </div>
);

const Content = ({ children }) => (
  <div className="flex flex-1 flex-col justify-center items-center text-center">
    {children}
  </div>
);

const Heading = ({ children }) => (
  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-100 leading-tight mb-6">
    {children}
    <span className="block mt-4 text-xl sm:text-2xl text-gray-300">
      Discover the best events in town
    </span>
  </h1>
);

const PrimaryAction = ({ children }) => (
  <button className="rounded-full px-8 py-4 mt-6 text-lg font-semibold  bg-blue-600 text-white hover:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300">
    {children}
  </button>
);

const HeroEvents = () => {
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
     
        <Content>
          <Heading>
            Book Music & Comedy Events
            <br />
            anywhere in New York
          </Heading>
          <PrimaryAction>Search Events Near Me</PrimaryAction>
        </Content>
      </HeroContainer>
    </Container>
  );
};

export default HeroEvents;
