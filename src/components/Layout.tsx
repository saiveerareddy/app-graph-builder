// src/components/Layout.tsx
import { useState, useEffect } from 'react'
import TopBar from './TopBar'
import LeftRail from './LeftRail'
import Canvas from './Canvas'
import RightPanel from './RightPanel'
import { useStore } from '../store/useStore'

export default function Layout() {
  const { isMobilePanelOpen, setIsMobilePanelOpen } = useStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <main className="flex-1 relative overflow-hidden">
          <Canvas />
        </main>
        {(!isMobile || isMobilePanelOpen) && (
          <>
            <RightPanel />
            {isMobile && isMobilePanelOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobilePanelOpen(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}