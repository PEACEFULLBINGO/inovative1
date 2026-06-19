import { motion } from "framer-motion";
import { Bot, Globe, ShieldCheck, Search, Zap, MapPin } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Discovery",
    desc: "Chat with our AI assistant to find the perfect worker based on your specific needs, language, and location.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "Language-Aware Matching",
    desc: "Filter workers by native language and English proficiency to ensure smooth communication.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified Profiles",
    desc: "Every worker goes through OTP verification and admin review before appearing in search results.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Search,
    title: "Smart Filters",
    desc: "Sort by availability, rating, experience, city, and more to find exactly who you need.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Instant Connection",
    desc: "Send contact requests directly — private details stay hidden until both parties agree.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Search",
    desc: "Find workers in your specific city or neighborhood, ready to serve today.",
    color: "from-cyan-500 to-teal-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-widest">
            Why LinguaLink
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4">
            Built for Real-World
            <br />
            Service Discovery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From plumbing emergencies to weekend tutoring — find trusted, verified workers who speak your language.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}