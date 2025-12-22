// Mock weather data types for Stage 1
export interface WeatherCondition {
  temp: number
  feelsLike: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  windDirection: string
  precipitation: number
  sunrise: string
  sunset: string
}

export interface ForecastDay {
  day: string
  date: string
  icon: string
  high: number
  low: number
  condition: string
}

export interface HourlyForecast {
  time: string
  temp: number
  icon: string
  condition: string
}




