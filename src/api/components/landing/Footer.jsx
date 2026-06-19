import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-extrabold text-sm">
            LL
          </div>
          <div>
            <span className="font-bold text-lg">LinguaLink</span>
            <p className="text-xs text-muted-foreground">Language-aware worker discovery</p>
          </div>
        </div>
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/customer" className="hover:text-foreground transition-colors">Find Workers</Link>
          <Link to="/employee/register" className="hover:text-foreground transition-colors">Join as Worker</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LinguaLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}