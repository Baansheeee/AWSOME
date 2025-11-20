"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function ChatbotPage() {
  return (
    <DashboardLayout title="Smart Chatbot" subtitle="AI-powered architecture generation and assistance">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Chatbot Module</h3>
          <p className="text-gray-600">
            Generate architectures using natural language and get AI-powered recommendations.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
