function ResultInfo({ originalSize, compressedSize }) {
  if (!originalSize) {
    return null
  }

  const reduction = compressedSize
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0
  const percent = reduction >= 0 ? `${reduction}%` : `-${Math.abs(reduction)}%`

  const formatSize = (bytes) =>
    bytes > 1024
      ? `${(bytes / 1024).toFixed(2)} KB`
      : `${bytes} B`

  return (
    <div className="result-info">
      <div>
        <p className="info-label">Sebelum</p>
        <strong>{formatSize(originalSize)}</strong>
      </div>
      <div>
        <p className="info-label">Sesudah</p>
        <strong>{compressedSize ? formatSize(compressedSize) : '—'}</strong>
      </div>
      <div>
        <p className="info-label">Pengurangan</p>
        <strong>{compressedSize ? percent : '—'}</strong>
      </div>
    </div>
  )
}

export default ResultInfo
