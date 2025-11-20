"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function ImportPage() {
  return (
    <DashboardLayout title="" subtitle="Module description">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Import Module</h3>
          <p className="text-gray-600">
            import functionality will be implemented here.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
