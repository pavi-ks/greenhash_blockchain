import { motion } from "framer-motion";

const steps = [
  {
    icon: "🌾",
    title: "Sensor Data Collection",
    description: "IoT devices monitor soil moisture, temperature, and nutrients in real time.",
  },
  {
    icon: "🛰",
    title: "Decentralized Storage",
    description: "Data is securely stored on IPFS with unique content hash for verification.",
  },
  {
    icon: "📜",
    title: "Smart Contracts Triggered",
    description: "Smart contracts validate and timestamp data on Ethereum blockchain.",
  },
  {
    icon: "👩‍🌾",
    title: "Farmer Dashboard & Advisory",
    description: "Farmers receive real-time insights and personalized farming advice.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">{step.title}</h3>
              <p className="text-sm text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
