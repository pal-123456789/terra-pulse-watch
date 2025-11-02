import { Link, useLocation } from "react-router-dom";
import { Globe, Compass, History, Users, Info, BarChart3, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "./Auth/UserMenu";
import { useEffect, useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: Globe },
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/history", label: "History", icon: History },
    { to: "/community", label: "Community", icon: Users },
    { to: "/learn", label: "Learn", icon: GraduationCap },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50 backdrop-blur-xl transition-all duration-300",
      scrolled && "shadow-lg shadow-primary/5 bg-card/95"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20" />
              <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Terra<span className="text-primary">Pulse</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 relative group/link",
                      isActive
                        ? "bg-primary/20 text-primary glow-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive && "animate-pulse-glow")} />
                    <span className="text-sm md:text-base">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full animate-glow-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
