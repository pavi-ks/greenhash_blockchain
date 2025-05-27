import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://gateway.pinata.cloud/ipfs/bafybeihzmue3gbbvpyioi7od5rfgyhbxopbrjd5z37fz45o4zhjgp7k4bm"
        // src="/herosection_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Foreground Content */}
      <motion.div
        className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          GreenHash 🌿
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-8 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Empowering Smart Agriculture with Real-Time Insights and Blockchain Security.
        </motion.p>

        <motion.div
          className="flex gap-6 flex-wrap justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Link to="/dashboard">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded shadow transition">
              🌾 Explore Dashboard
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-white hover:bg-green-100 text-green-700 font-semibold px-6 py-2 rounded shadow transition">
              📖 Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
