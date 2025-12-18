// src/store/useStore.ts
import { create } from 'zustand'

export type NodeStatus = 'healthy' | 'degraded' | 'down'
export type InspectorTab = 'config' | 'runtime'

interface AppStore {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: InspectorTab
  setSelectedAppId: (id: string | null) => void
  setSelectedNodeId: (id: string | null) => void
  setIsMobilePanelOpen: (open: boolean) => void
  setActiveInspectorTab: (tab: InspectorTab) => void
}

export const useStore = create<AppStore>((set) => ({
  selectedAppId: '1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}))