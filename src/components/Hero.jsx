import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-semibold tracking-wide uppercase mb-3"
        >
          Hello, World! I am
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6"
        >
          Ankush Chaurasiya
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-8"
        >
          A passionate <span className="text-white">Full Stack MERN Developer</span> crafting scalable apps and leveraging AI to write smarter code.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a href="#projects" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg shadow-blue-500/30">
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}