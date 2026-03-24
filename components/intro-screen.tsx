"use client"

import { useState, useEffect } from "react"
import { Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
<Image
        src="/idfc-logo.jpeg"           // → /public/images/hero.jpg
        alt="Beautiful mountain landscape"
        width={100}
        height={100}
        priority                         // optional: for LCP / above-the-fold images
        className="rounded-xl shadow-lg"
      />            <div className="h-1 w-24 bg-primary/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="h-full w-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
