export interface Position {
  x: number
  y: number
}

export interface CanvasNode {
  id: string
  type: string
  position: Position
  data: {
    label: string
    provider: 'aws' | 'azure' | 'gcp'
    resourceType: string
    configuration: Record<string, any>
    icon?: string
    description?: string
  }
  style?: Record<string, any>
}

export interface CanvasEdge {
  id: string
  source: string
  target: string
  type?: 'data' | 'dependency' | 'security'
  animated?: boolean
  style?: Record<string, any>
}

export interface Canvas {
  id: string
  name: string
  description?: string
  nodes: CanvasNode[]
  edges: CanvasEdge[]
  provider: 'aws' | 'azure' | 'gcp' | 'multi'
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface CloudResource {
  id: string
  name: string
  category: string
  provider: 'aws' | 'azure' | 'gcp'
  resourceType: string
  icon: string
  description: string
  defaultConfiguration: Record<string, any>
}