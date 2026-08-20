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
  buildAirportAnswerApplicationName,
  buildAirportAnswerDescription,
  buildAirportSnippetCandidate,
  buildAirportAnswerTitle,
} from "@/lib/airport-answer-seo";
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
        title: buildAirportAnswerTitle(profile),
        description: buildAirportAnswerDescription(profile),
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
        label: profile.airport.planningJurisdiction === "international"
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
      title: buildAirportAnswerTitle(profile),
      description: buildAirportAnswerDescription(profile),
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
        name: buildAirportAnswerApplicationName(profile),
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: `A free personalized answer for when to leave for ${profile.name}, based on flight time, route, airport processing and terminal access.`,
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
      { href: airportParentPath, label: "When to leave for the airport" },
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
      eyebrow: `Free personalized leave time · ${location.code} · ${location.city}`,
      secondaryLabels: [location.reviewedLabel, "Powered by OnTimer"],
      titlePrefix: "What Time Should I Leave for",
      titleHighlight: `${location.shortName} (${location.code})?`,
      description: buildAirportSnippetCandidate(location),
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
      heading: `What can add time on the way to ${location.shortName}`,
      intro: location.authorityIntro,
      caution: "Before you leave, confirm your terminal and check for road, rail or airport disruptions.",
      modules: location.modules,
    },
    workedExamples: {
      heading: `Worked examples for leaving for ${location.code}`,
      intro:
        "These examples show how to work backward from a flight. Your route and conditions will be different, so use the calculator above for your trip.",
      examples: location.workedExamples,
      note:
        "Check current traffic or public-transport service before you leave. If your airline gives you an earlier check-in or bag-drop deadline, use that time.",
    },
    sources: {
      heading: "Check these details before you leave",
      body: [
        "Airport details can change. On the day of your flight, confirm your terminal and your airline's check-in and bag-drop deadlines.",
        "Check current road conditions or public-transport service before setting off. If you are parking or using a transfer bus, confirm its operating schedule too.",
      ],
      sourceHeading: "Official information used for this guide",
      sourceIntro: `We checked this guidance against official airport, transport and security sources. ${location.reviewedLabel}.`,
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
      noSnippetQuestions: [faqItems[0].question],
    },
    calculatorExample: location.calculatorExample,
  };
}
