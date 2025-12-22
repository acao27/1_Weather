import { createUseInstanceStoreState } from '@telemetryos/sdk/react'

// Location Interface
export interface Location {
  id: string
  city: string
  displayName?: string
  lat?: string
  lon?: string
}

// UI Scale (existing)
export const useUiScaleStoreState = createUseInstanceStoreState<number>('ui-scale', 1)

// Location & Display
export const useLocationsStoreState = createUseInstanceStoreState<Location[]>('locations', [])
export const useUseGeolocationStoreState = createUseInstanceStoreState<boolean>('useGeolocation', false)
export const useCycleLocationsStoreState = createUseInstanceStoreState<boolean>('cycleLocations', false)
export const useCycleDurationStoreState = createUseInstanceStoreState<number>('cycleDuration', 30)
export const useTransitionStyleStoreState = createUseInstanceStoreState<'fade' | 'slide' | 'instant'>('transitionStyle', 'fade')

// Forecast Settings
export const useForecastRangeStoreState = createUseInstanceStoreState<'24h' | '3day' | '1week'>('forecastRange', '3day')
export const useTempUnitsStoreState = createUseInstanceStoreState<'imperial' | 'metric'>('tempUnits', 'imperial')

// Time & Date
export const useClockFormatStoreState = createUseInstanceStoreState<'12h' | '24h'>('clockFormat', '12h')
export const useDateFormatStoreState = createUseInstanceStoreState<string>('dateFormat', 'MMM DD, YYYY')

// Visual Customization
export const useBackgroundTypeStoreState = createUseInstanceStoreState<'solid' | 'dynamic' | 'media'>('backgroundType', 'dynamic')
export const useBackgroundColorStoreState = createUseInstanceStoreState<string>('backgroundColor', '#1B2632')
export const useBackgroundMediaIdStoreState = createUseInstanceStoreState<string>('backgroundMediaId', '')
export const useBackgroundOpacityStoreState = createUseInstanceStoreState<number>('backgroundOpacity', 100)
export const useThemeStoreState = createUseInstanceStoreState<'light' | 'dark'>('theme', 'dark')
