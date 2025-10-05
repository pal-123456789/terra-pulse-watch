import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Activity, AlertTriangle, MapPin, TrendingUp } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "report" | "detection" | "prediction" | "analysis";
  location: string;
  message: string;
  time: string;
  severity?: "low" | "medium" | "high";
  coordinates: [number, number];
}

const ActivityMarker = ({ activity }: { activity: ActivityItem }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsNew(true);
    const timer = setTimeout(() => setIsNew(false), 2000);
    return () => clearTimeout(timer);
  }, [activity.id]);

  const getColor = (severity?: string) => {
    switch (severity) {
      case "high": return "#ef4444";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#00e5ff";
    }
  };

  const getIcon = (type: string) => {
    const iconProps = { className: "w-3 h-3", strokeWidth: 2 };
    switch (type) {
      case "report": return <MapPin {...iconProps} />;
      case "detection": return <AlertTriangle {...iconProps} />;
      case "prediction": return <TrendingUp {...iconProps} />;
      default: return <Activity {...iconProps} />;
    }
  };

  const radius = isNew ? 15 : 8;

  return (
    <CircleMarker
      center={activity.coordinates}
      radius={radius}
      pathOptions={{
        fillColor: getColor(activity.severity),
        color: getColor(activity.severity),
        weight: 2,
        opacity: isNew ? 1 : 0.8,
        fillOpacity: isNew ? 0.8 : 0.6,
      }}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            {getIcon(activity.type)}
            <span className="font-bold text-sm">{activity.message}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{activity.location}</span>
            </div>
            <div>{activity.time}</div>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

const GlobalMap = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const locationCoordinates: Record<string, [number, number]> = {
    "Amazon Basin": [-3.4653, -62.2159],
    "Arctic Circle": [66.5633, -45.6469],
    "Pacific Ocean": [0, -160],
    "Sahara Desert": [23.4162, 25.6628],
    "Himalayas": [27.9881, 86.9250],
    "Great Barrier Reef": [-18.2871, 147.6992],
    "Congo Rainforest": [-0.7893, 23.6564],
    "Antarctic": [-82.8628, 135.0000],
    "Mediterranean Sea": [35.0000, 18.0000],
    "Siberia": [60.0000, 105.0000],
    "California": [36.7783, -119.4179],
    "Indonesia": [-0.7893, 113.9213],
  };

  const generateActivity = (): ActivityItem => {
    const types: ActivityItem["type"][] = ["report", "detection", "prediction", "analysis"];
    const severities: ActivityItem["severity"][] = ["low", "medium", "high"];
    const locations = Object.keys(locationCoordinates);
    const messages = [
      "Environmental anomaly detected",
      "New observation report submitted",
      "Weather pattern analysis completed",
      "Temperature spike recorded",
      "Air quality measurement logged",
      "Precipitation forecast updated",
      "Seismic activity monitored",
      "Atmospheric pressure change noted"
    ];

    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      id: `activity-${Date.now()}-${Math.random()}`,
      type: types[Math.floor(Math.random() * types.length)],
      location,
      message: messages[Math.floor(Math.random() * messages.length)],
      time: "Just now",
      severity: severities[Math.floor(Math.random() * severities.length)],
      coordinates: locationCoordinates[location],
    };
  };

  useEffect(() => {
    // Generate initial activities
    const initialActivities = Array.from({ length: 8 }, () => ({
      ...generateActivity(),
      time: `${Math.floor(Math.random() * 10)}m ago`
    }));
    setActivities(initialActivities);

    // Add new activity every 3-5 seconds
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 15)]);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', background: 'hsl(var(--background))' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {activities.map((activity) => (
          <ActivityMarker key={activity.id} activity={activity} />
        ))}
      </MapContainer>
      
      {/* Overlay gradient for better integration */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20 rounded-lg" />
    </div>
  );
};

export default GlobalMap;
