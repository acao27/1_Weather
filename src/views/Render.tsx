import { useState, useEffect, useRef } from "react";
import { useUiScaleToSetRem } from "@telemetryos/sdk/react";
import {
  useLocationsStoreState,
  useForecastRangeStoreState,
  useTempUnitsStoreState,
  useClockFormatStoreState,
  useDateFormatStoreState,
  useBackgroundTypeStoreState,
  useBackgroundColorStoreState,
  useBackgroundOpacityStoreState,
  useThemeStoreState,
  useUiScaleStoreState,
  useCycleLocationsStoreState,
  useCycleDurationStoreState,
  useTransitionStyleStoreState,
} from "../hooks/store";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { WeatherHeader } from "../components/WeatherHeader";
import { WeatherCurrent } from "../components/WeatherCurrent";
import { WeatherForecast } from "../components/WeatherForecast";
import { WeatherDetailsPanel } from "../components/WeatherDetailsPanel";
import type {
  WeatherCondition,
  ForecastDay,
  HourlyForecast,
} from "../types/weather";
import "./Render.css";

// Mock weather data for Stage 1
const MOCK_CONDITIONS: WeatherCondition = {
  temp: 72,
  feelsLike: 68,
  condition: "PARTLY CLOUDY",
  icon: "🌤️",
  humidity: 45,
  windSpeed: 8,
  windDirection: "NE",
  precipitation: 20,
  sunrise: "6:42 AM",
  sunset: "8:15 PM",
};

const MOCK_DAILY_FORECAST: ForecastDay[] = [
  {
    day: "TUE",
    date: "Dec 22",
    icon: "🌤️",
    high: 75,
    low: 62,
    condition: "Partly Cloudy",
  },
  {
    day: "WED",
    date: "Dec 23",
    icon: "☁️",
    high: 73,
    low: 60,
    condition: "Cloudy",
  },
  {
    day: "THU",
    date: "Dec 24",
    icon: "🌧️",
    high: 69,
    low: 58,
    condition: "Rainy",
  },
  {
    day: "FRI",
    date: "Dec 25",
    icon: "⛅",
    high: 71,
    low: 59,
    condition: "Partly Sunny",
  },
  {
    day: "SAT",
    date: "Dec 26",
    icon: "☀️",
    high: 74,
    low: 61,
    condition: "Sunny",
  },
  {
    day: "SUN",
    date: "Dec 27",
    icon: "🌤️",
    high: 76,
    low: 63,
    condition: "Partly Cloudy",
  },
  {
    day: "MON",
    date: "Dec 28",
    icon: "☁️",
    high: 72,
    low: 60,
    condition: "Cloudy",
  },
];

const MOCK_HOURLY_FORECAST: HourlyForecast[] = [
  { time: "2 PM", temp: 72, icon: "🌤️", condition: "Partly Cloudy" },
  { time: "3 PM", temp: 73, icon: "🌤️", condition: "Partly Cloudy" },
  { time: "4 PM", temp: 71, icon: "☁️", condition: "Cloudy" },
  { time: "5 PM", temp: 69, icon: "☁️", condition: "Cloudy" },
  { time: "6 PM", temp: 67, icon: "🌙", condition: "Clear" },
  { time: "7 PM", temp: 65, icon: "🌙", condition: "Clear" },
];

