import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe2, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AnimatedCounter from "@/components/AnimatedCounter";
import SearchBar from "@/components/SearchBar";
import QuickActions from "@/components/QuickActions";
import LiveNotifications from "@/components/LiveNotifications";
import { Globe3D } from "@/components/Globe3D";
import Footer from "@/components/Footer";
import RealtimeStats from "@/components/RealtimeStats";

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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-20 relative z-10">
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <SearchBar />
        </div>
        
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-32 animate-fade-in">
          <div className="mb-6 md:mb-8 inline-block">
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
              <Globe3D />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-foreground">
            Terra<span className="text-primary text-glow">Pulse</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            AI-Powered Environmental Monitoring System
            <br className="hidden sm:block" />
            <span className="block mt-2">Detecting and predicting natural anomalies in real-time</span>
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
          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-300 group animate-float-3d" style={{ animationDelay: '0s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">Real-Time Detection</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Monitor environmental changes instantly with AI-powered analysis of NASA satellite data and weather patterns.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-300 group animate-float-3d" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">Predictive Analytics</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Leverage machine learning to forecast potential natural disasters and environmental anomalies.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-xl hover:glow-border transition-all duration-300 group animate-float-3d" style={{ animationDelay: '4s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
              <Globe2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">Global Coverage</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Access worldwide environmental data integrated from multiple sources including NASA, weather APIs, and more.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
