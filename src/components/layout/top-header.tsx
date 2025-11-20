"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bell, Search, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TopHeaderProps {
  title?: string
  subtitle?: string
}

export function TopHeader({ title = "", subtitle = "" }: TopHeaderProps) {
  return (
    <header className="h-16 bg-header-bg border-b border-header-border flex items-center justify-between px-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1"
      >
        {title && (
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-400">{subtitle}</p>
            )}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search architectures..."
            className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
        </Button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}