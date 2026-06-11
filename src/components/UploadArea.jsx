function UploadArea({ onFileSelect, error, disabled, previewSrc, onClear, fileName, fileSize }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div
      className="upload-area"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      {previewSrc ? (
        <div className="upload-preview-card">
          <button type="button" className="upload-clear" onClick={onClear}>
            ×
          </button>
          <img src={previewSrc} alt="Image preview" className="upload-preview-image" />
          <div className="upload-preview-meta">
            <span>{fileName}</span>
            <span>{fileSize}</span>
          </div>
          <label className="upload-change" htmlFor="image-upload">
            Change image
          </label>
        </div>
      ) : (
        <label className="upload-label" htmlFor="image-upload">
          <span>Upload image here</span>
          <strong>or drag file here</strong>
        </label>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default UploadArea
