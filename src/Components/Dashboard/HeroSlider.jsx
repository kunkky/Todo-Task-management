import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  { text: "Manage tasks efficiently", color: "bg-blue-500" },
  { text: "Organize your day", color: "bg-green-500" },
  { text: "Achieve your goals", color: "bg-purple-500" },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Adjust timing as needed
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                className={`absolute inset-0 flex items-center justify-center ${slide.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-4xl sm:text-6xl text-white font-bold">
                  {slide.text}
                </h1>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSlider;
