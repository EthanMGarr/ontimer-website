import type { Metadata } from "next";
import CruiseCalculator from "@/app/cruise-time-to-leave/CruiseCalculator";
import type { DestinationPageModel } from "@/components/destination-pages/DestinationPageTemplate";
import type {
  DestinationTypeDefinition,
  FaqItem,
  InternalLinkDefinition,
  SeoMetadataDefinition,
} from "@/core/leave-time";
import type { CruiseTerminalLocationProfile, TravelLocationProfile } from "@/lib/travel-locations";
import { getRelatedTravelLocationLinks } from "@/lib/travel-locations";
import {
  buildCruiseSnippetCandidate,
  buildCruiseSnippetDescription,
} from "@/lib/cruise-answer-seo";
import {
  createCruiseDestination,
  cruiseEventTypes,
} from "./CruisePlugin";

const cruiseRouteBasePath = "/cruise-time-to-leave";
const cruiseParentPath = "/time-to-leave-reminders";

export function getCruiseDestinationPath(location: CruiseTerminalLocationProfile): string {
  return `${cruiseRouteBasePath}/${location.slug}`;
}

function getCruiseUrl(location: CruiseTerminalLocationProfile): string {
  return `https://www.ontimer.app${getCruiseDestinationPath(location)}`;
}

export function buildCruiseFaqItems(location: CruiseTerminalLocationProfile): FaqItem[] {
  return [
    {
      question: `What time should I leave for ${location.shortName}?`,
      answer: location.directAnswer,
    },
    {
      question: `How early should I arrive at ${location.code}?`,
      answer:
        `Use about ${location.cruiseTerminal.checkInLeadMinutes / 60} hours before your boarding window as a planning baseline. Add time for traffic, parking or shuttle transfer, luggage drop, document checks and any earlier cutoff from your cruise line.`,
    },
    {
      question: `Does the ${location.code} calculator include traffic?`,
      answer:
        "Yes. Enter your starting location and boarding time to estimate travel for your departure window. The result also includes cruise terminal access, baggage and check-in assumptions.",
    },
    {
      question: `What local cruise timing details matter at ${location.shortName}?`,
      answer:
        `At ${location.shortName}, plan around terminal assignment, port access, parking or shuttle movement, luggage handling and the cruise line's boarding cutoff.`,
    },
  ];
}

export const cruiseDestinationType: DestinationTypeDefinition<CruiseTerminalLocationProfile> = {
  id: "cruise-terminal",
  label: "Cruise Terminal",
  routeBasePath: cruiseRouteBasePath,
  parentPath: cruiseParentPath,
  parentLabel: "Time To Leave Reminders",
  supportedEventTypes: cruiseEventTypes,
  supportedTransportationModes: ["drive", "rideshare", "dropoff"],
  plannerFields: [
    { key: "planning-date", label: "Planning this cruise", kind: "date", required: true },
    { key: "boarding-time", label: "Boarding time", kind: "time", required: true },
    {
      key: "cruise-type",
      label: "Cruise type",
      kind: "select",
      required: true,
      options: [
        { value: "domestic", label: "Domestic" },
        { value: "international", label: "International" },
      ],
    },
    { key: "origin", label: "Leaving from", kind: "location", required: true },
    { key: "destination", label: "Cruise terminal", kind: "location", required: true },
  ],
  validateDestination(profile: unknown): profile is CruiseTerminalLocationProfile {
    const location = profile as TravelLocationProfile | undefined;
    return Boolean(location?.indexable && location.kind === "cruise-terminal");
  },
  buildDestination(profile) {
    const destination = createCruiseDestination(profile.calculatorDestination, profile.code);
    return {
      ...destination,
      slug: profile.slug,
      name: profile.name,
      shortName: profile.shortName,
      canonicalName: profile.calculatorDestination,
      routeBasePath: cruiseRouteBasePath,
      aliases: [
        profile.code,
        profile.name,
        profile.shortName,
        profile.calculatorDestination,
        ...(profile.aliases ?? []),
      ],
      seo: {
        title: `${profile.shortName} Time-to-Leave Calculator`,
        description: buildCruiseSnippetDescription(profile),
        canonicalUrl: getCruiseUrl(profile),
      },
      supportedEventTypeIds: cruiseEventTypes.map((eventType) => eventType.id),
      localArrivalDefaults: {
        domestic: profile.cruiseTerminal.checkInLeadMinutes,
        international: profile.cruiseTerminal.checkInLeadMinutes + 30,
      },
      transportationSupport: ["drive", "rideshare", "dropoff"],
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
        piers: profile.cruiseTerminal.pierNames,
      },
    };
  },
  buildTrustIndicators(profile) {
    return [
      { key: "traffic", label: "Traffic for your boarding window" },
      { key: "check-in", label: `${profile.shortName} cruise check-in timing` },
      { key: "baggage", label: "Baggage drop and documents" },
      { key: "terminal-access", label: "Parking, shuttle and terminal access" },
    ];
  },
  buildResultSections() {
    return [
      { key: "route", label: "Route", factorKeys: ["travel"] },
      { key: "terminal-access", label: "Terminal access", factorKeys: ["terminal_walk"] },
      { key: "cruise-check-in", label: "Cruise check-in", factorKeys: ["baggage_drop", "cruise_check_in", "boarding_cutoff", "user_buffer"] },
    ];
  },
  buildFaqItems: buildCruiseFaqItems,
  buildSeoMetadata(profile): SeoMetadataDefinition {
    return {
      title: `${profile.shortName} Time-to-Leave Calculator`,
      description: buildCruiseSnippetDescription(profile),
      canonicalUrl: getCruiseUrl(profile),
      robots: { index: true, follow: true },
    };
  },
  buildStructuredData(profile) {
    const url = getCruiseUrl(profile);
    const faqItems = buildCruiseFaqItems(profile);

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
            name: "Time To Leave Reminders",
            item: "https://www.ontimer.app/time-to-leave-reminders",
          },
          { "@type": "ListItem", position: 3, name: profile.shortName, item: url },
        ],
      },
    ];
  },
  buildInternalLinks(): InternalLinkDefinition[] {
    return [
      { href: "/", label: "Home" },
      { href: cruiseParentPath, label: "Time To Leave Reminders" },
    ];
  },
  getDestinationPath: getCruiseDestinationPath,
};

