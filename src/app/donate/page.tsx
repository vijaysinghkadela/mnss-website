import DonationForm from "@/components/DonationForm";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Our Mission
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your contribution helps us continue community development and
            empowerment programs. Generate a UPI link below. Net banking & card
            payments will be added soon.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <DonationForm />
        </div>
      </div>
    </main>
  );
}
