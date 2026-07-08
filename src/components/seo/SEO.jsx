import { useEffect } from 'react'

const SITE_NAME = 'Eastory SL'

export default function SEO({ title, description, ogImage, ogUrl, keywords }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Sri Lanka Travel Guide`
    document.title = fullTitle

    const setMeta = (name, content) => {
      if (!content) return
      const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', ogUrl || window.location.href)

    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('og:title', fullTitle)
    setMeta('og:description', description)
    setMeta('og:url', ogUrl || window.location.href)
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    if (ogImage) {
      setMeta('og:image', ogImage)
      setMeta('twitter:image', ogImage)
    } else {
      const defaultOg = 'https://easternsrilankahub.lk/images/home/hero.png'
      setMeta('og:image', defaultOg)
      setMeta('twitter:image', defaultOg)
    }
  }, [title, description, ogImage, ogUrl, keywords])

  return null
}
