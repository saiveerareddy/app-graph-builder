// src/components/TopBar.tsx
import { Maximize2 } from 'lucide-react'
import { Button } from './ui/button'
import { useReactFlow } from 'reactflow'
import { useToast } from '../hooks/use-toast'

export default function TopBar() {
  const { fitView } = useReactFlow()
  const { toast } = useToast()

  const handleFitView = () => {
    fitView({ duration: 800 })
  }

  const handleSimulateError = () => {
    toast({
      title: "Error simulated",
      description: "This is a simulated error notification",
      variant: "destructive",
    })
  }

  return (
    <header className="border-b h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">App Graph Builder</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleFitView}
          className="gap-2"
        >
          <Maximize2 className="h-4 w-4" />
          Fit View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSimulateError}
        >
          Simulate Error
        </Button>
        <Button variant="outline" size="sm">
          Settings
        </Button>
      </div>
    </header>
  )
}