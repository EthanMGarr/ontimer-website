"use client";

import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import { trackAndroidWaitlistClick } from "@/lib/analytics";
import { ANDROID_WAITLIST_URL } from "@/lib/constants";

export default function AndroidPage() {
  return (
    <div className="site-page">
      <section className="site-hero">
        <div className="site-shell site-hero__content site-hero__content--center">
          <p className="site-kicker">Android waitlist</p>
          <h1 className="site-title">OnTimer for Android is on its way.</h1>
          <p className="site-lede">
            We&apos;re working hard to bring OnTimer to Android. Join the
            waitlist and you&apos;ll be the first to know when it launches.
          </p>

          <div className="site-actions site-actions--center">
            <a
              href={ANDROID_WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hp2-cta"
              onClick={() => trackAndroidWaitlistClick("hero")}
            >
              Join the Android Waitlist
            </a>
          </div>
          <p className="site-note">No spam. One email when Android launches.</p>
        </div>
      </section>

      <section className="site-flow">
        <div className="site-shell site-shell--reading">
          <div className="site-hero__content site-hero__content--center">
            <p className="site-kicker">What to expect</p>
            <h2 className="site-title">Everything coming to Android</h2>
          </div>
          <div className="site-feature-grid">
            {[
              {
                title: "Calendar Sync",
                desc: "Full integration with Google Calendar, Samsung Calendar, and more.",
              },
              {
                title: "Automatic Alarms",
                desc: "Same zero-setup experience — OnTimer creates alarms from your events.",
              },
              {
                title: "Smart Alerts",
                desc: "Persistent, escalating notifications that cut through Do Not Disturb.",
              },
              {
                title: "Full Customization",
                desc: "Choose your lead times, which calendars to track, and snooze behavior.",
              },
            ].map((feature, index) => (
              <div key={feature.title} className="site-feature-card">
                <span className="site-feature-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-final">
        <div className="site-shell site-shell--reading">
          <h2>Have an iPhone?</h2>
          <p>
            OnTimer is available right now on iOS. Start being on time today.
          </p>
          <div className="site-actions site-actions--center">
            <Homepage2DownloadCTA location="android_ios_cta" />
          </div>
        </div>
      </section>
    </div>
  );
}
