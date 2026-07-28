import type { Metadata } from "next";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import type { DestinationPageModel } from "@/components/destination-pages/DestinationPageTemplate";
import type {
  DestinationTypeDefinition,
  FaqItem,
  InternalLinkDefinition,
  SeoMetadataDefinition,
} from "@/core/leave-time";
import type { AirportLocationProfile, TravelLocationProfile } from "@/lib/travel-locations";
import { getRelatedTravelLocationLinks } from "@/lib/travel-locations";
import {
  airportEventTypes,
  createAirportDestination,
} from "./AirportPlugin";

const airportParentPath = "/airport-time-to-leave-calculator";
const airportRouteBasePath = "/airport-time-to-leave";

export function getAirportDestinationPath(location: AirportLocationProfile): string {
  return `${airportRouteBasePath}/${location.slug}`;
}

export function buildAirportFaqItems(location: AirportLocationProfile): FaqItem[] {
  const shortHaulLabel = location.airport.shortHaulLabel ?? "domestic flight";
  const longHaulLabel = location.airport.longHaulLabel ?? "international flight";
  return [
    {
      question: `What time should I leave for ${location.shortName} (${location.code})?`,
      answer: location.directAnswer,
    },
    {
      question: `How early should I arrive at ${location.code}?`,
      answer:
        `Use about ${location.airport.domesticArrivalMinutes / 60} hours before ${shortHaulLabel.toLowerCase()} and ${location.airport.internationalArrivalMinutes / 60} hours before ${longHaulLabel.toLowerCase()} as a planning baseline. Add time for parking, rail or terminal transfers, and follow any earlier deadline supplied by your airline.`,
    },
    {
      question: `Does the ${location.code} calculator include road and transit time?`,
      answer:
        "Yes. Enter your starting location, flight time and arrival method to estimate a traffic-aware drive or scheduled public-transit trip. The result also includes airport-processing assumptions.",
    },
    {
      question: `What local airport timing details matter at ${location.code}?`,
      answer: location.airport.localTimingFaq,
    },
  ];
}

function getAirportUrl(location: AirportLocationProfile): string {
  return `https://www.ontimer.app${getAirportDestinationPath(location)}`;
}

