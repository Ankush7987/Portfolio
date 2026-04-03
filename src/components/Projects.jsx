import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';

const projectsList = [
  {
    title: 'EduFill',
    desc: 'Comprehensive educational platform managing user records and course data.',
    tech: ['MERN Stack', 'Tailwind CSS'],
    link: 'https://edufills.com'
  },
  {
    title: 'Clif.Ai',
    desc: 'Modern web app utilizing AI APIs to automate multimedia content formatting.',
    tech: ['React', 'Node', 'Firebase', 'AI APIs'],
    link: 'https://clif.ai/'
  },
  {
    title: 'RentSathi',
    desc: 'Dedicated platform for student room bookings with real-time property listings.',
    tech: ['MERN Stack', 'Redux Toolkit']
  },
  {
    title: 'Ribosome Slot Booking',
    desc: 'Portal for Ribosome Institute to streamline the NEET form filling process.',
    tech: ['React.js', 'Express.js']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Code className="text-primary" /> Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projectsList.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-primary transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="bg-slate-900 px-3 py-1 rounded-full text-xs text-primary border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <ExternalLink size={16} /> Visit Website
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}