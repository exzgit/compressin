function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Gagal memuat gambar'))
    image.src = dataUrl
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      type,
      quality,
    )
  })
}

export async function compressImage(file, quality, outputType) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('File bukan gambar yang valid')
  }

  const dataUrl = await readFileAsDataURL(file)
  const image = await loadImage(dataUrl)

  const maxDimension = 3000
  const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height))
  const width = Math.round(image.width * ratio)
  const height = Math.round(image.height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  const blob = await canvasToBlob(canvas, outputType, quality)
  if (!blob) {
    throw new Error('Proses kompresi gagal')
  }

  return blob
}
