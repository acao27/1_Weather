import type { WeatherCondition } from "../types/weather";

interface WeatherDetailsPanelProps {
  conditions: WeatherCondition;
  tempUnit: string;
}

export function WeatherDetailsPanel({
  conditions,
  tempUnit,
}: WeatherDetailsPanelProps) {
  return (
    <div className="weather-details-panel">
      <div className="weather-details-panel-body">
        <div className="detail-item">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">
            {conditions.feelsLike}°{tempUnit === "imperial" ? "F" : "C"}
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{conditions.humidity}%</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Wind</div>
          <div className="detail-value">
            {conditions.windSpeed} {tempUnit === "imperial" ? "mph" : "km/h"}
          </div>
        </div>
      </div>
    </div>
  );
}
