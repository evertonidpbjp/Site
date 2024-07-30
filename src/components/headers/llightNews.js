"use client"
import React, { useState } from 'react';
import useAnimatedNavToggler from "../helpers/useAnimatedNavToggler.js";

// Imagens SVG diretamente em linha substituídas por ícones de um repositório público
const menuIconSvg = (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const closeIconSvg = (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const logoUrl = "/images/logos/logo_epc.png"; // Substitua pelo caminho correto do logo

const Header = ({ className, children }) => (
  <header className={`flex justify-between items-center max-w-screen-xl mx-auto p-4 bg-transparent text-white ${className || 'header-light'}`}>
    {children}
  </header>
);

export const NavLinks = ({ children }) => (
  <div className="hidden lg:flex space-x-6">
    {children}
  </div>
);

export const NavLink = ({ href, children, className }) => (
  <a
    href={href}
    className={`text-base font-medium tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 ${className}`}
  >
    {children}
  </a>
);

export const PrimaryLink = ({ href, children, roundedHeaderButton }) => (
  <a
    href={href}
    className={`lg:mx-0 px-6 py-4 rounded-lg bg-yellow-500 bg-blue-700  text-gray-200 hover:bg-blue-800 hover:text-gray-100 transition-colors duration-300 border-b-0 ${roundedHeaderButton ? 'rounded-full' : ''}`}
  >
    {children}
  </a>
);

export const LogoLink = ({ href, children }) => (
  <a
    href={href}
    className="flex items-center font-bold text-xl text-white"
  >
    <img src={logoUrl} alt="logo" className="w-12 h-12 mr-2" />
    {children}
  </a>
);

export const MobileNavLinksContainer = ({ children }) => (
  <nav className="flex flex-1 items-center justify-between lg:hidden">
    {children}
  </nav>
);

export const NavToggle = ({ onClick, showNavLinks }) => (
  <button
    onClick={onClick}
    className={`lg:hidden p-2 focus:outline-none transition-transform duration-300 ${showNavLinks ? 'transform rotate-180' : ''}`}
  >
    {showNavLinks ? closeIconSvg : menuIconSvg}
  </button>
);

export const MobileNavLinks = ({ children, isVisible }) => (
  <div
    className={`lg:hidden fixed top-0 inset-x-0 mt-16 mx-4 p-6 bg-white shadow-lg rounded-lg text-gray-800 transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
  >
    <div className="flex flex-col items-center">
      {children}
    </div>
  </div>
);

export const DesktopNavLinks = ({ children }) => (
  <nav className="hidden lg:flex flex-1 justify-between items-center">
    {children}
  </nav>
);

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: 'sm:hidden',
    desktopNavLinks: 'sm:flex',
    mobileNavLinksContainer: 'sm:hidden',
  },
  md: {
    mobileNavLinks: 'md:hidden',
    desktopNavLinks: 'md:flex',
    mobileNavLinksContainer: 'md:hidden',
  },
  lg: {
    mobileNavLinks: 'lg:hidden',
    desktopNavLinks: 'lg:flex',
    mobileNavLinksContainer: 'lg:hidden',
  },
  xl: {
    mobileNavLinks: 'xl:hidden',
    desktopNavLinks: 'xl:flex',
    mobileNavLinksContainer: 'xl:hidden',
  }
};

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  const defaultLinks = (
    <NavLinks>
      <NavLink href="/#">About</NavLink>
      <NavLink href="/#">Blog</NavLink>
      <NavLink href="/#">Pricing</NavLink>
      <NavLink href="/#">Contact Us</NavLink>
      <NavLink href="/#" className="lg:ml-12">
        Login
      </NavLink>
      <PrimaryLink href="/#" roundedHeaderButton={roundedHeaderButton}>Sign Up</PrimaryLink>
    </NavLinks>
  );

  const { showNavLinks, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      {/* <img src={logoUrl} alt="logo" />
      Treact */}
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className}>
      <DesktopNavLinks className={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer className={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks isVisible={showNavLinks} className={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} showNavLinks={showNavLinks}>
          {showNavLinks ? closeIconSvg : menuIconSvg}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};
