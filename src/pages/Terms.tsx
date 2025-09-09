const SITE_URL = "https://soleheaven.vercel.app";
const EFFECTIVE_DATE = "September 10, 2025";

export default function Terms() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Sole Heaven Bangladesh — Terms & Conditions</h1>
                <p className="text-sm text-gray-500">
                    Website: <a href={SITE_URL} className="underline" target="_blank" rel="noreferrer">{SITE_URL}</a> <br />
                    Effective Date: {EFFECTIVE_DATE}
                </p>
            </header>

            <div className="space-y-6 text-gray-700 text-sm leading-6">
                <p>
                    Welcome to Sole Heaven Bangladesh ("we", "our", "us"). By accessing or using {SITE_URL}, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.
                </p>

                <section>
                    <h2 className="text-lg font-semibold mb-2">1. General</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>We provide footwear and related services through our online store.</li>
                        <li>You confirm you are at least 18 years old, or are using the site under parental/guardian supervision.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">2. Products & Orders</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>All products are subject to availability.</li>
                        <li>Prices are listed in Bangladeshi Taka (BDT) and may change without notice.</li>
                        <li>We may cancel orders where fraudulent or suspicious activity is detected.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">3. Payments</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Secure online payments are processed via trusted gateways.</li>
                        <li>Cash on Delivery (COD) may be available for selected locations in Bangladesh.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">4. Shipping & Delivery</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Orders typically ship within 2–5 business days within Bangladesh.</li>
                        <li>Delivery times may vary by location and logistics partner.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">5. Returns & Refunds</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Returns accepted within <strong>7 days</strong> of delivery if unused and in original packaging.</li>
                        <li>Refunds are processed after inspection and may take 5–10 business days.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">6. User Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Do not misuse the website, upload harmful content, or engage in fraudulent activities.</li>
                        <li>Keep your account credentials secure and up to date.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">7. Limitation of Liability</h2>
                    <p>
                        We are not liable for indirect, incidental, or consequential damages, delays, or third‑party errors beyond our reasonable control.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">8. Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of Bangladesh. Disputes shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
                    </p>
                </section>

                <p className="text-gray-500 text-sm">
                    Questions about the Terms? Email <a className="underline" href="mailto:support@soleheaven.vercel.app">support@soleheaven.vercel.app</a>.
                </p>
            </div>

            <footer className="mt-10 text-xs text-gray-400">
                This content is provided for general informational purposes and does not constitute legal advice. Consult a qualified attorney to ensure compliance with Bangladeshi law.
            </footer>
        </div>
    );
}
