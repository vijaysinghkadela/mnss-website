import React from 'react';
import Image from 'next/image';
import { STATISTICS, ORGANIZATION } from '@/data/constants';

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MNSS</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming communities through sustainable development, skill building, and women empowerment since 2009
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Marut Narayan Sewa Sansthan (MNSS) is a registered non-governmental organization established in 2009 with a mission to empower rural communities, particularly women, through comprehensive skill development and awareness programs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{new Date().getFullYear() - 2009}+</div>
                  <div className="text-sm text-gray-600">Years of Service</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{STATISTICS.overall.totalBeneficiaries.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/about/mnss-team.jpg" alt="MNSS Team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${ORGANIZATION.location.phone}`} className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Call Us: {ORGANIZATION.location.phone}
            </a>
            <a href={`mailto:${ORGANIZATION.location.email}`} className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Email: {ORGANIZATION.location.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


