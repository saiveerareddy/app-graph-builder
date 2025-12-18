// src/components/Canvas.tsx
import { useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
  NodeChange,
  EdgeChange,
  ConnectionMode,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ServiceNode from './ServiceNode'
import DatabaseNode from './DatabaseNode'
import { useStore } from '../store/useStore'
import { useAppGraph } from '../hooks/useAppGraph'

const nodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
}

export default function Canvas() {
  const { selectedAppId, setSelectedNodeId } = useStore()
  const { data: graphData, isLoading, error } = useAppGraph(selectedAppId)
  
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes)
      setEdges(graphData.edges)
    }
  }, [graphData, setNodes, setEdges])

  const onNodesChangeHandler: OnNodesChange = useCallback((changes) => {
    onNodesChange(changes)
    
    // Clear selection if node was removed
    changes.forEach((change) => {
      if (change.type === 'remove') {
        const nodeIds = change.id ? [change.id] : change.ids || []
        nodeIds.forEach(id => {
          useStore.getState().selectedNodeId === id && 
            useStore.getState().setSelectedNodeId(null)
        })
      }
    })
  }, [onNodesChange])

  const onEdgesChangeHandler: OnEdgesChange = useCallback((changes) => {
    onEdgesChange(changes)
  }, [onEdgesChange])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id)
  }, [setSelectedNodeId])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [setSelectedNodeId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && useStore.getState().selectedNodeId) {
        const selectedNodeId = useStore.getState().selectedNodeId
        if (selectedNodeId) {
          setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId))
          setSelectedNodeId(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setNodes, setSelectedNodeId])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center dot-pattern">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading graph...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center dot-pattern">
        <div className="text-center">
          <p className="text-red-600">Failed to load graph data</p>
          <p className="text-sm text-gray-600 mt-1">Please try again</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={reactFlowWrapper} className="h-full w-full dot-pattern">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#d1d5db"
        />
        <Controls />
      </ReactFlow>
    </div>
  )
}