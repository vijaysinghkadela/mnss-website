"use client";

// avoid framer-motion for compatibility; use plain divs and emoji
import Image from "next/image";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timeline } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./ui/Reveal";

export function Timeline() {
  const { elementRef } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <Container>
        <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("timelineTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("timelineDescription")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ul className="relative space-y-8 before:absolute before:top-6 before:bottom-6 before:left-10 before:w-0.5 before:bg-gray-200">
            {timeline.map((item, i) => {
              // map year ranges to translation keys defined
              let keyBase = "";
              if (item.year === "2009") keyBase = "tl2009";
              else if (item.year === "2014-17") keyBase = "tl2014";
              else if (item.year === "2022-23") keyBase = "tl2022";
              else if (item.year === "2024-25") keyBase = "tl2024";
              const title = keyBase ? t(`${keyBase}Title`) : item.title;
              const desc = keyBase ? t(`${keyBase}Desc`) : item.description;
              const milestone = keyBase
                ? t(`${keyBase}Milestone`)
                : item.milestone;
              const allowedIcons = [
                "star",
                "book",
                "palette",
                "hospital",
              ] as const;
              type Allowed = (typeof allowedIcons)[number];
              const iconName: Allowed = (
                allowedIcons as readonly string[]
              ).includes(item.icon)
                ? (item.icon as Allowed)
                : "star";
              return (
                <Reveal as="li" key={item.year} delay={i * 120} className="relative pl-16">
                  <div className="absolute left-4 top-6 w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                    <Icon name={iconName} className="w-7 h-7 text-blue-600" />
                  </div>

                  <Card className="p-6 shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-gray-500">{item.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1">
                          {title}
                        </h3>
                        <div className="text-xs text-gray-500 mt-1">
                          {milestone}
                        </div>
                        <p className="text-gray-600 mt-3">{desc}</p>
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
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
