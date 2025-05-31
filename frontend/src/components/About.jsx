// src/pages/About.jsx
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FaUsers, FaTools } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiFramer, SiDjango, SiEthereum, SiIpfs } from "react-icons/si";

const visionData = [
  {
    title: "Vision",
    icon: "🌍",
    text: "To empower farmers with decentralized agricultural systems.",
  },
  {
    title: "Mission",
    icon: "🔗",
    text: "Integrate IoT + Blockchain for transparent, smart farming solutions.",
  },
  {
    title: "Impact",
    icon: "🌾",
    text: "Enable data-driven decisions that uplift rural communities.",
  },
];

const teamMembers = [
  { name: "Mridul", emoji: "🧑‍🌾", role: "IoT & Sensor Integration" },
  { name: "Pavithran", emoji: "👨‍💻", role: "Blockchain & Backend" },
  { name: "Kritika", emoji: "👩‍🎨", role: "Frontend & Visual Design" },
];

const techStack = [
  { name: "React", icon: <SiReact />, use: "Frontend architecture & component UI" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, use: "Utility-first responsive styling" },
  { name: "Framer Motion", icon: <SiFramer />, use: "Animations & transitions" },
  { name: "Django", icon: <SiDjango />, use: "Backend & API services" },
  { name: "Ethereum", icon: <SiEthereum />, use: "Blockchain smart contracts" },
  { name: "IPFS", icon: <SiIpfs />, use: "Distributed file storage" },
];

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-slate-800 overflow-x-hidden relative">
      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full text-green-200 text-7xl opacity-10 animate-pulse mt-16">
          🌿🌾🍃🌱🌿🌾🍃🌱🌿🌾🍃🌱🌿🌾🍃
        </div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-4 text-center z-10 relative">
        <motion.h1 className="text-5xl md:text-6xl font-extrabold text-green-900" {...fadeInProps}>
          <Typewriter
            words={["Welcome to GreenHash 🌿", "Empowering Agriculture with Technology 🌾"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>
        <motion.p className="text-lg text-gray-700 mt-4 max-w-xl" {...fadeInProps} transition={{ delay: 0.3, duration: 0.6 }}>
          A smart agriculture initiative combining IoT, Blockchain, and real-time data visualization.
        </motion.p>
        <motion.div className="mt-10 text-green-700 animate-bounce text-xl" {...fadeInProps} transition={{ delay: 0.6 }}>
          ↓ Scroll to explore ↓
        </motion.div>
      </section>

      {/* Vision / Mission / Impact */}
      <section className="py-20 px-4 bg-white">
        <motion.h2 className="text-3xl font-bold text-center mb-12 text-green-800" {...fadeInProps}>
          Our Roots & Goals 🌱
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visionData.map((item, i) => (
            <motion.div
              key={i}
              className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              {...fadeInProps}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-700">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-green-50">
        <motion.h2 className="text-3xl font-bold text-center mb-12 text-green-800 flex items-center justify-center gap-2" {...fadeInProps}>
          <FaUsers /> Meet the Team
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white w-64 p-6 rounded-xl shadow-lg hover:shadow-2xl text-center transform hover:scale-105 transition"
              {...fadeInProps}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
            >
              <div className="text-5xl mb-2">{member.emoji}</div>
              <div className="text-xl font-bold text-green-800">{member.name}</div>
              <div className="text-sm text-gray-500 mt-1">{member.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 bg-white">
        <motion.h2 className="text-3xl font-bold text-center mb-12 text-green-800 flex items-center justify-center gap-2" {...fadeInProps}>
          <FaTools /> Tech Stack
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-medium shadow hover:shadow-md flex flex-col items-center justify-center gap-2 text-sm text-center hover:bg-green-200 transition"
              whileHover={{ scale: 1.1 }}
              title={tech.use}
            >
              <div className="text-2xl">{tech.icon}</div>
              <div>{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-green-100 text-center text-green-900">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-lg">
          Thank you for exploring GreenHash! 🚜🌾
        </motion.p>
      </section>
    </div>
  );
};

export default About;
