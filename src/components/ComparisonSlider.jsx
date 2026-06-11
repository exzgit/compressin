import { useEffect, useRef, useState } from 'react'

function ComparisonSlider({ beforeSrc, afterSrc }) {
  const beforeRef = useRef(null)
  const afterRef = useRef(null)
  const loaded = useRef({ before: false, after: false })
  const [commonHeight, setCommonHeight] = useState(null)

  useEffect(() => {
    // reset when sources change
    loaded.current = { before: false, after: false }
    setCommonHeight(null)
  }, [beforeSrc, afterSrc])

  const measure = () => {
    const b = beforeRef.current
    const a = afterRef.current
    if (!b || !a) return
    const bh = Math.ceil(b.getBoundingClientRect().height)
    const ah = Math.ceil(a.getBoundingClientRect().height)
    const max = Math.max(bh, ah)
    if (max && max !== commonHeight) setCommonHeight(max)
  }

  useEffect(() => {
    const onResize = () => {
      // allow layout to settle
      requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onLoad = (which) => {
    loaded.current[which] = true
    if (loaded.current.before && loaded.current.after) {
      // measure after both images have loaded
      requestAnimationFrame(measure)
    }
  }

  if (!beforeSrc || !afterSrc) return null

  const panelStyle = commonHeight ? { height: `${commonHeight}px` } : undefined

  return (
    <div className="comparison-simple">
      <div className="comparison-panel before" style={panelStyle}>
        <img ref={beforeRef} src={beforeSrc} alt="Sebelum" className="comparison-img" draggable={false} onLoad={() => onLoad('before')} />
        <div className="comparison-label">Sebelum</div>
      </div>

      <div className="comparison-panel after" style={panelStyle}>
        <img ref={afterRef} src={afterSrc} alt="Sesudah" className="comparison-img" draggable={false} onLoad={() => onLoad('after')} />
        <div className="comparison-label">Sesudah</div>
      </div>
    </div>
  )
}

export default ComparisonSlider
