"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { GALLERY_IMAGES } from "@/lib/images"
import { loadMoreGalleryImages } from "@/lib/actions"

// Define the Image type for TypeScript
interface GalleryImage {
  src: string
  alt: string
  category: string
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasLoadedMore, setHasLoadedMore] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95, 
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const handleLoadMore = async () => {
    setIsLoading(true)
    setHasLoadedMore(true)
    try {
      const moreImages: GalleryImage[] = await loadMoreGalleryImages()
      setImages([...images, ...moreImages])
    } catch (error) {
      console.error("Error loading more images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="gallery" ref={ref} className="py-16 md:py-24 bg-yellow-50/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Our Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a peek into the colorful world of Little Angels and see our little ones learning, playing, and growing.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(index)}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div className="relative h-64 w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white font-medium">{image.alt}</span>
                <span className="text-white/80 text-sm">{image.category}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {!hasLoadedMore && (
            <motion.div
              className="mt-8 text-center"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="px-6 py-2 rounded-full bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View More Photos"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={800}
                height={600}
                className="object-contain w-full h-full rounded-lg"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 rounded-b-lg"
              >
                <p className="text-white font-medium">{images[selectedImage].alt}</p>
                <p className="text-white/80 text-sm">{images[selectedImage].category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}