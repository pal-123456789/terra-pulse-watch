import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Fetching environmental data for lat: ${latitude}, lon: ${longitude}`);

    // Fetch data from OpenWeather API
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=db762d54fef72d47495b6b7613e0d1c8&units=metric`
    );

    if (!weatherResponse.ok) {
      console.error("Weather API error:", await weatherResponse.text());
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    // Fetch NASA Earth imagery
    const nasaResponse = await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&dim=0.1&api_key=IwCDkErKUYfebd33ifUXKcJEQO4bMLcXtNdohkvu`
    );

    let nasaData = null;
    if (nasaResponse.ok) {
      nasaData = await nasaResponse.json();
    } else {
      console.warn("NASA API error:", await nasaResponse.text());
    }

    // Store environmental data in database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: insertError } = await supabaseClient
      .from("environmental_data")
      .insert({
        latitude: latitude,
        longitude: longitude,
        temperature: weatherData.main?.temp,
        humidity: weatherData.main?.humidity,
        pressure: weatherData.main?.pressure,
        wind_speed: weatherData.wind?.speed,
        weather_condition: weatherData.weather?.[0]?.description,
        data_source: "openweather_nasa",
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
    }

    return new Response(
      JSON.stringify({
        weather: weatherData,
        nasa: nasaData,
        stored: !insertError,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in fetch-environmental-data:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
