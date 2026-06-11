import { useEffect, useState } from 'react'

function DownloadButton({ disabled, onDownload, fileName }) {
  const [downloading, setDownloading] = useState(false)
  const [count, setCount] = useState(5)

  useEffect(() => {
    let timer
    if (downloading) {
      setCount(5)
      timer = setInterval(() => {
        setCount((c) => {
          if (c <= 1) {
            clearInterval(timer)
            return 0
          }
          return c - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [downloading])

  useEffect(() => {
    if (downloading && count === 0) {
      // perform download after countdown
      onDownload()
      setDownloading(false)
    }
  }, [count, downloading, onDownload])

  const handleClick = () => {
    if (disabled) return
    setDownloading(true)
  }

  return (
    <div>
      <button
        type="button"
        className="button button-primary"
        onClick={handleClick}
        disabled={disabled || downloading}
      >
        {downloading ? `Preparing download... (${count}s)` : `Download ${fileName || 'compressed'}`}
      </button>

      {downloading && (
        <div className="download-status" role="status">
          Downloading... Please wait {count}s
        </div>
      )}

      <div className="ad-spot" aria-hidden>
        {/* ad placeholder — Google Ads script should target this element */}
      </div>
    </div>
  )
}

export default DownloadButton
