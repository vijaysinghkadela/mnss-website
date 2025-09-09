"use client";

import { useState } from "react";
// use simple emoji placeholders for icons to avoid lucide-react typing issues
import { Container } from "./ui/Container";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { emergencyContacts } from "@/lib/data";
import { useLanguage } from '@/context/LanguageContext'
import { isValidEmail } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function Contact() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = t('nameRequired');
    if (!formData.email.trim()) newErrors.email = t('emailRequired');
    else if (!isValidEmail(formData.email))
      newErrors.email = t('validEmail');
    if (!formData.phone.trim()) newErrors.phone = t('phoneRequired');
    if (!formData.message.trim()) newErrors.message = t('messageRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-amber-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">📞</span>
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-3">🚨</span>
                  {t('emergencyContactsTitle')}
                </h3>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <a
                      key={contact.service}
                      href={`tel:${contact.number}`}
                      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group border border-white/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            contact.type === "crisis"
                              ? "bg-red-500/20 text-red-400"
                              : contact.type === "emergency"
                              ? "bg-orange-500/20 text-orange-400"
                              : contact.type === "rehabilitation"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          <span className="text-xl">📞</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {contact.service}
                          </div>
                          <div className="text-sm text-slate-300">
                            {contact.available}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {contact.number}
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">📍</span>
                  {t('headOffice')}
                </h3>
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-medium text-white">Address</p>
                      <p className="text-sm">Rajasthan, India</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">📧</span>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-sm">marutnarayan7181@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">⏰</span>
                    <div>
                      <p className="font-medium text-white">{t('officeHours')}</p>
                      <p className="text-sm">24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">✉️</span>
                Send us a Message
              </h3>
              
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center">
                  {t('messageSent')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={t('fullNamePlaceholder')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={t('emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={t('phonePlaceholder')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('serviceNeeded')}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">{t('selectService')}</option>
                    <option value="emergency">{t('optionEmergency')}</option>
                    <option value="womens-safety">{t('optionWomensSafety')}</option>
                    <option value="rehabilitation">{t('optionRehabilitation')}</option>
                    <option value="skill-development">{t('optionSkillDev')}</option>
                    <option value="information">{t('optionInformation')}</option>
                    <option value="partnership">{t('optionPartnership')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('messageLabel')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 py-4 text-lg font-semibold"
                >
                  {isSubmitting ? t('sendingMessage') : t('sendMessage')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
