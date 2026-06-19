import { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, List, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "@/components/customer/ChatBot";
import WorkerCard from "@/components/customer/WorkerCard";
import WorkerFilters from "@/components/customer/WorkerFilters";
import ContactDialog from "@/components/customer/ContactDialog";

const defaultFilters = {
  search: "",
  role: "All",
  language: "All",
  english: "All",
  availability: "All",
};

export default function CustomerPortal() {
  const [view, setView] = useState("chat");
  const [filters, setFilters] = useState(defaultFilters);
  const [aiResults, setAiResults] = useState(null);
  const [contactWorker, setContactWorker] = useState(null);

  const { data: workers = [], isLoading } = useQuery({
    queryKey: ["workers"],
    queryFn: () => base44.entities.Worker.list("-created_date", 100),
  });

  const filteredWorkers = useMemo(() => {
    const source = aiResults || workers;
    return source.filter((w) => {
      const q = filters.search.toLowerCase();
      const matchSearch =
        !q ||
        w.display_name?.toLowerCase().includes(q) ||
        w.role?.toLowerCase().includes(q) ||
        w.city?.toLowerCase().includes(q);
      const matchRole = filters.role === "All" || w.role === filters.role;
      const matchLang =
        filters.language === "All" || w.native_language === filters.language;
      const matchEng =
        filters.english === "All" ||
        w.english_proficiency === filters.english;
      const matchAvail =
        filters.availability === "All" ||
        w.availability === filters.availability;
      return matchSearch && matchRole && matchLang && matchEng && matchAvail;
    });
  }, [workers, filters, aiResults]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                LL
              </div>
              <span className="font-bold text-sm hidden sm:block">
                Find Workers
              </span>
            </div>
          </div>

          <div className="flex items-center bg-muted rounded-xl p-1">
            <button
              onClick={() => {
                setView("chat");
                setAiResults(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "chat"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <button
              onClick={() => {
                setView("browse");
                setAiResults(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "browse"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Browse All</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {view === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-[1fr_1.2fr] gap-6 min-h-[calc(100vh-8rem)]"
            >
              {/* Chat panel */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col min-h-[500px] lg:min-h-0">
                <div className="p-4 border-b border-border bg-gradient-to-r from-teal-500/5 to-emerald-500/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">AI Worker Finder</h3>
                      <p className="text-xs text-muted-foreground">
                        Describe what you need in plain language
                      </p>
                    </div>
                  </div>
                </div>
                <ChatBot
                  workers={workers}
                  onFilterResults={(results) => setAiResults(results)}
                />
              </div>

              {/* AI Results */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">
                    {aiResults
                      ? `${aiResults.length} AI-matched result${aiResults.length !== 1 ? "s" : ""}`
                      : `${workers.length} workers available`}
                  </h3>
                  {aiResults && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAiResults(null)}
                      className="text-xs"
                    >
                      Show all workers
                    </Button>
                  )}
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(aiResults || workers).map((w, i) => (
                      <WorkerCard
                        key={w.id}
                        worker={w}
                        index={i}
                        onContact={setContactWorker}
                      />
                    ))}
                    {(aiResults || workers).length === 0 && (
                      <div className="col-span-full text-center py-16 text-muted-foreground">
                        <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No workers found</p>
                        <p className="text-sm mt-1">
                          Try asking the AI assistant to search differently
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                <WorkerFilters
                  filters={filters}
                  onChange={setFilters}
                  onClear={() => setFilters(defaultFilters)}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">
                  {filteredWorkers.length} worker
                  {filteredWorkers.length !== 1 ? "s" : ""} found
                </h3>
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkers.map((w, i) => (
                    <WorkerCard
                      key={w.id}
                      worker={w}
                      index={i}
                      onContact={setContactWorker}
                    />
                  ))}
                  {filteredWorkers.length === 0 && (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                      <p className="font-medium">No workers match your filters</p>
                      <p className="text-sm mt-1">Try broadening your search</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {contactWorker && (
        <ContactDialog
          worker={contactWorker}
          onClose={() => setContactWorker(null)}
        />
      )}
    </div>
  );
}