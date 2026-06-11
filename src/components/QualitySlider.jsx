function QualitySlider({ quality, onQualityChange, estimatePercent, originalSize, estimateAfterSize }) {
  const formatSize = (bytes) =>
    bytes > 1024 ? `${(bytes / 1024).toFixed(2)} KB` : `${bytes} B`

  return (
    <div className="control-group">
      <label htmlFor="quality-slider">
        Quality: <strong>{Math.round(quality * 100)}%</strong>
      </label>
      <input
        id="quality-slider"
        className="range-input"
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={quality}
        onChange={(event) => onQualityChange(parseFloat(event.target.value))}
      />
      <p className="estimate-text">
        Estimate — Before: {originalSize ? formatSize(originalSize) : '—'} · After: {estimateAfterSize ? formatSize(estimateAfterSize) : '—'} ({estimatePercent}%)
      </p>
    </div>
  )
}

export default QualitySlider
