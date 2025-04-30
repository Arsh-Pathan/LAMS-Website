"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { SCHOOL_LOGO } from "@/lib/images"
import { EnrollmentModal } from "@/components/enrollment-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-white/80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-red-400"
            >
              <Image
                src={SCHOOL_LOGO || "/placeholder.svg"}
                alt="Little Angels Model School Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-xl text-red-600"
              >
                Little Angels
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-red-400"
              >
                Model School, Shirdi
              </motion.p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-5 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
              >
                Enroll Now
              </button>
            </motion.div>
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-red-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white p-4 shadow-md"
          >
            <nav className="flex flex-col gap-4">
              <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
              <button
                onClick={() => {
                  setShowEnrollModal(true)
                  setIsMenuOpen(false)
                }}
                className="px-5 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors text-center shadow-md"
              >
                Enroll Now
              </button>
            </nav>
          </motion.div>
        )}
      </motion.header>

      <EnrollmentModal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)} />
    </>
  )
}

function NavLinks({ mobile = false, setIsMenuOpen = () => {} }) {
  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return links.map((link, i) => (
    <motion.div
      key={link.name}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * i }}
      whileHover={{ scale: 1.1 }}
    >
      <Link
        href={link.href}
        className={`font-medium hover:text-red-600 transition-colors ${
          mobile ? "block py-2 border-b border-gray-100" : ""
        }`}
        onClick={() => mobile && setIsMenuOpen(false)}
      >
        {link.name}
      </Link>
    </motion.div>
  ))
}