"use client";

import React, { useState } from 'react';
import { ORGANIZATION } from '@/data/constants';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [sent, setSent] = useState(false);

  // validations (mirroring donation form quality)
  function validate(): boolean {
    const e: Partial<Record<keyof ContactFormState, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (name.length < 2) e.name = t('errorNameInvalid');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) e.email = t('errorEmailInvalid');
    if (form.phone && phoneDigits.length > 0 && phoneDigits.length < 10) e.phone = t('errorPhoneInvalid');
    if (!form.type.trim()) e.type = t('errorInquiryTypeRequired');
    if (!form.subject.trim()) e.subject = t('errorSubjectRequired');
    if (!form.message.trim()) e.message = t('errorMessageRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setForm({ name: '', email: '', phone: '', subject: '', message: '', type: '' });
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: t('inquiryTypeGeneral') },
    { value: 'volunteer', label: t('inquiryTypeVolunteer') },
    { value: 'partnership', label: t('inquiryTypePartnership') },
    { value: 'program', label: t('inquiryTypeProgram') },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contactTitle')}</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">{t('contactDescription')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('getInTouch')}</h2>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500">{t('ourAddress') || 'Our Address'}</div>
                <div className="text-gray-800 mt-1">
                  {ORGANIZATION.location.address}, {ORGANIZATION.location.city}, {ORGANIZATION.location.state} {ORGANIZATION.location.pincode}
                </div>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500">{t('phoneLabel') || 'Phone'}</div>
                <div className="text-gray-800 mt-1">{ORGANIZATION.location.phone}</div>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500">{t('emailLabel') || 'Email'}</div>
                <div className="text-gray-800 mt-1">{ORGANIZATION.location.email}</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contactTitle')}</h3>
            {sent && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                {t('contactSentSuccess')}
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')} *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onBlur={() => setErrors(prev => ({ ...prev, name: form.name.trim().length < 2 ? t('errorNameInvalid') : '' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder={t('fullName')}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')} *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onBlur={() => {
                      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      setErrors(prev => ({ ...prev, email: re.test(form.email.trim()) ? '' : t('errorEmailInvalid') }));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder={t('emailAddress')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')}</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    onBlur={() => {
                      const digits = form.phone.replace(/\D/g, '');
                      setErrors(prev => ({ ...prev, phone: form.phone && digits.length < 10 ? t('errorPhoneInvalid') : '' }));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder={t('phoneNumber')}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('inquiryTypeLabel')}</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                  >
                    <option value="">{t('selectService')}</option>
                    {inquiryTypes.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('subjectLabel')} *</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder={t('subjectLabel')}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('messageLabel')} *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
                  placeholder={t('messageLabel')}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('sendingMessage') : t('contact')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


