import { useState } from "react";
import { Plus, Download, Bell, Share2, Map, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { 
      icon: Map, 
      label: "Submit Report", 
      color: "bg-primary/20 hover:bg-primary/30 text-primary",
      action: () => {
        setIsOpen(false);
        navigate("/report");
      }
    },
    { 
      icon: BarChart3, 
      label: "View Stats", 
      color: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400",
      action: () => toast.info("Loading statistics...")
    },
    { 
      icon: Download, 
      label: "Export Data", 
      color: "bg-green-500/20 hover:bg-green-500/30 text-green-400",
      action: () => toast.success("Exporting data...")
    },
    { 
      icon: Bell, 
      label: "Alerts", 
      color: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400",
      action: () => toast.info("Checking alerts...")
    },
    { 
      icon: Share2, 
      label: "Share", 
      color: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400",
      action: () => toast.info("Opening share options...")
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action Buttons */}
      <div className={cn(
        "flex flex-col gap-3 mb-3 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              onClick={() => {
                action.action();
                setIsOpen(false);
              }}
              className={cn(
                "w-14 h-14 rounded-full shadow-lg transition-all duration-300",
                action.color,
                "hover:scale-110"
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              <Icon className="w-6 h-6" />
            </Button>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-45"
        )}
      >
        <Plus className="w-8 h-8" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickActions;