"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function CostsPage() {
  return (
    <DashboardLayout title="Cost Intelligence" subtitle="Track spending and optimize costs">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost Intelligence Module</h3>
          <p className="text-gray-600">
            Cost breakdown by resource, budget tracking, and optimization recommendations.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
