// src/components/NodeInspector.tsx
import { useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { useStore } from '../store/useStore'
import { useNodes } from 'reactflow'

export default function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useStore()
  const nodes = useNodes()
  
  const selectedNode = nodes.find(node => node.id === selectedNodeId)
  
  const updateNodeData = useCallback((updates: Record<string, any>) => {
    // In a real app, you would update the node data through ReactFlow's setNodes
    console.log('Update node data:', { nodeId: selectedNodeId, updates })
  }, [selectedNodeId])

  if (!selectedNode) return null

  const { data } = selectedNode
  const statusColor = {
    healthy: 'bg-green-100 text-green-800 hover:bg-green-100',
    degraded: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    down: 'bg-red-100 text-red-800 hover:bg-red-100',
  }[data.status] || 'bg-gray-100 text-gray-800'

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData({ label: e.target.value })
  }

  const handleConfigValueChange = (value: number) => {
    updateNodeData({ configValue: value })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Service Node</h3>
        <Badge className={statusColor}>
          {data.status?.toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="node-name">Node Name</Label>
          <Input
            id="node-name"
            value={data.label}
            onChange={handleNameChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="node-description">Description</Label>
          <Textarea
            id="node-description"
            placeholder="Enter node description"
            className="mt-1"
            rows={3}
          />
        </div>
      </div>

      <Tabs 
        value={activeInspectorTab} 
        onValueChange={(value) => setActiveInspectorTab(value as any)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div>
              <Label>Configuration Value</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[data.configValue || 50]}
                  onValueChange={([value]) => handleConfigValueChange(value)}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={data.configValue || 50}
                  onChange={(e) => handleConfigValueChange(Number(e.target.value))}
                  className="w-20"
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CPU Usage</Label>
                <Input value={data.cpu || '0.00'} readOnly />
              </div>
              <div>
                <Label>Memory</Label>
                <Input value={data.memory || '0 GB'} readOnly />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="runtime" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Replicas</Label>
              <Input value={data.replicas || 1} readOnly />
            </div>
            <div>
              <Label>Storage</Label>
              <Input value={data.storage || '0 GB'} readOnly />
            </div>
          </div>
          <div>
            <Label>Last Updated</Label>
            <Input value={new Date().toLocaleString()} readOnly />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}