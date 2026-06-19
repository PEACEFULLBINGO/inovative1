import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

const roles = ["Plumber", "Electrician", "Carpenter", "Tutor", "Driver", "House Help", "Freelancer", "Painter", "AC Technician", "Mechanic"];
const languages = ["Hindi", "English", "Marathi", "Tamil", "Telugu", "Bengali", "Gujarati", "Kannada", "Malayalam", "Punjabi"];
const englishLevels = ["None", "Basic", "Conversational", "Fluent"];
const availabilities = ["Available today", "Available this week", "Weekends only", "Part-time"];

const steps = [
  { title: "Personal Info", subtitle: "Name and contact details" },
  { title: "Service Details", subtitle: "Role, skills, and experience" },
  { title: "Languages", subtitle: "Communication preferences" },
  { title: "Profile", subtitle: "Bio, availability, and confirmation" },
];

export default function RegistrationForm({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    display_name: "",
    email: "",
    mobile: "",
    city: "",
    role: "",
    native_language: "",
    english_proficiency: "",
    other_languages: "",
    availability: "",
    bio: "",
    experience_years: "",
    hourly_rate: "",
    services: "",
  });

  const update = (key, val) => setForm({ ...form, [key]: val });

  const validateStep = () => {
    if (step === 0) {
      if (!form.full_name.trim()) return "Full name is required";
      if (!form.display_name.trim()) return "Display name is required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Valid email is required";
      if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) return "Valid 10-digit mobile is required";
      if (!form.city.trim()) return "City is required";
    }
    if (step === 1) {
      if (!form.role) return "Select a role";
    }
    if (step === 2) {
      if (!form.native_language) return "Select your native language";
      if (!form.english_proficiency) return "Select English proficiency";
    }
    if (step === 3) {
      if (!form.availability) return "Select availability";
      if (!consent) return "You must agree to the terms";
    }
    return "";
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    setSaving(true);

    let score = 0;
    if (form.full_name) score += 15;
    if (form.display_name) score += 10;
    if (form.city) score += 10;
    if (form.role) score += 10;
    if (form.native_language) score += 15;
    if (form.english_proficiency && form.english_proficiency !== "None") score += 10;
    if (form.other_languages) score += 5;
    if (form.bio?.length >= 20) score += 10;
    if (form.experience_years) score += 5;
    if (form.hourly_rate) score += 5;
    if (form.services) score += 5;

    const data = {
      ...form,
      experience_years: form.experience_years ? Number(form.experience_years) : 0,
      hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : 0,
      verification_status: "Pending",
      profile_score: Math.min(score, 100),
      rating: 0,
      total_reviews: 0,
    };

    await base44.entities.Worker.create(data);
    setSaving(false);
    onSuccess();
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-bold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s.title}
              </p>
            </div>
            {i < 3 && (
              <div className={`w-8 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Full Name *</Label>
                  <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="e.g. Aarav Mehta" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Display Name *</Label>
                  <Input value={form.display_name} onChange={(e) => update("display_name", e.target.value)} placeholder="Public visible name" className="rounded-xl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Email *</Label>
                  <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="name@example.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Mobile *</Label>
                  <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} type="tel" inputMode="numeric" placeholder="10-digit number" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">City *</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Pune" className="rounded-xl" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Service Category *</Label>
                <Select value={form.role} onValueChange={(v) => update("role", v)}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select your primary role" /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Specific Services Offered</Label>
                <Input value={form.services} onChange={(e) => update("services", e.target.value)} placeholder="e.g. Pipe repair, Bathroom fitting, Water heater" className="rounded-xl" />
                <p className="text-xs text-muted-foreground">Comma-separated list of services</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Experience (years)</Label>
                  <Input value={form.experience_years} onChange={(e) => update("experience_years", e.target.value)} type="number" min="0" placeholder="e.g. 5" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Hourly Rate (₹)</Label>
                  <Input value={form.hourly_rate} onChange={(e) => update("hourly_rate", e.target.value)} type="number" min="0" placeholder="e.g. 300" className="rounded-xl" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Native Language *</Label>
                <Select value={form.native_language} onValueChange={(v) => update("native_language", v)}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select native language" /></SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">English Proficiency *</Label>
                <Select value={form.english_proficiency} onValueChange={(v) => update("english_proficiency", v)}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    {englishLevels.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Other Languages</Label>
                <Input value={form.other_languages} onChange={(e) => update("other_languages", e.target.value)} placeholder="e.g. Marathi, Telugu" className="rounded-xl" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Availability *</Label>
                <Select value={form.availability} onValueChange={(v) => update("availability", v)}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="When are you available?" /></SelectTrigger>
                  <SelectContent>
                    {availabilities.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Short Bio</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Introduce yourself, your experience, and what makes you stand out..."
                  rows={4}
                  maxLength={300}
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">{form.bio.length}/300 characters</p>
              </div>
              <div className="flex items-start gap-3 bg-muted rounded-xl p-4">
                <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-0.5" />
                <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                  I confirm that all information is accurate, I am 18 or older, and I agree to profile review and verification by the LinguaLink team.
                </label>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={prev}
          disabled={step === 0}
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={next} className="rounded-xl">
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={submit}
            disabled={saving || !consent}
            className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {saving ? "Submitting..." : "Submit Registration"}
          </Button>
        )}
      </div>
    </div>
  );
}