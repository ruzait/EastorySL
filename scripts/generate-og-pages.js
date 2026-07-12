import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_URL = process.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'
const DIST = resolve(__dirname, '..', 'dist')

function ogImageType(url) {
  if (!url) return 'image/png'
  const ext = url.split('?')[0].split('.').pop().toLowerCase()
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'avif') return 'image/avif'
  return 'image/png'
}

function ensureDir(filePath) {
  const dir = dirname(filePath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeReplacement(str) {
  return str.replace(/\$/g, '$$')
}

function generatePage(path, ogTitle, ogDesc, ogImage, indexHtml) {
  const imageUrl = ogImage.startsWith('/') ? `${SITE_URL}${ogImage}` : ogImage
  const pageUrl = `${SITE_URL}${path}`
  const imgType = ogImageType(imageUrl)
  const safeTitle = escapeReplacement(ogTitle)
  const safeDesc = escapeReplacement(ogDesc)
  const safeImageUrl = escapeReplacement(imageUrl)
  const safePageUrl = escapeReplacement(pageUrl)

  let html = indexHtml

    .replace(/<title>.*?<\/title>/, `<title>${escapeAttr(safeTitle)} | Eastory SL</title>`)
    .replace(
      /<meta name="description"[^>]*\/?>/,
      `<meta name="description" content="${escapeAttr(safeDesc)}" />`
    )
    .replace(
      /<meta property="og:title"[^>]*\/?>/,
      `<meta property="og:title" content="${escapeAttr(safeTitle)} | Eastory SL" />`
    )
    .replace(
      /<meta property="og:description"[^>]*\/?>/,
      `<meta property="og:description" content="${escapeAttr(safeDesc)}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*\/?>/,
      `<meta property="og:url" content="${escapeAttr(safePageUrl)}" />`
    )
    .replace(
      /<meta property="og:image"[^>]*\/?>/,
      `<meta property="og:image" content="${escapeAttr(safeImageUrl)}" />`
    )
    .replace(
      /<meta property="og:image:type"[^>]*\/?>/,
      `<meta property="og:image:type" content="${imgType}" />`
    )
    .replace(
      /<meta property="og:image:alt"[^>]*\/?>/,
      `<meta property="og:image:alt" content="${escapeAttr(safeTitle)} | Eastory SL" />`
    )
    .replace(
      /<meta name="twitter:title"[^>]*\/?>/,
      `<meta name="twitter:title" content="${escapeAttr(safeTitle)} | Eastory SL" />`
    )
    .replace(
      /<meta name="twitter:description"[^>]*\/?>/,
      `<meta name="twitter:description" content="${escapeAttr(safeDesc)}" />`
    )
    .replace(
      /<meta name="twitter:image"[^>]*\/?>/,
      `<meta name="twitter:image" content="${escapeAttr(safeImageUrl)}" />`
    )
    .replace(
      /<meta name="twitter:image:alt"[^>]*\/?>/,
      `<meta name="twitter:image:alt" content="${escapeAttr(safeTitle)} | Eastory SL" />`
    )
    .replace(
      /<meta name="keywords"[^>]*\/?>/,
      `<meta name="keywords" content="${escapeAttr(safeTitle)}, Sri Lanka, travel, tourism" />`
    )
    .replace(
      /<meta name="twitter:url"[^>]*\/?>/,
      `<meta name="twitter:url" content="${escapeAttr(safePageUrl)}" />`
    )
    .replace(
      /<link rel="canonical"[^>]*\/?>/,
      `<link rel="canonical" href="${escapeAttr(safePageUrl)}" />`
    )

  const filePath = join(DIST, path, 'index.html')
  ensureDir(filePath)
  writeFileSync(filePath, html, 'utf-8')
  console.log(`  ✓ ${path}`)
}

async function main() {
  const { destinations } = await import(
    pathToFileURL(resolve(__dirname, '../src/data/destinations.js'))
  )
  const { prideItems } = await import(
    pathToFileURL(resolve(__dirname, '../src/data/sriLankaPride.js'))
  )

  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  console.log('Generating OG-tagged pages for destinations...')
  destinations.forEach((d) => {
    const path = `/destinations/${d.category}/${d.id}`
    generatePage(
      path,
      d.name,
      `${d.description} Located in ${d.location || d.district || 'Sri Lanka'}.`,
      d.image,
      indexHtml
    )
  })

  console.log('\nGenerating OG-tagged pages for pride items...')
  prideItems.forEach((p) => {
    const path = `/sri-lanka-pride/${p.category}/${p.id}`
    const desc = `${p.description}${p.period ? ' Period: ' + p.period : ''} ${p.location || p.origin || ''}`
    generatePage(path, p.name, desc, p.image, indexHtml)
  })

  console.log('\nDone! OG-tagged pages generated.')
}

main().catch(console.error)
