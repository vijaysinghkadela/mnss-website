"use client";

// avoid framer-motion for compatibility; use plain divs and emoji
import Image from "next/image";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timeline } from "@/lib/data";

export function Timeline() {
  const { elementRef } = useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <Container>
        <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-gray-900 bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Journey
            </span>{" "}
            of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a local initiative to a multi-district social service
            organization with government partnerships and specialized programs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ul className="relative space-y-8 before:absolute before:top-6 before:bottom-6 before:left-10 before:w-0.5 before:bg-gray-200">
            {timeline.map((item) => (
              <li key={item.year} className="relative pl-16">
                <div className="absolute left-4 top-6 w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                  <div className="text-xl">{item.icon}</div>
                </div>

                <Card className="p-6 shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500">{item.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {item.title}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">{item.milestone}</div>
                      <p className="text-gray-600 mt-3">{item.description}</p>
                    </div>
                    {item.image && (
                      <div className="w-40 h-28 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={`${item.title} image`}
                          width={400}
                          height={280}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
