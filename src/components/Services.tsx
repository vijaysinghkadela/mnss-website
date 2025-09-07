"use client";

import { Container } from "./ui/Container";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services } from "@/lib/data";

export function Services() {
  const { elementRef } = useScrollAnimation();

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <Container>
        <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive{" "}
            <span className="text-gray-900 bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Social Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From emergency crisis support to long-term empowerment programs, we
            provide integrated services that address the full spectrum of
            community needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="group text-gray-900 bg-purple-300 ">
            View All Programs
            <span className="ml-2">➤</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof services)[0];
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div>
      <Card
        hover
        className="h-full group cursor-pointer relative overflow-hidden"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
        />

        <CardContent className="relative z-10">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {service.shortDesc}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Beneficiaries:</span>
              <span className="font-semibold text-primary-600">
                {service.beneficiaries}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Locations:</span>
              <span className="font-semibold text-secondary-600">
                {service.locations}
              </span>
            </div>
          </div>

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
          {service.contacts && (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-gray-500">Emergency:</span>
              <a
                href={`tel:${service.contacts[0].replace(/\D/g, "")}`}
                className="text-xs text-accent-600 font-semibold hover:text-accent-700"
              >
                {service.contacts[0]}
              </a>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 group-hover:bg-primary-50 group-hover:text-primary-700"
          >
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
