"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#_";

export default function TextDecrypt({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const hasAnimatedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animateText = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letter === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (isHovering || !hasAnimatedRef.current) {
      animateText();
      hasAnimatedRef.current = true;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateText, isHovering]);

  return (
    <motion.span 
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText || text}
    </motion.span>
  );
}
