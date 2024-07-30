import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import useAnimatedNavToggler from "../helpers/useAnimatedNavToggler";
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';

const Header = ({ 
  roundedHeaderButton = false, 
  logoLink, 
  links, 
  className, 
  collapseBreakpointClass = "lg" 
}) => {
  const defaultLinks = [
    <div key={1} className="inline-block">
      <a href="/#" className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500">
        About
      </a>
      <a href="/#" className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500">
        Blog
      </a>
      <a href="/#" className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500">
        Pricing
      </a>
      <a href="/#" className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500">
        Contact Us
      </a>
      <a href="/#" className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500 lg:ml-12">
        Login
      </a>
      <a href="/#" className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 focus:text-blue-500 lg:mx-0 px-8 py-3 rounded bg-blue-500 text-white hover:bg-blue-700 hover:text-gray-200 focus:shadow-outline ${roundedHeaderButton ? 'rounded-full' : ''}`}>
        Sign Up
      </a>
    </div>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <a href="/" className="flex items-center font-black border-b-0 text-2xl ml-0 text-blue-900">
      <img src="" alt="logo" className="w-10 mr-3" />
      EPC
    </a>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <header className={`flex justify-between items-center max-w-screen-xl mx-auto ${className || "header-light"}`}>
      <nav className={`hidden lg:flex flex-1 justify-between items-center ${collapseBreakpointCss.desktopNavLinks}`}>
        {links}
      </nav>

      <nav className={`flex flex-1 items-center justify-between lg:hidden ${collapseBreakpointCss.mobileNavLinksContainer}`}>
        {logoLink}
        <motion.div 
          initial={{ x: "150%", display: "none" }} 
          animate={animation} 
          className={`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-blue-900 bg-white ${collapseBreakpointCss.mobileNavLinks}`}
        >
          {links}
        </motion.div>
        <button 
          onClick={toggleNavbar} 
          className={`lg:hidden z-20 focus:outline-none transition duration-300 ${showNavLinks ? 'text-blue-500' : ''}`}
        >
          {showNavLinks ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  roundedHeaderButton: PropTypes.bool,
  logoLink: PropTypes.node,
  links: PropTypes.node,
  className: PropTypes.string,
  collapseBreakpointClass: PropTypes.oneOf(["sm", "md", "lg"]),
};

Header.defaultProps = {
  roundedHeaderButton: false,
  logoLink: null,
  links: null,
  className: "",
  collapseBreakpointClass: "lg",
};

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: 'sm:hidden',
    desktopNavLinks: 'sm:flex',
    mobileNavLinksContainer: 'sm:hidden'
  },
  md: {
    mobileNavLinks: 'md:hidden',
    desktopNavLinks: 'md:flex',
    mobileNavLinksContainer: 'md:hidden'
  },
  lg: {
    mobileNavLinks: 'lg:hidden',
    desktopNavLinks: 'lg:flex',
    mobileNavLinksContainer: 'lg:hidden'
  }
};

export default Header;
