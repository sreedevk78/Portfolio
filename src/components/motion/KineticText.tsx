"use client";

import { motion, type Variants } from "framer-motion";

type KineticTextProps = {
  text: string;
  className?: string;
  lineClassName?: string | ((lineIndex: number) => string);
  delay?: number;
};

const word: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
    rotateX: -16,
  },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function KineticText({ text, className, lineClassName, delay = 0 }: KineticTextProps) {
  const lines = text.split("\n");
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay + 0.08,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={`${line}-${lineIndex}`}
          className={`block overflow-hidden ${
            typeof lineClassName === "function" ? lineClassName(lineIndex) : lineClassName ?? ""
          }`}
        >
          {line.split(" ").map((part, wordIndex) => (
            <motion.span
              key={`${part}-${wordIndex}`}
              variants={word}
              className="inline-block will-change-transform"
              aria-hidden="true"
            >
              {part}
              {wordIndex < line.split(" ").length - 1 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
