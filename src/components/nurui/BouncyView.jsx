'use client';

import { motion } from "framer-motion";

const BouncyText = ({ text = "Bouncy Animation" }) => {
  return (
    <h2
      className="
        text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl
        font-bold text-center leading-tight break-words
      "
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
            transition: {
              delay: i * 0.1,
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const BouncyView = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <BouncyText text="Creative Bouncy Text That Scales" />
    </div>
  );
};

export default BouncyView;
