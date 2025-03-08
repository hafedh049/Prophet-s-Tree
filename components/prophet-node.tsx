"use client"

import { motion } from "framer-motion"
import type { Prophet } from "@/lib/data"
import { useState } from "react"

interface ProphetNodeProps {
  prophet: Prophet
  onClick: () => void
  delay: number
}

export function ProphetNode({ prophet, onClick, delay }: ProphetNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.g
      className="prophet-node cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Animated glow effect on hover */}
      <motion.circle
        cx={prophet.position.x}
        cy={prophet.position.y}
        r={4}
        fill="none"
        stroke="rgba(34, 197, 94, 0.4)"
        strokeWidth={0.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Decorative outer ring */}
      <motion.circle
        cx={prophet.position.x}
        cy={prophet.position.y}
        r={3.5}
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={0.3}
        initial={{ scale: 0 }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          strokeWidth: isHovered ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main circle */}
      <motion.circle
        cx={prophet.position.x}
        cy={prophet.position.y}
        r={3}
        fill="url(#gradientFill)"
        stroke="rgba(34, 197, 94, 0.8)"
        strokeWidth={0.5}
        animate={{
          scale: isHovered ? 1.1 : 1,
          strokeWidth: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Prophet number */}
      <motion.circle
        cx={prophet.position.x}
        cy={prophet.position.y - 4}
        r={1}
        fill="rgba(34, 197, 94, 0.8)"
        animate={{
          scale: isHovered ? 1.2 : 1,
          fill: isHovered ? "rgba(34, 197, 94, 1)" : "rgba(34, 197, 94, 0.8)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.text
        x={prophet.position.x}
        y={prophet.position.y - 3.7}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={1.2}
        fontWeight="bold"
        animate={{
          scale: isHovered ? 1.2 : 1,
          fill: isHovered ? "#ffffff" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {prophet.id}
      </motion.text>

      {/* Prophet name */}
      <motion.text
        x={prophet.position.x}
        y={prophet.position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={1.5}
        fontWeight="bold"
        className="arabic-text"
        animate={{
          fontSize: isHovered ? 1.8 : 1.5,
          fill: isHovered ? "#ffffff" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {prophet.nameArabic}
      </motion.text>

      {/* Prophet name in English */}
      <motion.text
        x={prophet.position.x}
        y={prophet.position.y + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255, 255, 255, 0.7)"
        fontSize={1}
        animate={{
          fontSize: isHovered ? 1.2 : 1,
          fill: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
        }}
        transition={{ duration: 0.3 }}
      >
        {prophet.nameEnglish}
      </motion.text>

      {/* Gradient definition */}
      <defs>
        <radialGradient id="gradientFill" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(20, 20, 30, 0.9)" />
          <stop offset="100%" stopColor="rgba(10, 10, 15, 0.9)" />
        </radialGradient>

        {/* Hover gradient */}
        <radialGradient id="hoverGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" />
          <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
        </radialGradient>
      </defs>
    </motion.g>
  )
}

