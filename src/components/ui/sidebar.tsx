import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  children: React.ReactNode
  className?: string
  collapsed?: boolean
  onToggle?: () => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, collapsed = false, onToggle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-sidebar-bg border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        {children}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          )}
        </button>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between h-16 px-4 border-b border-sidebar-border", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto py-4", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarItem = React.forwardRef<HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode
    active?: boolean
  }
>(({ className, icon, active = false, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full flex items-center px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-sidebar-active text-white"
        : "text-gray-300 hover:bg-sidebar-hover hover:text-white",
      className
    )}
    {...props}
  >
    {icon && <span className="mr-3 h-5 w-5 flex-shrink-0">{icon}</span>}
    <span className="truncate">{children}</span>
  </button>
))
SidebarItem.displayName = "SidebarItem"

export { Sidebar, SidebarHeader, SidebarContent, SidebarItem }