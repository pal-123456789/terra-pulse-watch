import { Users, TrendingUp, MapPin, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Community = () => {
  return (
    <div className="min-h-screen bg-space-gradient">
      <Navigation />

      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Global Observer <span className="text-primary">Network</span>
            </h1>
            <p className="text-muted-foreground">Community-driven environmental monitoring</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Reports</span>
              </div>
              <p className="text-3xl font-bold text-foreground">7,421,098</p>
            </Card>

            <Card className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-sm text-muted-foreground">Members Online</span>
              </div>
              <p className="text-3xl font-bold text-foreground">2,567</p>
            </Card>

            <Card className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-sm text-muted-foreground">Active Locations</span>
              </div>
              <p className="text-3xl font-bold text-foreground">1,234</p>
            </Card>

            <Card className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground">Trending Reports</span>
              </div>
              <p className="text-3xl font-bold text-foreground">89</p>
            </Card>
          </div>

          {/* Map Visualization */}
          <Card className="glass-panel p-8">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200')] bg-cover bg-center opacity-30" />
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-primary/20 rounded-full animate-pulse-glow flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Interactive Globe Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Real-time visualization of community reports and environmental data across the globe
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Trending Locations */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Trending Locations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Amazon Rainforest", reports: 1234, status: "Active" },
                { name: "Arctic Circle", reports: 892, status: "Monitoring" },
                { name: "Pacific Ocean", reports: 756, status: "Active" },
              ].map((location, idx) => (
                <Card key={idx} className="glass-panel p-4 hover:glow-border transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground">{location.name}</h3>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                      {location.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{location.reports} reports</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
