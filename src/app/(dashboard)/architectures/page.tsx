"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Grid,
  List,
  Plus,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  Download
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for architectures
const architecturesData = [
  {
    id: "1",
    name: "E-commerce Microservices",
    description: "Complete e-commerce platform with microservices architecture",
    provider: "AWS",
    resources: 12,
    lastModified: "2024-01-15T10:30:00Z",
    status: "deployed" as const,
    tags: ["production", "microservices", "ecommerce"],
    cost: "$1,247/month"
  },
  {
    id: "2",
    name: "Data Analytics Pipeline",
    description: "Real-time data processing and analytics pipeline",
    provider: "Azure",
    resources: 8,
    lastModified: "2024-01-14T15:45:00Z",
    status: "draft" as const,
    tags: ["analytics", "data", "pipeline"],
    cost: "$856/month"
  },
  {
    id: "3",
    name: "Mobile App Backend",
    description: "Scalable backend for mobile applications",
    provider: "GCP",
    resources: 6,
    lastModified: "2024-01-13T09:15:00Z",
    status: "deployed" as const,
    tags: ["mobile", "backend", "api"],
    cost: "$432/month"
  },
  {
    id: "4",
    name: "Machine Learning Platform",
    description: "ML training and inference platform",
    provider: "Multi-cloud",
    resources: 15,
    lastModified: "2024-01-12T14:20:00Z",
    status: "error" as const,
    tags: ["ml", "ai", "training"],
    cost: "$2,156/month"
  },
  {
    id: "5",
    name: "CMS and Content Delivery",
    description: "Content management system with CDN",
    provider: "AWS",
    resources: 4,
    lastModified: "2024-01-11T11:00:00Z",
    status: "deployed" as const,
    tags: ["cms", "cdn", "content"],
    cost: "$234/month"
  },
  {
    id: "6",
    name: "IoT Edge Processing",
    description: "Edge computing for IoT devices",
    provider: "Azure",
    resources: 9,
    lastModified: "2024-01-10T16:30:00Z",
    status: "draft" as const,
    tags: ["iot", "edge", "processing"],
    cost: "$678/month"
  }
]

const providers = ["All", "AWS", "Azure", "GCP", "Multi-cloud"]
const statuses = ["All", "Draft", "Deployed", "Archived", "Error"]

export default function ArchitecturesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const filteredArchitectures = architecturesData.filter(arch => {
    const matchesSearch = arch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         arch.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvider = selectedProvider === "All" || arch.provider === selectedProvider
    const matchesStatus = selectedStatus === "All" || arch.status === selectedStatus.toLowerCase()

    return matchesSearch && matchesProvider && matchesStatus
  })

  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "aws":
        return "🟧"
      case "azure":
        return "🔵"
      case "gcp":
        return "🟢"
      case "multi-cloud":
        return "🌈"
      default:
        return "☁️"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <DashboardLayout title="Architectures" subtitle="Manage your cloud infrastructure designs">
      <div className="p-6">
        {/* Header with Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search architectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary-100 text-primary-600" : "text-gray-500"}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary-100 text-primary-600" : "text-gray-500"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Architecture
            </Button>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredArchitectures.length} of {architecturesData.length} architectures
          </p>
        </div>

        {/* List View */}
        {viewMode === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Architecture
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resources
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredArchitectures.map((arch, index) => (
                    <motion.tr
                      key={arch.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{arch.name}</div>
                          <div className="text-sm text-gray-500">{arch.description}</div>
                          <div className="flex gap-1 mt-1">
                            {arch.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getProviderIcon(arch.provider)}</span>
                          <span className="text-sm text-gray-900">{arch.provider}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{arch.resources}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(arch.status)}`}>
                          {arch.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{arch.cost}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(arch.lastModified)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArchitectures.map((arch, index) => (
              <motion.div
                key={arch.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getProviderIcon(arch.provider)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{arch.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(arch.status)}`}>
                        {arch.status}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-4">{arch.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{arch.resources} resources</span>
                  <span>{arch.cost}</span>
                </div>

                <div className="flex gap-1 mb-4">
                  {arch.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredArchitectures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Cloud className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No architectures found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || selectedProvider !== "All" || selectedStatus !== "All"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first architecture"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Architecture
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  )
}