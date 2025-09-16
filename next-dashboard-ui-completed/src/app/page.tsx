'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Configure Next.js Image component to accept external URLs
const imageLoader = ({ src }: { src: string }) => src;

/* 🔹 Reusable Login Card */
const LoginCard = ({ href, color, icon, title, desc }: {
  href: string,
  color: string,
  icon: React.ReactNode,
  title: string,
  desc: string
}) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center p-4 bg-${color}-50 rounded-xl hover:bg-${color}-100 transition-colors cursor-pointer`}
    >
      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </motion.div>
  </Link>
);

/* 🔹 Reusable Feature Card */
const FeatureCard = ({ icon, title, desc }: {
  icon: React.ReactNode,
  title: string,
  desc: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="p-6 bg-white rounded-xl shadow-md"
  >
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

const Homepage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const staggerContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-800">EduTrack</span>
            <span className="text-sm text-gray-500">Smart Attendance</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Link href="/help" className="text-gray-600 hover:text-gray-900">Help</Link>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>

            {/* Login Modal */}
            <AnimatePresence>
              {isLoginModalOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLoginModalOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                  />
                  
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl z-50 w-full max-w-md"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Choose Login Type</h2>
                      <button
                        onClick={() => setIsLoginModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close login modal"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">Select your role to continue</p>
                    
                    <div className="space-y-4">
                      <LoginCard 
                        href="/sign-in?role=admin"
                        color="red"
                        title="Login as Admin"
                        desc="Access administrative dashboard"
                        icon={<svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                      />

                      <LoginCard 
                        href="/sign-in?role=teacher"
                        color="blue"
                        title="Login as Teacher"
                        desc="Manage classes and attendance"
                        icon={<svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>}
                      />

                      <LoginCard 
                        href="/sign-in?role=student"
                        color="green"
                        title="Login as Student"
                        desc="View attendance and schedules"
                        icon={<svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>}
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-blue-500">Smart</span><br />
              <span className="text-blue-500">Student</span><br />
              Management System
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Revolutionize education with AI-powered attendance tracking,
              blockchain security, and intelligent student management solutions.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-in"
                className="inline-flex items-center bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                loader={imageLoader}
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3"
                alt="Modern Classroom"
                width={600}
                height={400}
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="py-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for <span className="text-blue-500">Modern Education</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience the future of student management with our comprehensive suite of intelligent tools 
              designed to streamline attendance tracking and enhance educational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI-Powered Attendance"
              desc="Advanced facial recognition and smart tracking algorithms for accurate attendance management."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
            />

            <FeatureCard 
              title="Blockchain Security"
              desc="Immutable, tamper-proof records ensure transparency and trust in attendance data."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2v-6zM4 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>}
            />

            <FeatureCard 
              title="Smart Analytics"
              desc="Gain insights with detailed reports, trends, and predictive analytics for student performance."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V5a1 1 0 012 0v6h4a1 1 0 010 2h-4v6a1 1 0 01-2 0v-6H7a1 1 0 010-2h4z" />
              </svg>}
            />
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-24 -mx-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xl font-semibold">EduTrack</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing education through intelligent student management solutions powered by AI and blockchain technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="hover:text-white">Testimonials</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@edutrack.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Education Street</li>
                <li>Learning City, LC 12345</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 mt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">© 2024 EduTrack. All rights reserved.</p>
              <div className="flex gap-6 text-gray-400">
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;