import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, Shield, Star, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import RegistrationForm from "@/components/employee/RegistrationForm";
import SuccessScreen from "@/components/employee/SuccessScreen";

const benefits = [
  { icon: Users, title: "Get Discovered", desc: "Customers find you through AI-powered search" },
  { icon: Shield, title: "Verified Badge", desc: "Build trust with a verified profile" },
  { icon: Globe, title: "Language Match", desc: "Get matched with clients who speak your language" },
  { icon: Star, title: "Build Reputation", desc: "Earn ratings and grow your business" },
];

export default function EmployeeRegister() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">Worker Registration</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {success ? (
          <div className="max-w-xl mx-auto">
            <SuccessScreen />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
            {/* Left — Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-8 text-white mb-6">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                    Join India's Fastest Growing Worker Network
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Register for free, get verified, and start receiving service requests from customers in your area. No commissions, no hidden fees.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{b.title}</p>
                      <p className="text-xs text-muted-foreground">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 bg-muted rounded-2xl p-5 border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">100% Free.</strong> LinguaLink never charges workers for registration or visibility. Your contact details remain private until you choose to share them with a customer.
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-xl font-extrabold">Create Your Profile</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in your details step by step. Takes about 2 minutes.
                </p>
              </div>
              <RegistrationForm onSuccess={() => setSuccess(true)} />
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}