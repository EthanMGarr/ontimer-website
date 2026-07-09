import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "OnTimer's privacy policy for Google Calendar, Apple Calendar, and Microsoft Outlook Calendar support.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Last updated: July 9, 2026
        </p>

        <div className="prose mt-10">
          <h2>Our Commitment to Privacy</h2>
          <p>
            OnTimer is built on a simple principle: your data is yours. We
            use calendar access only to provide alarms for your events, and we
            keep calendar access read-only across Google Calendar, Apple
            Calendar, and Microsoft Outlook Calendar.
          </p>

          <h2>What We Collect</h2>
          <p>
            OnTimer requests the calendar information needed to show upcoming
            events and schedule alarms: event titles, times, calendar names, and
            related event details. Calendar event data is used for OnTimer
            functionality. We do not sell calendar data.
          </p>

          <h2>Calendar Access</h2>
          <p>
            OnTimer requests read-only access to the calendars you connect,
            including Google Calendar, Apple Calendar, and Microsoft Outlook
            Calendar. Google Calendar and Microsoft Outlook Calendar use secure account
            connection flows; Apple Calendar uses iOS Calendar permission. This
            access is used solely to read event times and titles to set your
            alarms. OnTimer cannot modify your calendar events.
          </p>

          <h2>Notifications</h2>
          <p>
            OnTimer requests permission to send you local notifications (alarms).
            They contain only the event information needed to help you act on
            time.
          </p>

          <h2>Analytics and Tracking</h2>
          <p>
            We do not sell personal information or calendar data. Any analytics
            or diagnostics are used to understand app performance and improve
            the service.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            OnTimer integrates with calendar providers only to provide the
            service: Google Calendar, Apple Calendar, and Microsoft Outlook
            Calendar. We do not use advertising networks or sell calendar data.
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
