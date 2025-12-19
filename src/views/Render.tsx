import { useUiScaleToSetRem } from '@telemetryos/sdk/react'
import wordMarkPath from '../../assets/telemetryos-wordmark.svg'
import { useSubtitleStoreState, useUiScaleStoreState } from '../hooks/store'
import './Render.css'

export function Render() {
  const [_isUiScaleLoading, uiScale] = useUiScaleStoreState()
  useUiScaleToSetRem(uiScale)
  const [isLoading, subtitle] = useSubtitleStoreState()

  return (
    <div className="render">
      <img src={wordMarkPath} alt="TelemetryOS" className="render__logo" />
      <div className="render__hero">
        {uiScale < 1.5 && (
          <div className="render__hero-title">Welcome to TelemetryOS SDK</div>
        )}
        <div className="render__hero-subtitle">{isLoading ? 'Loading...' : subtitle}</div>
      </div>
      <div className="render__docs-information">
        {uiScale < 1.2 && (
          <>
            <div className="render__docs-information-title">
              To get started, edit the Render.tsx and Settings.tsx files
            </div>
            <div className="render__docs-information-text">
              Visit our documentation on building applications to learn more
            </div>
          </>
        )}
        {uiScale < 1.35 && (
          <a
            className="render__docs-information-button"
            href="https://docs.telemetryos.com/docs/sdk-getting-started"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
        )}
      </div>
    </div>
  )
}
