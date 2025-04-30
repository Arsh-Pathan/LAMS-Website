"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { NewsletterForm } from "@/components/newsletter-form"
import { SCHOOL_LOGO } from "@/lib/images"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10 p-1">
                <Image
                  src={SCHOOL_LOGO || "/placeholder.svg"}
                  alt="Little Angels Model School Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Little Angels</h3>
            </motion.div>

            <motion.p
              className="text-red-100 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nurturing young minds in a safe, loving, and stimulating environment since 2015.
            </motion.p>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-red-200 text-sm">Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Heart size={16} className="mx-1 text-yellow-300 fill-yellow-300" />
              </motion.div>
              <span className="text-red-200 text-sm">for little ones</span>
            </motion.div>

            <NewsletterForm />
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Programs", "Gallery"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <Link
                    href={`#${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`}
                    className="text-red-100 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {["Playgroup", "Nursery", "Kindergarten"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <Link href="#programs" className="text-red-100 hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <motion.address
              className="not-italic text-red-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p>Sriram Nagar, Govind Nagar,</p>
              <p>Shirdi, Maharashtra 423109</p>
              <p>India</p>
              <p className="mt-2">Phone: +91 9765935786</p>
              <p>Email: mail.little.angels.model.school@gmail.com</p>
            </motion.address>
          </div>
        </div>

        <motion.div
          className="mt-12 pt-6 border-t border-red-500 text-center text-red-200 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Little Angels Model School. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
