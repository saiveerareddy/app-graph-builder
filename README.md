# README.md

# App Graph Builder

A React-based application for visualizing and managing service graphs, built with ReactFlow, Zustand, and TanStack Query.

## Features

- **Responsive Layout**: Top bar, left rail, right panel with mobile drawer support
- **ReactFlow Canvas**: Interactive graph with 3 nodes (Postgres, Redis, MongoDB) and 2 edges
- **Node Inspector**: Detailed view with tabs, status indicators, and editable fields
- **Mock APIs**: TanStack Query integration with simulated loading/error states
- **State Management**: Zustand for global state (selected app/node, UI state)
- **TypeScript**: Strict typing throughout the application

## Tech Stack

- React 18 + Vite
- TypeScript (strict mode)
- ReactFlow (xyflow)
- shadcn/ui components
- TanStack Query v5
- Zustand v4
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/saiveerareddy/app-graph-builder.git
cd app-graph-builder

# Install dependencies
npm install
npm install @radix-ui/react-slider

# Start development server
npm run dev

 # Then you get link in terminal
http://localhost:5173 


