import type { Metadata } from "next";
import Homepage from "@/app/homepage2/page";

export const metadata: Metadata = {
  title: { absolute: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again" },
  description:
    "OnTimer turns Apple, Google, and Outlook calendar events into persistent iPhone alarms with custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
  alternates: { canonical: "https://www.ontimer.app/" },
  openGraph: {
    title: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again",
    description:
      "Turn calendar events into persistent alarms with custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
    url: "https://www.ontimer.app/",
    siteName: "OnTimer",
    type: "website",
    images: [
      {
        url: "https://www.ontimer.app/images/homepage2/persistent-alarm-v2.png",
        width: 853,
        height: 1844,
        alt: "OnTimer persistent calendar alarm on iPhone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTimer Calendar Alarm App for iPhone | Never Be Late Again",
    description:
      "Turn calendar events into persistent alarms with custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
    images: ["https://www.ontimer.app/images/homepage2/persistent-alarm-v2.png"],
  },
};

export default Homepage;
