import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DiscoverMore from './pages/DiscoverMore'
import SriLankaPride from './pages/SriLankaPride'
import PrideDetail from './pages/PrideDetail'
import DestinationDetail from './pages/DestinationDetail'
import Gallery from './pages/Gallery'
import Advertise from './pages/Advertise'
import Map from './pages/Map'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="discover-more" element={<DiscoverMore />} />
          <Route path="sri-lanka-pride" element={<SriLankaPride />} />
          <Route path="sri-lanka-pride/:category/:id" element={<PrideDetail />} />
          <Route path="destinations/:category/:id" element={<DestinationDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="advertise" element={<Advertise />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
