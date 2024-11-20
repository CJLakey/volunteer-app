import Link from "next/link";
export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="mb-4">
                <strong>All Saints of Russia Orthodox Church Volunteer Reminder App</strong>
            </p>
            <p className="mb-4">
                Effective Date: <span className="font-bold">10-16-2024</span>
            </p>
            <p className="mb-6">
                This privacy policy outlines how <strong>All Saints of Russia Orthodox Church</strong> (“we”, “us”, “our”)
                collects, uses, and protects the personal information of users (“you”, “your”) of our volunteer reminder app.
                Our app is used to send text and email reminders to church volunteers about their scheduled tasks.
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
                We only collect the personal information necessary to perform the functions of this app, which includes:
            </p>
            <ul className="list-disc ml-6 mb-6">
                <li><strong>Name</strong>: Used to identify volunteers and personalize communications.</li>
                <li><strong>Phone number</strong>: Used to send text message reminders.</li>
                <li><strong>Email address</strong>: Used to send email reminders.</li>
                <li><strong>Volunteer Schedule Information</strong>: Details of the tasks and dates/times assigned to you for volunteering.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use your personal information solely for the purpose of sending reminders about your scheduled volunteer jobs:
            </p>
            <ul className="list-disc ml-6 mb-6">
                <li><strong>Text Messages</strong>: No more than two texts per week to remind you about upcoming volunteer tasks.</li>
                <li><strong>Emails</strong>: To send the same reminders via email.</li>
            </ul>
            <p className="mb-6">
                We do not share your personal information with third parties, except for trusted service providers necessary to deliver text messages and emails (such as Twilio for text messaging).
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="mb-6">
                We are committed to ensuring the security of your personal information. We take appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
            <p className="mb-6">
                We retain your personal data as long as you are an active volunteer or until you request its deletion. If you stop volunteering, your data will be securely deleted after a reasonable period or at your request.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">
                You have the right to:
            </p>
            <ul className="list-disc ml-6 mb-6">
                <li><strong>Access</strong> your personal information.</li>
                <li><strong>Correct</strong> any inaccurate information.</li>
                <li><strong>Request deletion</strong> of your information when you no longer wish to volunteer.</li>
            </ul>
            <p className="mb-6">
                To exercise these rights, please contact us at <strong>[insert email address or phone number]</strong>.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="mb-6">
                Our app uses third-party service providers such as Twilio to send text messages. These providers have their own privacy policies, and we recommend reviewing them for more information about how your data is handled when transmitted through their services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-6">
                We may update this policy from time to time. Any changes will be posted on this page with the updated date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
                If you have any questions or concerns about this privacy policy, please contact us at:
            </p>
            <p className="mb-6">
                <strong>All Saints of Russia Orthodox Church</strong><br />
                Email: <strong>christopher@wildforgedev.com</strong><br />
                Phone: <strong>(719)290-0392</strong>
            </p>
            <Link className="text-3xl font-bold text-center mb-6" href="./" passHref><button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize">Back</button></Link>
        </div>
    );
};