"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useInView } from "framer-motion"
import { HERO_IMAGES, EMOJI_ICONS } from "@/lib/images"
import { EnrollmentModal } from "@/components/enrollment-modal"

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images = HERO_IMAGES

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const floatingAnimation = {
    y: ["-5%", "5%"],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <section ref={ref} className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/80 to-red-100/80" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-transparent" />
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 leading-tight mb-4"
              >
                Where Little <span className="text-yellow-500">Angels</span> Learn and Grow
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8">
                Nurturing young minds in a safe, loving, and stimulating environment at Little Angels Model School,
                Shirdi.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="rounded-full bg-red-500 hover:bg-red-600 text-white px-8 shadow-lg"
                    onClick={() => setShowEnrollModal(true)}
                  >
                    Enroll Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-orange-400 text-orange-600 hover:bg-orange-50 px-8 shadow-md"
                    asChild
                  >
                    <Link href="#about">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl"
              >
                {images.map((src, index) => (
                  <Image
                    key={index}
                    src={src || "/placeholder.svg"}
                    alt={`Little Angels School - Image ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${
                      currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                    priority={index === 0}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${currentImage === index ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating cartoon elements */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -top-10 -right-10 w-24 h-24 hidden md:flex items-center justify-center"
              >
                <div className="bg-red-100 rounded-full p-4 shadow-lg">
                  <span className="text-4xl">{EMOJI_ICONS.floating[0]}</span>
                </div>
              </motion.div>

              <motion.div
                animate={floatingAnimation}
                className="absolute -bottom-10 -left-10 w-20 h-20 hidden md:flex items-center justify-center"
                style={{ animationDelay: "1s" }}
              >
                <div className="bg-yellow-100 rounded-full p-3 shadow-lg">
                  <span className="text-3xl">{EMOJI_ICONS.floating[1]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: EMOJI_ICONS.features[0], title: "Excellence", desc: "Award-winning curriculum" },
              { icon: EMOJI_ICONS.features[1], title: "Caring", desc: "Nurturing environment" },
              { icon: EMOJI_ICONS.features[2], title: "Learning", desc: "Playful education" },
              { icon: EMOJI_ICONS.features[3], title: "Growth", desc: "Holistic development" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-red-400"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg text-red-600">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EnrollmentModal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)} />
    </>
  )
}
