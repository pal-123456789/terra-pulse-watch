import { Satellite, Cpu, Database, Shield, Users, Target, Globe2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";

const About = () => {
  const [email, setEmail] = useState("");

  const handleJoinMission = () => {
    if (email && email.includes("@")) {
      toast.success("Welcome to the mission! Check your email for next steps.");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navigation />

      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              About <span className="text-primary text-glow">TerraPulse</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leverage data for environmental insights
            </p>
          </div>

          {/* Purpose */}
          <Card className="glass-panel p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Purpose</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Monitor ecological change, predict environmental trends, and support sustainable development
                through advanced AI-powered analysis.
              </p>
              <p className="text-lg">
                TerraPulse integrates data from NASA satellites, weather systems, and environmental sensors
                to provide real-time insights into Earth's changing conditions.
              </p>
            </div>
          </Card>

          {/* Technology */}
          <Card className="glass-panel p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Technology</h2>
            <p className="text-lg text-muted-foreground mb-8">
              AI satellite imagery, cloud computing, and machine learning algorithms power our platform.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Satellite className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">Satellite Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time imagery and data from NASA's Earth observation satellites
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">AI Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced machine learning algorithms for pattern recognition and prediction
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">Big Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Massive datasets processed in real-time for accurate analysis
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security with encrypted data transmission
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Sources */}
          <Card className="glass-panel p-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Data Sources</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                <span className="font-semibold text-foreground">NASA Earth Observation</span>
                <span className="text-sm text-primary">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                <span className="font-semibold text-foreground">OpenWeather API</span>
                <span className="text-sm text-primary">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                <span className="font-semibold text-foreground">OpenStreetMap</span>
                <span className="text-sm text-primary">Active</span>
              </div>
            </div>
          </Card>

          {/* Join the Mission */}
          <Card className="glass-panel p-8 mt-12 border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 text-foreground">
                  Join the <span className="text-primary text-glow">Mission</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Be part of the global community monitoring Earth's environmental changes
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-background/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Citizen Scientists</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit environmental reports from your location and contribute to global research
                  </p>
                </div>

                <div className="text-center p-6 bg-background/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Researchers</h3>
                  <p className="text-sm text-muted-foreground">
                    Access real-time data and AI-powered insights for your environmental studies
                  </p>
                </div>

                <div className="text-center p-6 bg-background/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Organizations</h3>
                  <p className="text-sm text-muted-foreground">
                    Leverage our platform for environmental monitoring and decision-making
                  </p>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex gap-2 mb-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-panel border-border focus:border-primary"
                  />
                  <Button onClick={handleJoinMission} size="lg" className="group">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Join
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Join thousands of observers monitoring Earth's environmental changes
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
