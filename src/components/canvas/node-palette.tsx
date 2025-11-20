"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Server,
  Database,
  HardDrive,
  Wifi,
  Shield,
  Cpu,
  Cloud,
  Globe,
  Lock,
  Package
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface CloudResource {
  id: string
  name: string
  category: string
  provider: "aws" | "azure" | "gcp"
  icon: React.ReactNode
  description: string
}

const awsResources: CloudResource[] = [
  {
    id: "ec2",
    name: "EC2 Instance",
    category: "Compute",
    provider: "aws",
    icon: <Server className="h-5 w-5" />,
    description: "Virtual server in the cloud"
  },
  {
    id: "rds",
    name: "RDS Database",
    category: "Database",
    provider: "aws",
    icon: <Database className="h-5 w-5" />,
    description: "Managed relational database"
  },
  {
    id: "s3",
    name: "S3 Bucket",
    category: "Storage",
    provider: "aws",
    icon: <HardDrive className="h-5 w-5" />,
    description: "Object storage service"
  },
  {
    id: "vpc",
    name: "VPC",
    category: "Network",
    provider: "aws",
    icon: <Wifi className="h-5 w-5" />,
    description: "Virtual private cloud"
  },
  {
    id: "lambda",
    name: "Lambda Function",
    category: "Compute",
    provider: "aws",
    icon: <Cpu className="h-5 w-5" />,
    description: "Serverless compute function"
  },
  {
    id: "security-group",
    name: "Security Group",
    category: "Security",
    provider: "aws",
    icon: <Shield className="h-5 w-5" />,
    description: "Virtual firewall for instances"
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    category: "Network",
    provider: "aws",
    icon: <Globe className="h-5 w-5" />,
    description: "Content delivery network"
  },
  {
    id: "iam",
    name: "IAM Role",
    category: "Security",
    provider: "aws",
    icon: <Lock className="h-5 w-5" />,
    description: "Identity and access management"
  }
]

const azureResources: CloudResource[] = [
  {
    id: "vm",
    name: "Virtual Machine",
    category: "Compute",
    provider: "azure",
    icon: <Server className="h-5 w-5" />,
    description: "Windows/Linux virtual machine"
  },
  {
    id: "sql-database",
    name: "SQL Database",
    category: "Database",
    provider: "azure",
    icon: <Database className="h-5 w-5" />,
    description: "Managed SQL database"
  },
  {
    id: "storage-account",
    name: "Storage Account",
    category: "Storage",
    provider: "azure",
    icon: <HardDrive className="h-5 w-5" />,
    description: "Azure storage service"
  }
]

const gcpResources: CloudResource[] = [
  {
    id: "compute-engine",
    name: "Compute Engine",
    category: "Compute",
    provider: "gcp",
    icon: <Server className="h-5 w-5" />,
    description: "Virtual machine instance"
  },
  {
    id: "cloud-storage",
    name: "Cloud Storage",
    category: "Storage",
    provider: "gcp",
    icon: <HardDrive className="h-5 w-5" />,
    description: "Object storage service"
  },
  {
    id: "cloud-sql",
    name: "Cloud SQL",
    category: "Database",
    provider: "gcp",
    icon: <Database className="h-5 w-5" />,
    description: "Managed SQL database"
  }
]

const categories = ["All", "Compute", "Storage", "Database", "Network", "Security"]

interface NodePaletteProps {
  collapsed?: boolean
}

export function NodePalette({ collapsed = false }: NodePaletteProps) {
  const [selectedProvider, setSelectedProvider] = useState<"aws" | "azure" | "gcp">("aws")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const getResources = () => {
    let resources: CloudResource[] = []

    switch (selectedProvider) {
      case "aws":
        resources = awsResources
        break
      case "azure":
        resources = azureResources
        break
      case "gcp":
        resources = gcpResources
        break
    }

    if (selectedCategory !== "All") {
      resources = resources.filter(r => r.category === selectedCategory)
    }

    if (searchQuery) {
      resources = resources.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return resources
  }

  const onDragStart = (event: React.DragEvent, resource: CloudResource) => {
    event.dataTransfer.setData("application/reactflow", resource.name)
    event.dataTransfer.effectAllowed = "move"
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "aws": return "text-orange-500"
      case "azure": return "text-blue-500"
      case "gcp": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  if (collapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        <Cloud className="h-6 w-6 text-gray-600" />
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setSelectedProvider("aws")}
            className={`p-2 rounded ${selectedProvider === "aws" ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            🟧
          </button>
          <button
            onClick={() => setSelectedProvider("azure")}
            className={`p-2 rounded ${selectedProvider === "azure" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            🔵
          </button>
          <button
            onClick={() => setSelectedProvider("gcp")}
            className={`p-2 rounded ${selectedProvider === "gcp" ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            🟢
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>

        {/* Provider Tabs */}
        <div className="flex space-x-1 mb-3">
          <button
            onClick={() => setSelectedProvider("aws")}
            className={`flex-1 py-1 px-2 text-sm rounded ${selectedProvider === "aws" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"}`}
          >
            AWS
          </button>
          <button
            onClick={() => setSelectedProvider("azure")}
            className={`flex-1 py-1 px-2 text-sm rounded ${selectedProvider === "azure" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Azure
          </button>
          <button
            onClick={() => setSelectedProvider("gcp")}
            className={`flex-1 py-1 px-2 text-sm rounded ${selectedProvider === "gcp" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
          >
            GCP
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {getResources().map((resource) => (
            <motion.div
              key={resource.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onDragStart={(event) => onDragStart(event, resource)}
              draggable
              className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded ${getProviderColor(resource.provider)}`}>
                  {resource.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {resource.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {resource.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {getResources().length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No resources found</p>
          </div>
        )}
      </div>
    </div>
  )
}