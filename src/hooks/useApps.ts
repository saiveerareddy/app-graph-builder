// src/hooks/useApps.ts
import { useQuery } from '@tanstack/react-query'

export interface App {
  id: string
  name: string
  description: string
}

const mockApps: App[] = [
  { id: '1', name: 'supertokens-golang', description: 'SuperTokens Golang implementation' },
  { id: '2', name: 'supertokens-java', description: 'SuperTokens Java implementation' },
  { id: '3', name: 'supertokens-python', description: 'SuperTokens Python implementation' },
  { id: '4', name: 'supertokens-ruby', description: 'SuperTokens Ruby implementation' },
  { id: '5', name: 'supertokens-go', description: 'SuperTokens Go implementation' },
]

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: async (): Promise<App[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch apps')
      }
      
      return mockApps
    },
    retry: false,
  })
}