import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Globe, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerCard({ worker, onContact, index = 0 }) {
  const isVerified = worker.verification_status === "Verified";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-extrabold text-xl shrink-0">
          {worker.display_name?.[0]?.toUpperCase() || "W"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-base truncate">{worker.display_name}</h4>
            {isVerified && (
              <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{worker.role}</p>
        </div>
        {worker.rating > 0 && (
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-lg shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{worker.rating}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <MapPin className="w-3 h-3" />
          {worker.city}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <Globe className="w-3 h-3" />
          {worker.native_language}
        </Badge>
        {worker.english_proficiency && worker.english_proficiency !== "None" && (
          <Badge variant="secondary" className="text-xs">
            EN: {worker.english_proficiency}
          </Badge>
        )}
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <Clock className="w-3 h-3" />
          {worker.availability}
        </Badge>
      </div>

      {worker.bio && (
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {worker.bio}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {worker.experience_years > 0 && (
            <span>{worker.experience_years} yrs exp</span>
          )}
          {worker.hourly_rate > 0 && (
            <span className="font-bold text-foreground">₹{worker.hourly_rate}/hr</span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => onContact(worker)}
          className="rounded-xl bg-primary hover:bg-primary/90 text-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 mr-1" />
          Contact
        </Button>
      </div>
    </motion.div>
  );
}