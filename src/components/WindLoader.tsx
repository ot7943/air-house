import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

export function WindLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <Wind className="w-16 h-16 text-blue-600" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 100,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating ice particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full"
            initial={{
              x: -20,
              y: Math.random() * 40 - 20,
              opacity: 0
            }}
            animate={{
              x: 60,
              y: [
                Math.random() * 40 - 20,
                Math.random() * 40 - 20,
                Math.random() * 40 - 20
              ],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}