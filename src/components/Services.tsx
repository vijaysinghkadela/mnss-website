"use client";

import { Container } from "./ui/Container";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services } from "@/lib/data";

export function Services() {
  const { elementRef } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
      </div>

      <Container className="relative z-10">
        <div ref={elementRef} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">🛠️</span>
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/programs'
              }
            }}
          >
            {t('viewAllPrograms')}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">➤</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const { t } = useLanguage();
  
  const cardColors = [
    'from-blue-500 to-blue-600',
    'from-emerald-500 to-emerald-600', 
    'from-amber-500 to-amber-600',
    'from-purple-500 to-purple-600'
  ];
  
  const iconColors = [
    'text-blue-600',
    'text-emerald-600',
    'text-amber-600', 
    'text-purple-600'
  ];

  const bgColors = [
    'bg-blue-50',
    'bg-emerald-50',
    'bg-amber-50',
    'bg-purple-50'
  ];

  const colorIndex = index % cardColors.length;

  return (
    <div className="group">
      <Card
        hover
        className="h-full cursor-pointer relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardColors[colorIndex]} opacity-0 group-hover:opacity-10 transition-all duration-500`}
        />
        
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${cardColors[colorIndex]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <CardContent className="relative z-10 p-8">
          <div className={`text-5xl mb-6 ${iconColors[colorIndex]}`}>
            {service.icon || '🌐'}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            {service.shortDesc}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">{t('beneficiaries')}:</span>
              <span className={`font-bold ${iconColors[colorIndex]}`}>
                {service.beneficiaries}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">{t('locations')}:</span>
              <span className={`font-bold ${iconColors[colorIndex]}`}>
                {service.locations}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center text-sm text-slate-700"
              >
                <div className={`w-2 h-2 ${bgColors[colorIndex]} rounded-full mr-3 flex-shrink-0`} />
                {feature}
              </div>
            ))}
            {service.features.length > 3 && (
              <div className={`text-xs ${iconColors[colorIndex]} font-medium mt-2`}>
                +{service.features.length - 3} more services
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="relative z-10 p-6 pt-0">
          {service.contacts && (
            <div className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600 font-medium">Emergency:</span>
              <a
                href={`tel:${service.contacts[0].replace(/\D/g, "")}`}
                className={`text-xs ${iconColors[colorIndex]} font-bold hover:underline`}
              >
                {service.contacts[0]}
              </a>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}