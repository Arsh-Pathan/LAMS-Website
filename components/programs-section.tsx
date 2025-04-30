"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Tab } from "@/components/ui/tab"
import { PROGRAM_IMAGES, EMOJI_ICONS } from "@/lib/images"
import Link from "next/link"

export function ProgramsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const programs = [
    {
      title: "Playgroup",
      age: "Ages 2.5-3 years",
      description:
        "Our playgroup program focuses on sensory exploration, language development, and social interaction in a safe and nurturing environment.",
      features: [
        "Basic language skills",
        "Cultural awareness",
        "Storytelling",
        "Group games",
        "Art and craft activities",
      ],
      image: PROGRAM_IMAGES.playgroup,
      link: "#contact",
    },
    {
      title: "Nursery",
      age: "Ages 3-4 years",
      description:
        "Our nursery program builds on foundational skills and introduces structured learning activities while maintaining a play-based approach.",
      features: [
        "Pre-reading and writing skills",
        "Number concepts",
        "Arts and crafts",
        "Group activities",
        "Physical education",
      ],
      image: PROGRAM_IMAGES.nursery,
      link: "#contact",
    },
    {
      title: "Kindergarten",
      age: "Ages 4-6 years",
      description:
        "Our kindergarten program prepares children for primary school with a balanced curriculum that develops academic, social, and emotional skills.",
      features: [
        "Reading and writing",
        "Mathematics",
        "Science exploration",
        "Soports and games",
        "Creative arts",
      ],
      image: PROGRAM_IMAGES.kindergarten,
      link: "#contact",
    },
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="programs" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Our Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer age-appropriate programs designed to nurture your child's development at every stage.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Tab active={activeTab === index} onClick={() => setActiveTab(index)}>
                {program.title}
              </Tab>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 order-2 md:order-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
                  {programs[activeTab].age}
                </div>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">{programs[activeTab].title}</h3>
                <p className="text-gray-700 mb-6">{programs[activeTab].description}</p>

                <h4 className="font-semibold text-red-600 mb-3">Program Features:</h4>
                <ul className="space-y-2 mb-6">
                  {programs[activeTab].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={programs[activeTab].link}
                    className="inline-block px-6 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="relative h-[250px] md:h-auto order-1 md:order-2">
              <Image
                src={programs[activeTab].image || "/placeholder.svg"}
                alt={programs[activeTab].title}
                fill
                className="object-cover"
              />

              {/* Animated element */}
              <motion.div
                className="absolute -bottom-5 -right-5 w-32 h-32 z-10"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="bg-yellow-100 rounded-full p-4 shadow-lg flex items-center justify-center">
                  <span className="text-4xl">{EMOJI_ICONS.floating[2]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: EMOJI_ICONS.activities[0],
              title: "Arts & Crafts",
              desc: "Express creativity through various art mediums",
            },
            {
              icon: EMOJI_ICONS.activities[1],
              title: "Music & Dance",
              desc: "Develop rhythm, coordination and self-expression",
            },
            {
              icon: EMOJI_ICONS.activities[2],
              title: "Sports & Games",
              desc: "Build physical strength and team spirit",
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-red-400"
            >
              <div className="text-4xl mb-4">{activity.icon}</div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">{activity.title}</h3>
              <p className="text-gray-600">{activity.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
