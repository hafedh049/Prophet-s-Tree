"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-black/30 backdrop-blur-sm text-center"
    >
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} شجرة الأنبياء | جميع الحقوق محفوظة
      </p>
    </motion.footer>
  )
}

