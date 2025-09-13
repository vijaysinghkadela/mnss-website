"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import QRCode from "qrcode";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface DonationResponse {
  success: boolean;
  data?: { reference: string; upiLink: string };
  message?: string;
}

export default function DonationForm() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  // simple validators
  const validateName = (v: string) => {
    const name = v.trim();
    if (name.length < 2) return t('errorNameInvalid');
    return '';
  };

  const validateEmail = (v: string) => {
    const email = v.trim();
    // basic email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return t('errorEmailInvalid');
    return '';
  };

  const validatePhone = (v: string) => {
    const digits = v.replace(/\D/g, '');
    if (digits.length < 10) return t('errorPhoneInvalid');
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // run validations first
    const nErr = validateName(donorName);
    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setEmailError(eErr);
    setPhoneError(pErr);
    if (nErr || eErr || pErr) return; // block submit

    setStatus(t('creatingDonation'));
    setIsSubmitting(true);
    setUpiLink(null);
    setReference(null);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donor_name: donorName || undefined,
          donor_phone: phone || undefined,
          donor_email: email || undefined,
          note: "Website Donation",
        }),
      });
      const resClone = res.clone();
      if (!res.ok) {
        const text = await resClone.text().catch(() => "");
        throw new Error(text || `Request failed: ${res.status}`);
      }
      let json: DonationResponse | null = null;
      try {
        json = (await res.json()) as DonationResponse;
      } catch {
        const text = await resClone.text().catch(() => "");
        throw new Error(text || t('unexpectedError'));
      }
      if (!json || !json.success || !json.data) {
        throw new Error((json && (json.message || "Failed")) || "Failed");
      }
      setUpiLink(json.data!.upiLink);
      try {
        const dataUrl = await QRCode.toDataURL(json.data!.upiLink, { width: 256, margin: 1 });
        setQrDataUrl(dataUrl);
      } catch {
        setQrDataUrl(null);
      }
      setReference(json.data!.reference);
      setStatus(t('donationCreatedInstruction'));
    } catch (err) {
      setStatus(err instanceof Error ? err.message : t('unexpectedError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const preset = [500, 1000, 2500, 5000];

  const copyLink = async () => {
    if (!upiLink) return;
    try {
      await navigator.clipboard.writeText(upiLink);
      setStatus(t('copySuccessStatus'));
    } catch {
      setStatus(t('copyFailedStatus'));
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('amountInINR')}</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {preset.map((p) => (
              <Button
                key={p}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount(String(p))}
              >
                ₹{p}
              </Button>
            ))}
          </div>
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={t('enterAmount')}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              onBlur={() => setNameError(validateName(donorName))}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailAddress')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailError(validateEmail(email))}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setPhoneError(validatePhone(phone))}
            inputMode="tel"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('processingDonation') : t('generateUpiLink')}
        </Button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
      {upiLink && (
        <div className="mt-5 space-y-2 rounded-lg border border-emerald-200 p-4 bg-emerald-50">
          <div className="flex items-center justify-between gap-3">
            <a href={upiLink} className="text-emerald-700 text-sm underline break-all">
              {upiLink}
            </a>
            <Button type="button" variant="outline" size="sm" onClick={copyLink}>
              {t('copyLink')}
            </Button>
          </div>
          {reference && (
            <p className="text-xs text-gray-600">{t('referenceLabel')}: {reference}</p>
          )}
          {qrDataUrl && (
            <div className="pt-3 border-t border-emerald-100 mt-2">
              <div className="text-xs text-gray-600 mb-2">{t('scanToPayUpi')}</div>
              <div className="w-40 h-40 relative">
                <Image src={qrDataUrl} alt="UPI payment QR code" fill sizes="160px" className="object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
