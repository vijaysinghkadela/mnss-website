"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services } from "@/lib/data";

export function Services() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <Container>
        <motion.div
          ref={elementRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Social Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From emergency crisis support to long-term empowerment programs, we
            provide integrated services that address the full spectrum of
            community needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button size="lg" className="group">
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services;
  index: number;
  isVisible: boolean;
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        hover
        className="h-full group cursor-pointer relative overflow-hidden"
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
        />

        <CardContent className="relative z-10">
          {/* Icon */}
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {service.shortDesc}
          </p>

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Beneficiaries:
              </span>
              <span className="font-semibold text-primary-600">
                {service.beneficiaries}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Locations:
              </span>
              <span className="font-semibold text-secondary-600">
                {service.locations}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center text-sm text-gray-600"
              >
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-xs text-primary-600 font-medium">
                +{service.features.length - 3} more services
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="relative z-10">
          {service.contacts && service.contacts.length > 0 && (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-gray-500">Emergency:</span>
              <a
                href={`tel:${service.contacts[0].replace(/\D/g, "")}`}
                className="text-xs text-accent-600 font-semibold hover:text-accent-700 flex items-center group"
              >
                <Phone className="w-3 h-3 mr-1" />
                {service.contacts}
              </a>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 group-hover:bg-primary-50 group-hover:text-primary-700"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
