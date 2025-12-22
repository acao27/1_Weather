import type { Location } from "../hooks/store";

interface WeatherHeaderProps {
  location: Location;
  currentDate: string;
  currentTime: string;
  weatherIcon?: string;
}

export function WeatherHeader({
  location,
  currentDate,
  currentTime,
  weatherIcon,
}: WeatherHeaderProps) {
  return (
    <div className="weather-header">
      <div className="location-info">
        <div className="location-name">
          {location.displayName || location.city}
        </div>
        <div className="current-time-container">
          <div className="current-time">{currentTime}</div>
          <div className="current-date">{currentDate}</div>
        </div>
      </div>
      {weatherIcon && <div className="weather-icon">{weatherIcon}</div>}
    </div>
  );
}
