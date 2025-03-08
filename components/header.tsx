"use client"

import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 bg-black/30 backdrop-blur-sm"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-white arabic-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          شجرة الأنبياء
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          الأنبياء الخمسة والعشرون المذكورون في القرآن الكريم
        </motion.p>
      </div>
    </motion.header>
  )
}

