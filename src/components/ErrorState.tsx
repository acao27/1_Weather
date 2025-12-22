export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Unable to load weather data</h2>
      <p className="error-message">
        Please check your internet connection or try again in a few moments
      </p>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}




