'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

const projectImages = [
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app.svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (1).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (2).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (3).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (4).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (5).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (6).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (7).svg',
  '/pointCafeWebsiteOrder/iPhone-13-PRO-point-cafe-website-order.vercel.app (8).svg'
]

const techStack = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 
  'NextAuth.js', 'Stripe', 'Vercel', 'React Hook Form', 'Zustand'
]

export default function ThreePointCafePage() {
  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#222]">
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f6f0]/80 backdrop-blur-sm border-b border-[#222]/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/#projects"
            className="flex items-center gap-2 text-[#222] hover:text-[#222]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm">Back to Portfolio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <a
              href="https://point-cafe-website-order.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#222] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#000] transition-colors"
            >
              Live Demo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Project Title & Description */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter mb-8">
              3Point Cafe
              <br />
              <span className="text-[#222]/60">& Resto</span>
            </h1>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xl leading-relaxed mb-6">
                  A comprehensive online ordering system for 3Point Cafe & Resto, featuring 
                  real-time menu management, secure payment processing, and an intuitive 
                  customer experience.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Real-time menu browsing and ordering</li>
                  <li>• Secure payment integration with Stripe</li>
                  <li>• User authentication and order history</li>
                  <li>• Admin dashboard for menu management</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Order tracking and notifications</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-[#222] text-white rounded-full text-sm font-mono"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Images Gallery */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-8">Project Screenshots</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-lg overflow-hidden shadow-lg aspect-[9/16]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={image}
                    alt={`3Point Cafe Screenshot ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Project Overview</h3>
              <p className="text-lg leading-relaxed mb-6">
                This project was developed as a complete solution for 3Point Cafe & Resto 
                to modernize their ordering process and provide customers with a seamless 
                digital experience. The system handles everything from menu browsing to 
                payment processing and order management.
              </p>
              
              <p className="text-lg leading-relaxed">
                Built with modern web technologies, the application ensures fast performance, 
                security, and scalability. The responsive design works perfectly across all 
                devices, making it easy for customers to place orders whether they're on 
                desktop or mobile.
              </p>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-6">Development Highlights</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#222] rounded-full mt-3 flex-shrink-0"></span>
                  <span>Implemented secure authentication with NextAuth.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#222] rounded-full mt-3 flex-shrink-0"></span>
                  <span>Integrated Stripe for secure payment processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#222] rounded-full mt-3 flex-shrink-0"></span>
                  <span>Built responsive UI with Tailwind CSS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#222] rounded-full mt-3 flex-shrink-0"></span>
                  <span>Deployed on Vercel with PostgreSQL database</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}