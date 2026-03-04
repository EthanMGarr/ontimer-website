import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "OnTimer's privacy policy. We take your privacy seriously — your data stays on your device.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Last updated: January 1, 2025
        </p>

        <div className="prose mt-10">
          <h2>Our Commitment to Privacy</h2>
          <p>
            OnTimer is built on a simple principle: your data is yours. We
            designed the app to work entirely on your device, without any
            servers, accounts, or cloud infrastructure on our end.
          </p>

          <h2>What We Collect</h2>
          <p>
            <strong>We collect nothing.</strong> OnTimer does not collect, store,
            transmit, or share any personal information, calendar data, or usage
            data. The app operates entirely on-device.
          </p>

          <h2>Calendar Access</h2>
          <p>
            OnTimer requests read-only access to your iPhone calendar via the
            standard iOS Calendar permission. This access is used solely to read
            event times and titles to set your alarms. We do not upload, sync,
            or store your calendar data anywhere outside your device. OnTimer
            cannot modify your calendar.
          </p>

          <h2>Notifications</h2>
          <p>
            OnTimer requests permission to send you local notifications (alarms).
            These notifications are generated on your device and do not involve
            any network communication. They contain only information from your
            own calendar that OnTimer read locally.
          </p>

          <h2>Analytics and Tracking</h2>
          <p>
            OnTimer contains no analytics SDKs, tracking pixels, or any
            third-party code that monitors your behavior. We do not use
            Apple&apos;s App Analytics beyond what Apple provides to all
            developers in App Store Connect (aggregate, anonymized stats that
            Apple collects, not us).
          </p>

          <h2>Third-Party Services</h2>
          <p>
            OnTimer does not integrate with any third-party services, APIs, or
            data processors. There are no social login providers, payment
            processors, or advertising networks in the app.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            OnTimer does not knowingly collect any information from children
            under 13. Because we collect no information from anyone, this is a
            naturally satisfied condition.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If we ever change our privacy practices, we will update this page
            with a new effective date. Significant changes will be noted in the
            app update release notes.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a href="mailto:privacy@ontimer.app">privacy@ontimer.app</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
