"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ZoomIn, ZoomOut, Home, Info } from "lucide-react"
import { type Person, people } from "@/lib/data"
import { PersonNode } from "./person-node"
import { PersonDetails } from "./person-details"
import { Button } from "./ui/button"

export function ProphetTree() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLegend, setShowLegend] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const resetTransformRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Simulate loading time for animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      // Add a slight delay to ensure the tree is fully rendered
      const timer = setTimeout(() => {
        if (resetTransformRef.current) {
          resetTransformRef.current()
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const handlePersonClick = (person: Person) => {
    // Toggle the selected person if clicking the same one
    if (selectedPerson && selectedPerson.id === person.id) {
      setSelectedPerson(null)
    } else {
      setSelectedPerson(person)
    }
  }

  const renderConnections = () => {
    return people.map((person) => {
      return person.connections.map((targetId) => {
        const target = people.find((p) => p.id === targetId)
        if (!target) return null

        const startX = person.position.x
        const startY = person.position.y
        const endX = target.position.x
        const endY = target.position.y

        // Calculate control points for curved paths
        const midY = (startY + endY) / 2
        const controlX1 = startX
        const controlY1 = midY
        const controlX2 = endX
        const controlY2 = midY

        const delay = Math.min(person.id, target.id) * 0.01

        // Different colors for different types of connections
        let strokeColor = "rgba(147, 51, 234, 0.6)" // Default purple

        // If both are prophets, use green
        if (person.isProphet && target.isProphet) {
          strokeColor = "rgba(34, 197, 94, 0.6)" // Green
        }
        // Parent-child relationships
        else if (
          person.relation === "والد" ||
          person.relation === "والدة" ||
          target.relation === "ابن" ||
          target.relation === "ابنة"
        ) {
          strokeColor = "rgba(234, 179, 8, 0.6)" // Yellow
        }
        // Spousal relationships
        else if (person.relation === "زوجة" || target.relation === "زوجة") {
          strokeColor = "rgba(217, 70, 239, 0.6)" // Purple
        }
        // Sibling relationships
        else if (
          person.relation === "أخ" ||
          person.relation === "أخت" ||
          target.relation === "أخ" ||
          target.relation === "أخت"
        ) {
          strokeColor = "rgba(14, 165, 233, 0.6)" // Sky blue
        }

        const strokeWidth = person.isProphet && target.isProphet ? 1.5 : 1

        return (
          <motion.path
            key={`${person.id}-${targetId}`}
            d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay }}
            className="tree-branch"
          />
        )
      })
    })
  }

  const renderLeaves = () => {
    return people.map((person) => {
      // Only add leaves near prophets
      if (!person.isProphet) return null

      // Add decorative leaves near prophet nodes
      const leaves = []
      for (let i = 0; i < 3; i++) {
        const offsetX = Math.random() * 15 - 7.5
        const offsetY = Math.random() * 15 - 7.5
        const size = Math.random() * 5 + 5
        const delay = person.id * 0.01 + i * 0.03

        leaves.push(
          <motion.path
            key={`leaf-${person.id}-${i}`}
            d="M0,0 C3,0 5,-5 0,-10 C-5,-5 -3,0 0,0 Z"
            fill="rgba(34, 197, 94, 0.7)"
            transform={`translate(${person.position.x + offsetX}, ${person.position.y + offsetY}) scale(${size / 10})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: size / 10 }}
            transition={{ duration: 0.5, delay }}
            className="leaf"
          />,
        )
      }
      return leaves
    })
  }

  return (
    <div className="tree-container relative w-full h-screen overflow-hidden">
      <TransformWrapper
        initialScale={0.7} // Increased from 0.35 to zoom in more
        initialPositionX={500} // Adjusted for better centering
        initialPositionY={500} // Adjusted for better centering
        minScale={0.1}
        maxScale={4}
        wheel={{ step: 0.1 }}
        pinch={{ step: 5 }}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => {
          // Store the resetTransform function in a ref for later use
          resetTransformRef.current = resetTransform

          return (
            <>
              <div className="absolute top-20 left-4 z-20 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => zoomIn()}
                  className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  title="تكبير"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => zoomOut()}
                  className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  title="تصغير"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => resetTransform()}
                  className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  title="عرض الكل"
                >
                  <Home className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setShowLegend(!showLegend)}
                  className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 mt-4"
                  title="معلومات"
                >
                  <Info className="h-5 w-5" />
                </Button>
                <div className="mt-2 text-center text-xs bg-black/30 backdrop-blur-sm p-1 rounded-md text-white/70">
                  عرض الكل
                </div>
              </div>

              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <svg
                  ref={svgRef}
                  viewBox="-50 -50 450 250"
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {isLoaded && (
                    <>
                      {renderConnections()}
                      {renderLeaves()}
                      {people.map((person, index) => (
                        <PersonNode
                          key={person.id}
                          person={person}
                          onClick={() => handlePersonClick(person)}
                          delay={index * 0.01}
                          isSelected={selectedPerson?.id === person.id}
                        />
                      ))}
                    </>
                  )}
                </svg>
              </TransformComponent>
            </>
          )
        }}
      </TransformWrapper>

      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 md:p-6 rounded-t-xl max-h-[60vh] overflow-y-auto z-30"
          >
            <PersonDetails person={selectedPerson} onClose={() => setSelectedPerson(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 right-4 z-20 bg-black/70 backdrop-blur-md p-4 rounded-lg max-w-xs overflow-y-auto max-h-[80vh]"
          >
            <h3 className="text-lg font-bold mb-3 text-white arabic-text">دليل الرموز</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-800"></div>
                <span className="text-sm text-white/90 arabic-text">الأنبياء</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                <span className="text-sm text-white/90 arabic-text">الآباء</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-700"></div>
                <span className="text-sm text-white/90 arabic-text">الأمهات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-700"></div>
                <span className="text-sm text-white/90 arabic-text">الأبناء</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-700"></div>
                <span className="text-sm text-white/90 arabic-text">البنات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-700"></div>
                <span className="text-sm text-white/90 arabic-text">الزوجات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-sky-700"></div>
                <span className="text-sm text-white/90 arabic-text">الإخوة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-violet-700"></div>
                <span className="text-sm text-white/90 arabic-text">الأخوات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-teal-700"></div>
                <span className="text-sm text-white/90 arabic-text">الأعمام</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-700"></div>
                <span className="text-sm text-white/90 arabic-text">الأجداد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 bg-green-600"></div>
                <span className="text-sm text-white/90 arabic-text">علاقة بين الأنبياء</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 bg-purple-600"></div>
                <span className="text-sm text-white/90 arabic-text">علاقة عائلية</span>
              </div>
              <div className="mt-2 text-xs text-white/70">
                انقر على أي شخصية لعرض المزيد من المعلومات. انقر مرة أخرى لإغلاق التفاصيل.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-16 left-0 right-0 text-center text-sm text-white/70 z-20 pointer-events-none">
        <p className="bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
          استخدم عجلة الماوس للتكبير والتصغير، واسحب للتحرك، أو انقر على زر "عرض الكل" لرؤية جميع الأنبياء
        </p>
      </div>
    </div>
  )
}

