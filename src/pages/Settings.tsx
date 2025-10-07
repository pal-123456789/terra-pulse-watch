import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Bell, Lock, Mail, Shield, User } from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email || "");
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="glass-panel">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <CardTitle>Account</CardTitle>
              </div>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Address</Label>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                <Lock className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-panel">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates and alerts via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time alerts in your browser
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-panel">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>Privacy & Data</CardTitle>
              </div>
              <CardDescription>Control your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve the platform by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={saveSettings} className="w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
