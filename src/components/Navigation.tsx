import { Link, useLocation } from "react-router-dom";
import { Globe, Compass, History, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: Globe },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/history", label: "History", icon: History },
    { to: "/community", label: "Community", icon: Users },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20" />
              <Globe className="w-8 h-8 text-primary relative z-10" />
            </div>
            <span className="text-2xl font-bold text-foreground">TerraPulse</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary glow-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
