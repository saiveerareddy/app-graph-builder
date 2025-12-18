// src/components/LeftRail.tsx
import { 
  LayoutDashboard, 
  Database, 
  Server, 
  Settings,
  PlusCircle
} from 'lucide-react'
import { Button } from './ui/button'

export default function LeftRail() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Database, label: 'Databases' },
    { icon: Server, label: 'Services' },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-16 border-r flex flex-col items-center py-4 gap-6">
      <div className="flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
      </div>
      <div className="mt-auto">
        <Button
          variant="default"
          size="icon"
          className="h-10 w-10 rounded-full"
          title="Add Service"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
    </aside>
  )
}