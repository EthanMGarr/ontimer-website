export type TravelLocationKind = "airport" | "cruise-terminal" | "venue";
export type PublishingStatus = "draft" | "prototype" | "published";

export interface SourceLink {
  label: string;
  url: string;
}

export interface CalculatorExample {
  eyebrow: string;
  summary: string;
  leaveTime: string;
  breakdown: string[];
}

export interface WorkedExample {
  title: string;
  subtitle: string;
  assumptions: string[];
  calculation: string[];
  result: string;
}

export interface ContentModule {
  title: string;
  facts: string[];
}

interface TravelLocationBase {
  kind: TravelLocationKind;
  publishingStatus: PublishingStatus;
  indexable: boolean;
  slug: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  calculatorDestination: string;
  reviewedOn: string;
  reviewedLabel: string;
  directAnswer: string;
  authorityIntro: string;
  calculatorExample: CalculatorExample;
  workedExamples: WorkedExample[];
  modules: ContentModule[];
  sources: SourceLink[];
}

export interface AirportLocationProfile extends TravelLocationBase {
  kind: "airport";
  airport: {
    domesticArrivalMinutes: number;
    internationalArrivalMinutes: number;
    terminalNames: string[];
    accessHeading: string;
    insideHeading: string;
    transitHeading: string;
  };
}

export interface CruiseTerminalLocationProfile extends TravelLocationBase {
  kind: "cruise-terminal";
  cruiseTerminal: {
    checkInLeadMinutes: number;
    pierNames: string[];
    accessHeading: string;
    insideHeading: string;
    transitHeading: string;
  };
}

export type TravelLocationProfile =
  | AirportLocationProfile
  | CruiseTerminalLocationProfile;

const officialAirportSources: SourceLink[] = [
  {
    label: "TSA security screening guidance",
    url: "https://www.tsa.gov/travel/security-screening",
  },
];

