// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactFlowProvider } from 'reactflow'
import Layout from './components/Layout'
import { Toaster } from './components/ui/toaster'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <Layout />
        <Toaster />
      </ReactFlowProvider>
    </QueryClientProvider>
  )
}

export default App