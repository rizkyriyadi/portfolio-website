'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useAnimation } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'
import { useInView } from 'react-intersection-observer'

const skills = [
  { name: 'Node.js', category: 'Backend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'NestJS', category: 'Framework' },
  { name: 'Golang', category: 'Language' },
  { name: 'GraphQL', category: 'API' },
  { name: 'gRPC', category: 'API' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
]

const experiences = [
  {
    title: 'Software Engineer Intern',
    company: 'Telkomsel',
    location: 'South Jakarta',
    period: 'Feb 2024 — Jun 2024',
    highlights: [
      'Node.js Boilerplate Development',
      'Microservices Architecture with REST APIs, gRPC, and GraphQL',
      'NestJS Framework Implementation',
      'Test-Driven Development with Jest',
      'CI/CD Pipeline Configuration',
    ]
  }
]

const projects = [
  {
    id: '01',
    title: 'POINT CAFE',
    description: 'A comprehensive food ordering system with real-time tracking, payment integration, and administrative dashboard.',
    tech: ['Next.js', 'Firebase', 'TypeScript'],
    color: '#FF6B6B',
    image: '/api/placeholder/800/600'
  },
  {
    id: '02',
    title: 'HUTAN KERAMAT',
    description: 'An immersive web experience showcasing Indonesian forest conservation with interactive maps and 3D visualizations.',
    tech: ['React', 'Three.js', 'WebGL'],
    color: '#4ECDC4',
    image: '/api/placeholder/800/600'
  },
  {
    id: '03',
    title: 'ANALYTICS PLATFORM',
    description: 'A comprehensive data visualization platform with real-time analytics and interactive reporting features.',
    tech: ['Vue.js', 'D3.js', 'Node.js'],
    color: '#95E1D3',
    image: '/api/placeholder/800/600'
  }
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Enhanced cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50 })
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50 })
  
  // Cursor blob effect
  const blobX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const blobY = useSpring(mouseY, { stiffness: 50, damping: 30 })
  
  // Refs for enhanced animations
  const heroRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Enhanced Lenis configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false
    })
    
    lenisRef.current = lenis
    
    lenis.on('scroll', ({ progress }: any) => {
      setScrollProgress(progress)
    })
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    
    // Epic loading sequence
    const loadingTimeline = gsap.timeline()
    
    loadingTimeline
      .to({}, { duration: 0.5 })
      .call(() => setIsVisible(true))
      .to({}, { duration: 0.3 })
      .call(() => setIsLoaded(true))
      .to({}, { duration: 1.5 })
      .call(() => setIsInitialLoading(false))
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    // Enhanced scroll animations
    const setupScrollAnimations = () => {
      // Hero parallax
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      })
      
      // Text reveal animations
      gsap.utils.toArray('.reveal-text').forEach((text: any) => {
        const split = new SplitType(text, { types: 'lines,words' })
        
        gsap.from(split.words, {
          y: 100,
          opacity: 0,
          rotationX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
      })
      
      // Section reveals with scale
      gsap.utils.toArray('.section-reveal').forEach((section: any) => {
        gsap.fromTo(section, 
          { 
            scale: 0.8,
            opacity: 0,
            y: 100
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
      
      // Skills floating animation
      gsap.utils.toArray('.skill-item').forEach((skill: any, i) => {
        gsap.to(skill, {
          y: Math.sin(i * 0.5) * 10,
          x: Math.cos(i * 0.5) * 5,
          duration: 3 + (i * 0.2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Dynamic nav background
      if (navRef.current) {
        if (scrollY > 100) {
          navRef.current.classList.add('nav-scrolled')
        } else {
          navRef.current.classList.remove('nav-scrolled')
        }
      }
    }
    
    setTimeout(setupScrollAnimations, 100)
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mouseX, mouseY])

  const scrollToSection = (sectionId: string) => {
    lenisRef.current?.scrollTo(`#${sectionId}`, { offset: 0, duration: 1.5 })
  }

  // Loading percentage counter
  const [loadingProgress, setLoadingProgress] = useState(0)
  
  useEffect(() => {
    if (isInitialLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isInitialLoading])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] overflow-hidden">
      <style jsx global>{`
        .nav-scrolled {
          backdrop-filter: blur(20px);
          background: rgba(10, 10, 10, 0.8) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-cursor {
          mix-blend-mode: difference;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glow {
          filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.5));
        }
      `}</style>

      {/* Cinematic Loading */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
          >
            <div className="relative">
              {/* Loading number */}
              <motion.div className="text-center mb-8">
                <motion.span className="text-[10vw] font-black text-[#fafafa] font-mono">
                  {Math.min(Math.floor(loadingProgress), 100)}
                </motion.span>
                <motion.span className="text-[5vw] font-light text-[#666] ml-2">%</motion.span>
              </motion.div>
              
              {/* Loading bar */}
              <div className="w-[60vw] h-[2px] bg-[#222] relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Loading text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 text-[#666] font-mono text-xs uppercase tracking-[0.3em]"
              >
                Crafting Experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom Cursor with Blob */}
      <motion.div
        className="custom-cursor fixed pointer-events-none z-[200] w-4 h-4 bg-white rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      <motion.div
        className="fixed pointer-events-none z-[199] w-40 h-40 rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)'
        }}
      />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-white z-[90]"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ ease: 'linear' }}
      />
      
      {/* Navigation */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 left-0 right-0 z-40 px-8 py-6 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-black cursor-pointer"
            whileHover={{ scale: 1.1, rotate: -5 }}
            onClick={() => scrollToSection('home')}
          >
            RR
          </motion.div>
          
          <div className="flex gap-8">
            {['About', 'Work', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + (i * 0.1) }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Completely Reimagined */}
      <section id="home" className="min-h-screen flex items-center justify-center relative" ref={heroRef}>
        {/* Animated gradient background */}
        <div className="hero-bg absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #1a1a1a 0%, #0a0a0a 100%)',
                'radial-gradient(circle at 80% 50%, #1a1a1a 0%, #0a0a0a 100%)',
                'radial-gradient(circle at 20% 50%, #1a1a1a 0%, #0a0a0a 100%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[40vw] h-[40vw] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.0${i + 1}) 0%, transparent 70%)`,
                left: `${i * 30}%`,
                top: `${i * 20}%`
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          {/* Main title with liquid effect */}
          <motion.div className="relative">
            <motion.h1
              className="text-[20vw] font-black leading-[0.8] tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              {'RIZKY'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative gradient-text"
                  initial={{ y: 200, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 2.5 + (i * 0.1),
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.h1
              className="text-[20vw] font-black leading-[0.8] tracking-tighter -mt-[5vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              {'RIYADI'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  initial={{ y: 200, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 3 + (i * 0.1),
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    WebkitTextStroke: '2px #fff',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          
          {/* Subtitle with typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="mt-8 text-[#666] font-mono text-sm uppercase tracking-[0.3em]"
          >
            Creative Developer • Digital Craftsman
          </motion.p>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          onClick={() => scrollToSection('about')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Studio Quality */}
      <section id="about" className="py-32 relative overflow-hidden section-reveal">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-[15vw] font-black mb-20 leading-none opacity-10"
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: 'power4.out' }}
            viewport={{ once: true }}
          >
            ABOUT
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="text-4xl lg:text-5xl font-light leading-tight reveal-text">
                I craft digital experiences that bridge the gap between innovative design and robust functionality, 
                with a passion for creating solutions that make a difference.
              </p>
              
              {/* Floating skills */}
              <div className="mt-20 flex flex-wrap gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                    className="skill-item px-6 py-3 border border-white/20 rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div>
                  <p className="text-[#666] text-xs uppercase tracking-[0.3em] mb-2">Location</p>
                  <p className="text-2xl">Jakarta, Indonesia</p>
                </div>
                
                <div>
                  <p className="text-[#666] text-xs uppercase tracking-[0.3em] mb-2">Status</p>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xl">Available for work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience - Timeline Reimagined */}
      <section id="experience" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-[15vw] font-black mb-20 leading-none text-[#111]"
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: 'power4.out' }}
            viewport={{ once: true }}
          >
            EXPERIENCE
          </motion.h2>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'power4.out' }}
              viewport={{ once: true }}
              className="relative py-16 border-t border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <p className="font-mono text-[#666] text-sm">{exp.period}</p>
                </div>
                
                <div className="lg:col-span-9">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-4">{exp.title}</h3>
                  <p className="text-xl text-[#999] mb-8">{exp.company}, {exp.location}</p>
                  
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-[#666] mt-1">→</span>
                        <span className="text-[#ccc]">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects - Magazine Style */}
      <section id="work" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-[15vw] font-black mb-20 leading-none opacity-10"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: 'power4.out' }}
            viewport={{ once: true }}
          >
            WORK
          </motion.h2>
          
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'power4.out' }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Project number */}
                  <div className="lg:col-span-2">
                    <motion.p 
                      className="text-[10vw] lg:text-[8vw] font-black leading-none opacity-10"
                      animate={{ 
                        opacity: hoveredProject === project.id ? 0.3 : 0.1,
                        scale: hoveredProject === project.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.id}
                    </motion.p>
                  </div>
                  
                  {/* Project info */}
                  <div className="lg:col-span-6">
                    <motion.h3
                      className="text-5xl lg:text-7xl font-black mb-6 leading-none"
                      animate={{ 
                        x: hoveredProject === project.id ? 20 : 0,
                        color: hoveredProject === project.id ? project.color : '#ffffff'
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-xl text-[#999] mb-8 max-w-2xl"
                      animate={{ 
                        x: hoveredProject === project.id ? 20 : 0
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {project.description}
                    </motion.p>
                    
                    <motion.div
                      className="flex gap-3"
                      animate={{ 
                        x: hoveredProject === project.id ? 20 : 0
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs uppercase tracking-wider border border-white/20 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Project image */}
                  <div className="lg:col-span-4">
                    <motion.div
                      className="relative overflow-hidden rounded-lg aspect-[4/3]"
                      animate={{ 
                        scale: hoveredProject === project.id ? 0.95 : 1,
                        rotateY: hoveredProject === project.id ? -5 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222]" />
                      
                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 0.8 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ 
                            scale: hoveredProject === project.id ? 1 : 0,
                            rotate: hoveredProject === project.id ? 0 : -180
                          }}
                          transition={{ duration: 0.5, ease: 'backOut' }}
                          className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                        >
                          <ArrowUpRight className="w-8 h-8 text-black" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Minimal & Bold */}
      <section id="contact" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-[15vw] font-black mb-20 leading-none text-[#111]"
            initial={{ scale: 1.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'power4.out' }}
            viewport={{ once: true }}
          >
            CONTACT
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.h3
                className="text-6xl lg:text-7xl font-black mb-8 leading-none"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'power4.out' }}
                viewport={{ once: true }}
              >
                LET'S CREATE
                <br />
                <span className="gradient-text">SOMETHING</span>
                <br />
                AMAZING
              </motion.h3>
              
              <motion.p
                className="text-xl text-[#999] mb-12"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I'm always interested in new opportunities and exciting projects. 
                Let's bring your ideas to life.
              </motion.p>
              
              <motion.div
                className="space-y-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <a
                  href="mailto:rizkyriady16@gmail.com"
                  className="flex items-center gap-4 text-2xl hover:text-white/60 transition-colors group"
                >
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  rizkyriady16@gmail.com
                </a>
              </motion.div>
            </div>
            
            <div className="flex items-end justify-end">
              <motion.div
                className="space-y-4"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-[#666] text-xs uppercase tracking-[0.3em]">Find me on</p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[#666] text-sm">
            © 2024 Rizky Riyadi • Crafted with passion
          </p>
        </div>
      </footer>
    </div>
  )
} 