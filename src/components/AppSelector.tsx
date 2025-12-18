// src/components/AppSelector.tsx
import { useApps } from '../hooks/useApps'
import { useStore } from '../store/useStore'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'

export default function AppSelector() {
  const { data: apps, isLoading, error } = useApps()
  const { selectedAppId, setSelectedAppId } = useStore()

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load apps. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Applications</h3>
      <div className="space-y-2">
        {apps?.map((app) => (
          <Button
            key={app.id}
            variant={selectedAppId === app.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setSelectedAppId(app.id)}
          >
            {app.name}
          </Button>
        ))}
      </div>
    </div>
  )
}