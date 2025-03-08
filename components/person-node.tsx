"use client"

import { motion } from "framer-motion"
import type { Person } from "@/lib/data"
import { useState } from "react"

interface PersonNodeProps {
  person: Person
  onClick: () => void
  delay: number
  isSelected: boolean
}

export function PersonNode({ person, onClick, delay, isSelected }: PersonNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get colors based on relation type
  const getRelationColors = () => {
    if (person.isProphet) {
      return {
        fill: "url(#prophetGradient)",
        stroke: "rgba(34, 197, 94, 0.8)",
        glow: "rgba(34, 197, 94, 0.4)",
      }
    }

    switch (person.relation) {
      case "والد":
        return {
          fill: "url(#fatherGradient)",
          stroke: "rgba(59, 130, 246, 0.8)", // Blue
          glow: "rgba(59, 130, 246, 0.4)",
        }
      case "والدة":
        return {
          fill: "url(#motherGradient)",
          stroke: "rgba(236, 72, 153, 0.8)", // Pink
          glow: "rgba(236, 72, 153, 0.4)",
        }
      case "ابن":
        return {
          fill: "url(#sonGradient)",
          stroke: "rgba(234, 179, 8, 0.8)", // Yellow
          glow: "rgba(234, 179, 8, 0.4)",
        }
      case "ابنة":
        return {
          fill: "url(#daughterGradient)",
          stroke: "rgba(249, 115, 22, 0.8)", // Orange
          glow: "rgba(249, 115, 22, 0.4)",
        }
      case "زوجة":
        return {
          fill: "url(#wifeGradient)",
          stroke: "rgba(217, 70, 239, 0.8)", // Purple
          glow: "rgba(217, 70, 239, 0.4)",
        }
      case "أخ":
        return {
          fill: "url(#brotherGradient)",
          stroke: "rgba(14, 165, 233, 0.8)", // Sky blue
          glow: "rgba(14, 165, 233, 0.4)",
        }
      case "أخت":
        return {
          fill: "url(#sisterGradient)",
          stroke: "rgba(168, 85, 247, 0.8)", // Violet
          glow: "rgba(168, 85, 247, 0.4)",
        }
      case "عم":
        return {
          fill: "url(#uncleGradient)",
          stroke: "rgba(20, 184, 166, 0.8)", // Teal
          glow: "rgba(20, 184, 166, 0.4)",
        }
      case "جد":
        return {
          fill: "url(#grandfatherGradient)",
          stroke: "rgba(6, 182, 212, 0.8)", // Cyan
          glow: "rgba(6, 182, 212, 0.4)",
        }
      case "مكفولة":
        return {
          fill: "url(#wardGradient)",
          stroke: "rgba(16, 185, 129, 0.8)", // Emerald
          glow: "rgba(16, 185, 129, 0.4)",
        }
      default:
        return {
          fill: "url(#familyGradient)",
          stroke: "rgba(147, 51, 234, 0.8)", // Default purple
          glow: "rgba(147, 51, 234, 0.4)",
        }
    }
  }

  const colors = getRelationColors()
  const fillColor = colors.fill
  const strokeColor = colors.stroke
  const glowColor = colors.glow

  // Determine node size based on importance
  const nodeSize = person.isProphet ? 6 : 5
  const textSize = person.isProphet ? 2.2 : 1.8

  return (
    <motion.g
      className="person-node cursor-pointer"
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
      {/* Animated glow effect on hover or selection */}
      <motion.circle
        cx={person.position.x}
        cy={person.position.y}
        r={nodeSize + 2}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered || isSelected ? 1.8 : 1,
          opacity: isHovered || isSelected ? 0.8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Decorative outer ring */}
      <motion.circle
        cx={person.position.x}
        cy={person.position.y}
        r={nodeSize + 0.5}
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={0.3}
        initial={{ scale: 0 }}
        animate={{
          scale: isHovered || isSelected ? 1.2 : 1,
          strokeWidth: isHovered || isSelected ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main circle */}
      <motion.circle
        cx={person.position.x}
        cy={person.position.y}
        r={nodeSize}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSelected ? 1 : 0.5}
        animate={{
          scale: isHovered || isSelected ? 1.1 : 1,
          strokeWidth: isHovered || isSelected ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Person number for prophets */}
      {person.isProphet && (
        <>
          <motion.circle
            cx={person.position.x}
            cy={person.position.y - nodeSize - 1}
            r={1.2}
            fill={strokeColor}
            animate={{
              scale: isHovered || isSelected ? 1.2 : 1,
              fill: isHovered || isSelected ? strokeColor : strokeColor,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.text
            x={person.position.x}
            y={person.position.y - nodeSize - 0.7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={1.4}
            fontWeight="bold"
            animate={{
              scale: isHovered || isSelected ? 1.2 : 1,
              fill: isHovered || isSelected ? "#ffffff" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {person.id}
          </motion.text>
        </>
      )}

      {/* Person name */}
      <motion.text
        x={person.position.x}
        y={person.position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={textSize}
        fontWeight="bold"
        className="arabic-text"
        animate={{
          fontSize: isHovered || isSelected ? textSize * 1.2 : textSize,
          fill: isHovered || isSelected ? "#ffffff" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {person.nameArabic}
      </motion.text>

      {/* Person name in English */}
      <motion.text
        x={person.position.x}
        y={person.position.y + nodeSize - 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255, 255, 255, 0.7)"
        fontSize={textSize * 0.7}
        animate={{
          fontSize: isHovered || isSelected ? textSize * 0.8 : textSize * 0.7,
          fill: isHovered || isSelected ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
        }}
        transition={{ duration: 0.3 }}
      >
        {person.nameEnglish}
      </motion.text>

      {/* Relationship label */}
      {person.relation && (
        <motion.text
          x={person.position.x}
          y={person.position.y + nodeSize + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={strokeColor}
          fontSize={textSize * 0.6}
          className="arabic-text"
          animate={{
            fontSize: isHovered || isSelected ? textSize * 0.7 : textSize * 0.6,
            fill: isHovered || isSelected ? strokeColor : strokeColor,
          }}
          transition={{ duration: 0.3 }}
        >
          {person.relation}
        </motion.text>
      )}

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="prophetGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(20, 83, 45, 0.9)" />
          <stop offset="100%" stopColor="rgba(10, 41, 22, 0.9)" />
        </radialGradient>

        <radialGradient id="familyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(88, 28, 135, 0.9)" />
          <stop offset="100%" stopColor="rgba(59, 7, 100, 0.9)" />
        </radialGradient>

        <radialGradient id="fatherGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(37, 99, 235, 0.9)" />
          <stop offset="100%" stopColor="rgba(30, 58, 138, 0.9)" />
        </radialGradient>

        <radialGradient id="motherGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(219, 39, 119, 0.9)" />
          <stop offset="100%" stopColor="rgba(157, 23, 77, 0.9)" />
        </radialGradient>

        <radialGradient id="sonGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(202, 138, 4, 0.9)" />
          <stop offset="100%" stopColor="rgba(133, 77, 14, 0.9)" />
        </radialGradient>

        <radialGradient id="daughterGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(234, 88, 12, 0.9)" />
          <stop offset="100%" stopColor="rgba(154, 52, 18, 0.9)" />
        </radialGradient>

        <radialGradient id="wifeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(192, 38, 211, 0.9)" />
          <stop offset="100%" stopColor="rgba(126, 34, 206, 0.9)" />
        </radialGradient>

        <radialGradient id="brotherGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(2, 132, 199, 0.9)" />
          <stop offset="100%" stopColor="rgba(3, 105, 161, 0.9)" />
        </radialGradient>

        <radialGradient id="sisterGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(147, 51, 234, 0.9)" />
          <stop offset="100%" stopColor="rgba(107, 33, 168, 0.9)" />
        </radialGradient>

        <radialGradient id="uncleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(13, 148, 136, 0.9)" />
          <stop offset="100%" stopColor="rgba(15, 118, 110, 0.9)" />
        </radialGradient>

        <radialGradient id="grandfatherGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(8, 145, 178, 0.9)" />
          <stop offset="100%" stopColor="rgba(21, 94, 117, 0.9)" />
        </radialGradient>

        <radialGradient id="wardGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(5, 150, 105, 0.9)" />
          <stop offset="100%" stopColor="rgba(6, 95, 70, 0.9)" />
        </radialGradient>
      </defs>
    </motion.g>
  )
}

