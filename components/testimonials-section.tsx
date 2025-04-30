"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { TESTIMONIAL_IMAGES } from "@/lib/images"

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const testimonials = [
    {
      name: "Altaf Pathan",
      role: "Parent",
      image: TESTIMONIAL_IMAGES[0],
      quote:
        "Little Angels has been a second home for my daughter. The teachers are caring and the curriculum is excellent. I've seen tremendous growth in her confidence and learning abilities.",
      rating: 5,
    },
    {
      name: "Akshay Popate",
      role: "Parent",
      image: TESTIMONIAL_IMAGES[1],
      quote:
        "We couldn't be happier with our decision to enroll our daughter at Little Angels. The school provides a perfect balance of academics and play-based learning in a nurturing environment.",
      rating: 5,
    },
    {
      name: "Aksha Rajput",
      role: "Parent",
      image: TESTIMONIAL_IMAGES[2],
      quote:
        "The individualized attention each child receives at Little Angels is remarkable. My son have different learning styles, and the teachers accommodate both beautifully.",
      rating: 4,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-red-100/30 rounded-full -translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-orange-100/30 rounded-full translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">What Parents Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our community of parents about their experience with Little Angels Model School.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={prev}
              className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 p-6 md:p-10 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: current === index ? 1 : 0,
                  x: current === index ? 0 : 100,
                  position: current === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="w-full"
              >
                {current === index && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <motion.div
                        className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <motion.div
                        className="flex mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </motion.div>
                      <motion.blockquote
                        className="text-gray-700 italic mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        "{testimonial.quote}"
                      </motion.blockquote>
                      <motion.div
                        className="font-medium text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {testimonial.name}
                      </motion.div>
                      <motion.div
                        className="text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {testimonial.role}
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={next}
              className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full mx-1 ${current === index ? "bg-red-600" : "bg-gray-300"}`}
              whileHover={{ scale: 1.5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
