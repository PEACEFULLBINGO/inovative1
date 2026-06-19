import { motion } from "framer-motion";
import { ArrowRight, Users, Wrench, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Verified Workers", value: "2,500+", icon: Shield },
  { label: "Service Categories", value: "10+", icon: Wrench },
  { label: "Cities Covered", value: "50+", icon: Users },
  { label: "Avg Rating", value: "4.8", icon: Star },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80"
          alt="Worker"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Language-aware worker discovery platform
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Find Skilled
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                Local Workers
              </span>
              <br />
              Instantly.
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed">
              Connect with verified plumbers, electricians, tutors, and more — filtered by language, location, and availability using AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/customer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-2xl px-8 py-6 text-base font-bold shadow-lg shadow-teal-500/25 w-full sm:w-auto"
                >
                  I Need a Worker
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/employee/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-base font-bold backdrop-blur-sm w-full sm:w-auto"
                >
                  I'm a Worker — Join Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4"
                >
                  <stat.icon className="w-5 h-5 text-teal-300 mb-2" />
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Role selection card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
              <p className="text-white/60 mb-8">Choose how you'd like to use LinguaLink</p>

              <div className="space-y-4">
                <Link to="/customer" className="block">
                  <div className="group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-teal-400/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">Customer</div>
                        <div className="text-white/50 text-sm">Find & hire verified workers with AI</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>

                <Link to="/employee/register" className="block">
                  <div className="group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">Employee / Worker</div>
                        <div className="text-white/50 text-sm">Register, build your portfolio & get hired</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/40 text-sm">
                  Trusted by 2,500+ workers across India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}