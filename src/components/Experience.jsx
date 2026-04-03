import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section className="py-20 bg-slate-800/30 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Briefcase className="text-primary" /> Professional Experience
        </h2>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border-l-2 border-primary pl-6 ml-3 relative"
        >
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 shadow-[0_0_10px_#3b82f6]"></div>
          <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
          <h4 className="text-xl text-primary font-medium mb-2">Incubation Master, Bhopal</h4>
          <p className="text-sm text-gray-400 mb-4">April 2025 - April 2026</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Architected and developed scalable web applications utilizing the MERN stack.</li>
            <li>Integrated AI-driven features to automate frontend tasks and optimize database queries.</li>
            <li>Managed secure data flows and user authentication using MongoDB and Firebase.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}