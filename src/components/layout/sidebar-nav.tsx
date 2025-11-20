"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Cloud,
  FileText,
  MessageSquare,
  Download,
  GitBranch,
  Users,
  BarChart3,
  DollarSign,
  MessageCircle,
  Plug,
  BookOpen,
  Settings
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from "@/components/ui/sidebar"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: "Architectures",
    href: "/architectures",
    icon: <Cloud className="h-5 w-5" />
  },
  {
    name: "Templates",
    href: "/templates",
    icon: <FileText className="h-5 w-5" />
  },
  {
    name: "Smart Chatbot",
    href: "/chatbot",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    name: "Create from Template",
    href: "/designer/new",
    icon: <Download className="h-5 w-5" />
  },
  {
    name: "Import / Reverse-engineer",
    href: "/import",
    icon: <GitBranch className="h-5 w-5" />
  },
  {
    name: "Pipelines / Deployment",
    href: "/deployments",
    icon: <GitBranch className="h-5 w-5" />
  },
  {
    name: "Visual Canvas / Designer",
    href: "/designer",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: "Version Control & Collaboration",
    href: "/collaboration",
    icon: <Users className="h-5 w-5" />
  },
  {
    name: "Performance Monitoring",
    href: "/monitoring",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    name: "Cost Intelligence",
    href: "/costs",
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    name: "Feedback & Model Tuning",
    href: "/feedback",
    icon: <MessageCircle className="h-5 w-5" />
  },
  {
    name: "API Integration Manager",
    href: "/integrations",
    icon: <Plug className="h-5 w-5" />
  },
  {
    name: "User Education",
    href: "/education",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: <Settings className="h-5 w-5" />
  }
]

interface SidebarNavProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function SidebarNav({ collapsed = false, onToggle }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsed={collapsed} onToggle={onToggle}>
      <SidebarHeader>
        {!collapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-white"
          >
            AWSOME
          </motion.h1>
        )}
        {collapsed && (
          <div className="text-xl font-bold text-white">A</div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link key={item.name} href={item.href}>
                <SidebarItem
                  icon={item.icon}
                  active={isActive}
                  className={collapsed ? "justify-center px-2" : ""}
                >
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </SidebarItem>
              </Link>
            )
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}