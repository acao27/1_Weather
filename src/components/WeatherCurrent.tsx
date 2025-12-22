import type { WeatherCondition } from "../types/weather";

interface WeatherCurrentProps {
  conditions: WeatherCondition;
  tempUnit: string;
}

export function WeatherCurrent({ conditions, tempUnit }: WeatherCurrentProps) {
  return (
    <div className="weather-main">
      <div className="condition p1">{conditions.condition}</div>
      <div className="temperature p1">
        {conditions.temp}°{tempUnit === "imperial" ? "F" : "C"}
      </div>
      <div className="feels-like p2">
        Feels like {conditions.feelsLike}°{tempUnit === "imperial" ? "F" : "C"}
      </div>
    </div>
  );
}
