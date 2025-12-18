// src/components/RightPanel.tsx
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import AppSelector from './AppSelector'
import NodeInspector from './NodeInspector'
import { useStore } from '../store/useStore'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

export default function RightPanel() {
  const { isMobilePanelOpen, setIsMobilePanelOpen, selectedNodeId } = useStore()
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
    <div className={`
      ${isMobile ? 'fixed right-0 top-0 h-full z-50' : 'border-l'} 
      w-full lg:w-96 xl:w-[28rem] bg-white shadow-lg flex flex-col
    `}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">App Panel</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobilePanelOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <PanelGroup direction="vertical" className="flex-1">
        <Panel defaultSize={40} minSize={30}>
          <div className="p-4 h-full overflow-auto">
            <AppSelector />
          </div>
        </Panel>
        <PanelResizeHandle className="h-2 bg-gray-100 hover:bg-gray-200 transition-colors" />
        <Panel defaultSize={60} minSize={40}>
          <div className="p-4 h-full overflow-auto">
            {selectedNodeId ? (
              <NodeInspector />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a node to inspect
              </div>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}