export function Render() {
  // Store state
  const [, uiScale] = useUiScaleStoreState();
  const [, locations] = useLocationsStoreState();
  const [, forecastRange] = useForecastRangeStoreState();
  const [, tempUnits] = useTempUnitsStoreState();
  const [, clockFormat] = useClockFormatStoreState();
  const [, dateFormat] = useDateFormatStoreState();
  const [, backgroundType] = useBackgroundTypeStoreState();
  const [, backgroundColor] = useBackgroundColorStoreState();
  const [, backgroundOpacity] = useBackgroundOpacityStoreState();
  const [, theme] = useThemeStoreState();
  const [, cycleLocations] = useCycleLocationsStoreState();
  const [, cycleDuration] = useCycleDurationStoreState();
  const [, transitionStyle] = useTransitionStyleStoreState();

  useUiScaleToSetRem(uiScale);

  // Local state
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr =
        clockFormat === "12h"
          ? now.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

      let dateStr = "";
      switch (dateFormat) {
        case "MMM DD, YYYY":
          dateStr = now.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          break;
        case "MM/DD/YYYY":
          dateStr = now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
          break;
        case "DD/MM/YYYY":
          dateStr = now.toLocaleDateString("en-GB");
          break;
        case "YYYY-MM-DD":
          dateStr = now.toISOString().split("T")[0];
          break;
      }

      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [clockFormat, dateFormat]);

  // Location cycling
  useEffect(() => {
    if (!cycleLocations || locations.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(
        () => {
          setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
          setIsTransitioning(false);
        },
        transitionStyle === "fade" ? 500 : transitionStyle === "slide" ? 300 : 0
      );
    }, cycleDuration * 1000);

    return () => clearInterval(interval);
  }, [cycleLocations, locations.length, cycleDuration, transitionStyle]);

  // Responsive container detection
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const aspectRatio = width / height;

      // Determine container class based on size and aspect ratio
      if (aspectRatio < 0.33 || aspectRatio > 3.0) {
        setContainerClass("container--minimal"); // Extreme shapes
      } else if (width < 600 || height < 400) {
        setContainerClass("container--constrained"); // Small sizes
      } else {
        setContainerClass(""); // Full size
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Empty state
  if (locations.length === 0) {
  return (
      <div className="tos-base weather-render" data-theme={theme}>
        <EmptyState />
      </div>
    );
  }

  const currentLocation = locations[currentLocationIndex];

  // Calculate background style
  const backgroundStyle: React.CSSProperties = {};
  if (backgroundType === "solid") {
    backgroundStyle.backgroundColor = backgroundColor;
    backgroundStyle.opacity = backgroundOpacity / 100;
  } else if (backgroundType === "dynamic") {
    // Dynamic background based on weather condition
    // Note: Using custom gradients for weather-specific atmospheres (Stage 1 feature)
    // These complement the platform's standard background system
    if (
      MOCK_CONDITIONS.condition.includes("SUNNY") ||
      MOCK_CONDITIONS.condition.includes("CLEAR")
    ) {
      backgroundStyle.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Clear sky purple
    } else if (MOCK_CONDITIONS.condition.includes("RAIN")) {
      backgroundStyle.background =
        "linear-gradient(135deg, #3a506b 0%, #1c2541 100%)"; // Stormy blue-gray
    } else if (MOCK_CONDITIONS.condition.includes("CLOUDY")) {
      backgroundStyle.background =
        "linear-gradient(135deg, #5f6c7b 0%, #434b54 100%)"; // Overcast gray
    } else {
      backgroundStyle.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Default clear
    }
    backgroundStyle.opacity = backgroundOpacity / 100;
  }

  // Transition class
  const transitionClass = isTransitioning
    ? transitionStyle === "fade"
      ? "transitioning-fade"
      : transitionStyle === "slide"
      ? "transitioning-slide"
      : ""
    : "";

  return (
    <div
      ref={containerRef}
      className={`tos-base weather-render ${containerClass} ${transitionClass}`}
      data-theme={theme}
    >
      {(backgroundType === "solid" || backgroundType === "dynamic") && (
        <div className="weather-background" style={backgroundStyle} />
      )}

      <div className="weather-content">
        <WeatherHeader
          location={currentLocation}
          currentDate={currentDate}
          currentTime={currentTime}
          weatherIcon={MOCK_CONDITIONS.icon}
        />

        <div className="weather-content-body">
          <WeatherCurrent conditions={MOCK_CONDITIONS} tempUnit={tempUnits} />

          <WeatherDetailsPanel
            conditions={MOCK_CONDITIONS}
            tempUnit={tempUnits}
          />
        </div>

        <WeatherForecast
          forecastRange={forecastRange}
          dailyForecast={MOCK_DAILY_FORECAST}
          hourlyForecast={MOCK_HOURLY_FORECAST}
          tempUnit={tempUnits}
        />
      </div>
    </div>
  );
}
