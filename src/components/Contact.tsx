"use client";

import { useState } from "react";
// use simple emoji placeholders for icons to avoid lucide-react typing issues
import { Container } from "./ui/Container";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { emergencyContacts } from "@/lib/data";
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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

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
            Get in{" "}
            <span className="text-gray-900 bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Reach out for emergency support, program information, or to learn
            how you can contribute to community transformation across Rajasthan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Emergency Contacts
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
                  Head Office
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
                      <div className="font-medium text-gray-900">Address</div>
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
                      <div className="font-medium text-gray-900">Email</div>
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
                      <div className="font-medium text-gray-900">
                        Office Hours
                      </div>
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
                  Send us a Message
                </h3>

                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <span
                      className="w-5 h-5 text-green-600 text-lg"
                      aria-hidden
                    >
                      ✅
                    </span>
                    <div className="text-green-700">
                      Thank you! Your message has been sent successfully.
                      We&apos;ll get back to you soon.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
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
                        placeholder="Enter your full name"
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
                        Email Address *
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
                        placeholder="Enter your email"
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
                        Phone Number *
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
                        placeholder="Enter your phone number"
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
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select a service</option>
                        <option value="emergency">Emergency Support</option>
                        <option value="womens-safety">
                          Women&apos;s Safety
                        </option>
                        <option value="rehabilitation">Rehabilitation</option>
                        <option value="skill-development">
                          Skill Development
                        </option>
                        <option value="information">General Information</option>
                        <option value="partnership">Partnership Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
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
                      placeholder="Please describe how we can help you..."
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
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        Send Message
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
