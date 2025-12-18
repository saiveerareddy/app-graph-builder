Approach & Key Decisions
1. Architecture Strategy
I adopted a modular, component-based architecture with clear separation of concerns:

Layout components (Layout.tsx, TopBar.tsx, LeftRail.tsx, etc.) handle UI structure

Data hooks (useApps.ts, useAppGraph.ts) encapsulate API logic

State management (useStore.ts) centralizes application state

UI components (src/components/ui/) provide reusable, styled elements

This separation ensures maintainability and testability while keeping each file focused on a single responsibility.

2. State Management with Zustand
I chose Zustand over React Context or Redux because:

Minimal boilerplate and zero dependencies

Simple API with TypeScript support

Good performance with selector-based updates

Scales well for small-to-medium applications

The store includes only essential state:

selectedAppId and selectedNodeId for user selections

isMobilePanelOpen for responsive behavior

activeInspectorTab for UI state

3. Data Fetching with TanStack Query
TanStack Query provides excellent features out-of-the-box:

Built-in caching and request deduplication

Automatic loading/error states

Background refetching and stale-while-revalidate

Simple mutation handling

The mock APIs (useApps, useAppGraph) simulate real-world scenarios with:

Random error generation (10% chance) to test error boundaries

Artificial delays to show loading states

Type-safe responses

4. ReactFlow Integration
ReactFlow (xyflow) was chosen for its:

Rich feature set (drag, zoom, pan, selection)

Custom node support

Built-in controls and background patterns

Active community and good documentation

Key implementations:

Custom ServiceNode and DatabaseNode components

Keyboard shortcuts for node deletion (Delete/Backspace)

Fit view functionality

Dotted background using ReactFlow's built-in variant

5. Responsive Design Approach
The responsive strategy prioritizes mobile-first usability:

Right panel becomes a slide-over drawer on mobile

Touch-friendly controls and adequate spacing

Progressive enhancement for desktop features

Zustand manages mobile panel state across breakpoints

6. UI Component System
Using shadcn/ui approach because:

Provides accessible, unstyled primitives

Allows full customization with Tailwind CSS

Excellent TypeScript support

Consistent design system

Custom implementations include:

Synced slider/input controls with two-way binding

Status pills with color-coded health indicators

Tab-based inspector interface

Toast notification system

7. TypeScript Strategy
Strict TypeScript configuration ensures:

Full type safety across the application

Early detection of potential runtime errors

Better developer experience with autocomplete

Self-documenting code through types

Key type definitions:

Node status enums ('healthy' | 'degraded' | 'down')

Graph data interfaces (Node, Edge, GraphData)

Store state with proper typing

API response types

8. Mock API Design
The mock API system simulates real backend behavior:

Promise-based with setTimeout delays

Random error injection for testing error states

In-memory data storage with realistic structure

Type-safe responses matching real API contracts

This allows testing all UI states (loading, success, error) without a real backend.

9. Performance Considerations
Memoization: ReactFlow nodes are memoized to prevent unnecessary re-renders

Selective re-renders: Zustand selectors prevent full store updates

Virtualization: ReactFlow handles large graphs efficiently

Lazy loading: Components split by route/feature boundaries

10. Error Handling Strategy
Graceful degradation: UI shows helpful error states

Toast notifications: Non-intrusive error feedback

Retry mechanisms: Users can retry failed requests

Validation: TypeScript prevents many runtime errors

11. Key Trade-offs
Mock persistence: Node edits log to console but don't persist (would use ReactFlow's setNodes in production)

Mobile optimization: Basic responsive support rather than full mobile-specific UI

Feature completeness: Focused on core requirements over extended features

Testing: Manual testing during development (would add Jest/React Testing Library in production)

12. Future Enhancement Points
Real backend integration with authentication

Graph persistence and versioning

Advanced node types and styling options

Collaborative features (real-time updates)

Export/import functionality (JSON, PNG)

Comprehensive test suite with unit/integration tests

13. Developer Experience Focus
Scripts: Full NPM script suite (dev, build, lint, typecheck)

Code quality: ESLint + Prettier configuration

Hot reload: Fast development cycle with Vite

Documentation: README with setup instructions and architecture overview

This approach balances immediate requirements with long-term maintainability, providing a solid foundation that can evolve with the application's needs.

