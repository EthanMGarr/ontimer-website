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
          Last updated: August 15, 2026
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

          <h2>Location Data</h2>
          <p>
            OnTimer requests &quot;When In Use&quot; location access to
            calculate travel time to your in-person meetings and alert you
            when it&apos;s time to leave. We use Apple&apos;s MapKit to
            determine directions and traffic-aware travel time between your
            current location and an event&apos;s address; your coordinates
            and the event address are sent to Apple&apos;s Maps service to
            calculate this route. OnTimer does not store a history of your
            location and does not send your location to our own servers. We
            do not sell or share location data with third parties for
            advertising.
          </p>

          <h2>Notifications</h2>
          <p>
            OnTimer requests permission to send you local notifications (alarms).
            They contain only the event information needed to help you act on
            time.
          </p>

          <h2>Analytics and Tracking</h2>
          <p>
            We do not sell personal information or calendar data. This
            website uses Google Analytics to understand aggregate visitor
            behavior and improve the service. Visitors in the UK, EU/EEA, and
            Switzerland are shown a cookie banner and analytics only loads
            after they accept; visitors elsewhere are not shown a banner. You
            can decline at any time from the banner, or by clearing cookies
            for this site and choosing &quot;Decline&quot; when prompted
            again.
          </p>

          <h2>Website Calculators and Medication Tools</h2>
          <p>
            Travel and Time To Leave calculators may send the location text you enter,
            travel mode, and departure-time information through OnTimer&apos;s server to
            Google Maps Platform services for place suggestions, routes, and travel-time
            estimates. We do not use those entries to build a user profile.
          </p>
          <p>
            Medication schedule generators create calendar files in your browser. OnTimer
            does not receive or store medication names, start dates, or dose times. If
            analytics is enabled, a schedule-generated event may include the selected
            frequency and duration, but not the medication name, start date, or dose times.
            Provider schedule details are stored in the private URL
            fragment after the # symbol; that fragment is not sent to OnTimer with the page
            request. Anyone with the complete link can read its contents, so share it only
            with the intended recipient. Google Analytics is disabled on the shared
            medication-schedule route.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            OnTimer integrates with calendar providers only to provide the
            service: Google Calendar, Apple Calendar, and Microsoft Outlook
            Calendar. OnTimer also uses Apple&apos;s MapKit to calculate
            travel time, as described above under Location Data. We do not
            use advertising networks or sell calendar or location data.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            OnTimer does not knowingly collect any information from children
            under 13. If you believe a child has provided personal information,
            contact us and we will take appropriate steps to delete it.
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
