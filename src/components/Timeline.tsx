"use client";

// avoid framer-motion for compatibility; use plain divs and emoji
import Image from "next/image";
import { Container } from "./ui/Container";
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
          <ul className="space-y-8">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="bg-white p-6 rounded-2xl shadow-md flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="text-sm text-gray-500">{item.year}</div>
                  <div className="text-2xl mt-2">{item.icon}</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-500">
                      {item.milestone}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{item.description}</p>

                  {item.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`${item.title} image`}
                        width={900}
                        height={480}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
