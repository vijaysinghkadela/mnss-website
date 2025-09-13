"use client";

import DonationForm from "@/components/DonationForm";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/icons";

export default function DonatePage() {
	const { t } = useLanguage();
	return (
		<>
			<section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
				<Container>
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{t('donateHeroTitle')}</h1>
						<p className="mt-4 text-emerald-100 text-lg">{t('donateHeroDesc')}</p>
					</div>
				</Container>
			</section>

			<section className="py-14 bg-white">
				<Container>
					<div className="grid lg:grid-cols-3 gap-8 items-start">
						<div className="lg:col-span-2">
							<Card className="p-0">
								<CardContent className="p-6 md:p-8">
														<h2 className="text-2xl font-bold text-gray-900 mb-2">{t('donateViaUpiTitle')}</h2>
														<p className="text-gray-600 mb-6">{t('donateViaUpiDesc')}</p>
									<DonationForm />
								</CardContent>
							</Card>
							<div className="mt-6 grid sm:grid-cols-3 gap-4">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<span className="text-emerald-600"><Icon name="shield" className="w-5 h-5" /></span>
														{t('donateBadgeSecureUpi')}
								</div>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<span className="text-emerald-600"><Icon name="heart" className="w-5 h-5" /></span>
														{t('donateBadgeProgramSupport')}
								</div>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<span className="text-emerald-600"><Icon name="handshake" className="w-5 h-5" /></span>
														{t('donateBadgeTrustedSince')}
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<Card>
								<CardContent>
														<h3 className="text-lg font-semibold text-gray-900">{t('bankCorporateDonationsTitle')}</h3>
														<p className="text-sm text-gray-600 mt-2">{t('bankCorporateDonationsDesc')}</p>
									<div className="mt-4 space-y-1 text-sm text-gray-700">
										<div>
											<span className="font-medium">Email:</span> marutnarayan7181@gmail.com
										</div>
										<div>
											<span className="font-medium">Phone:</span> 01582-240408
										</div>
									</div>
														<Link
															href="/contact"
															className={buttonVariants({ variant: 'success', className: 'mt-5 w-full' })}
														>
															{t('contactCorporateDonation')}
														</Link>
								</CardContent>
							</Card>

							<Card variant="outlined">
								<CardContent>
														<h3 className="text-lg font-semibold text-gray-900">{t('yourImpactTitle')}</h3>
									<ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
															<li>{t('donateImpact1')}</li>
															<li>{t('donateImpact2')}</li>
															<li>{t('donateImpact3')}</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
