import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const gradientAnimationVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"], 
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.5, 1]
    }
  }
};

const AnimatedGradientBox = motion(Box);

export default function GradientBox(props) {
  return (
    <AnimatedGradientBox
      bg="linear-gradient(90deg, #002136, #002136 45%, #00385c 50%, #002136 55%, #002136)"
      backgroundSize="200% 100%"
      variants={gradientAnimationVariants}
      initial="animate"
      animate="animate"
      {...props}
    />
  );
}