import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import InstallPWA from './InstallPWA'

export default function Layout() {
  const { pathname } = useLocation()
  const isMapPage = pathname === '/map'

  return (
    <div className={`${isMapPage ? 'h-screen flex flex-col overflow-hidden' : 'min-h-screen'}`}>
      <InstallPWA />
      <Navbar />
      <main className={`${isMapPage ? 'flex-1 overflow-hidden' : ''}`}>
        <Outlet />
      </main>
      {!isMapPage && <Footer />}
    </div>
  )
}
