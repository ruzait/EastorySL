import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Eastory SL'
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'
const DEFAULT_OG = `${SITE_URL}/images/home/hero.png`

export default function SEO({ title, description, ogImage, ogUrl, keywords, jsonLd }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Sri Lanka Travel Guide`
  const url = ogUrl || window.location.href
  const image = ogImage || DEFAULT_OG
  const imageAlt = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Travel Guide`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description || ''} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}