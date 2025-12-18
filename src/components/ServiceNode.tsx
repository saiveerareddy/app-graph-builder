// src/components/ServiceNode.tsx
import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Server } from 'lucide-react'

export default memo(function ServiceNode({ data, selected }: NodeProps) {
  const statusColor = {
    healthy: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500',
  }[data.status] || 'bg-gray-500'

  return (
    <div className={`px-4 py-3 rounded-lg border shadow-sm bg-white ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
        <Server className="h-5 w-5 text-gray-600" />
        <div>
          <div className="font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Service</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-600">
        <div>CPU: {data.cpu}</div>
        <div>Memory: {data.memory}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})