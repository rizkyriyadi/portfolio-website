'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useAnimation } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'
import { useInView } from 'react-intersection-observer'
import { Skill, Experience, Project, PORTFOLIO_CONSTANTS } from '../types'

const skills: Skill[] = [
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
  { name: 'TailwindCSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Zustand', category: 'State Management' },
]

const experiences: Experience[] = [
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

const projects: Project[] = [
  {
    title: 'Spotify Global Map',
    description: 'An interactive web application that displays a world map where users can click on countries to explore their Spotify Top 50 charts. Features mood-based filtering, track previews, and enhanced animations with floating musical notes.',
    tech: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Zustand', 'Spotify Web API'],
    liveUrl: 'https://spotify-global-map.vercel.app/',
    githubUrl: 'https://github.com/rizkyriyadi/spotify-global-map',
    featured: true
  },
  {
    title: '3Point Cafe & Resto',
    description: 'A comprehensive online ordering system for 3Point Cafe & Resto, featuring seamless customer experience with menu browsing, order customization, secure payments, user authentication, voucher system, and membership benefits.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Xendit Payment', 'Authentication', 'Order Tracking'],
    liveUrl: 'https://point-cafe-website-order.vercel.app/',
    githubUrl: '',
    featured: true,
    images: [
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app.svg',
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (1).svg',
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (2).svg',
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (3).svg',
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (4).svg',
      '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (5).svg'
    ]
  }
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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
  
  // Magnetic cursor offsets
  const magneticX = useMotionValue(0)
  const magneticY = useMotionValue(0)
  const magneticSpringX = useSpring(magneticX, { stiffness: 300, damping: 30 })
  const magneticSpringY = useSpring(magneticY, { stiffness: 300, damping: 30 })
  
  // Background animation
  const bgAnimation = useAnimation()

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
    
    // Enhanced mouse tracking with magnetic effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('[data-magnetic]')
      let foundMagnetic = false
      
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )
        
        if (distance < 100) {
          foundMagnetic = true
          const strength = Math.max(0, 1 - distance / 100)
          const offsetX = (e.clientX - centerX) * strength * 0.3
          const offsetY = (e.clientY - centerY) * strength * 0.3
          
          magneticX.set(offsetX)
          magneticY.set(offsetY)
          setCursorVariant('magnetic')
        }
      })
      
      if (!foundMagnetic) {
        magneticX.set(0)
        magneticY.set(0)
        setCursorVariant('default')
      }
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
      const sections = ['home', 'about', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
      
      // Dynamic nav background
      if (navRef.current) {
        if (scrollPosition > 100) {
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

  const heroText = "RIZKY RIYADI"
  
  // Enhanced letter animation with cinematic spring physics
  const letterVariants = {
    hidden: { 
      y: 120, 
      opacity: 0, 
      rotateX: -90,
      scale: 0.8
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: 0.5 + (i * 0.08), // Staggered entrance with initial delay
        duration: 1.2,
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8
      }
    }),
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }
  
  // Enhanced tagline and CTA animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5 + delay,
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] overflow-hidden">
      <style>{`
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: #222;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }
        
        .custom-cursor.hover {
          transform: scale(2);
        }
        
        .custom-cursor.text {
          transform: scale(3);
          background: transparent;
          border: 2px solid #222;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating:nth-child(odd) {
          animation-delay: -2s;
        }
        
        .floating:nth-child(even) {
          animation-delay: -4s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(2deg);
          }
          66% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #fff, #ccc, #fff);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .glow {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .hero-bg {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
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
      {/* Enhanced Magnetic Cursor */}
      <motion.div
        className={`fixed pointer-events-none z-50 rounded-full transition-all duration-200 ${
          cursorVariant === 'default' ? 'w-2 h-2 bg-[#333]' :
          cursorVariant === 'hover' ? 'w-8 h-8 bg-[#333]/10 border border-[#333]' :
          'w-3 h-3 bg-[#333]'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.2 : 1,
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
      />



      {/* Hero Section with Enhanced Background Animation */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" ref={heroRef}>
        {/* Liquid-like background transition */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(34, 34, 34, 0.3) 0%, rgba(231, 227, 212, 1) 100%)',
              'radial-gradient(circle at 80% 50%, rgba(34, 34, 34, 0.3) 0%, rgba(231, 227, 212, 1) 100%)',
              'radial-gradient(circle at 20% 50%, rgba(34, 34, 34, 0.3) 0%, rgba(231, 227, 212, 1) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-[#222]/10 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          {/* Main hero text with breathing animation */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <motion.h1
              className="text-[20vw] font-black leading-[0.8] tracking-tighter text-[#222] font-[family-name:var(--font-nura)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              {heroText.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  initial={{ y: 200, opacity: 0, rotateX: -90 }}
                  animate={{ 
                    y: isVisible ? 0 : 200, 
                    opacity: isVisible ? 1 : 0, 
                    rotateX: isVisible ? 0 : -90 
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2.5 + (i * 0.05),
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    color: '#666',
                    transition: { duration: 0.2 }
                  }}
                  onMouseEnter={() => setCursorVariant('text')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ delay: 4, duration: 1 }}
            className="mt-8 text-[#666] font-mono text-sm uppercase tracking-[0.3em]"
          >
            Creative Developer • Digital Craftsman
          </motion.p>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 4.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          onClick={() => scrollToSection('about')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#222]/30 rounded-full flex justify-center cursor-pointer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#222] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Redesigned */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-[#f0ece0]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          {/* Main Title with Split Animation */}
          <motion.div className="mb-20">
            <motion.h2
              className="text-8xl md:text-[12rem] font-black text-[#222] leading-none mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              {'CREATIVE'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -20, 
                    color: "#ff6b6b",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.h3
              className="text-4xl md:text-6xl font-light text-[#666] tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              DEVELOPER
            </motion.h3>
          </motion.div>
          
          {/* Description with Reveal Effect */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-2xl md:text-3xl leading-relaxed text-[#444] font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {"I craft digital experiences that blend beautiful design with powerful functionality. Passionate about clean code, innovative solutions, and turning ideas into reality.".split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.4 + (index * 0.08),
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    color: "#222",
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          {/* Skills Grid - Minimalist */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            viewport={{ once: true }}
          >
            {skills.slice(0, 8).map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.2 + (index * 0.1),
                  type: "spring",
                  stiffness: 150
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-[#ddd] p-6 text-center transition-all duration-300 group-hover:bg-white/20 group-hover:border-[#222] group-hover:shadow-2xl">
                  <h4 className="text-lg font-mono text-[#222] group-hover:text-[#ff6b6b] transition-colors duration-300">
                    {skill.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Floating Elements for Visual Interest */}
            <div className="absolute inset-0 pointer-events-none">
              {[10, 25, 40, 60, 75, 90].map((leftPos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#ff6b6b] rounded-full opacity-20"
                  style={{
                    left: `${leftPos}%`,
                    top: `${20 + (i * 15)}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 4 + (i * 0.5),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
        </div>
      </section>

      {/* Experience Section - Enhanced */}
      <section id="experience" className="py-32 bg-[#e7e3d4]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-[8vw] md:text-[6vw] lg:text-[4vw] font-black mb-20 tracking-tighter leading-none text-[#222] font-mono"
          >
            EXPERIENCE
          </motion.h2>
          
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-white/60 backdrop-blur-md p-10 border border-[#ddd] hover:border-[#222] transition-all duration-500 hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <motion.h3
                      className="text-3xl font-black text-[#222] mb-2 md:mb-0"
                      initial={{ opacity: 0, x: -50, rotateY: -15 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.3 + 0.2,
                        type: "spring",
                        stiffness: 150
                      }}
                      viewport={{ once: true }}
                    >
                      {exp.title}
                    </motion.h3>
                    
                    <motion.div
                      className="text-sm text-[#888] font-mono bg-[#f5f5f5] px-3 py-1 rounded-full"
                      initial={{ opacity: 0, x: 50, scale: 0.8 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.3 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {exp.period}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="text-xl text-[#666] mb-6 font-medium"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.3 + 0.6,
                      type: "spring",
                      stiffness: 120
                    }}
                    viewport={{ once: true }}
                  >
                    {exp.company}, {exp.location}
                  </motion.div>
                  
                  <motion.ul
                    className="space-y-3 text-[#555]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.8 }}
                    viewport={{ once: true }}
                  >
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -30, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.3 + 1.0 + (i * 0.15),
                          type: "spring",
                          stiffness: 150
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                          x: 10,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-[#222] rounded-full mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        {highlight}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Magazine Style */}
      <section id="projects" className="py-32 bg-[#e7e3d4]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-[8vw] md:text-[6vw] lg:text-[4vw] font-black mb-20 tracking-tighter leading-none text-[#222] font-mono"
          >
            PROJECTS
          </motion.h2>
          
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image/Visual */}
                <motion.div
                  className={`relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title === 'Spotify Global Map' ? (
                    <img 
                      src="/spotify-global-map.svg" 
                      alt="Spotify Global Map Screenshot"
                      className="w-full h-full object-cover"
                    />
                  ) : project.title === '3Point Cafe & Resto' && project.images ? (
                    <div className="w-full h-full relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                      {/* Single Image Display */}
                      <div className="w-full h-full p-6 flex items-center justify-center">
                        <motion.div
                          className="relative z-20 bg-gray-900 rounded-lg shadow-xl overflow-hidden max-w-sm w-full"
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img 
                            src="/pointCafeWebsiteOrder/showcase_png.png"
                            alt="3Point Cafe Main Screenshot"
                            className="w-full h-64 object-contain"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Image Counter Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono">
                        6 Screenshots
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/80">{project.title}</span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wider cursor-pointer bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        data-magnetic="true"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wider cursor-pointer bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        data-magnetic="true"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        GitHub
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.title === '3Point Cafe & Resto' && (
                      <motion.a
                        href="/project/3pointcafe"
                        className="flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wider cursor-pointer bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        data-magnetic="true"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
                
                {/* Project Details */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <motion.h3
                        className="text-4xl font-black mb-4 text-[#222]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-lg text-[#666] leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {project.description}
                      </motion.p>
                    </div>
                    
                    <motion.div
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {project.tech.map((tech: string, i: number) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-[#222]/90 text-white backdrop-blur-sm border border-[#222]/20 rounded-full text-sm font-mono"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, backgroundColor: '#000' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#222] font-mono text-sm uppercase tracking-wider group cursor-pointer bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-white hover:border-[#222] transition-all"
                          whileHover={{ x: 10 }}
                          data-magnetic="true"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                          Live Demo
                          <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#222] font-mono text-sm uppercase tracking-wider group cursor-pointer bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-white hover:border-[#222] transition-all"
                          whileHover={{ x: 10 }}
                          data-magnetic="true"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                          GitHub
                          <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </motion.a>
                      )}
                      {project.title === '3Point Cafe & Resto' && (
                        <motion.a
                          href="/project/3pointcafe"
                          className="inline-flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wider group cursor-pointer bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-600 hover:border-white transition-all"
                          whileHover={{ x: 10 }}
                          data-magnetic="true"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                          View Details
                          <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#222] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              className="text-[8vw] md:text-[6vw] lg:text-[4vw] font-black mb-8 tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              LET'S WORK
            </motion.h2>
            
            <motion.h2
              className="text-[8vw] md:text-[6vw] lg:text-[4vw] font-black mb-16 tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              TOGETHER
            </motion.h2>
            
            <motion.div
              className="flex flex-col md:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="mailto:rizkyriyadi.dev@gmail.com"
                className="text-xl font-mono hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                rizkyriyadi.dev@gmail.com
              </motion.a>
              
              <div className="flex gap-6">
                <motion.a
                  href="https://github.com/rizkyriyadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono uppercase tracking-wider hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  GitHub
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/rizkyriyadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono uppercase tracking-wider hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-t border-dark-gray/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="font-mono text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              RR
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    activeSection === item ? 'text-dark-gray' : 'text-light-gray hover:text-dark-gray'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 text-light-gray hover:text-dark-gray transition-colors"
                 data-magnetic="true"
                 onMouseEnter={() => setCursorVariant('hover')}
                 onMouseLeave={() => setCursorVariant('default')}>
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 text-light-gray hover:text-dark-gray transition-colors"
                 data-magnetic="true"
                 onMouseEnter={() => setCursorVariant('hover')}
                 onMouseLeave={() => setCursorVariant('default')}>
                <Linkedin size={18} />
              </a>
              <a href="mailto:rizkyriady16@gmail.com"
                 className="p-2 text-light-gray hover:text-dark-gray transition-colors"
                 data-magnetic="true"
                 onMouseEnter={() => setCursorVariant('hover')}
                 onMouseLeave={() => setCursorVariant('default')}>
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-gray/10 mb-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-sm text-light-gray">
            © 2024 Rizky Riyadi. Crafted with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}