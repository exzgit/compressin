import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import ComparisonSlider from './components/ComparisonSlider'
import DownloadButton from './components/DownloadButton'
import QualitySlider from './components/QualitySlider'
import ResultInfo from './components/ResultInfo'
import UploadArea from './components/UploadArea'
import { compressImage } from './utils/compressImage'
import Logo from './assets/logo.png'
import './App.css'

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

function App() {
  const [view, setView] = useState('home') // 'home' or 'result'
  const [originalFile, setOriginalFile] = useState(null)
  const [originalSrc, setOriginalSrc] = useState('')
  const [compressedBlob, setCompressedBlob] = useState(null)
  const [compressedSrc, setCompressedSrc] = useState('')
  const [quality, setQuality] = useState(0.8)
  const [outputFormat, setOutputFormat] = useState('image/jpeg')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!originalFile) {
      setOriginalSrc('')
      return
    }

    const url = URL.createObjectURL(originalFile)
    setOriginalSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [originalFile])

  useEffect(() => {
    if (!compressedBlob) {
      setCompressedSrc('')
      return
    }

    const url = URL.createObjectURL(compressedBlob)
    setCompressedSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [compressedBlob])

  const originalSize = originalFile?.size || 0
  const compressedSize = compressedBlob?.size || 0

  const estimateReduction = useMemo(() => {
    if (!originalFile) return 0
    const minValue = outputFormat === 'image/webp' ? 18 : 8
    const maxValue = outputFormat === 'image/webp' ? 78 : 55
    return Math.round(minValue + (1 - quality) * (maxValue - minValue))
  }, [originalFile, outputFormat, quality])

  const estimateAfterSize = useMemo(() => {
    if (!originalFile) return 0
    const after = Math.round(originalFile.size * (1 - estimateReduction / 100))
    return Math.max(0, after)
  }, [originalFile, estimateReduction])

  const fileSizeLabel = useMemo(() => {
    if (!originalFile) return ''
    return originalFile.size >= 1024
      ? `${(originalFile.size / 1024).toFixed(1)} KB`
      : `${originalFile.size} B`
  }, [originalFile])

  const handleFileSelect = (file) => {
    setError('')
    setCompressedBlob(null)

    if (!file) return

    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Please choose JPEG, PNG, WebP, GIF, or SVG.')
      return
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      setError('File is too large. Maximum 10 MB.')
      return
    }

    setOriginalFile(file)
  }

  const handleCompress = async () => {
    if (!originalFile) {
      setError('Please select an image first.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const blob = await compressImage(originalFile, quality, outputFormat)
      setCompressedBlob(blob)
      setView('result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat kompresi.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setOriginalFile(null)
    setCompressedBlob(null)
    setError('')
    setQuality(0.8)
    setOutputFormat('image/jpeg')
  }

  const downloadName = useMemo(() => {
    if (!originalFile) return 'compressed-image'
    const suffix = outputFormat === 'image/webp' ? 'webp' : 'jpg'
    const name = originalFile.name.replace(/\.[^.]+$/, '')
    return `${name}-compressed.${suffix}`
  }, [originalFile, outputFormat])

  const handleDownload = () => {
    if (!compressedBlob) return
    const link = document.createElement('a')
    link.href = URL.createObjectURL(compressedBlob)
    link.download = downloadName
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <img src={Logo} alt="Logo" className="topbar-logo" />
          <p className="topbar-name">Compressin</p>
        </div>
      </header>

      <main className="app-shell">
        {view === 'home' && (
          <>
            <UploadArea
              onFileSelect={handleFileSelect}
              error={error}
              disabled={loading}
              previewSrc={originalSrc}
              onClear={handleClear}
              fileName={originalFile?.name}
              fileSize={fileSizeLabel}
            />

            {originalFile && (
              <div className="settings-panel">
                <div className="control-group">
                  <label htmlFor="output-format">Output format</label>
                  <select
                    id="output-format"
                    value={outputFormat}
                    onChange={(event) => setOutputFormat(event.target.value)}
                    className="select-input"
                  >
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>

                <QualitySlider
                  quality={quality}
                  onQualityChange={setQuality}
                  estimatePercent={estimateReduction}
                  originalSize={originalSize}
                  estimateAfterSize={estimateAfterSize}
                />

                <button
                  type="button"
                  className="button button-primary"
                  onClick={handleCompress}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Compress'}
                </button>
              </div>
            )}
          </>
        )}

        {view === 'result' && compressedBlob && (
          <div className="result-panel">
            <div className="result-header">
              <button type="button" className="back-button" onClick={() => setView('home')} aria-label="Back">
                <ArrowLeft size={18} />
              </button>
              <h2 className="result-title">Hasil Kompresi</h2>
            </div>

            <ComparisonSlider beforeSrc={originalSrc} afterSrc={compressedSrc} />
            <ResultInfo originalSize={originalSize} compressedSize={compressedSize} />
            <div className="action-row">
              <DownloadButton onDownload={handleDownload} fileName={downloadName} />
            </div>
          </div>
        )}

        <div className="visually-hidden" aria-hidden="true">
          <p>Comressin is a fast browser-based image compressor for JPEG, PNG, WebP, GIF, and SVG images. Compress images online, preview before download, and save optimized photos directly from your browser.</p>
          <p>Use ImgCompress to reduce JPEG size, shrink PNG files, convert to WebP, and download high-quality compressed images for social media, web pages, email, and mobile use.</p>
          <p>Compression is safe, and we do not store any user data. Privacy is protected throughout every compression process.</p>
        </div>
      </main>
    </>
  )
}

export default App
