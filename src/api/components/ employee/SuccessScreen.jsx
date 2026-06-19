import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-2xl font-extrabold mb-3">Registration Successful!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Your profile has been submitted for review. Our team will verify your details and you'll appear in search results once approved.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
        <div className="bg-muted rounded-2xl p-4 text-left">
          <Clock className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-bold">Review Time</p>
          <p className="text-xs text-muted-foreground">Usually within 24 hours</p>
        </div>
        <div className="bg-muted rounded-2xl p-4 text-left">
          <Shield className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-bold">Verification</p>
          <p className="text-xs text-muted-foreground">OTP verified contact</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/employee/register">
          <Button variant="outline" className="rounded-xl w-full sm:w-auto">
            Register Another Profile
          </Button>
        </Link>
        <Link to="/">
          <Button className="rounded-xl w-full sm:w-auto">
            Back to Home
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}