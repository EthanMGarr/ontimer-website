import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "OnTimer's terms of service.",
};

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Last updated: January 1, 2025
        </p>

        <div className="prose mt-10">
          <h2>Acceptance of Terms</h2>
          <p>
            By downloading or using OnTimer, you agree to these Terms of
            Service. If you do not agree, please do not use the app.
          </p>

          <h2>Use of the App</h2>
          <p>
            OnTimer is provided as a personal productivity tool. You may use it
            for your own personal, non-commercial purposes. You agree not to:
          </p>
          <ul>
            <li>Reverse engineer or decompile the app</li>
            <li>Use the app for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any systems</li>
            <li>
              Redistribute or resell the app or its components without
              permission
            </li>
          </ul>

          <h2>Disclaimer of Warranties</h2>
          <p>
            OnTimer is provided &quot;as is&quot; without warranty of any kind.
            We do not warrant that the app will be error-free, uninterrupted, or
            perfectly accurate in setting alarms. You are responsible for
            verifying that your alarms are correctly configured for important
            events.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, OnTimer and its
            developers shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from your use of or
            inability to use the app. This includes, without limitation, any
            missed meetings, appointments, or events due to technical issues
            with the app.
          </p>
          <p>
            <strong>
              OnTimer is a productivity tool and should not be solely relied
              upon for time-critical situations. Always use good judgment and
              have backup plans for important commitments.
            </strong>
          </p>

          <h2>Intellectual Property</h2>
          <p>
            OnTimer and all related content, features, and functionality are
            owned by the developers and are protected by copyright, trademark,
            and other intellectual property laws.
          </p>

          <h2>App Store Terms</h2>
          <p>
            Your use of OnTimer is also subject to Apple&apos;s App Store Terms
            of Service. In the event of any conflict, Apple&apos;s terms govern
            with respect to your purchase and download from the App Store.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the app after changes constitutes acceptance of the updated
            terms. We will note significant changes in app update release notes.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of the United States,
            applicable to agreements made entirely within the US and to be
            performed therein.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@ontimer.app">legal@ontimer.app</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
