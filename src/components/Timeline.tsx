"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Container } from "./ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timeline } from "@/lib/data";

export function Timeline() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <Container>
        <motion.div
          ref={elementRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Journey
            </span>{" "}
            of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a local initiative to a multi-district social service
            organization with government partnerships and specialized programs.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isVisible={isVisible}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface TimelineItemProps {
  item: typeof timeline;
  index: number;
  isVisible: boolean;
  isLast: boolean;
}

function TimelineItem({ item, index, isVisible, isLast }: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex items-start mb-12"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-20 bg-gradient-to-b from-primary-400 to-secondary-400 opacity-30" />
      )}

      {/* Timeline Node */}
      <motion.div
        className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
      >
        <div className="text-xl">{item.icon}</div>
        <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full animate-pulse" />
      </motion.div>

      {/* Content */}
      <div className="ml-8 flex-1">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary-600">
                {item.year}
              </span>
              <CheckCircle className="w-5 h-5 text-secondary-500" />
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-semibold rounded-full">
              {item.milestone}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Impact Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-50 to-emerald-50 text-secondary-700 rounded-lg text-sm font-medium">
            <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2 animate-pulse" />
            {item.impact}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
