const SITE_URL = "https://soleheaven.vercel.app";
const EFFECTIVE_DATE = "September 10, 2025";

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Sole Heaven Bangladesh — Privacy Policy</h1>
                <p className="text-sm text-gray-500">
                    Website: <a href={SITE_URL} className="underline" target="_blank" rel="noreferrer">{SITE_URL}</a> <br />
                    Effective Date: {EFFECTIVE_DATE}
                </p>
            </header>

            <div className="space-y-6 text-gray-700 text-sm leading-6">
                <p>
                    Your privacy matters to us. This Privacy Policy explains how Sole Heaven Bangladesh collects, uses, and protects your information when you use {SITE_URL}.
                </p>

                <section>
                    <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Personal Information:</strong> name, email, phone, shipping address, payment details.</li>
                        <li><strong>Non-Personal Information:</strong> browser data, device info, cookies, and analytics.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>To process orders, payments, and deliveries.</li>
                        <li>To provide customer support and respond to inquiries.</li>
                        <li>To improve website functionality, marketing, and user experience.</li>
                        <li>To send promotional offers and updates (you can opt out anytime).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">3. Data Protection</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>We use SSL encryption and trusted payment gateways to protect your data.</li>
                        <li>Your information will not be sold or shared, except with logistics partners, payment providers, or when required by law.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">4. Cookies</h2>
                    <p>
                        We use cookies to enhance your browsing experience. You can disable cookies in your browser, but some features may not work properly.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">5. Third-Party Services</h2>
                    <p>
                        We may use third-party services such as payment gateways and courier providers. These services have their own privacy policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">6. Your Rights</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>You may access, update, or delete your personal data by contacting us.</li>
                        <li>You may opt out of promotional emails at any time.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">7. Updates to Policy</h2>
                    <p>
                        We may update this Privacy Policy occasionally. Any changes will be posted on this page with the updated effective date.
                    </p>
                </section>

                <p className="text-gray-500 text-sm">
                    Privacy questions? Email <a className="underline" href="mailto:privacy@soleheaven.vercel.app">privacy@soleheaven.vercel.app</a>.
                </p>
            </div>

            <footer className="mt-10 text-xs text-gray-400">
                This Privacy Policy is provided for informational purposes and does not constitute legal advice. Consult a qualified attorney to ensure compliance with Bangladeshi law.
            </footer>
        </div>
    );
}