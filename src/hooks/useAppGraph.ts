// src/hooks/useAppGraph.ts
import { useQuery } from '@tanstack/react-query'
import { Node, Edge } from 'reactflow'

export interface GraphData {
  nodes: Node[]
  edges: Edge[]
}

const mockGraphs: Record<string, GraphData> = {
  '1': {
    nodes: [
      {
        id: '1',
        type: 'service',
        position: { x: 100, y: 100 },
        data: { 
          label: 'Postgres', 
          status: 'healthy',
          cpu: 0.02,
          memory: '0.05 GB',
          storage: '10:00 GB',
          replicas: 1,
          configValue: 50
        },
      },
      {
        id: '2',
        type: 'service',
        position: { x: 400, y: 100 },
        data: { 
          label: 'Redis', 
          status: 'degraded',
          cpu: 0.04,
          memory: '0.02 GB',
          storage: '0.05 GB',
          replicas: 1,
          configValue: 30
        },
      },
      {
        id: '3',
        type: 'database',
        position: { x: 250, y: 300 },
        data: { 
          label: 'MongoDB', 
          status: 'healthy',
          cpu: 0.03,
          memory: '0.03 GB',
          storage: '10:00 GB',
          replicas: 1,
          configValue: 75
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ],
  },
  '2': {
    nodes: [
      {
        id: '4',
        type: 'service',
        position: { x: 200, y: 200 },
        data: { 
          label: 'supertokens-java', 
          status: 'healthy',
          cpu: 0.05,
          memory: '0.1 GB',
          storage: '20:00 GB',
          replicas: 2,
          configValue: 60
        },
      },
    ],
    edges: [],
  },
}

export const useAppGraph = (appId: string | null) => {
  return useQuery({
    queryKey: ['app-graph', appId],
    queryFn: async (): Promise<GraphData> => {
      if (!appId) throw new Error('App ID is required')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch graph data')
      }
      
      return mockGraphs[appId] || { nodes: [], edges: [] }
    },
    enabled: !!appId,
    retry: false,
  })
}