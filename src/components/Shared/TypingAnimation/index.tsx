import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  sx?: any;
  variant?: any;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 100,
  delay = 0,
  sx = {},
  variant = "body1"
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Split text into an array of characters, preserving emojis
  const textArray = Array.from(text);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < textArray.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + textArray[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, textArray, speed, isTyping]);

  return (
    <Box>
      <Typography variant={variant} sx={sx}>
        {displayText}
        <span style={{ animation: 'blink 1s infinite' }}>|</span>
      </Typography>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default TypingAnimation;
