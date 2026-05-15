import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="home" className="relative h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1667068114508-0055f7fb25a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwaGFuZHMlMjByYWlzZWR8ZW58MXx8fHwxNzYyNzIwNjcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Church worship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0, 100, 0, 0.7), rgba(0, 77, 0, 0.6), rgba(0, 0, 0, 0.7))' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-white/90 text-2xl md:text-3xl mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to
          </motion.p>
          <motion.h1 
            className="text-white mb-6" 
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Encounter-Place Worldwide
          </motion.h1>
        </motion.div>
        <motion.p 
          className="text-white text-2xl mb-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Where Heaven Meets Earth
        </motion.p>
        <motion.p 
          className="text-white/90 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Experience the presence of God in a powerful way. Join a community where lives are transformed, faith is strengthened, and miracles happen.
        </motion.p>
      </div>
    </section>
  );
}
