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
      className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50"
    >
      <Container>
        <div
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('emergencyContactsTitle')}
                </h3>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <a
                      key={contact.service}
                      href={`tel:${contact.number}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group border border-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            contact.type === "crisis"
                              ? "bg-accent-100 text-accent-600"
                              : contact.type === "emergency"
                              ? "bg-red-100 text-red-600"
                              : contact.type === "rehabilitation"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-primary-100 text-primary-600"
                          }`}
                        >
                          <span className="w-5 h-5 text-lg" aria-hidden>
                            📞
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {contact.service}
                          </div>
                          <div className="text-sm text-gray-600">
                            {contact.available}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {contact.number}
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('headOffice')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span
                      className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0 text-lg"
                      aria-hidden
                    >
                      📍
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{t('address') || 'Address'}</div>
                      <div className="text-gray-600">
                        Rampole Choraya Station Road
                        <br />
                        Nagaur 341001, Rajasthan
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span
                      className="w-5 h-5 text-secondary-500 mt-1 flex-shrink-0 text-lg"
                      aria-hidden
                    >
                      ✉️
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{t('emailAddressLabel') || 'Email'}</div>
                      <a
                        href="mailto:marutnarayan7181@gmail.com"
                        className="text-secondary-600 hover:text-secondary-700"
                      >
                        marutnarayan7181@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span
                      className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0 text-lg"
                      aria-hidden
                    >
                      ⏰
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{t('officeHours') || 'Office Hours'}</div>
                      <div className="text-gray-600">
                        Monday - Saturday: 9 AM - 6 PM
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="p-8">
              <CardContent>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('sendMessage')}
                </h3>

                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <span
                      className="w-5 h-5 text-green-600 text-lg"
                      aria-hidden
                    >
                      ✅
                    </span>
                    <div className="text-green-700">{t('messageSent') || 'Thank you! Your message has been sent successfully.'}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('fullName')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        }`}
                        placeholder={t('fullNamePlaceholder') || 'Enter your full name'}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1 text-base" aria-hidden>
                            ⚠️
                          </span>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('emailAddress')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        }`}
                        placeholder={t('emailPlaceholder') || 'Enter your email'}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1 text-base" aria-hidden>
                            ⚠️
                          </span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        }`}
                        placeholder={t('phonePlaceholder') || 'Enter your phone number'}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1 text-base" aria-hidden>
                            ⚠️
                          </span>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('serviceNeeded')}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('messageLabel')}
                      </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      }`}
                      placeholder={t('messagePlaceholder') || 'Please describe how we can help you...'}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 mr-1 text-base" aria-hidden>
                          ⚠️
                        </span>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full group text-gray-900 bg-purple-400"
                  >
          {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 text-gray-900" />
            {t('sendingMessage')}
                      </div>
                    ) : (
                      <>
            {t('sendMessage')}
                        <span
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-lg"
                          aria-hidden
                        >
                          ➤
                        </span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
