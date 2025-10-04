
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden text-center px-6">
      {/* Background Particles */}
      <Particles
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.3 },
            links: { enable: true, color: "#3b82f6" },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/*Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-blue-700 mb-4"
      >
        🛒 Simple Shopping Cart
      </motion.h1>

      {/*Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6"
      >
        A minimal e-commerce web app built with <strong>React</strong> and <strong>Node.js</strong> —  
        featuring a dynamic cart, localStorage persistence, toast notifications, and a smooth checkout flow.
      </motion.p>

      {/* Project Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">👩‍💻 Project By</h2>
        <p className="text-gray-800 text-lg font-medium mb-4">Shreya Mamadapur | B.E Information Technology</p>

        <h3 className="text-xl font-semibold text-blue-600 mb-2">🧰 Tech Stack</h3>
        <ul className="text-gray-700 text-base space-y-1">
          <li>⚛️ React + Context API</li>
          <li>🌐 Node.js + Express (Backend)</li>
          <li>💾 LocalStorage for state persistence</li>
          <li>🎨 Tailwind CSS for styling</li>
          <li>🧪 Jest + Supertest (Backend Testing)</li>
        </ul>
      </motion.div>

      {/* Enter Project Button*/ }
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium shadow-lg transition"
        >
          🚀 Enter Project
        </Link>
      </motion.div>
    </div>
  );
}


