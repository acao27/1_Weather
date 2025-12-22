import type { ForecastDay, HourlyForecast } from "../types/weather";

interface WeatherForecastProps {
  forecastRange: "24h" | "3day" | "1week";
  dailyForecast?: ForecastDay[];
  hourlyForecast?: HourlyForecast[];
  tempUnit: string;
}

export function WeatherForecast({
  forecastRange,
  dailyForecast,
  hourlyForecast,
  tempUnit,
}: WeatherForecastProps) {
  if (forecastRange === "24h" && hourlyForecast) {
    return (
      <div className="forecast-hourly">
        {hourlyForecast.slice(0, 6).map((hour, index) => (
          <div key={index} className="forecast-hour">
            <div>
              <div className="forecast-time">{hour.time}</div>
              <div className="forecast-temp">
                {hour.temp}°{tempUnit === "imperial" ? "F" : "C"}
              </div>
            </div>
            <div className="forecast-icon">{hour.icon}</div>
          </div>
        ))}
      </div>
    );
  }

  if (dailyForecast) {
    const numDays = forecastRange === "3day" ? 3 : 7;
    return (
      <div className="forecast-daily">
        {dailyForecast.slice(0, numDays).map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-day-name">{day.day}</div>
            <div className="forecast-icon">{day.icon}</div>
            <div className="forecast-high">
              {day.high}°{tempUnit === "imperial" ? "F" : "C"}
            </div>
            <div className="forecast-low">
              {day.low}°{tempUnit === "imperial" ? "F" : "C"}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
