import { motion } from "framer-motion";
import React from "react";

const Loader = () => {
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
        className="w-[50px] h-[50px]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1, // Duration of one full rotation
            repeat: Infinity, // Repeat indefinitely
            repeatType: "loop", // Loop the animation
            // Linear easing for smooth rotation
          }}
          className="w-[50px] h-[50px] rounded-full "
          style={{ border: "10px solid white", borderTop: "10px solid yellow" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
