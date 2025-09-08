"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { scrollToElement } from '@/lib/utils'

export default function ComprehensiveServices() {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // if the hash is #comprehensive, open the section on arrival
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#comprehensive') {
        setExpanded(true)
        scrollToElement('comprehensive', 80)
      }

      const onHash = () => {
        if (window.location.hash === '#comprehensive') {
          setExpanded(true)
          scrollToElement('comprehensive', 80)
        }
      }

      const onOpenEvent = () => {
        setExpanded(true)
        scrollToElement('comprehensive', 80)
      }

      window.addEventListener('hashchange', onHash)
      window.addEventListener('openComprehensive', onOpenEvent as EventListener)
      return () => {
        window.removeEventListener('hashchange', onHash)
        window.removeEventListener('openComprehensive', onOpenEvent as EventListener)
      }
    }
  }, [])

  const handleOpen = () => {
  // set the hash so the URL is shareable and dispatch an event to open immediately
  if (typeof window !== 'undefined') window.location.hash = '#comprehensive'
  window.dispatchEvent(new Event('openComprehensive'))
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Comprehensive Social Services</h3>
        <div>
          <Button variant="outline" onClick={() => handleOpen()}>Learn more</Button>
        </div>
      </div>

      <div id="comprehensive" className="bg-white rounded-xl shadow p-6 transition-all">
        {!expanded ? (
          <div className="text-gray-600">A focused set of programs combining emergency response, rehabilitation, skills training, and government partnership initiatives. Click &quot;Learn more&quot; to see details.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold">Emergency & Crisis Response</h4>
              <p className="text-gray-600 mb-4">24/7 helpline, safe shelter, immediate legal & medical support, and coordination with local authorities for immediate intervention.</p>

              <h4 className="font-semibold">Rehabilitation & Mental Health</h4>
              <p className="text-gray-600 mb-4">Residential rehabilitation centers, counseling services, community reintegration programs, and follow-up care.</p>

              <h4 className="font-semibold">Skill Development & Livelihoods</h4>
              <p className="text-gray-600 mb-4">Multi-trade skills training, job placement, entrepreneurship support, and market-linkages for handicrafts and local products.</p>
            </div>

            <div>
              <h4 className="font-semibold">Government Partnerships</h4>
              <p className="text-gray-600 mb-4">Collaborations with KVIC, NABARD, and local ministries to deliver certified training and funding support for community initiatives.</p>

              <h4 className="font-semibold">How to Access Services</h4>
              <ul className="text-gray-600 list-disc ml-5">
                <li>Call our emergency helpline: <strong>9772062226</strong></li>
                <li>Visit a local center for intake and assessment</li>
                <li>Enroll in scheduled training programs via the contact form</li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Button onClick={() => window.location.href = '#contact'}>Contact Us</Button>
                <Button variant="ghost" onClick={() => setExpanded(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
