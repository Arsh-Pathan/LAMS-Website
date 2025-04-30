"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface TabProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

export function Tab({ children, active = false, onClick }: TabProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-full font-medium transition-colors ${
        active ? "bg-red-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </motion.button>
  )
}
