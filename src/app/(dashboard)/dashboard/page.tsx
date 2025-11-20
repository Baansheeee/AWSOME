"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Cloud,
  Activity,
  DollarSign,
  Server,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"

// Mock data for dashboard
const kpiData = [
  {
    title: "Total Architectures",
    value: "42",
    change: "+12%",
    trend: "up",
    icon: <Cloud className="h-6 w-6" />,
    color: "text-blue-600"
  },
  {
    title: "Active Deployments",
    value: "18",
    change: "+3",
    trend: "up",
    icon: <Activity className="h-6 w-6" />,
    color: "text-green-600"
  },
  {
    title: "Monthly Cost",
    value: "$2,847",
    change: "-8%",
    trend: "down",
    icon: <DollarSign className="h-6 w-6" />,
    color: "text-yellow-600"
  },
  {
    title: "Resources Managed",
    value: "156",
    change: "+24",
    trend: "up",
    icon: <Server className="h-6 w-6" />,
    color: "text-purple-600"
  }
]

const recentArchitectures = [
  {
    id: "1",
    name: "E-commerce Microservices",
    provider: "AWS",
    resources: 12,
    lastModified: "2 hours ago",
    status: "deployed" as const
  },
  {
    id: "2",
    name: "Data Analytics Pipeline",
    provider: "Azure",
    resources: 8,
    lastModified: "1 day ago",
    status: "draft" as const
  },
  {
    id: "3",
    name: "Mobile App Backend",
    provider: "GCP",
    resources: 6,
    lastModified: "3 days ago",
    status: "deployed" as const
  },
  {
    id: "4",
    name: "Machine Learning Platform",
    provider: "Multi-cloud",
    resources: 15,
    lastModified: "1 week ago",
    status: "error" as const
  }
]

const recentDeployments = [
  {
    id: "1",
    architecture: "E-commerce Microservices",
    environment: "Production",
    status: "success" as const,
    duration: "4m 23s",
    timestamp: "10 minutes ago"
  },
  {
    id: "2",
    architecture: "Mobile App Backend",
    environment: "Staging",
    status: "success" as const,
    duration: "2m 15s",
    timestamp: "1 hour ago"
  },
  {
    id: "3",
    architecture: "Data Analytics Pipeline",
    environment: "Development",
    status: "failed" as const,
    duration: "1m 45s",
    timestamp: "3 hours ago"
  },
  {
    id: "4",
    architecture: "ML Training Environment",
    environment: "Production",
    status: "in-progress" as const,
    duration: "6m 12s",
    timestamp: "5 minutes ago"
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
    case "deployed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "failed":
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "in-progress":
    case "draft":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

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

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Overview of your cloud infrastructure">
      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={kpi.color}>
                  {kpi.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Architecture
            </Button>
            <Button variant="outline">
              <Cloud className="h-4 w-4 mr-2" />
              Browse Templates
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Deploy Existing
            </Button>
            <Button variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Cost Analysis
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Architectures */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Architectures</h3>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentArchitectures.map((arch) => (
                <div key={arch.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getProviderIcon(arch.provider)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{arch.name}</p>
                      <p className="text-sm text-gray-500">{arch.resources} resources • {arch.lastModified}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(arch.status)}
                    <span className="text-sm font-medium text-gray-700 capitalize">{arch.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Deployments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Deployments</h3>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentDeployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{deployment.architecture}</p>
                    <p className="text-sm text-gray-500">{deployment.environment} • {deployment.timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{deployment.duration}</span>
                    {getStatusIcon(deployment.status)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900">New architecture <span className="font-medium">"API Gateway Setup"</span> was created</p>
                <p className="text-sm text-gray-500 mt-1">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900">Deployment completed successfully for <span className="font-medium">"E-commerce Microservices"</span></p>
                <p className="text-sm text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900">Cost optimization suggestions available for <span className="font-medium">"Data Analytics Pipeline"</span></p>
                <p className="text-sm text-gray-500 mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}