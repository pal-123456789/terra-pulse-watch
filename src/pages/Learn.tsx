import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Globe, 
  Thermometer, 
  Droplets, 
  Wind,
  Activity,
  Sparkles,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

interface EnvironmentalData {
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather_condition: string;
  created_at: string;
}

interface AnomalyData {
  name: string;
  severity: string;
  detected_at: string;
}

const Learn = () => {
  const [liveData, setLiveData] = useState<EnvironmentalData | null>(null);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [activeAnomalies, setActiveAnomalies] = useState<AnomalyData[]>([]);
  const [funFact, setFunFact] = useState("");
  const [loading, setLoading] = useState(true);

  const funFacts = [
    "🌍 Earth's atmosphere is 78% nitrogen and 21% oxygen!",
    "🌊 The ocean produces over 50% of the world's oxygen",
    "⚡ A single lightning bolt contains 1 billion volts of electricity",
    "🌡️ The warmest year on record was 2023",
    "💨 Wind speed is measured in knots, mph, or m/s",
    "🌪️ Tornadoes can have wind speeds exceeding 300 mph",
    "❄️ No two snowflakes are exactly alike",
    "🌈 Rainbows are actually full circles, we only see half from the ground",
    "☁️ Clouds can weigh over 1 million pounds!",
    "🌋 There are about 1,500 active volcanoes on Earth"
  ];

  useEffect(() => {
    fetchInitialData();
    setupRealtimeSubscriptions();
    
    // Rotate fun facts every 10 seconds
    const factInterval = setInterval(() => {
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 10000);

    setFunFact(funFacts[0]);

    return () => {
      clearInterval(factInterval);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch latest environmental data
      const { data: envData } = await supabase
        .from("environmental_data")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (envData) setLiveData(envData);

      // Fetch active anomalies
      const { data: anomalies } = await supabase
        .from("anomalies")
        .select("name, severity, detected_at")
        .eq("status", "active")
        .order("detected_at", { ascending: false })
        .limit(5);

      if (anomalies) {
        setActiveAnomalies(anomalies);
        setAnomalyCount(anomalies.length);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load learning data");
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to new environmental data
    const envChannel = supabase
      .channel("env-data-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "environmental_data"
        },
        (payload) => {
          setLiveData(payload.new as EnvironmentalData);
          toast.success("🌍 New environmental data received!", {
            description: "Learning section updated with real-time data"
          });
        }
      )
      .subscribe();

    // Subscribe to anomaly changes
    const anomalyChannel = supabase
      .channel("anomaly-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "anomalies"
        },
        () => {
          fetchInitialData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(envChannel);
      supabase.removeChannel(anomalyChannel);
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24 min-h-screen flex items-center justify-center">
        <Activity className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Learn & Explore
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover real-time environmental insights, track global patterns, and expand your knowledge with live data
          </p>
        </div>

        {/* Fun Fact Banner */}
        <Card className="glass-panel border-primary/20 animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Did You Know?</h3>
                <p className="text-muted-foreground text-lg">{funFact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="realtime" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="realtime" className="text-base">
              <Zap className="w-4 h-4 mr-2" />
              Real-Time Data
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-base">
              <TrendingUp className="w-4 h-4 mr-2" />
              Global Insights
            </TabsTrigger>
            <TabsTrigger value="education" className="text-base">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn More
            </TabsTrigger>
          </TabsList>

          {/* Real-Time Data Tab */}
          <TabsContent value="realtime" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-panel hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="w-5 h-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {liveData?.temperature?.toFixed(1) || "--"}°C
                  </div>
                  <Progress 
                    value={((liveData?.temperature || 0) / 50) * 100} 
                    className="mt-3"
                  />
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                  <Droplets className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {liveData?.humidity?.toFixed(0) || "--"}%
                  </div>
                  <Progress 
                    value={liveData?.humidity || 0} 
                    className="mt-3"
                  />
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
                  <Wind className="w-5 h-5 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {liveData?.wind_speed?.toFixed(1) || "--"} m/s
                  </div>
                  <Progress 
                    value={((liveData?.wind_speed || 0) / 30) * 100} 
                    className="mt-3"
                  />
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pressure</CardTitle>
                  <Activity className="w-5 h-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {liveData?.pressure?.toFixed(0) || "--"} hPa
                  </div>
                  <Progress 
                    value={((liveData?.pressure || 1000) / 1100) * 100} 
                    className="mt-3"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Active Anomalies */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Active Environmental Events ({anomalyCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeAnomalies.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No active anomalies detected. Environment is stable! 🌍
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeAnomalies.map((anomaly, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 rounded-lg bg-card/50 border animate-fade-in"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold">{anomaly.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Detected: {new Date(anomaly.detected_at).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Global Insights Tab */}
          <TabsContent value="insights" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Climate Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Global Temperature Rise</span>
                      <span className="font-semibold">+1.1°C</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sea Level Rise</span>
                      <span className="font-semibold">+21cm</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Arctic Ice Decline</span>
                      <span className="font-semibold">-13%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Monitoring Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Sensors</span>
                    <span className="text-2xl font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Points Today</span>
                    <span className="text-2xl font-bold">45.8K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Countries Covered</span>
                    <span className="text-2xl font-bold">127</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Thermometer className="w-10 h-10 text-orange-500 mb-2" />
                  <CardTitle>Temperature</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Temperature measures thermal energy in the atmosphere.</p>
                  <p className="font-semibold text-foreground">Normal Range: -20°C to 45°C</p>
                  <p>Extreme temperatures can indicate climate anomalies or severe weather patterns.</p>
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Droplets className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>Humidity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Humidity is the amount of water vapor in the air.</p>
                  <p className="font-semibold text-foreground">Normal Range: 30% - 70%</p>
                  <p>High humidity can make temperatures feel hotter, while low humidity can cause dryness.</p>
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Wind className="w-10 h-10 text-cyan-500 mb-2" />
                  <CardTitle>Wind Speed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Wind is caused by differences in atmospheric pressure.</p>
                  <p className="font-semibold text-foreground">Scale: 0-30+ m/s</p>
                  <p>Strong winds can indicate storm systems or pressure changes.</p>
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Activity className="w-10 h-10 text-purple-500 mb-2" />
                  <CardTitle>Atmospheric Pressure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Pressure measures the weight of air above us.</p>
                  <p className="font-semibold text-foreground">Normal: ~1013 hPa</p>
                  <p>Changes in pressure can predict weather patterns and storms.</p>
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Globe className="w-10 h-10 text-green-500 mb-2" />
                  <CardTitle>Climate Change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Long-term shifts in global temperatures and weather patterns.</p>
                  <p className="font-semibold text-foreground">Primary cause: Human activities</p>
                  <p>Monitoring helps us understand and respond to these changes.</p>
                </CardContent>
              </Card>

              <Card className="glass-panel hover-scale">
                <CardHeader>
                  <Zap className="w-10 h-10 text-yellow-500 mb-2" />
                  <CardTitle>Anomaly Detection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>AI identifies unusual patterns in environmental data.</p>
                  <p className="font-semibold text-foreground">Early Warning System</p>
                  <p>Helps predict and prepare for extreme weather events.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>

      <Footer />
    </div>
  );
};

export default Learn;
