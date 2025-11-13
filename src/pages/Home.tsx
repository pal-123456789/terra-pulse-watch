import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe2, TrendingUp, BarChart3, Satellite, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AnimatedCounter from "@/components/AnimatedCounter";
import SearchBar from "@/components/SearchBar";
import QuickActions from "@/components/QuickActions";
import LiveNotifications from "@/components/LiveNotifications";
import ParticleBackground from "@/components/ParticleBackground";
import { Globe3D } from "@/components/Globe3D";
import Footer from "@/components/Footer";
import RealtimeStats from "@/components/RealtimeStats";
import SatelliteTracker from "@/components/SatelliteTracker";
import AIPredictor from "@/components/AIPredictor";
import DataStreamMonitor from "@/components/DataStreamMonitor";

const Home = () => {
  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      {/* Advanced particle background */}
      <ParticleBackground />
      
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-20 relative z-10">
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <SearchBar />
        </div>
        
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-32 animate-fade-in">
          <div className="mb-6 md:mb-8 inline-block">
            <div className="relative w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto touch-none">
              <Globe3D className="pointer-events-auto" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 text-foreground leading-tight">
            Terra<span className="text-primary text-glow animate-pulse-glow">Pulse</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto px-4 leading-relaxed">
            Next-Generation AI-Powered Environmental Intelligence Platform
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Real-time anomaly detection • Predictive analytics • NASA satellite integration • Global coverage
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/dashboard">
              <Button size="lg" className="group relative overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <BarChart3 className="w-5 h-5" />
                  View Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 w-full sm:w-auto">
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Stats Bar - Now Real-time */}
        <RealtimeStats />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-500 group animate-float-3d cursor-pointer" style={{ animationDelay: '0s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Zap className="w-7 h-7 text-primary group-hover:animate-glow-pulse" />
              </div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Real-Time Detection</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Lightning-fast environmental anomaly detection powered by advanced AI algorithms analyzing NASA satellite imagery and real-time sensor networks.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-primary/70">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Active monitoring: 12,847+ sensors</span>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-500 group animate-float-3d cursor-pointer" style={{ animationDelay: '2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <TrendingUp className="w-7 h-7 text-purple-400 group-hover:animate-glow-pulse" />
              </div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold mb-3 text-foreground group-hover:text-purple-400 transition-colors">Predictive Analytics</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Machine learning models trained on decades of environmental data to forecast natural disasters with unprecedented accuracy up to 72 hours ahead.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-purple-400/70">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Prediction accuracy: 89.3%</span>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-500 group animate-float-3d cursor-pointer" style={{ animationDelay: '4s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/30 to-green-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Globe2 className="w-7 h-7 text-green-400 group-hover:animate-glow-pulse" />
              </div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold mb-3 text-foreground group-hover:text-green-400 transition-colors">Global Coverage</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Comprehensive worldwide monitoring through integration with NASA Earth Observing System, NOAA, ESA satellites, and 180+ ground station networks.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-green-400/70">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Coverage: 195 countries</span>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-32 mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Advanced <span className="text-primary text-glow">Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and AI-powered predictions for environmental events worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="animate-slide-in-left">
              <SatelliteTracker />
            </div>
            <div className="animate-slide-in-right">
              <AIPredictor />
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <DataStreamMonitor />
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-32 mb-20">
          <div className="glass-panel p-8 md:p-12 rounded-2xl animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Powered by <span className="text-primary text-glow">Cutting-Edge Technology</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enterprise-grade infrastructure processing petabytes of environmental data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Satellite className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Satellite Network</h3>
                <p className="text-sm text-muted-foreground">12+ satellites • 180+ ground stations</p>
                <div className="mt-4 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-green-400 animate-shimmer" />
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-card/50 border border-border/50 hover:border-purple-400/30 transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">GPT-4 Vision • Neural networks</p>
                <div className="mt-4 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-purple-500 to-pink-500 animate-shimmer" />
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-card/50 border border-border/50 hover:border-green-400/30 transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-500/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">10K+ data points/sec</p>
                <div className="mt-4 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500 animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
