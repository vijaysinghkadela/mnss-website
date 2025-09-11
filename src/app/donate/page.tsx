import DonationForm from "@/components/DonationForm";

export const metadata = { title: "Donate - MNSS" };

export default function DonatePage() {
	return (
		<div className="max-w-5xl mx-auto py-16 px-4">
			<h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
			<p className="text-gray-700 leading-relaxed mb-8">
				Your donation helps fund community programs, skill development, and critical support services.
				Use the form to generate a secure UPI payment link.
			</p>
			<DonationForm />
			<p className="mt-6 text-xs text-gray-500">Note: For large or corporate donations, please contact us directly.</p>
		</div>
	);
}
