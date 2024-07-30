import { useRef, useState, useEffect } from "react";
import { useInView as useInViewFromFramer } from 'framer-motion';

export default function useInView({ once = true, margin = "-30px 0px 0px 0px" } = {}) {
  const ref = useRef(null);
  const { inView } = useInViewFromFramer({
    once,
    margin,
  });

  return [ref, inView];
}
