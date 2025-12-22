export function LoadingState({ locationName }: { locationName?: string }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading weather data...</div>
      {locationName && <div className="loading-location">{locationName}</div>}
    </div>
  )
}




