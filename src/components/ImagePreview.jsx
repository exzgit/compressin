function ImagePreview({ title, src }) {
  if (!src) {
    return null
  }

  return (
    <section className="preview-card">
      <h3>{title}</h3>
      <div className="preview-image">
        <img src={src} alt={title} />
      </div>
    </section>
  )
}

export default ImagePreview
