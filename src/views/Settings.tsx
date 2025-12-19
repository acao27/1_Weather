import {
  SettingsContainer,
  SettingsDivider,
  SettingsField,
  SettingsInputFrame,
  SettingsLabel,
  SettingsSliderFrame,
} from '@telemetryos/sdk/react'
import { useSubtitleStoreState, useUiScaleStoreState } from '../hooks/store'

export function Settings() {
  const [isLoadingUiScale, uiScale, setUiScale] = useUiScaleStoreState(0)
  const [isLoading, subtitle, setSubtitle] = useSubtitleStoreState()

  return (
    <SettingsContainer>

      <SettingsField>
        <SettingsLabel>UI Scale</SettingsLabel>
        <SettingsSliderFrame>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            disabled={isLoadingUiScale}
            value={uiScale}
            onChange={(e) => setUiScale(parseFloat(e.target.value))}
          />
          <span>{uiScale}x</span>
        </SettingsSliderFrame>
      </SettingsField>

      <SettingsDivider />

      <SettingsField>
        <SettingsLabel>Subtitle Text</SettingsLabel>
        <SettingsInputFrame>
          <input
            type="text"
            placeholder='Some text for the subtitle...'
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={isLoading}
          />
        </SettingsInputFrame>
      </SettingsField>

    </SettingsContainer>
  )
}
