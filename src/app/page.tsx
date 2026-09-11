import type { Metadata } from "next";
import Homepage from "@/app/homepage2/page";

export const metadata: Metadata = {
  title: { absolute: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again" },
  description:
    "OnTimer turns Google Calendar, Apple Calendar, and Microsoft Outlook events into persistent iPhone alarms and Time To Leave alerts, so you know when to join, leave, or act.",
  alternates: { canonical: "https://www.ontimer.app/" },
  openGraph: {
    title: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again",
    description:
      "Turn your existing calendar events into persistent alarms and Time To Leave alerts with OnTimer for iPhone.",
    url: "https://www.ontimer.app/",
    siteName: "OnTimer",
    type: "website",
    images: [
      {
        url: "https://www.ontimer.app/images/homepage2/persistent-alarm.png",
        width: 1242,
        height: 2688,
        alt: "OnTimer persistent calendar alarm on iPhone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again",
    description:
      "Turn your existing calendar events into persistent alarms and Time To Leave alerts with OnTimer for iPhone.",
    images: ["https://www.ontimer.app/images/homepage2/persistent-alarm.png"],
  },
};

export default Homepage;
