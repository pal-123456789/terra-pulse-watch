import { useState } from "react";
import { ChevronDown, ChevronRight, AlertTriangle, Wind, Flame, Mountain, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const anomalies = [
  {
    id: 1,
    name: "Hurricane Katrina",
    icon: Wind,
    year: "2005",
    location: "New Orleans, USA",
    description: "Category 5 Atlantic hurricane that caused catastrophic damage along the Gulf coast",
    severity: "Extreme",
  },
  {
    id: 2,
    name: "Chernobyl Disaster",
    icon: Flame,
    year: "1986",
    location: "Pripyat, Ukraine",
    description: "Nuclear accident that released large quantities of radioactive particles",
    severity: "Critical",
  },
  {
    id: 3,
    name: "Tunguska Event",
    icon: AlertTriangle,
    year: "1908",
    location: "Siberia, Russia",
    description: "Large explosion that flattened 2,000 square kilometers of forest",
    severity: "High",
  },
  {
    id: 4,
    name: "Mount Everest Anomaly",
    icon: Mountain,
    year: "2015",
    location: "Himalayas, Nepal",
    description: "Unusual seismic activity detected in the region",
    severity: "Medium",
  },
  {
    id: 5,
    name: "Bermuda Triangle Disappearance",
    icon: HelpCircle,
    year: "Various",
    location: "Atlantic Ocean",
    description: "Multiple unexplained disappearances of ships and aircraft",
    severity: "Unknown",
  },
];

const History = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navigation />

      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Previous <span className="text-primary">Anomalies</span>
            </h1>
            <p className="text-muted-foreground">Historical environmental events and phenomena</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-panel p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-foreground">Categories</h3>
                <div className="space-y-2">
                  {["all", "weather", "seismic", "nuclear", "unexplained"].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Anomalies List */}
            <div className="lg:col-span-3 space-y-4">
              {anomalies.map((anomaly) => {
                const Icon = anomaly.icon;
                const isExpanded = expandedId === anomaly.id;

                return (
                  <Card
                    key={anomaly.id}
                    className="glass-panel p-6 hover:glow-border transition-all duration-300 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : anomaly.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-foreground">{anomaly.name}</h3>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-primary" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            📅 {anomaly.year}
                          </span>
                          <span className="flex items-center gap-1">
                            📍 {anomaly.location}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              anomaly.severity === "Extreme"
                                ? "bg-red-500/20 text-red-400"
                                : anomaly.severity === "Critical"
                                ? "bg-orange-500/20 text-orange-400"
                                : anomaly.severity === "High"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {anomaly.severity}
                          </span>
                        </div>

                        {isExpanded && (
                          <p className="mt-4 text-muted-foreground">{anomaly.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