export function buildCruiseMetadata(location: CruiseTerminalLocationProfile): Metadata {
  if (!cruiseDestinationType.validateDestination(location)) {
    return { robots: { index: false, follow: false } };
  }

  const seo = cruiseDestinationType.buildSeoMetadata(location);
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

export function buildCruisePageModel(location: CruiseTerminalLocationProfile): DestinationPageModel {
  const faqItems = cruiseDestinationType.buildFaqItems(location);

  return {
    trackerCode: location.code,
    jsonLd: cruiseDestinationType.buildStructuredData(location),
    breadcrumbs: cruiseDestinationType.buildInternalLinks(location),
    currentBreadcrumbLabel: location.shortName,
    hero: {
      eyebrow: `${location.code} · ${location.city}`,
      secondaryLabels: [location.reviewedLabel, "Powered by OnTimer"],
      titlePrefix: "What Time Should I Leave for",
      titleHighlight: `${location.shortName}?`,
      description: buildCruiseSnippetCandidate(location),
    },
    planner: (
      <CruiseCalculator
        initialTerminal={location.calculatorDestination}
        locationCode={location.code}
        example={location.calculatorExample}
      />
    ),
    planningFacts: {
      sectionId: `${location.code.toLowerCase()}-planning-facts`,
      heading: `${location.shortName}-specific planning details that change when you should leave`,
      intro: location.authorityIntro,
      caution: "Cruise line boarding windows and cutoffs can change, so verify your assigned terminal and cruise-line instructions before leaving.",
      modules: location.modules,
    },
    workedExamples: {
      heading: `Worked examples for leaving for ${location.shortName}`,
      intro:
        "Each example is illustrative, not live traffic guidance. The assumptions are shown so you can see the calculation and replace them with your own details above.",
      examples: location.workedExamples,
      note:
        "Traffic, terminal assignments and cruise-line instructions vary. Use the live calculator for your trip and check official cruise documents before leaving.",
    },
    sources: {
      heading: "How to use this page safely",
      body: [
        "Stable planning facts—such as terminal names, parking options and port access patterns—belong in this guide. Traffic, terminal assignments, boarding windows and service disruptions are volatile, so the calculator, cruise line or official operator should supply the current answer.",
        "Recheck your assigned terminal, boarding window, required documents, luggage instructions and transportation plan on the day you sail.",
      ],
      sourceHeading: "Planning and cruise terminal sources",
      sourceIntro: `Facts on this page were checked against port, cruise terminal and travel-document sources. ${location.reviewedLabel}.`,
      links: location.sources,
    },
    relatedDestinations: {
      heading: "Related leave-time calculators",
      links: getRelatedTravelLocationLinks(location),
    },
    faq: {
      heading: `${location.shortName} leave-time questions`,
      items: faqItems,
      ctaLocation: `cruise_${location.code.toLowerCase()}_final`,
      noSnippetQuestions: [faqItems[0].question],
    },
    calculatorExample: location.calculatorExample,
  };
}
