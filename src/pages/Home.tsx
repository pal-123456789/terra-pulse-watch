import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe2, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AnimatedCounter from "@/components/AnimatedCounter";
import SearchBar from "@/components/SearchBar";
import QuickActions from "@/components/QuickActions";
import LiveNotifications from "@/components/LiveNotifications";

const Home = () => {
  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Navigation />
      <LiveNotifications />
      <QuickActions />

      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar />
        </div>
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-32">
          <div className="mb-8 inline-block">
            <div className="relative">
              <Globe2 className="w-24 h-24 text-primary animate-float mx-auto" />
              <div className="absolute inset-0 animate-pulse-glow rounded-full" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            Terra<span className="text-primary text-glow">Pulse</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            AI-Powered Environmental Monitoring System
            <br />
            Detecting and predicting natural anomalies in real-time
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  View Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          <Card className="glass-panel stat-card p-6 text-center glow-border-hover cursor-pointer">
            <p className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter end={12847} />
            </p>
            <p className="text-sm text-muted-foreground font-medium">Active Monitors</p>
          </Card>
          <Card className="glass-panel stat-card p-6 text-center glow-border-hover cursor-pointer">
            <p className="text-3xl font-bold text-yellow-400 mb-2">
              <AnimatedCounter end={342} />
            </p>
            <p className="text-sm text-muted-foreground font-medium">Live Anomalies</p>
          </Card>
          <Card className="glass-panel stat-card p-6 text-center glow-border-hover cursor-pointer">
            <p className="text-3xl font-bold text-purple-400 mb-2">
              <AnimatedCounter end={89} />
            </p>
            <p className="text-sm text-muted-foreground font-medium">AI Predictions</p>
          </Card>
          <Card className="glass-panel stat-card p-6 text-center glow-border-hover cursor-pointer">
            <p className="text-3xl font-bold text-green-400 mb-2">
              <AnimatedCounter end={5421098} />
            </p>
            <p className="text-sm text-muted-foreground font-medium">Data Points</p>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="glass-panel p-8 rounded-xl hover:glow-border transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Real-Time Detection</h3>
            <p className="text-muted-foreground">
              Monitor environmental changes instantly with AI-powered analysis of NASA satellite data and weather patterns.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl hover:glow-border transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Predictive Analytics</h3>
            <p className="text-muted-foreground">
              Leverage machine learning to forecast potential natural disasters and environmental anomalies.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl hover:glow-border transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
              <Globe2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Global Coverage</h3>
            <p className="text-muted-foreground">
              Access worldwide environmental data integrated from multiple sources including NASA, weather APIs, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
