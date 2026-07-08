import { useEffect } from 'react'

const SITE_NAME = 'Eastern Sri Lanka Hub'

export default function SEO({ title, description, ogImage, ogUrl, keywords }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Sri Lanka Travel Guide`
    document.title = fullTitle

    const setMeta = (name, content) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

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
    }
  }, [title, description, ogImage, ogUrl, keywords])

  return null
}
