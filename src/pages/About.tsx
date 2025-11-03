import { Satellite, Cpu, Database, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
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

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="group">
              <span className="flex items-center gap-2">
                Join the Mission
              </span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
