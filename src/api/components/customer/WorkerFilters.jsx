import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const roles = ["All", "Plumber", "Electrician", "Carpenter", "Tutor", "Driver", "House Help", "Freelancer", "Painter", "AC Technician", "Mechanic"];
const languages = ["All", "Hindi", "English", "Marathi", "Tamil", "Telugu", "Bengali", "Gujarati", "Kannada", "Malayalam", "Punjabi"];
const englishLevels = ["All", "None", "Basic", "Conversational", "Fluent"];
const availabilities = ["All", "Available today", "Available this week", "Weekends only", "Part-time"];

export default function WorkerFilters({ filters, onChange, onClear }) {
  const update = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, role, or city..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Select value={filters.role} onValueChange={(v) => update("role", v)}>
          <SelectTrigger className="rounded-xl text-xs">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.language} onValueChange={(v) => update("language", v)}>
          <SelectTrigger className="rounded-xl text-xs">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.english} onValueChange={(v) => update("english", v)}>
          <SelectTrigger className="rounded-xl text-xs">
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent>
            {englishLevels.map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.availability} onValueChange={(v) => update("availability", v)}>
          <SelectTrigger className="rounded-xl text-xs">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilities.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground">
          <X className="w-3 h-3 mr-1" />
          Clear all filters
        </Button>
      </div>
    </div>
  );
}