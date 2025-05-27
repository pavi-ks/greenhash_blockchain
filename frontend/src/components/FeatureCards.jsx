import { motion } from "framer-motion";

const features = [
  {
    icon: "🌱",
    title: "Soil Health Monitoring",
    desc: "Get real-time updates on soil nutrients, moisture, and pH levels.",
    color: "bg-green-100 text-green-900",
  },
  {
    icon: "💧",
    title: "Irrigation Advisory",
    desc: "AI-backed irrigation scheduling for optimal water usage.",
    color: "bg-yellow-100 text-yellow-900",
  },
  {
    icon: "🧪",
    title: "Fertilizer Suggestions",
    desc: "Smart recommendations for crop-specific nutrient supply.",
    color: "bg-green-50 text-green-800",
  },
  {
    icon: "🔗",
    title: "Blockchain Integrity",
    desc: "Immutable data storage with IPFS and Ethereum smart contracts.",
    color: "bg-yellow-50 text-yellow-800",
  },
];

function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-green-700 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Why Choose GreenHash?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${feature.color}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
