"use client";

import React from "react";
import { motion } from "framer-motion";
import useInView from "@/components/helpers/useInView"; // Ajuste o caminho se necessário

const AnimationRevealPage = ({ disabled = false, children }) => {
  if (disabled) {
    return <>{children}</>;
  }

  const directions = ["left", "right"];
  const childrenWithAnimation = React.Children.map(children, (child, i) => (
    <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
      {child}
    </AnimatedSlideInComponent>
  ));
  return <>{childrenWithAnimation}</>;
};

const AnimatedSlideInComponent = ({ direction = "left", offset = 30, children }) => {
  const [ref, inView] = useInView({ margin: `-${offset}px 0px 0px 0px` });

  const x = { target: "0%" };
  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <div ref={ref} className="relative">
      <motion.section
        initial={{ x: x.initial }}
        animate={{ 
          x: inView ? x.target : x.initial,
        }}
        transition={{ type: "spring", damping: 19, stiffness: 100 }}
        className="font-display min-h-screen text-secondary-500 p-8 overflow-hidden"
      >
        {children}
      </motion.section>
    </div>
  );
};

export default AnimationRevealPage;
