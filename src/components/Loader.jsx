import { motion } from "framer-motion";
import React from "react";

const Loader = ({ w, h, b }) => {
  return (
    <div className="loader-container flex justify-center">
      <motion.div
        animate={{ rotate: 360 }} // Rotate 360 degrees
        transition={{
          duration: 1, // Duration of one full rotation
          repeat: Infinity, // Repeat indefinitely
          repeatType: "loop", // Loop the animation
          ease: "linear", // Linear easing for smooth rotation
        }}
        className={`w-[${w}px] h-[${h}px]`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1, // Duration of one full rotation
            repeat: Infinity, // Repeat indefinitely
            repeatType: "loop", // Loop the animation
            // Linear easing for smooth rotation
          }}
          className={`w-[${w}px] h-[${h}px] rounded-full`}
          style={{
            border: `${b}px solid white`,
            borderTop: `${b}px solid #45474B`,
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
