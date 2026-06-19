import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function ContactDialog({ worker, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSending(true);
    await base44.entities.ContactRequest.create({
      worker_id: String(worker.id),
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      message: form.message,
      status: "pending",
    });
    setSending(false);
    setSent(true);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle>
            {sent ? "Request Sent!" : `Contact ${worker.display_name}`}
          </DialogTitle>
        </DialogHeader>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Your contact request has been sent. {worker.display_name} will be notified and can choose to share their contact details with you.
            </p>
            <Button onClick={onClose} className="mt-4 rounded-xl">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold">
                {worker.display_name?.[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{worker.display_name}</p>
                <p className="text-xs text-muted-foreground">{worker.role} · {worker.city}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold">Your Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className="rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  type="email"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold">Message</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe what you need help with..."
                rows={3}
                className="rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={sending || !form.name.trim()}
              className="w-full rounded-xl"
            >
              {sending ? "Sending..." : "Send Request"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}