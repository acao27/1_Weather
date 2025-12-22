import type { ForecastDay, HourlyForecast } from "../types/weather";

interface WeatherForecastProps {
  forecastRange: "24h" | "1week";
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
    const hours = hourlyForecast.slice(0, 6);
    // Duplicate first 3 items for infinite carousel (used by Tall Rectangle zone)
    const hoursWithDuplicates = [...hours, ...hours.slice(0, 3)];

    return (
      <div className="forecast-hourly">
        {hoursWithDuplicates.map((hour, index) => (
          <div key={`hour-${index}`} className="forecast-hour">
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

  if (forecastRange === "1week" && dailyForecast) {
    const days = dailyForecast.slice(0, 7);
    // Duplicate first 3 items for infinite carousel (used by Tall Rectangle zone)
    const daysWithDuplicates = [...days, ...days.slice(0, 3)];

    return (
      <div className="forecast-daily">
        {daysWithDuplicates.map((day, index) => (
          <div key={`day-${index}`} className="forecast-day">
            <div className="forecast-day-name">{day.day}</div>
            <div className="forecast-day-content">
              <div>
                <div className="forecast-high">
                  {day.high}°{tempUnit === "imperial" ? "F" : "C"}
                </div>
                <div className="forecast-low">
                  {day.low}°{tempUnit === "imperial" ? "F" : "C"}
                </div>
              </div>
              <div className="forecast-icon">{day.icon}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
