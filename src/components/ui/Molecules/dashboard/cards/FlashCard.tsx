import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface IFlashCardProps {
  question: string;
  answer: string;
}

const Flashcard = ({ question, answer }: IFlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div className="relative w-80 h-48" onClick={handleFlip}>
      <AnimatePresence initial={false} mode="popLayout">
        {isFlipped ? (
          <motion.div
            key="answer"
            className="absolute inset-0 flex items-center justify-center bg-app-green rounded-lg shadow-lg p-4 cursor-pointer"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-lg font-caladea "
            >
              {answer}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            className="absolute inset-0 flex items-center justify-center bg-card-background rounded-lg shadow-lg p-4 cursor-pointer"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-lg text-white font-caladea "
            >
              {question}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Flashcard;
