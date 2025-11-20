"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ArchitectureCanvas } from "@/components/canvas/architecture-canvas"
import { NodePalette } from "@/components/canvas/node-palette"
import { CodeEditor } from "@/components/code-panel/code-editor"
import { Button } from "@/components/ui/button"
import {
  PanelLeft,
  PanelRight,
  Save,
  Download,
  Upload,
  Play,
  Settings
} from "lucide-react"

export default function DesignerPage({ params }: { params: { id: string } }) {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  const handleSave = () => {
    console.log("Saving architecture...")
  }

  const handleExport = () => {
    console.log("Exporting architecture...")
  }

  const handleDeploy = () => {
    console.log("Deploying architecture...")
  }

  const isNewArchitecture = params.id === "new"

  return (
    <DashboardLayout
      title={isNewArchitecture ? "New Architecture" : "Architecture Designer"}
      subtitle="Design your cloud infrastructure with drag-and-drop"
    >
      <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
        {/* Top Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Project:</span>
              <span className="text-sm text-gray-900">
                {isNewArchitecture ? "Untitled Architecture" : `Architecture ${params.id}`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Draft
              </span>
              <span className="text-sm text-gray-500">Auto-saved 2 minutes ago</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" onClick={handleDeploy}>
              <Play className="h-4 w-4 mr-1" />
              Deploy
            </Button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Node Palette */}
          <motion.div
            initial={{ width: leftPanelCollapsed ? 64 : 256 }}
            animate={{ width: leftPanelCollapsed ? 64 : 256 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-r border-gray-200"
          >
            <NodePalette collapsed={leftPanelCollapsed} />
          </motion.div>

          {/* Panel Toggle Buttons */}
          <div className="flex flex-col justify-center">
            <button
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
              className="p-1 m-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
            >
              <PanelLeft className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 flex flex-col">
            <ArchitectureCanvas
              onSave={handleSave}
              onExport={handleExport}
            />
          </div>

          {/* Panel Toggle Buttons */}
          <div className="flex flex-col justify-center">
            <button
              onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              className="p-1 m-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
            >
              <PanelRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Right Panel - Code Editor */}
          <motion.div
            initial={{ width: rightPanelCollapsed ? 0 : 400 }}
            animate={{ width: rightPanelCollapsed ? 0 : 400 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-l border-gray-200"
          >
            {!rightPanelCollapsed && <CodeEditor />}
          </motion.div>
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600"
        >
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>5 resources</span>
            <span>AWS</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>100% zoom</span>
            <span>Grid: 20px</span>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}