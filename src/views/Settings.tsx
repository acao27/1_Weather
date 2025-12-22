import { useState } from 'react'
import {
  SettingsContainer,
  SettingsDivider,
  SettingsField,
  SettingsInputFrame,
  SettingsLabel,
  SettingsSelectFrame,
  SettingsSliderFrame,
  SettingsSwitchFrame,
  SettingsSwitchLabel,
  SettingsBox,
  SettingsButtonFrame,
} from '@telemetryos/sdk/react'
import {
  useLocationsStoreState,
  useUseGeolocationStoreState,
  useCycleLocationsStoreState,
  useCycleDurationStoreState,
  useTransitionStyleStoreState,
  useForecastRangeStoreState,
  useTempUnitsStoreState,
  useClockFormatStoreState,
  useDateFormatStoreState,
  useBackgroundTypeStoreState,
  useBackgroundColorStoreState,
  useBackgroundOpacityStoreState,
  useThemeStoreState,
  useUiScaleStoreState,
  type Location,
} from '../hooks/store'

export function Settings() {
  // Location Settings
  const [isLoadingLocations, locations, setLocations] = useLocationsStoreState()
  const [, useGeolocation, setUseGeolocation] = useUseGeolocationStoreState()
  const [, cycleLocations, setCycleLocations] = useCycleLocationsStoreState()
  const [, cycleDuration, setCycleDuration] = useCycleDurationStoreState()
  const [, transitionStyle, setTransitionStyle] = useTransitionStyleStoreState()
  
  // Display Settings
  const [, forecastRange, setForecastRange] = useForecastRangeStoreState()
  const [, tempUnits, setTempUnits] = useTempUnitsStoreState()
  const [, clockFormat, setClockFormat] = useClockFormatStoreState()
  const [, dateFormat, setDateFormat] = useDateFormatStoreState()
  
  // Visual Settings
  const [, backgroundType, setBackgroundType] = useBackgroundTypeStoreState()
  const [, backgroundColor, setBackgroundColor] = useBackgroundColorStoreState()
  const [, backgroundOpacity, setBackgroundOpacity] = useBackgroundOpacityStoreState()
  const [, theme, setTheme] = useThemeStoreState()
  const [, uiScale, setUiScale] = useUiScaleStoreState()

  // Local state for adding locations
  const [newLocationCity, setNewLocationCity] = useState('')
  const [newLocationDisplayName, setNewLocationDisplayName] = useState('')

  const handleAddLocation = () => {
    if (!newLocationCity.trim()) return
    
    const newLocation: Location = {
      id: Date.now().toString(),
      city: newLocationCity.trim(),
      displayName: newLocationDisplayName.trim() || undefined,
    }
    
    setLocations([...locations, newLocation])
    setNewLocationCity('')
    setNewLocationDisplayName('')
  }

  const handleRemoveLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id))
  }

  // Handle geolocation toggle - Stage 1 uses mock data
  const handleGeolocationToggle = (enabled: boolean) => {
    setUseGeolocation(enabled)
    
    if (enabled) {
      // Stage 1: Add mock detected location
      const mockDetectedLocation: Location = {
        id: 'geolocation-detected',
        city: 'San Francisco, CA',
        displayName: 'Current Location',
      }
      setLocations([mockDetectedLocation])
    } else {
      // Clear geolocation location when disabled
      setLocations(locations.filter(loc => loc.id !== 'geolocation-detected'))
    }
  }

  return (
    <SettingsContainer>
      {/* Location Configuration */}
      <SettingsField>
        <SettingsLabel>LOCATION CONFIGURATION</SettingsLabel>
      </SettingsField>

      <SettingsField>
        <SettingsSwitchFrame>
          <input
            type="checkbox"
            role="switch"
            checked={useGeolocation}
            onChange={(e) => handleGeolocationToggle(e.target.checked)}
          />
          <SettingsSwitchLabel>Use device geolocation (Stage 1: Mock)</SettingsSwitchLabel>
        </SettingsSwitchFrame>
      </SettingsField>

      {useGeolocation && (
        <SettingsBox>
          <SettingsField>
            <SettingsLabel>📍 Detected Location (Mock for Stage 1)</SettingsLabel>
            <div style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--color-text)', 
              marginTop: 'var(--space-2)' 
            }}>
              San Francisco, CA
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-xs)', 
              color: 'var(--color-text-muted)', 
              marginTop: 'var(--space-1)',
              fontStyle: 'italic'
            }}>
              In Stage 2, this will use actual device geolocation
            </div>
          </SettingsField>
        </SettingsBox>
      )}

      <SettingsDivider />

      {!useGeolocation && (
        <>
          <SettingsField>
            <SettingsLabel>Locations</SettingsLabel>
          </SettingsField>

          {locations.map((location) => (
            <SettingsBox key={location.id}>
              <SettingsField>
                <SettingsLabel>City: {location.city}</SettingsLabel>
                {location.displayName && (
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                    Display as: {location.displayName}
                  </div>
                )}
              </SettingsField>
              <SettingsButtonFrame>
                <button onClick={() => handleRemoveLocation(location.id)}>Remove</button>
              </SettingsButtonFrame>
            </SettingsBox>
          ))}

          <SettingsField>
            <SettingsLabel>Add New Location</SettingsLabel>
            <SettingsInputFrame>
              <input
                type="text"
                placeholder="Enter city name (e.g., Vancouver, BC)"
                value={newLocationCity}
                onChange={(e) => setNewLocationCity(e.target.value)}
              />
            </SettingsInputFrame>
          </SettingsField>

          <SettingsField>
            <SettingsLabel>Display Name (Optional)</SettingsLabel>
            <SettingsInputFrame>
              <input
                type="text"
                placeholder="Custom display name"
                value={newLocationDisplayName}
                onChange={(e) => setNewLocationDisplayName(e.target.value)}
              />
            </SettingsInputFrame>
          </SettingsField>

          <SettingsButtonFrame>
            <button onClick={handleAddLocation} disabled={!newLocationCity.trim()}>
              Add Location
            </button>
          </SettingsButtonFrame>
        </>
      )}

      <SettingsDivider />

      <SettingsField>
        <SettingsSwitchFrame>
          <input
            type="checkbox"
            role="switch"
            checked={cycleLocations}
            onChange={(e) => setCycleLocations(e.target.checked)}
            disabled={useGeolocation || locations.length <= 1}
          />
          <SettingsSwitchLabel>
            Cycle between locations
            {(useGeolocation || locations.length <= 1) && (
              <span style={{ 
                fontSize: 'var(--font-size-xs)', 
                color: 'var(--color-text-muted)', 
                marginLeft: 'var(--space-2)',
                fontStyle: 'italic'
              }}>
                (requires multiple locations)
              </span>
            )}
          </SettingsSwitchLabel>
        </SettingsSwitchFrame>
      </SettingsField>

      {cycleLocations && (
        <>
          <SettingsField>
            <SettingsLabel>Cycle Duration (seconds)</SettingsLabel>
            <SettingsSliderFrame>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={cycleDuration}
                onChange={(e) => setCycleDuration(parseInt(e.target.value))}
              />
              <span>{cycleDuration}s</span>
            </SettingsSliderFrame>
          </SettingsField>

          <SettingsField>
            <SettingsLabel>Transition Style</SettingsLabel>
            <SettingsSelectFrame>
              <select value={transitionStyle} onChange={(e) => setTransitionStyle(e.target.value as any)}>
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="instant">Instant</option>
              </select>
            </SettingsSelectFrame>
          </SettingsField>
        </>
      )}

      <SettingsDivider />

      {/* Display Settings */}
      <SettingsField>
        <SettingsLabel>DISPLAY SETTINGS</SettingsLabel>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Forecast Range</SettingsLabel>
        <SettingsSelectFrame>
          <select value={forecastRange} onChange={(e) => setForecastRange(e.target.value as any)}>
            <option value="24h">24-hour view (hourly)</option>
            <option value="1week">1-week view (weekly)</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Temperature Units</SettingsLabel>
        <SettingsSelectFrame>
          <select value={tempUnits} onChange={(e) => setTempUnits(e.target.value as any)}>
            <option value="imperial">Fahrenheit (°F)</option>
            <option value="metric">Celsius (°C)</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Clock Format</SettingsLabel>
        <SettingsSelectFrame>
          <select value={clockFormat} onChange={(e) => setClockFormat(e.target.value as any)}>
            <option value="12h">12-hour (3:45 PM)</option>
            <option value="24h">24-hour (15:45)</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Date Format</SettingsLabel>
        <SettingsSelectFrame>
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
            <option value="MMM DD, YYYY">MMM DD, YYYY (Dec 21, 2025)</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY (12/21/2025)</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY (21/12/2025)</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-21)</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      <SettingsDivider />

      {/* Visual Customization */}
      <SettingsField>
        <SettingsLabel>VISUAL CUSTOMIZATION</SettingsLabel>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Background Type</SettingsLabel>
        <SettingsSelectFrame>
          <select value={backgroundType} onChange={(e) => setBackgroundType(e.target.value as any)}>
            <option value="solid">Solid color</option>
            <option value="dynamic">Dynamic (match weather)</option>
            <option value="media">Image/Video from library</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      {backgroundType === 'solid' && (
        <SettingsField>
          <SettingsLabel>Background Color</SettingsLabel>
          <SettingsInputFrame>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              placeholder="#1B2632"
              style={{ marginLeft: 'var(--space-2)' }}
            />
          </SettingsInputFrame>
        </SettingsField>
      )}

      <SettingsField>
        <SettingsLabel>Background Opacity</SettingsLabel>
        <SettingsSliderFrame>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={backgroundOpacity}
            onChange={(e) => setBackgroundOpacity(parseInt(e.target.value))}
          />
          <span>{backgroundOpacity}%</span>
        </SettingsSliderFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Theme</SettingsLabel>
        <SettingsSelectFrame>
          <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </SettingsSelectFrame>
      </SettingsField>

      <SettingsDivider />

      {/* UI Scale */}
      <SettingsField>
        <SettingsLabel>UI Scale</SettingsLabel>
        <SettingsSliderFrame>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={uiScale}
            onChange={(e) => setUiScale(parseFloat(e.target.value))}
          />
          <span>{uiScale}x</span>
        </SettingsSliderFrame>
      </SettingsField>
    </SettingsContainer>
  )
}
