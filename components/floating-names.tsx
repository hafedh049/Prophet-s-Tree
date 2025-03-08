"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// The 99 names of Allah in Arabic
const namesOfAllah = [
  "الله",
  "الرحمن",
  "الرحيم",
  "الملك",
  "القدوس",
  "السلام",
  "المؤمن",
  "المهيمن",
  "العزيز",
  "الجبار",
  "المتكبر",
  "الخالق",
  "البارئ",
  "المصور",
  "الغفار",
  "القهار",
  "الوهاب",
  "الرزاق",
  "الفتاح",
  "العليم",
  "القابض",
  "الباسط",
  "الخافض",
  "الرافع",
  "المعز",
  "المذل",
  "السميع",
  "البصير",
  "الحكم",
  "العدل",
  "اللطيف",
  "الخبير",
  "الحليم",
  "العظيم",
  "الغفور",
  "الشكور",
  "العلي",
  "الكبير",
  "الحفيظ",
  "المقيت",
  "الحسيب",
  "الجليل",
  "الكريم",
  "الرقيب",
  "المجيب",
  "الواسع",
  "الحكيم",
  "الودود",
  "المجيد",
  "الباعث",
  "الشهيد",
  "الحق",
  "الوكيل",
  "القوي",
  "المتين",
  "الولي",
  "الحميد",
  "المحصي",
  "المبدئ",
  "المعيد",
  "المحيي",
  "المميت",
  "الحي",
  "القيوم",
  "الواجد",
  "الماجد",
  "الواحد",
  "الأحد",
  "الصمد",
  "القادر",
  "المقتدر",
  "المقدم",
  "المؤخر",
  "الأول",
  "الآخر",
  "الظاهر",
  "الباطن",
  "الوالي",
  "المتعالي",
  "البر",
  "التواب",
  "المنتقم",
  "العفو",
  "الرؤوف",
  "مالك الملك",
  "ذو الجلال والإكرام",
  "المقسط",
  "الجامع",
  "الغني",
  "المغني",
  "المانع",
  "الضار",
  "النافع",
  "النور",
  "الهادي",
  "البديع",
  "الباقي",
  "الوارث",
  "الرشيد",
  "الصبور",
]

interface FloatingName {
  id: number
  name: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingNames() {
  const [names, setNames] = useState<FloatingName[]>([])

  useEffect(() => {
    // Create floating names with random positions and properties
    const floatingNames: FloatingName[] = []

    for (let i = 0; i < namesOfAllah.length; i++) {
      floatingNames.push({
        id: i,
        name: namesOfAllah[i],
        x: Math.random() * 100, // Random position from 0-100%
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8, // Random size between 0.8 and 2.3
        duration: Math.random() * 100 + 100, // Random duration between 100-200s
        delay: Math.random() * -50, // Random delay for animation start
        opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1-0.4
      })
    }

    setNames(floatingNames)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {names.map((item) => (
        <motion.div
          key={item.id}
          className="absolute arabic-text font-bold text-primary floating-name"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            opacity: item.opacity,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [item.opacity, item.opacity * 1.5, item.opacity, item.opacity * 1.2, item.opacity],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {item.name}
        </motion.div>
      ))}
    </div>
  )
}

