"use client"

import * as React from "react"
import { useCallback, useState, useRef } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeDragHandler,
  type ConnectionMode,
  Panel
} from "reactflow"
import "reactflow/dist/style.css"

import { Button } from "@/components/ui/button"
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  RotateCw,
  Download,
  Save
} from "lucide-react"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 25 },
    data: { label: "VPC", resourceType: "vpc", provider: "aws" },
    style: {
      background: "#ffefd5",
      border: "1px solid #ffa500",
      borderRadius: "8px",
      padding: "10px"
    }
  }
]

const initialEdges: Edge[] = []

interface ArchitectureCanvasProps {
  onSave?: () => void
  onExport?: () => void
}

export function ArchitectureCanvas({ onSave, onExport }: ArchitectureCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds || !reactFlowInstance) return

      const type = event.dataTransfer.getData("application/reactflow")
      if (typeof type === "undefined" || !type) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: `${Date.now()}`,
        type: "default",
        position,
        data: {
          label: `${type} node`,
          resourceType: type.toLowerCase(),
          provider: "aws"
        },
        style: {
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "10px",
          minWidth: "150px"
        }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onInit = useCallback((rfi: any) => {
    setReactFlowInstance(rfi)
  }, [])

  const onZoomIn = () => {
    reactFlowInstance?.zoomIn()
  }

  const onZoomOut = () => {
    reactFlowInstance?.zoomOut()
  }

  const onFitView = () => {
    reactFlowInstance?.fitView()
  }

  const onUndo = () => {
    // TODO: Implement undo functionality
    console.log("Undo action")
  }

  const onRedo = () => {
    // TODO: Implement redo functionality
    console.log("Redo action")
  }

  return (
    <div className="flex-1 h-full bg-canvas-bg" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionMode={ConnectionMode.Loose}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.2}
        maxZoom={4}
        attributionPosition="bottom-left"
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls
          showInteractive={false}
          position="bottom-right"
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        />
        <MiniMap
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb"
          }}
          nodeColor={(node) => {
            switch (node.data?.provider) {
              case "aws": return "#ff9900"
              case "azure": return "#0078d4"
              case "gcp": return "#4285f4"
              default: return "#6b7280"
            }
          }}
          position="bottom-left"
        />

        {/* Custom Toolbar */}
        <Panel position="top-left" className="flex gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <Button variant="outline" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onFitView}>
            <Maximize className="h-4 w-4" />
          </Button>
          <div className="w-px bg-gray-300 mx-1" />
          <Button variant="outline" size="sm" onClick={onUndo}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onRedo}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <div className="w-px bg-gray-300 mx-1" />
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4" />
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}