"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function MonitoringPage() {
  return (
    <DashboardLayout title="Performance Monitoring" subtitle="Track performance metrics and optimization">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Monitoring Module</h3>
          <p className="text-gray-600">
            Real-time metrics dashboard, performance alerts, and optimization suggestions.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
