import { motion } from "framer-motion";

const stats = [
  { label: "Connected Sensors", value: "120+" },
  { label: "Soil Reports on IPFS", value: "450+" },
  { label: "Smart Contracts Executed", value: "85" },
  { label: "Farms Using GreenHash", value: "30+" },
];

function StatsSection() {
  return (
    <section className="py-20 bg-yellow-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-yellow-800 mb-10">Live Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-800">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
