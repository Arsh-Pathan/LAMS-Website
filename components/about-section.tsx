"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ABOUT_IMAGE, EMOJI_ICONS } from "@/lib/images"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-orange-50/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-100 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-red-600 mb-4"
          >
            About Our School
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Little Angels Model School in Shirdi provides a nurturing environment where children can explore, learn, and
            grow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={ABOUT_IMAGE || "/placeholder.svg"}
                alt="Children playing and learning"
                fill
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 h-32 w-32 bg-red-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-4xl">🎓</span>
            </motion.div>

            {/* Animated element */}
            <motion.div
              className="absolute -top-10 -left-10 w-32 h-32"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="bg-orange-100 rounded-full p-5 shadow-lg">
                <span className="text-4xl">{EMOJI_ICONS.floating[1]}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-orange-600 mb-4">
              Our Philosophy
            </motion.h3>

            <motion.p variants={itemVariants} className="text-gray-700 mb-6">
              At Little Angels, we believe that every child is unique and deserves an education that nurtures their
              individual talents and abilities. Our play-based curriculum encourages curiosity, creativity, and a love
              for learning.
            </motion.p>

            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-orange-600 mb-4">
              Our Mission
            </motion.h3>

            <motion.p variants={itemVariants} className="text-gray-700 mb-6">
              To provide a safe, caring, and stimulating environment where children can develop socially, emotionally,
              physically, and intellectually. We aim to build a strong foundation for lifelong learning.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { number: "10+", text: "Years of Excellence" },
                { number: "1000+", text: "Happy Students" },
                { number: "15+", text: "Qualified Teachers" },
                { number: "99%", text: "Parent Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg p-4 shadow-sm transition-all duration-300 border-l-4 border-red-400"
                >
                  <div className="text-2xl font-bold text-red-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