export const airportDestinationType: DestinationTypeDefinition<AirportLocationProfile> = {
  id: "airport",
  label: "Airport",
  routeBasePath: airportRouteBasePath,
  parentPath: airportParentPath,
  parentLabel: "Airport Calculator",
  supportedEventTypes: airportEventTypes,
  supportedTransportationModes: ["drive", "rideshare", "dropoff", "transit"],
  plannerFields: [
    { key: "planning-date", label: "Planning this trip", kind: "date", required: true },
    { key: "departure-time", label: "Departure time", kind: "time", required: true },
    {
      key: "flight-type",
      label: "Flight type",
      kind: "select",
      required: true,
      options: [
        { value: "domestic", label: "Domestic" },
        { value: "international", label: "International" },
      ],
    },
    { key: "origin", label: "Leaving from", kind: "location", required: true },
    { key: "destination", label: "Airport", kind: "location", required: true },
  ],
  validateDestination(profile: unknown): profile is AirportLocationProfile {
    const location = profile as TravelLocationProfile | undefined;
    return Boolean(location?.indexable && location.kind === "airport");
  },
  buildDestination(profile) {
    const destination = createAirportDestination(profile.calculatorDestination, profile.code);
    return {
      ...destination,
      slug: profile.slug,
      name: profile.name,
      shortName: profile.shortName,
      canonicalName: profile.calculatorDestination,
      routeBasePath: airportRouteBasePath,
      aliases: [
        profile.code,
        profile.name,
        profile.shortName,
        profile.calculatorDestination,
      ],
      seo: {
        title: `${profile.shortName} Time-to-Leave Calculator (${profile.code})`,
        description: `Calculate when to leave for ${profile.name} using traffic, airport transfers, parking, bags and your flight time.`,
        canonicalUrl: getAirportUrl(profile),
      },
      supportedEventTypeIds: airportEventTypes.map((eventType) => eventType.id),
      localArrivalDefaults: {
        domestic: profile.airport.domesticArrivalMinutes,
        international: profile.airport.internationalArrivalMinutes,
      },
      transportationSupport: ["drive", "rideshare", "dropoff", "transit"],
      coordinates: profile.coordinates,
      popularity: profile.popularity,
      relatedDestinationIds: profile.relatedDestinationSlugs,
      knowledge: {
        ...profile.destinationKnowledge,
        trustedSources: profile.sources,
      },
      metadata: {
        code: profile.code,
        city: profile.city,
        reviewedOn: profile.reviewedOn,
        terminals: profile.airport.terminalNames,
      },
    };
  },
  buildTrustIndicators(profile) {
    return [
      { key: "traffic", label: "Traffic for your travel window" },
      {
        key: "security",
        label: profile.airport.planningJurisdiction === "uk"
          ? `${profile.code} security planning`
          : `${profile.code} TSA timing`,
      },
      { key: "parking", label: "Parking and terminal access" },
      { key: "flight-type", label: "Domestic and international buffers" },
    ];
  },
  buildResultSections() {
    return [
      { key: "route", label: "Route", factorKeys: ["travel"] },
      { key: "security", label: "Security", factorKeys: ["tsa_security"] },
      { key: "airport-access", label: "Airport access", factorKeys: ["airport_buffer"] },
    ];
  },
  buildFaqItems: buildAirportFaqItems,
  buildSeoMetadata(profile): SeoMetadataDefinition {
    return {
      title: `${profile.shortName} Time-to-Leave Calculator (${profile.code})`,
      description: `Calculate when to leave for ${profile.name} using traffic, airport transfers, parking, bags and your flight time.`,
      canonicalUrl: getAirportUrl(profile),
      robots: { index: true, follow: true },
    };
  },
  buildStructuredData(profile) {
    const url = getAirportUrl(profile);
    const faqItems = buildAirportFaqItems(profile);

    return [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${profile.shortName} Time-to-Leave Calculator`,
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: `A free calculator for planning when to leave for ${profile.name}.`,
        url,
        dateModified: profile.reviewedOn,
        author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Airport Calculator",
            item: "https://www.ontimer.app/airport-time-to-leave-calculator",
          },
          { "@type": "ListItem", position: 3, name: profile.shortName, item: url },
        ],
      },
    ];
  },
  buildInternalLinks(): InternalLinkDefinition[] {
    return [
      { href: "/", label: "Home" },
      { href: airportParentPath, label: "Airport calculator" },
    ];
  },
  getDestinationPath: getAirportDestinationPath,
};

export function buildAirportMetadata(location: AirportLocationProfile): Metadata {
  if (!airportDestinationType.validateDestination(location)) {
    return { robots: { index: false, follow: false } };
  }

  const seo = airportDestinationType.buildSeoMetadata(location);
  return {
    title: seo.title,
    description: seo.description,
    keywords: [],
    alternates: { canonical: seo.canonicalUrl },
    robots: seo.robots,
    openGraph: { title: seo.title, description: seo.description, url: seo.canonicalUrl },
    twitter: { title: seo.title, description: seo.description },
  };
}

export function buildAirportPageModel(location: AirportLocationProfile): DestinationPageModel {
  const faqItems = airportDestinationType.buildFaqItems(location);

  return {
    trackerCode: location.code,
    jsonLd: airportDestinationType.buildStructuredData(location),
    breadcrumbs: airportDestinationType.buildInternalLinks(location),
    currentBreadcrumbLabel: location.code,
    hero: {
      eyebrow: `${location.code} · ${location.city}`,
      secondaryLabels: [location.reviewedLabel, "Powered by OnTimer"],
      titlePrefix: "What Time Should I Leave for",
      titleHighlight: `${location.shortName} (${location.code})?`,
      description: location.directAnswer,
    },
    planner: (
      <AirportCalculator
        initialAirport={location.calculatorDestination}
        locationCode={location.code}
        example={location.calculatorExample}
        planningJurisdiction={location.airport.planningJurisdiction}
        shortHaulLabel={location.airport.shortHaulLabel}
        longHaulLabel={location.airport.longHaulLabel}
        securityLabel={location.airport.securityLabel}
        genericRedesign
      />
    ),
    planningFacts: {
      sectionId: `${location.code.toLowerCase()}-planning-facts`,
      heading: `${location.shortName}-specific planning details that change when you should leave`,
      intro: location.authorityIntro,
      caution: "Operational details can change, so verify your terminal and travel schedule before departure.",
      modules: location.modules,
    },
    workedExamples: {
      heading: `Worked examples for leaving for ${location.code}`,
      intro:
        "Each example is illustrative, not live traffic guidance. The assumptions are shown so you can see the calculation and replace them with your own details above.",
      examples: location.workedExamples,
      note:
        "Traffic and service conditions vary. Use the live calculator for your trip and check official transportation schedules before leaving.",
    },
    sources: {
      heading: "How to use this page safely",
      body: [
        "Stable planning facts—such as terminal names and airport transfer options—belong in this guide. Traffic, security waits, airline terminals and service disruptions are volatile, so the calculator or official operator should supply the current answer.",
        "Recheck your airline terminal, bag-drop deadline, airport transit schedule and transfer service on the day you travel.",
      ],
      sourceHeading: "Planning and traffic sources",
      sourceIntro: `Facts on this page were checked against airport, transit, security and traffic sources. ${location.reviewedLabel}.`,
      links: location.sources,
    },
    relatedDestinations: {
      heading: "Related leave-time calculators",
      links: getRelatedTravelLocationLinks(location),
    },
    faq: {
      heading: `${location.shortName} leave-time questions`,
      items: faqItems,
      ctaLocation: `airport_${location.code.toLowerCase()}_final`,
    },
    calculatorExample: location.calculatorExample,
  };
}
