import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Icosahedron, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- CYBERPUNK MATRIX RAIN COMPONENT ---
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01ANKUSHREACTMERN0101XYZ</>{}[]'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none" />;
};

// --- 1. Custom Magnetic Cursor ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  
  useEffect(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    const handleMouseMove = (e) => gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button') || e.target.closest('.cursor-pointer') || e.target.closest('input') || e.target.closest('textarea')) {
        gsap.to(cursorRef.current, { scale: 2.5, backgroundColor: "rgba(96, 165, 250, 0.3)", duration: 0.3, ease: "power2.out" });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "rgba(59, 130, 246, 0.5)", duration: 0.3, ease: "power2.out" });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`@media (min-width: 768px) { body, *, *::before, *::after { cursor: none !important; } }`}</style>
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] backdrop-blur-sm border border-blue-400/50 hidden md:flex items-center justify-center" style={{ mixBlendMode: 'screen', backgroundColor: 'rgba(59, 130, 246, 0.5)' }}>
        <div ref={dotRef} className="w-1 h-1 bg-white rounded-full opacity-0"></div>
      </div>
    </>
  );
};

// --- 2. Live Animated Terminal ---
const LiveTerminal = () => {
  const [text, setText] = useState('');
  const fullText = `> ankush --info\n> Loading profile...\n> Role: Full Stack MERN Engineer\n> \n> ankush --skills\n> Fetching arsenal...\n> [React.js, Node.js, MongoDB, Express, AI APIs, Firebase]\n> \n> Status: Ready to build scalable systems.`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="bg-[#0a0f1a] p-6 rounded-2xl border border-slate-800 shadow-2xl font-mono text-sm md:text-base text-green-400 text-left overflow-hidden relative group pointer-events-auto h-[320px] md:h-[280px] w-full">
      <div className="absolute top-0 left-0 w-full h-8 bg-[#1e293b] flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-slate-400 text-xs ml-2 font-sans">ankush@macbook-pro ~ bash</span>
      </div>
      <div className="mt-8 whitespace-pre-line leading-relaxed">{text}<span className="animate-pulse">_</span></div>
    </div>
  );
};

// --- 3. Number Counter Animation ---
const Counter = ({ end, suffix = "", label }) => {
  const countRef = useRef(null);

  useEffect(() => {
    if (!countRef.current) return;
    let ctx = gsap.context(() => {
      gsap.fromTo(countRef.current, 
        { innerHTML: 0 }, 
        { innerHTML: end, duration: 2.5, ease: "power2.out", scrollTrigger: { trigger: countRef.current, start: "top 85%" }, snap: { innerHTML: 1 }, onUpdate: function() { if (countRef.current) countRef.current.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix; } }
      );
    });
    return () => ctx.revert();
  }, [end, suffix]);

  return (
    <div className="text-center p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-blue-500/30 transition-colors">
      <div ref={countRef} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">0</div>
      <div className="text-slate-400 font-medium uppercase tracking-widest text-xs md:text-sm">{label}</div>
    </div>
  );
};

// --- 4. 3D Background Objects ---
const PremiumShape = () => {
  const scrollGroupRef = useRef(); 
  const mouseGroupRef = useRef();  
  const innerRef = useRef();
  const outerRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (innerRef.current && outerRef.current) {
      innerRef.current.rotation.y = time * 0.15;
      innerRef.current.rotation.x = time * 0.2;
      outerRef.current.rotation.y = -time * 0.1;
    }
    if (mouseGroupRef.current) {
      const targetX = (state.mouse.x * viewport.width) / 10; 
      const targetY = (state.mouse.y * viewport.height) / 10;
      mouseGroupRef.current.position.x = THREE.MathUtils.lerp(mouseGroupRef.current.position.x, targetX, 0.05);
      mouseGroupRef.current.position.y = THREE.MathUtils.lerp(mouseGroupRef.current.position.y, targetY, 0.05);
      mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, state.mouse.y * 0.8, 0.05);
      mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, state.mouse.x * 0.8, 0.05);
    }
  });

  useEffect(() => {
    if (!scrollGroupRef.current) return;
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: "#main-wrapper", start: "top top", end: "bottom bottom", scrub: 1 } });
      tl.to(scrollGroupRef.current.position, { x: -3.5, y: -0.5, z: 1 }, 0); 
      tl.to(scrollGroupRef.current.position, { x: 3.5, y: -1, z: 0 }, 0.25); 
      tl.to(scrollGroupRef.current.position, { x: -2, y: 0.5, z: 1.5 }, 0.50); 
      tl.to(scrollGroupRef.current.position, { x: 0, y: 1.5, z: 2 }, 0.75); 
      tl.to(scrollGroupRef.current.position, { x: 3.5, y: 0, z: -1 }, 0.9); 
      tl.to(scrollGroupRef.current.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0.9);
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={scrollGroupRef} position={[3, 0, 0]}>
      <group ref={mouseGroupRef}> 
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <Icosahedron ref={innerRef} args={[1.2, 0]}><meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} envMapIntensity={2} /></Icosahedron>
          <Icosahedron ref={outerRef} args={[1.5, 1]}><meshBasicMaterial color="#3b82f6" wireframe={true} transparent={true} opacity={0.3} /></Icosahedron>
        </Float>
      </group>
    </group>
  );
};