export const travelLocations: TravelLocationProfile[] = [
  {
    kind: "airport",
    publishingStatus: "prototype",
    indexable: true,
    slug: "newark-ewr",
    code: "EWR",
    name: "Newark Liberty International Airport",
    shortName: "Newark Airport",
    city: "Newark, New Jersey",
    calculatorDestination: "EWR Airport",
    reviewedOn: "2026-06-24",
    reviewedLabel: "Reviewed June 24, 2026",
    directAnswer:
      "Newark Liberty trips can change fast with Turnpike traffic, AirTrain transfers, parking, bags and terminal access. Enter your flight details and OnTimer will calculate when you should leave for EWR — not just when you should arrive.",
    authorityIntro:
      "Newark Liberty is not a small regional airport with one simple arrival pattern. In 2024, published North American airport traffic rankings put EWR at No. 14, with Port Authority traffic data showing 48,853,370 annual passengers. The airport sits across Newark and Elizabeth, draws traffic from the New Jersey Turnpike, I-78 and Routes 1–9, and sends travelers into three different terminal plans: Terminal A, Terminal B or United-heavy Terminal C. A useful EWR leave-time estimate has to work backward from your flight, then add the local pieces that actually slow people down: Turnpike or bridge/tunnel traffic, parking or rideshare access, the Newark Airport Rail Station, AirTrain timing, the Terminal A walk or shuttle, checked bags, TSA PreCheck and whether your airline wants you there earlier for an international departure.",
    calculatorExample: {
      eyebrow: "Illustrative EWR example",
      summary: "7:00 AM domestic flight · Aberdeen, NJ · parking",
      leaveTime: "Leave around 4:00 AM",
      breakdown: [
        "5:00 AM airport arrival target",
        "20-minute parking and terminal allowance",
        "40-minute illustrative drive",
      ],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: ["Terminal A", "Terminal B", "Terminal C"],
      accessHeading: "Getting to EWR without losing your buffer",
      insideHeading: "Terminals, parking and transfers at Newark Airport",
      transitHeading: "NJ TRANSIT and AirTrain planning for EWR",
    },
    modules: [
      {
        title: "Driving and terminal access",
        facts: [
          "The New Jersey Turnpike, I-78 and Routes 1–9 are major approaches to Newark Airport. Calculate the trip for the hour you will actually travel; reaching the airport interchange is not the same as reaching your terminal.",
          "Confirm Terminal A, B or C with your airline before leaving. Airline assignments and operating locations can change, so this page deliberately does not hardcode a permanent airline-to-terminal list.",
          "A drop-off ends at the terminal curb. Parking creates another leg: finding the lot, unloading, and reaching the terminal by foot, AirTrain or shuttle.",
        ],
      },
      {
        title: "AirTrain and terminal transfers",
        facts: [
          "The Port Authority says AirTrain travel between EWR passenger terminals takes under 20 minutes and is free within the airport.",
          "AirTrain does not connect directly to Terminal A. The Port Authority advises allowing about 15 minutes for the covered walk or about 5 minutes for the shuttle from the Terminal A station.",
          "From Newark Liberty International Airport Rail Station, the Port Authority estimates about 7 minutes to Terminal C, 11 minutes to Terminal B and 20 minutes to Terminal A.",
        ],
      },
      {
        title: "Rail from New York and New Jersey",
        facts: [
          "NJ TRANSIT describes New York Penn Station as approximately 30 minutes from Newark Airport Rail Station. That rail time does not include reaching Penn Station, waiting for the train, or completing the AirTrain transfer.",
          "NJ TRANSIT tickets to Newark Liberty International Airport Rail Station include the AirTrain access fee. Keep the ticket available for the airport connection.",
          "For a flight, work backward through every leg: terminal arrival target, AirTrain transfer, rail schedule, station access and a missed-connection cushion.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Aberdeen, NJ → EWR",
        subtitle: "7:00 AM domestic flight · parking · checked bag",
        assumptions: [
          "Illustrative 40-minute drive; use the calculator for live traffic",
          "20 minutes to park and reach the terminal",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 7:00 AM",
          "Airport arrival target: 5:00 AM",
          "Reach parking by: 4:40 AM",
          "Illustrative drive: 40 minutes",
        ],
        result: "Illustrative leave time: 4:00 AM",
      },
      {
        title: "Hoboken, NJ → EWR",
        subtitle: "6:30 PM international flight · rideshare",
        assumptions: [
          "Illustrative 45-minute weekday drive; actual traffic may differ materially",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 6:30 PM",
          "Airport arrival target: 3:30 PM",
          "Reach terminal curb by: 3:15 PM",
          "Illustrative drive: 45 minutes",
        ],
        result: "Illustrative leave time: 2:30 PM",
      },
      {
        title: "New York Penn Station → EWR",
        subtitle: "NJ TRANSIT + AirTrain · Terminal C example",
        assumptions: [
          "Approximately 30 minutes by NJ TRANSIT to the airport rail station",
          "Port Authority estimate of about 7 minutes from rail station to Terminal C",
          "23 minutes for waiting, walking and connection margin",
        ],
        calculation: [
          "Required terminal arrival: 5:00 PM",
          "AirTrain and connection allowance: 30 minutes",
          "Illustrative NJ TRANSIT ride: 30 minutes",
        ],
        result: "Be at New York Penn Station ready to board by about 4:00 PM",
      },
    ],
    sources: [
      {
        label: "Newark Liberty official airport guide",
        url: "https://www.newarkairport.com/",
      },
      {
        label: "Port Authority AirTrain Newark guide",
        url: "https://www.newarkairport.com/transportation/airtrain",
      },
      {
        label: "NJ TRANSIT Newark Airport guide",
        url: "https://www.njtransit.com/airport",
      },
      {
        label: "Port Authority airport traffic statistics",
        url: "https://www.panynj.gov/airports/en/statistics-general-info.html",
      },
      {
        label: "ACI-NA airport traffic report",
        url: "https://airportscouncil.org/intelligence-data-center/airport-traffic-report/",
      },
      ...officialAirportSources,
    ],
  },
  ...[
    ["jfk", "JFK", "John F. Kennedy International Airport", "JFK Airport", "Queens, New York"],
    ["los-angeles-lax", "LAX", "Los Angeles International Airport", "LAX", "Los Angeles, California"],
    ["chicago-ohare-ord", "ORD", "Chicago O'Hare International Airport", "Chicago O'Hare", "Chicago, Illinois"],
    ["atlanta-atl", "ATL", "Hartsfield-Jackson Atlanta International Airport", "Atlanta Airport", "Atlanta, Georgia"],
  ].map(([slug, code, name, shortName, city]): AirportLocationProfile => ({
    kind: "airport",
    publishingStatus: "draft",
    indexable: false,
    slug,
    code,
    name,
    shortName,
    city,
    calculatorDestination: `${code} Airport`,
    reviewedOn: "2026-06-24",
    reviewedLabel: "Draft profile — not yet reviewed for publication",
    directAnswer:
      `This ${shortName} page is temporarily unavailable while OnTimer finishes and validates its location-specific planning template.`,
    authorityIntro:
      `This ${shortName} authority section is intentionally unpublished until its location-specific traffic, terminal, parking, transit and source details are reviewed.`,
    calculatorExample: {
      eyebrow: `Illustrative ${code} example`,
      summary: `${shortName} planning example`,
      leaveTime: "Use the calculator for a personalized result",
      breakdown: ["Location-specific example pending review"],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: [],
      accessHeading: `Getting to ${code}`,
      insideHeading: `Planning inside ${shortName}`,
      transitHeading: `Transit to ${shortName}`,
    },
    modules: [],
    workedExamples: [],
    sources: officialAirportSources,
  })),
];

export const indexableTravelLocations = travelLocations.filter(
  (location) => location.indexable
);

export function getTravelLocation(slug: string): TravelLocationProfile | undefined {
  return travelLocations.find((location) => location.slug === slug);
}

function collectVisibleStrings(location: TravelLocationProfile): string[] {
  return [
    location.name,
    location.shortName,
    location.city,
    location.directAnswer,
    location.authorityIntro,
    location.calculatorExample.eyebrow,
    location.calculatorExample.summary,
    location.calculatorExample.leaveTime,
    ...location.calculatorExample.breakdown,
    ...location.modules.flatMap((module) => [module.title, ...module.facts]),
    ...location.workedExamples.flatMap((example) => [
      example.title,
      example.subtitle,
      example.result,
      ...example.assumptions,
      ...example.calculation,
    ]),
  ];
}

export function validateTravelLocationProfiles(): void {
  const seenSlugs = new Set<string>();
  const seenCodes = new Set<string>();
  const configuredCodes = travelLocations.map((location) => location.code);

  for (const location of travelLocations) {
    if (seenSlugs.has(location.slug)) throw new Error(`Duplicate location slug: ${location.slug}`);
    if (seenCodes.has(location.code)) throw new Error(`Duplicate location code: ${location.code}`);
    seenSlugs.add(location.slug);
    seenCodes.add(location.code);

    if (!location.calculatorExample.summary || !location.calculatorExample.leaveTime) {
      throw new Error(`${location.code} is missing its calculator example`);
    }
    if (location.indexable && location.publishingStatus === "draft") {
      throw new Error(`${location.code} is marked draft and cannot be indexed`);
    }
    if (location.indexable && (!location.reviewedOn || location.sources.length < 2)) {
      throw new Error(`${location.code} cannot be indexed without a review date and sources`);
    }

    const visibleText = collectVisibleStrings(location).join(" ");
    const leakedCode = configuredCodes.find(
      (code) => code !== location.code && new RegExp(`\\b${code}\\b`).test(visibleText)
    );
    if (leakedCode) {
      throw new Error(`${location.code} content contains another location code: ${leakedCode}`);
    }
  }
}

validateTravelLocationProfiles();
