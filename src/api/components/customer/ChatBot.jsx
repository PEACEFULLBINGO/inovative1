import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const suggestions = [
  "Find me a plumber in Pune who speaks Hindi",
  "I need an electrician available today in Chennai",
  "Show English-speaking tutors in Mumbai",
  "Find a carpenter in Ahmedabad for weekend work",
];

export default function ChatBot({ workers, onFilterResults }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. Tell me what kind of worker you're looking for — I'll find the best matches based on skill, language, location, and availability.\n\nTry something like: *\"Find me a Hindi-speaking plumber in Pune available today\"*",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    const workerSummary = workers
      .map(
        (w) =>
          `ID:${w.id} | ${w.display_name} | ${w.role} | City:${w.city} | Language:${w.native_language} | English:${w.english_proficiency} | Available:${w.availability} | Rating:${w.rating || "N/A"} | Exp:${w.experience_years || "N/A"}yrs | Rate:₹${w.hourly_rate || "N/A"}/hr | Status:${w.verification_status}`
      )
      .join("\n");

    const prompt = `You are the LinguaLink AI assistant helping customers find local workers/service providers.

Available workers database:
${workerSummary || "No workers registered yet."}

User query: "${userMsg}"

Instructions:
1. Analyze the user's needs (skill type, location, language, availability, budget).
2. Filter and rank the best matching workers from the database.
3. Present results in a friendly, concise manner with key details.
4. If no exact match, suggest the closest alternatives.
5. Always mention the worker's name, role, city, languages, and availability.
6. Return a JSON field "matched_ids" with an array of matching worker IDs.
7. If the query is not about finding workers, answer helpfully but suggest they try searching for workers.

Respond with both a helpful message and structured data.`;

    const res = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Friendly response to show the user",
          },
          matched_ids: {
            type: "array",
            items: { type: "string" },
            description: "IDs of matching workers",
          },
        },
      },
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: res.message },
    ]);

    if (res.matched_ids?.length) {
      const matched = workers.filter((w) =>
        res.matched_ids.includes(String(w.id))
      );
      onFilterResults(matched);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    ul: ({ children }) => <ul className="list-disc ml-4 mb-1">{children}</ul>,
                    li: ({ children }) => <li className="mb-0.5">{children}</li>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching for the best matches...
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            Try asking:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-xs bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe who you're looking for..."
            className="flex-1 rounded-xl"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="rounded-xl shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