const PremiumParticles = () => {
  const starsRef = useRef();
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = THREE.MathUtils.lerp(starsRef.current.rotation.x, state.mouse.y * 0.1, 0.05);
      starsRef.current.rotation.y = THREE.MathUtils.lerp(starsRef.current.rotation.y, state.mouse.x * 0.1, 0.05);
    }
  });
  return <group ref={starsRef}><Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} /></group>;
};

// --- 5. 3D Tilt Card ---
const TiltCard = ({ children, className, onClick }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 15; 
    const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -15; 
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d'
      }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="h-full flex flex-col justify-between relative z-20">
        {children}
      </div>
    </div>
  );
};

// --- 6. Main App Component ---
export default function App() {
  const mainRef = useRef();
  const [modalData, setModalData] = useState(null);
  const [contactForm, setContactForm] = useState(null);
  const [formState, setFormState] = useState('idle');
  const [isCyberpunk, setIsCyberpunk] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-text, .animate-timeline-item').forEach((section) => {
        gsap.from(section, { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" } });
      });
    }, mainRef);
    return () => ctx.revert(); 
  }, [isCyberpunk]); // Re-run when theme changes

  const projects = [
    { title: 'EduFill', desc: 'Comprehensive educational platform managing user records and course data.', tech: ['React', 'Node.js', 'MongoDB', 'firebase'], link: 'https://edufills.com', details: 'Designed and engineered a scalable educational platform handling complex user records, course enrollments, and status tracking using a robust Node.js backend and optimized MongoDB aggregations.' },
    { title: 'Clif.Ai', desc: 'Complete placement preparation platform with AI mock interviews, English practice, and ATS resume scoring.', tech: ['MERN', 'AI APIs'], link: 'https://clif.ai/', details: 'Built a comprehensive EdTech platform aimed at college students. Integrated conversational AI to conduct realistic mock interviews and assess English proficiency. Developed an ATS resume checker algorithm to provide instant feedback and scores.' },
    { title: 'RentSathi', desc: 'Student room booking platform handling real-time property listings.', tech: ['MongoDB', 'Tailwind', 'React', 'Node.js', 'Express'], details: 'A dedicated housing solution for students featuring real-time property listings, advanced filtering (price, location), and an inquiry management system to connect landlords directly with students.' },
    { title: 'Ribosome Slot Booking', desc: 'Portal for Ribosome Institute to streamline the NEET form filling process.', tech: ['React', 'Firebase'], link: 'https://ribosome-slot-bokking.vercel.app/index.html#/', details: 'Digitized the offline queue system for a prominent institute. Built a high-concurrency slot booking architecture ensuring zero double-bookings during peak NEET form submission periods.' },
    { title: 'Indore Library Mgmt', desc: 'Centralized system scaling across three different library locations.', tech: ['React', 'MongoDB', 'Node.js'], details: 'Developed a unified dashboard managing inventory, user memberships, and issue/return logs across 3 physical library branches. Implemented Role-Based Access Control for admins and staff.' }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    const formData = new FormData(e.target);
    formData.append("access_key", "28ae314a-c731-4319-be44-60173af40954"); 
    formData.append("subject", "New Project Inquiry from Ankush's Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setFormState('success');
        setTimeout(() => { setFormState('idle'); setContactForm(null); }, 3000);
      } else {
        setFormState('idle'); alert("Something went wrong! Please check console.");
      }
    } catch (error) {
      setFormState('idle'); alert("Network error, please try again.");
    }
  };

  return (
    <div id="main-wrapper" ref={mainRef} className={`relative ${isCyberpunk ? 'cyberpunk-mode' : 'bg-[#030712]'} text-slate-200 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden md:cursor-none transition-colors duration-700`}>
      
      {/* --- GLOBAL CSS FOR ORBIT & CYBERPUNK --- */}
      <style>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
        .orbit-container { animation: spin-slow 20s linear infinite; }
        .orbit-item { animation: spin-slow-reverse 20s linear infinite; }

        ${isCyberpunk ? `
          .cyberpunk-mode { background-color: #050505 !important; color: #0f0 !important; font-family: 'Courier New', Courier, monospace !important; }
          .cyberpunk-mode h1, .cyberpunk-mode h2, .cyberpunk-mode h3, .cyberpunk-mode p, .cyberpunk-mode span, .cyberpunk-mode a { color: #0f0 !important; text-shadow: 0 0 5px rgba(0,255,0,0.4); }
          .cyberpunk-mode .bg-blue-600, .cyberpunk-mode .bg-cyan-600, .cyberpunk-mode .bg-white { background-color: #0f0 !important; color: #000 !important; box-shadow: 0 0 20px #0f0 !important; border: none !important; }
          .cyberpunk-mode .border-blue-500, .cyberpunk-mode .border-slate-800, .cyberpunk-mode .border-cyan-500 { border-color: #0f0 !important; box-shadow: inset 0 0 10px rgba(0,255,0,0.1); }
          .cyberpunk-mode .bg-\\[\\#0f172a\\]\\/40, .cyberpunk-mode .bg-slate-900\\/50 { background-color: rgba(0, 20, 0, 0.8) !important; border: 1px solid #0f0 !important; }
          .cyberpunk-mode .text-transparent { background: none !important; -webkit-text-fill-color: #0f0 !important; }
        ` : ''}
      `}</style>

      <CustomCursor />

      {/* Cyberpunk Toggle Button */}
      <button 
        onClick={() => setIsCyberpunk(!isCyberpunk)} 
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-slate-900 border border-slate-700 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all cursor-pointer pointer-events-auto"
        title={isCyberpunk ? "Back to Reality" : "Enter the Matrix"}
      >
        {isCyberpunk ? '💊' : '🕶️'}
      </button>

      {/* Background (3D or Matrix) */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        {isCyberpunk ? (
          <MatrixRain />
        ) : (
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
            <PremiumShape />
            <PremiumParticles />
            <Environment preset="city" />
          </Canvas>
        )}
      </div>

      <div className="relative z-10 w-full">
        
        {/* HERO SECTION WITH ORBIT */}
        <section className="hero-section min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pt-20 pb-10">
          <div className="animate-text max-w-6xl flex flex-col md:flex-row items-center md:items-start gap-16 text-center md:text-left mt-10 md:mt-20">
            
            {/* HERO IMAGE + SKILLS ORBIT */}
            <div className="relative w-56 h-56 md:w-80 md:h-80 flex-shrink-0 group md:mt-2 pointer-events-auto">
              {/* ORBIT RING */}
              <div className="absolute inset-[-40px] border border-dashed border-slate-600/30 rounded-full orbit-container pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-4 py-1 rounded-full border border-cyan-500/50 text-cyan-400 text-xs font-bold orbit-item shadow-[0_0_15px_rgba(34,211,238,0.2)]">React.js</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0f172a] px-4 py-1 rounded-full border border-green-500/50 text-green-400 text-xs font-bold orbit-item shadow-[0_0_15px_rgba(74,222,128,0.2)]">Node.js</div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-4 py-1 rounded-full border border-yellow-500/50 text-yellow-400 text-xs font-bold orbit-item shadow-[0_0_15px_rgba(250,204,21,0.2)]">Firebase</div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-4 py-1 rounded-full border border-purple-500/50 text-purple-400 text-xs font-bold orbit-item shadow-[0_0_15px_rgba(192,132,252,0.2)]">AI APIs</div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full animate-pulse blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              <img src="/profile.jpeg" alt="Ankush" className="relative w-full h-full object-cover rounded-full border-[6px] border-[#0f172a] shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10" />
            </div>

            <div className="flex-1 mt-8 md:mt-0">
              <p className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Full Stack Engineer</p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.1] text-white tracking-tight">Ankush<br/>Chaurasiya.</h1>
              <p className="text-xl text-slate-400 mb-8 max-w-xl font-light leading-relaxed">
                Building scalable MERN applications, architecting robust databases, and leveraging AI to craft <strong className="text-white font-medium">next-generation digital experiences</strong>.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-10">
                <a href="#projects" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative z-50 pointer-events-auto cursor-pointer">Explore Work</a>
                <a href="/resume.pdf" download="Ankush_Chaurasiya_Resume.pdf" className="border border-slate-700 hover:border-blue-500 bg-slate-900/50 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 backdrop-blur-md relative z-50 pointer-events-auto flex items-center gap-2 cursor-pointer">
                  Download CV <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </a>
              </div>
              <div className="w-full max-w-lg mx-auto md:mx-0 relative z-50">
                <LiveTerminal />
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="experience-section min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto items-end text-right">
          <div className="animate-text max-w-3xl w-full">
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight text-white">Professional<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Experience.</span></h2>
            <TiltCard className="bg-[#0f172a]/40 backdrop-blur-2xl p-10 rounded-3xl border border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-blue-500/50 transition-colors duration-500 text-left w-full group pointer-events-auto">
              <div className="flex justify-between items-start mb-6 flex-col md:flex-row gap-4 relative z-20">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Full Stack Developer</h3>
                  <p className="text-blue-400 text-lg font-medium">Incubation Master, Bhopal</p>
                </div>
                <span className="px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/20">April 2025 - Present</span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed font-light relative z-20">
                Architecting scalable MERN applications, integrating AI-driven features to automate tasks, and optimizing complex database queries using MongoDB & Firebase to significantly accelerate development workflows.
              </p>
            </TiltCard>
          </div>
        </section>

        {/* GITHUB GRAPH SECTION */}
        <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto relative z-20 pointer-events-auto">
          <div className="animate-text mb-12 text-center md:text-left">
            <p className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span> Open Source
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Contributions.</span></h2>
          </div>
          <div className="bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-x-auto animate-text group">
            <div className="min-w-[800px] flex justify-center">
              <img 
                src={`https://ghchart.rshah.org/${isCyberpunk ? '00ff00' : '3b82f6'}/Ankush7987`} 
                alt="Ankush's Github Chart" 
                className="w-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </section>

        {/* FOUNDER'S VISION */}
        <section className="impact-section min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 max-w-7xl mx-auto relative z-20 pointer-events-auto">
          <div className="animate-text mb-16 text-center md:text-left">
            <p className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span> Vision & Impact
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">Solving <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Real-World</span> Problems.</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center animate-text">
            <TiltCard className="md:col-span-5 bg-gradient-to-br from-[#0f172a]/80 to-[#030712]/90 backdrop-blur-2xl p-10 rounded-3xl border border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] h-full pointer-events-auto">
              <div className="relative z-20">
                <h3 className="text-3xl font-bold text-white mb-4">Digitizing the Cyber Cafe Ecosystem</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
                  Millions of students waste hours in long cyber cafe queues for basic form submissions and slot bookings. I am actively building platforms to bring these services directly to their smartphones, saving time and eliminating manual errors.
                </p>
                <div className="inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-semibold tracking-wide text-sm">Role: Architect & Developer</div>
              </div>
            </TiltCard>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-6 h-full">
              <TiltCard className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 hover:border-red-500/30 transition-colors pointer-events-auto">
                <div className="relative z-20">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6"><span className="text-red-400 text-2xl">✗</span></div>
                  <h4 className="text-xl font-bold text-white mb-3">The Problem</h4>
                  <ul className="text-slate-400 font-light space-y-2 text-sm">
                    <li>• Exhausting physical queues.</li>
                    <li>• Manual, error-prone paperwork.</li>
                    <li>• Dependency on shop timings.</li>
                  </ul>
                </div>
              </TiltCard>
              <TiltCard className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 hover:border-emerald-500/30 transition-colors pointer-events-auto">
                <div className="relative z-20">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6"><span className="text-emerald-400 text-2xl">✓</span></div>
                  <h4 className="text-xl font-bold text-white mb-3">The Solution</h4>
                  <ul className="text-slate-400 font-light space-y-2 text-sm">
                    <li>• Instant access from smartphones.</li>
                    <li>• Automated validation & 0 wait times.</li>
                    <li>• Secure 24/7 digital slot bookings.</li>
                  </ul>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* IMPACT METRICS SECTION */}
        <section className="py-10 px-6 md:px-20 max-w-7xl mx-auto relative z-20 pointer-events-auto animate-text">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Counter end={1000} suffix="+" label="Student Hours Saved" />
            <Counter end={5} suffix="+" label="Enterprise Projects" />
            <Counter end={3} suffix="" label="Digital Libraries Set Up" />
          </div>
        </section>

        {/* AI-ASSISTED MASTERY */}
        <section className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-20 max-w-7xl mx-auto relative z-20 pointer-events-auto">
          <div className="animate-text mb-16 text-center md:text-left">
            <p className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span> Unfair Advantage
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">AI-Assisted <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Engineering.</span></h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
              I don't just write code; I orchestrate AI to build complex, scalable systems 10x faster. Mastery in prompt engineering and AI integration is my core strength.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-20 perspective-1000 animate-text">
            <TiltCard className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/50 transition-colors h-full group pointer-events-auto">
               <div className="relative z-20">
                 <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                <h3 className="text-2xl font-bold text-white mb-4">Rapid Prototyping</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">Transforming raw ideas into functional MERN stack applications in record time by leveraging AI for boilerplate, logic generation, and UI scaffolding.</p>
               </div>
            </TiltCard>
            <TiltCard className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/20 hover:border-pink-500/50 transition-colors h-full group pointer-events-auto">
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI API Integration</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">Seamlessly embedding intelligent features like Mock Interviews, ATS Scoring, and automated content generation using OpenAI, Gemini, and custom LLMs.</p>
              </div>
            </TiltCard>
            <TiltCard className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 transition-colors h-full group pointer-events-auto">
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  </div>
                <h3 className="text-2xl font-bold text-white mb-4">Advanced Prompting</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">Writing highly structured, context-rich prompts to generate complex database aggregations, debug elusive errors, and refactor legacy code instantly.</p>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* TIMELINE PROJECTS SECTION */}
        <section id="projects" className="projects-section min-h-screen py-20 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="animate-text mb-20 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Works.</span></h2>
            <p className="text-slate-400 mt-4 font-light">Interactive Timeline - Click on any project to view details.</p>
          </div>
          
          <div className="relative max-w-5xl mx-auto before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-blue-500/20 before:via-cyan-500/20 before:to-transparent z-20 pointer-events-auto">
            {projects.map((proj, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group mb-16 animate-timeline-item w-full">
                
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#030712] bg-slate-800 group-hover:bg-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500 z-30">
                  <div className="w-3 h-3 bg-slate-400 group-hover:bg-white rounded-full transition-colors"></div>
                </div>

                <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 cursor-pointer" onClick={() => setModalData(proj)}>
                  <TiltCard className="bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 group-hover:border-blue-500/50 transition-colors h-full w-full pointer-events-auto shadow-2xl">
                    <div className="relative z-20 pointer-events-none">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                      <p className="text-slate-400 mb-8 font-light leading-relaxed text-sm md:text-base">{proj.desc}</p>
                    </div>
                    <div className="relative z-20 flex flex-wrap gap-2 pointer-events-none">
                      {proj.tech.slice(0,4).map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-[#1e293b]/80 text-slate-300 border border-slate-700/50 rounded-md text-xs font-medium uppercase">{t}</span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLLABORATE SECTION */}
        <section id="collaborate" className="min-h-[80vh] flex flex-col justify-center py-20 px-6 md:px-20 max-w-7xl mx-auto relative">
          <div className="animate-text text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">together.</span></h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">Whether you're looking for a dedicated full-time engineer or need a custom high-end web application built from scratch.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full relative z-20 animate-text">
            
            <div className="pointer-events-auto">
                <TiltCard className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-blue-500/20 text-center group h-full">
                <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10 rounded-[2.5rem]"></div>
                <div className="relative z-20 flex flex-col items-center justify-center h-full">
                    <h3 className="text-3xl font-bold text-white mb-4">Hire Me Full-Time</h3>
                    <p className="text-slate-400 mb-10 font-light leading-relaxed">Add a passionate MERN stack developer to your team. Proven experience in architecting robust, scalable, and secure applications.</p>
                    <button onClick={() => setContactForm('hire')} className="inline-block bg-white text-slate-950 px-10 py-4 rounded-full font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow cursor-pointer relative z-50">
                    Contact Details
                    </button>
                </div>
                </TiltCard>
            </div>

            <div className="pointer-events-auto">
                <TiltCard className="bg-gradient-to-bl from-cyan-900/20 to-slate-900/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-cyan-500/20 text-center group h-full">
                <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10 rounded-[2.5rem]"></div>
                <div className="relative z-20 flex flex-col items-center justify-center h-full">
                    <h3 className="text-3xl font-bold text-white mb-4">Start a Project</h3>
                    <p className="text-slate-400 mb-10 font-light leading-relaxed">Need a bespoke web application, a dynamic 3D portfolio, or an AI-integrated SaaS dashboard? Let's turn your vision into reality.</p>
                    <button onClick={() => setContactForm('project')} className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow cursor-pointer relative z-50">
                    Discuss Project
                    </button>
                </div>
                </TiltCard>
            </div>
            
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-50 py-12 px-6 border-t border-slate-800/50 bg-[#030712]/80 backdrop-blur-md pointer-events-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Ankush.</h2>
              <p className="text-slate-500 text-sm font-light">Crafting digital experiences with MERN & AI.</p>
            </div>
            
            <div className="flex gap-6 relative z-50 pointer-events-auto">
              <a href="https://github.com/Ankush7987" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-300 cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/ankush-chaurasiya-9a46bb1a1" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors hover:scale-110 transform duration-300 cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:officialankush84ya@gmail.com?subject=Hello%20Ankush!" className="text-slate-400 hover:text-red-400 transition-colors hover:scale-110 transform duration-300 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
            </div>
            
            <div className="text-slate-500 text-sm font-light">
              &copy; {new Date().getFullYear()} Ankush Chaurasiya. All rights reserved.
            </div>
          </div>
        </footer>

      </div>

      {/* --- CASE STUDY MODAL --- */}
      {modalData && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0f172a] border border-slate-700 p-8 md:p-12 rounded-3xl max-w-2xl w-full shadow-2xl relative">
            <button onClick={() => setModalData(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white text-3xl cursor-pointer">&times;</button>
            <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-2">Case Study</p>
            <h3 className="text-4xl font-black text-white mb-6">{modalData.title}</h3>
            <div className="flex gap-2 mb-8 flex-wrap">
              {modalData.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-800/50 rounded-md text-xs font-bold uppercase">{t}</span>
              ))}
            </div>
            <h4 className="text-xl font-bold text-white mb-2">The Architecture</h4>
            <p className="text-slate-300 leading-relaxed font-light mb-8">{modalData.details}</p>
            
            <div className="flex gap-4">
              {modalData.link ? (
                <a href={modalData.link} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer">
                  Visit Live Project
                </a>
              ) : (
                <button disabled className="bg-slate-800 text-slate-400 cursor-not-allowed px-6 py-3 rounded-full font-bold border border-slate-700 flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Under Development
                </button>
              )}
              <button onClick={() => setModalData(null)} className="border border-slate-600 text-slate-300 hover:bg-slate-800 px-6 py-3 rounded-full font-bold transition-colors cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- INTERACTIVE CONTACT FORM MODAL --- */}
      {contactForm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0f172a] border border-slate-700 p-8 md:p-12 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden">
            <button onClick={() => { setContactForm(null); setFormState('idle'); }} className="absolute top-6 right-6 text-slate-400 hover:text-white text-3xl cursor-pointer z-20">&times;</button>
            
            {contactForm === 'hire' ? (
              <div className="relative z-20 text-center">
                <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-2">Let's Connect</p>
                <h3 className="text-4xl font-black text-white mb-8">Hire Me Full-Time</h3>
                
                <div className="space-y-4">
                  <a href="mailto:officialankush84ya@gmail.com?subject=Full-Time%20Opportunity" className="flex items-center justify-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-900/20 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="text-left">
                      <p className="text-slate-400 text-sm">Email Me At</p>
                      <p className="text-white font-bold text-lg md:text-xl">officialankush84ya@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+919752519051" className="flex items-center justify-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-900/20 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div className="text-left">
                      <p className="text-slate-400 text-sm">Call / WhatsApp</p>
                      <p className="text-white font-bold text-lg md:text-xl">+91 9752519051</p>
                    </div>
                  </a>
                </div>
              </div>
            ) : formState === 'success' ? (
              <div className="text-center py-10 relative z-20">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="relative z-20">
                <p className="text-cyan-500 text-sm font-bold uppercase tracking-widest mb-2">Let's Discuss</p>
                <h3 className="text-4xl font-black text-white mb-8">Start a Project</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                    <input type="text" name="name" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-text" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-text" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Project Idea / Summary</label>
                    <textarea name="message" required rows="4" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none cursor-text" placeholder="Tell me about what we are building..."></textarea>
                  </div>
                  
                  <button type="submit" disabled={formState === 'submitting'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-70 disabled:cursor-not-allowed">
                    {formState === 'submitting' ? (
                      <><svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</>
                    ) : (
                      'Send Request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}