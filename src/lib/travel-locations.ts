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
  aliases?: string[];
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
    localTimingFaq: string;
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

const officialCruiseSources: SourceLink[] = [
  {
    label: "U.S. Customs and Border Protection cruise travel guidance",
    url: "https://www.cbp.gov/travel/us-citizens/western-hemisphere-travel-initiative",
  },
];

interface CruiseTerminalSeed {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  calculatorDestination?: string;
  pierNames: string[];
  accessPattern: string;
  trafficFact: string;
  terminalFact: string;
  parkingFact: string;
  shuttleFact: string;
  exampleOrigin: string;
  exampleFarOrigin: string;
  hotelOrigin: string;
  officialSource: SourceLink;
  parkingSource?: SourceLink;
}

function createCruiseTerminalProfile(seed: CruiseTerminalSeed): CruiseTerminalLocationProfile {
  return {
    kind: "cruise-terminal",
    publishingStatus: "published",
    indexable: true,
    slug: seed.slug,
    code: seed.code,
    name: seed.name,
    shortName: seed.shortName,
    city: seed.city,
    calculatorDestination: seed.calculatorDestination ?? `${seed.name}, ${seed.city}`,
    reviewedOn: "2026-07-02",
    reviewedLabel: "Reviewed July 2, 2026",
    directAnswer:
      `${seed.shortName} leave time depends on ${seed.accessPattern}, terminal or pier assignment, parking or shuttle plans, checked luggage, cruise check-in windows and whether your sailing is domestic or international.`,
    authorityIntro:
      `${seed.shortName} is a cruise departure point, not a normal appointment address. A useful leave-time estimate has to work backward from your boarding window, then add the port details that slow travelers down: ${seed.accessPattern}, terminal or pier assignment, parking or rideshare access, hotel shuttles, checked luggage, document checks and the cutoff time before boarding closes.`,
    calculatorExample: {
      eyebrow: `Illustrative ${seed.code} example`,
      summary: `1:00 PM boarding window · ${seed.exampleOrigin} · parking`,
      leaveTime: "Leave around 9:45 AM",
      breakdown: [
        "11:00 AM port arrival target",
        "20-minute parking and terminal allowance",
        "55-minute illustrative drive plus cushion",
      ],
    },
    cruiseTerminal: {
      checkInLeadMinutes: 120,
      pierNames: seed.pierNames,
      accessHeading: `Getting to ${seed.shortName} without losing your boarding buffer`,
      insideHeading: `Terminals, luggage and boarding at ${seed.shortName}`,
      transitHeading: `Parking, hotel shuttle and rideshare planning for ${seed.code}`,
    },
    modules: [
      {
        title: "Port access and terminal assignment",
        facts: [
          seed.trafficFact,
          seed.terminalFact,
          "Cruise terminals work on boarding windows. Reaching the port area is not the same as reaching the correct terminal with documents and luggage ready.",
        ],
      },
      {
        title: "Luggage, check-in and boarding",
        facts: [
          "Checked luggage, porter drop-off, document checks and security screening can become the real constraint even when the drive looks short.",
          "International sailings often need more margin for identity documents and cruise-line check-in requirements.",
          "Arrive before the cruise line's cutoff, not merely before the ship leaves. Boarding can close well before departure.",
        ],
      },
      {
        title: "Parking, shuttles and rideshare",
        facts: [
          seed.parkingFact,
          seed.shuttleFact,
          "If you use a hotel shuttle, rental car return or off-site parking, count that transfer as a separate leg before your terminal arrival target.",
        ],
      },
    ],
    workedExamples: [
      {
        title: `${seed.exampleOrigin} -> ${seed.code}`,
        subtitle: "1:00 PM domestic cruise boarding · parking · checked luggage",
        assumptions: [
          "Illustrative 55-minute drive; use the calculator for live traffic",
          "20 minutes to park and reach the terminal",
          "2-hour port-arrival target",
        ],
        calculation: [
          "Boarding window: 1:00 PM",
          "Port arrival target: 11:00 AM",
          "Reach parking by: 10:40 AM",
          "Illustrative drive and cushion: 55 minutes",
        ],
        result: "Illustrative leave time: 9:45 AM",
      },
      {
        title: `${seed.exampleFarOrigin} -> ${seed.code}`,
        subtitle: "12:30 PM international cruise boarding · rideshare",
        assumptions: [
          "Illustrative 75-minute drive; actual traffic may differ materially",
          "10-minute curb-to-terminal allowance",
          "2.5-hour international check-in target",
        ],
        calculation: [
          "Boarding window: 12:30 PM",
          "Port arrival target: 10:00 AM",
          "Reach terminal curb by: 9:50 AM",
          "Illustrative drive: 75 minutes",
        ],
        result: "Illustrative leave time: 8:35 AM",
      },
      {
        title: `${seed.hotelOrigin} -> ${seed.code}`,
        subtitle: "Hotel shuttle · 11:30 AM domestic cruise boarding",
        assumptions: [
          "Illustrative 20-minute shuttle ride",
          "15 minutes for pickup, loading and terminal movement",
          "2-hour port-arrival target",
        ],
        calculation: [
          "Boarding window: 11:30 AM",
          "Port arrival target: 9:30 AM",
          "Shuttle and loading allowance: 35 minutes",
        ],
        result: `Be ready at ${seed.hotelOrigin} by about 8:55 AM`,
      },
    ],
    sources: [
      seed.officialSource,
      ...(seed.parkingSource ? [seed.parkingSource] : []),
      ...officialCruiseSources,
    ],
  };
}

const cruiseTerminalProfiles: CruiseTerminalLocationProfile[] = [
  {
    slug: "portmiami",
    code: "PMCR",
    name: "PortMiami Cruise Terminals",
    shortName: "PortMiami",
    aliases: ["Port Miami", "Port Miami cruise terminals"],
    city: "Miami, Florida",
    pierNames: ["Cruise Terminal A", "Cruise Terminal B", "Cruise Terminal C", "Cruise Terminal D", "Cruise Terminal E", "Cruise Terminal F", "Cruise Terminal G", "Cruise Terminal V"],
    accessPattern: "MacArthur Causeway traffic, Downtown Miami congestion, terminal roads and cruise-day parking demand",
    trafficFact: "PortMiami trips can be shaped by MacArthur Causeway, Biscayne Boulevard, downtown event traffic and cruise-day surges near terminal entrances.",
    terminalFact: "PortMiami uses multiple cruise terminals, and the correct terminal depends on cruise line and ship assignment.",
    parkingFact: "On-port garages and lots reduce transfer complexity but can still add time for entry, payment, unloading and the terminal walk.",
    shuttleFact: "Hotel shuttles and rideshare trips can queue near port access points during busy embarkation windows.",
    exampleOrigin: "Miami Beach",
    exampleFarOrigin: "Fort Lauderdale",
    hotelOrigin: "Downtown Miami hotel",
    officialSource: { label: "PortMiami cruise terminals", url: "https://www.miamidade.gov/portmiami/cruise-terminals.asp" },
    parkingSource: { label: "PortMiami parking", url: "https://www.miamidade.gov/portmiami/parking-transportation.asp" },
  },
  {
    slug: "port-canaveral",
    code: "PCCR",
    name: "Port Canaveral Cruise Terminals",
    shortName: "Port Canaveral",
    city: "Cape Canaveral, Florida",
    pierNames: ["Cruise Terminal 1", "Cruise Terminal 3", "Cruise Terminal 5", "Cruise Terminal 6", "Cruise Terminal 8", "Cruise Terminal 10"],
    accessPattern: "SR 528, A1A, beach traffic, theme-park hotel transfers and terminal-specific parking",
    trafficFact: "Port Canaveral trips often depend on SR 528, A1A and resort-area traffic from Orlando or Cocoa Beach.",
    terminalFact: "Port Canaveral has several cruise terminals, so terminal assignment matters before choosing parking or drop-off.",
    parkingFact: "Terminal parking is convenient but can still add time for tolls, port entry and garage or lot movement.",
    shuttleFact: "Orlando hotel and airport shuttles need pickup, loading and highway time counted separately.",
    exampleOrigin: "Orlando International Drive",
    exampleFarOrigin: "Walt Disney World Resort area",
    hotelOrigin: "Cocoa Beach hotel",
    officialSource: { label: "Port Canaveral cruise terminals", url: "https://www.portcanaveral.com/Cruise" },
    parkingSource: { label: "Port Canaveral parking", url: "https://www.portcanaveral.com/Cruise/Directions-Parking" },
  },
  {
    slug: "port-everglades",
    code: "PECR",
    name: "Port Everglades Cruise Terminals",
    shortName: "Port Everglades",
    city: "Fort Lauderdale, Florida",
    pierNames: ["Cruise Terminal 2", "Cruise Terminal 4", "Cruise Terminal 18", "Cruise Terminal 19", "Cruise Terminal 21", "Cruise Terminal 25", "Cruise Terminal 26", "Cruise Terminal 29"],
    accessPattern: "I-595, US 1, Fort Lauderdale airport traffic, port security gates and terminal roads",
    trafficFact: "Port Everglades trips can be affected by I-595, US 1, airport traffic and beach traffic near Fort Lauderdale.",
    terminalFact: "Port Everglades has multiple cruise terminals inside a secured port area, so terminal assignment and gate access matter.",
    parkingFact: "Garage and surface parking plans vary by terminal, and port gate entry can add time on embarkation days.",
    shuttleFact: "Airport and hotel shuttles are common, but loading and port entry should be included before the check-in target.",
    exampleOrigin: "Fort Lauderdale Beach",
    exampleFarOrigin: "Miami",
    hotelOrigin: "17th Street hotel",
    officialSource: { label: "Port Everglades cruise guide", url: "https://www.porteverglades.net/cruise/" },
    parkingSource: { label: "Port Everglades parking", url: "https://www.porteverglades.net/cruise/parking/" },
  },
  {
    slug: "manhattan-cruise-terminal",
    code: "MTCR",
    name: "Manhattan Cruise Terminal",
    shortName: "Manhattan Cruise Terminal",
    city: "New York, New York",
    pierNames: ["Pier 88", "Pier 90", "Pier 92"],
    accessPattern: "West Side Highway traffic, Midtown congestion, pier access and Manhattan parking constraints",
    trafficFact: "Manhattan Cruise Terminal trips can swing with West Side Highway traffic, Midtown events and tunnel or bridge approaches.",
    terminalFact: "The terminal operates along Manhattan piers, so the pier assignment and curb plan matter with luggage.",
    parkingFact: "Manhattan parking can be slow and expensive, and garage entry can add meaningful time before check-in.",
    shuttleFact: "Hotel, taxi and rideshare trips may queue around the piers during busy boarding windows.",
    exampleOrigin: "Upper West Side",
    exampleFarOrigin: "Newark, NJ",
    hotelOrigin: "Times Square hotel",
    officialSource: { label: "Manhattan Cruise Terminal", url: "https://nycruise.com/manhattan-terminal/" },
    parkingSource: { label: "NYC cruise parking", url: "https://nycruise.com/parking/" },
  },
  {
    slug: "brooklyn-cruise-terminal",
    code: "BTCR",
    name: "Brooklyn Cruise Terminal",
    shortName: "Brooklyn Cruise Terminal",
    city: "Brooklyn, New York",
    pierNames: ["Pier 12"],
    accessPattern: "Red Hook street access, Brooklyn-Queens Expressway traffic and terminal-area curb constraints",
    trafficFact: "Brooklyn Cruise Terminal trips can depend on BQE traffic, Red Hook street access and bridge or tunnel approaches.",
    terminalFact: "The terminal is centered on Pier 12, but the last-mile street approach can be slower than the map distance suggests.",
    parkingFact: "On-site parking simplifies the transfer but still requires entry, unloading and a walk with luggage.",
    shuttleFact: "Rideshare and car-service pickups can be affected by curb demand around the terminal.",
    exampleOrigin: "Park Slope",
    exampleFarOrigin: "Long Island City",
    hotelOrigin: "Downtown Brooklyn hotel",
    officialSource: { label: "Brooklyn Cruise Terminal", url: "https://nycruise.com/brooklyn-terminal/" },
    parkingSource: { label: "NYC cruise parking", url: "https://nycruise.com/parking/" },
  },
  {
    slug: "baltimore-cruise-terminal",
    code: "BCCR",
    name: "Baltimore Cruise Terminal",
    shortName: "Baltimore Cruise Terminal",
    city: "Baltimore, Maryland",
    pierNames: ["South Locust Point Cruise Terminal"],
    accessPattern: "I-95, I-395, Fort McHenry Tunnel approaches and South Locust Point access",
    trafficFact: "Baltimore Cruise Terminal trips can change with I-95, I-395, tunnel traffic and downtown event congestion.",
    terminalFact: "The South Locust Point terminal is simpler than many ports, but port entry and luggage handling still need a buffer.",
    parkingFact: "On-site parking is commonly used and should be counted as a separate arrival step before check-in.",
    shuttleFact: "Hotel shuttles and rideshare trips can be straightforward, but pickup timing still matters with cruise luggage.",
    exampleOrigin: "Inner Harbor",
    exampleFarOrigin: "Washington, DC",
    hotelOrigin: "Inner Harbor hotel",
    officialSource: { label: "Baltimore cruise terminal", url: "https://www.cruise.maryland.gov/" },
  },
  {
    slug: "galveston-cruise-terminal",
    code: "GCCR",
    name: "Port of Galveston Cruise Terminals",
    shortName: "Galveston Cruise Terminal",
    city: "Galveston, Texas",
    pierNames: ["Cruise Terminal 25", "Cruise Terminal 28", "Cruise Terminal 10"],
    accessPattern: "I-45 island traffic, Harborside Drive, cruise parking lots and beach-weekend congestion",
    trafficFact: "Galveston cruise trips often depend on I-45, island access, Harborside Drive and beach or holiday traffic.",
    terminalFact: "Galveston has multiple cruise terminals, and the right terminal affects parking and drop-off routing.",
    parkingFact: "Port and private parking lots can add shuttle or walk time before terminal check-in.",
    shuttleFact: "Houston-area shuttles should be planned as a full transfer leg, not just highway time.",
    exampleOrigin: "Houston Hobby Airport",
    exampleFarOrigin: "Downtown Houston",
    hotelOrigin: "Galveston seawall hotel",
    officialSource: { label: "Port of Galveston cruise parking and terminals", url: "https://www.portofgalveston.com/" },
  },
  {
    slug: "long-beach-cruise-terminal",
    code: "LBCR",
    name: "Long Beach Cruise Terminal",
    shortName: "Long Beach Cruise Terminal",
    city: "Long Beach, California",
    pierNames: ["Long Beach Cruise Terminal"],
    accessPattern: "710 freeway traffic, harbor access, Queen Mary area roads and terminal parking",
    trafficFact: "Long Beach Cruise Terminal trips can be affected by the 710, harbor-area traffic and event demand near the waterfront.",
    terminalFact: "The terminal is compact compared with larger ports, but terminal parking and luggage movement still need their own allowance.",
    parkingFact: "Parking near the terminal can simplify the trip while adding garage entry and walking time.",
    shuttleFact: "Hotel shuttles and rideshare trips should include loading time and waterfront approach traffic.",
    exampleOrigin: "Downtown Long Beach",
    exampleFarOrigin: "Anaheim",
    hotelOrigin: "Long Beach waterfront hotel",
    officialSource: { label: "Long Beach Cruise Terminal", url: "https://www.carnival.com/cruise-from/long-beach.aspx" },
  },
  {
    slug: "seattle-cruise-terminal",
    code: "STCR",
    name: "Seattle Cruise Terminals",
    shortName: "Seattle Cruise Terminal",
    city: "Seattle, Washington",
    pierNames: ["Pier 66", "Pier 91"],
    accessPattern: "Elliott Avenue, Alaskan Way, downtown Seattle traffic and pier-specific access",
    trafficFact: "Seattle cruise trips can vary by downtown traffic, waterfront construction, Elliott Avenue and Alaskan Way approaches.",
    terminalFact: "Seattle uses Pier 66 and Pier 91 for cruise operations, and the correct pier changes the route materially.",
    parkingFact: "Pier parking and off-site plans can involve shuttles or different walking distances with luggage.",
    shuttleFact: "Airport and hotel shuttles need pickup, loading and pier-specific drop-off time included.",
    exampleOrigin: "Downtown Seattle",
    exampleFarOrigin: "Sea-Tac Airport",
    hotelOrigin: "Belltown hotel",
    officialSource: { label: "Port of Seattle cruise terminals", url: "https://www.portseattle.org/cruise" },
  },
  {
    slug: "vancouver-cruise-terminal",
    code: "VCCR",
    name: "Canada Place Cruise Terminal",
    shortName: "Vancouver Cruise Terminal",
    city: "Vancouver, British Columbia",
    pierNames: ["Canada Place"],
    accessPattern: "downtown Vancouver traffic, Canada Place access, hotel transfers and border-document timing",
    trafficFact: "Vancouver cruise trips can be shaped by downtown traffic, Canada Place curb demand and hotel pickup timing.",
    terminalFact: "Canada Place is central and busy; the final curb, luggage and check-in sequence can take longer than the route distance implies.",
    parkingFact: "Downtown parking and luggage unloading should be counted before the cruise check-in target.",
    shuttleFact: "Hotel and airport transfers need pickup, loading and downtown approach time included.",
    exampleOrigin: "Yaletown",
    exampleFarOrigin: "Vancouver International Airport",
    hotelOrigin: "Downtown Vancouver hotel",
    officialSource: { label: "Vancouver cruise terminal", url: "https://www.portvancouver.com/cruise/" },
  },
].map(createCruiseTerminalProfile);

interface AirportSeed {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  calculatorDestination?: string;
  terminalNames: string[];
  roadAccess: string;
  roadFact: string;
  terminalFact: string;
  transferFact: string;
  transitFact: string;
  parkingFact: string;
  exampleOrigin: string;
  exampleFarOrigin: string;
  transitOrigin: string;
  officialSource: SourceLink;
  transitSource: SourceLink;
  parkingSource?: SourceLink;
}

function createAirportProfile(seed: AirportSeed): AirportLocationProfile {
  return {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: seed.slug,
    code: seed.code,
    name: seed.name,
    shortName: seed.shortName,
    city: seed.city,
    calculatorDestination: seed.calculatorDestination ?? `${seed.name}, ${seed.city}`,
    reviewedOn: "2026-06-28",
    reviewedLabel: "Reviewed June 28, 2026",
    directAnswer:
      `${seed.shortName} (${seed.code}) leave time depends on ${seed.roadAccess}, the correct terminal or concourse, parking or curbside access, checked bags, TSA PreCheck, airport transfers and whether your flight is domestic or international.`,
    authorityIntro:
      `${seed.shortName} is busy enough that generic airport advice is not enough. The useful question is not only when to arrive, but when to leave from your actual starting point. For ${seed.code}, that means working backward from your flight time and adding the local details that can change the trip: ${seed.roadAccess}, terminal choice, parking or rideshare access, transit schedules, checked bags, TSA PreCheck and the larger buffer often needed for international departures.`,
    calculatorExample: {
      eyebrow: `Illustrative ${seed.code} example`,
      summary: `7:30 AM domestic flight · ${seed.exampleOrigin} · parking`,
      leaveTime: "Leave around 4:50 AM",
      breakdown: [
        "5:30 AM airport arrival target",
        "20-minute parking and terminal allowance",
        "20-minute illustrative drive plus morning buffer",
      ],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: seed.terminalNames,
      accessHeading: `Getting to ${seed.code} without losing your buffer`,
      insideHeading: `Terminals, parking and transfers at ${seed.shortName}`,
      transitHeading: `Transit, rideshare and shuttle planning for ${seed.code}`,
      localTimingFaq:
        `At ${seed.code}, plan around ${seed.roadAccess}, ${seed.terminalFact.toLowerCase()} ${seed.transferFact} ${seed.transitFact}`,
    },
    modules: [
      {
        title: "Road access and terminal choice",
        facts: [
          seed.roadFact,
          "Reaching airport property is not the same as reaching the correct airline curb. Add time for airport roads, signs, departures-level traffic and any wrong-lane recovery.",
          "Set your route to the correct terminal, parking facility or rideshare area before leaving, then calculate the trip for the hour you will actually travel.",
        ],
      },
      {
        title: "Terminals and airport transfers",
        facts: [
          seed.terminalFact,
          seed.transferFact,
          "Checked bags, document checks and unfamiliar terminal layouts can become the binding constraint even when security lines look manageable.",
        ],
      },
      {
        title: "Transit, parking and shuttles",
        facts: [
          seed.transitFact,
          seed.parkingFact,
          "For any non-curbside trip, work backward through every leg: terminal arrival target, shuttle or walk, parking or station access, traffic or scheduled transit, and a missed-connection cushion.",
        ],
      },
    ],
    workedExamples: [
      {
        title: `${seed.exampleOrigin} -> ${seed.code}`,
        subtitle: "7:30 AM domestic flight · parking · checked bag",
        assumptions: [
          "Illustrative 20-minute drive plus morning traffic buffer",
          "20 minutes to park and reach the terminal",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 7:30 AM",
          "Airport arrival target: 5:30 AM",
          "Reach parking by: 5:10 AM",
          "Illustrative drive and buffer: 20 minutes",
        ],
        result: "Illustrative leave time: 4:50 AM",
      },
      {
        title: `${seed.exampleFarOrigin} -> ${seed.code}`,
        subtitle: "6:00 PM international flight · rideshare",
        assumptions: [
          "Illustrative 75-minute weekday drive; actual traffic may differ materially",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 6:00 PM",
          "Airport arrival target: 3:00 PM",
          "Reach terminal curb by: 2:45 PM",
          "Illustrative drive: 75 minutes",
        ],
        result: "Illustrative leave time: 1:30 PM",
      },
      {
        title: `${seed.transitOrigin} -> ${seed.code}`,
        subtitle: "Transit or airport shuttle · 10:00 AM domestic flight",
        assumptions: [
          "Illustrative 45-minute transit or shuttle allowance",
          "15 minutes for waiting, walking and airport movement",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 10:00 AM",
          "Airport arrival target: 8:00 AM",
          "Transit and connection allowance: 60 minutes",
        ],
        result: `Be at ${seed.transitOrigin} ready to board by about 7:00 AM`,
      },
    ],
    sources: [
      seed.officialSource,
      seed.transitSource,
      ...(seed.parkingSource ? [seed.parkingSource] : []),
      ...officialAirportSources,
    ],
  };
}

const additionalAirportProfiles: AirportLocationProfile[] = [
  {
    slug: "dallas-fort-worth-dfw",
    code: "DFW",
    name: "Dallas Fort Worth International Airport",
    shortName: "DFW Airport",
    city: "Dallas-Fort Worth, Texas",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C", "Terminal D", "Terminal E"],
    roadAccess: "North Texas tollways, International Parkway, airport entry plazas and terminal-loop traffic",
    roadFact: "DFW trips can be shaped by SH 183, SH 114, SH 121, I-635 and International Parkway, with different approaches depending on whether you enter from Dallas, Fort Worth or the northern suburbs.",
    terminalFact: "DFW uses Terminals A, B, C, D and E, and the right terminal matters because the airport is large enough that a correction can consume real margin.",
    transferFact: "Skylink helps connect terminals after security, but parking, curbside access and pre-security terminal changes still need their own time allowance.",
    transitFact: "DART Orange Line service and TEXRail can be useful, but scheduled rail time is only one leg of the full station-to-terminal plan.",
    parkingFact: "Terminal parking, express parking, remote parking and rental-car return all create different last-mile timelines.",
    exampleOrigin: "Las Colinas",
    exampleFarOrigin: "Fort Worth",
    transitOrigin: "DART Belt Line Station",
    officialSource: { label: "DFW official airport guide", url: "https://www.dfwairport.com/" },
    transitSource: { label: "DFW public transit", url: "https://www.dfwairport.com/transport/publictransit/" },
    parkingSource: { label: "DFW parking", url: "https://www.dfwairport.com/park/" },
  },
  {
    slug: "denver-den",
    code: "DEN",
    name: "Denver International Airport",
    shortName: "Denver Airport",
    city: "Denver, Colorado",
    terminalNames: ["Jeppesen Terminal", "Concourse A", "Concourse B", "Concourse C"],
    roadAccess: "I-70, Pena Boulevard, long airport approach roads, weather and remote parking transfers",
    roadFact: "Denver Airport is far from downtown compared with many city airports, so I-70, Pena Boulevard, winter weather and the long final approach can all change the leave-time answer.",
    terminalFact: "DEN uses Jeppesen Terminal for check-in and security, then Concourses A, B and C for gates.",
    transferFact: "The airport train and bridge access to Concourse A can move travelers efficiently, but security location and concourse movement still need a buffer.",
    transitFact: "RTD A Line rail connects Denver Union Station with the airport, but station access and train schedule timing have to be counted separately.",
    parkingFact: "Garage, economy, shuttle and off-site parking create different walk or bus requirements before check-in.",
    exampleOrigin: "Aurora",
    exampleFarOrigin: "Boulder",
    transitOrigin: "Denver Union Station",
    officialSource: { label: "Denver Airport official guide", url: "https://www.flydenver.com/" },
    transitSource: { label: "RTD airport rail", url: "https://www.rtd-denver.com/services/rail/a-line" },
    parkingSource: { label: "Denver Airport parking", url: "https://www.flydenver.com/parking-and-transportation/parking-lots/" },
  },
  {
    slug: "las-vegas-las",
    code: "LAS",
    name: "Harry Reid International Airport",
    shortName: "Las Vegas Airport",
    city: "Las Vegas, Nevada",
    terminalNames: ["Terminal 1", "Terminal 3", "A Gates", "B Gates", "C Gates", "D Gates", "E Gates"],
    roadAccess: "Paradise Road, Tropicana Avenue, I-15, resort-corridor traffic and event surges",
    roadFact: "LAS trips can swing with Strip traffic, convention timing, Allegiant Stadium events, I-15 and the Paradise Road or Tropicana Avenue airport approaches.",
    terminalFact: "LAS uses Terminal 1 and Terminal 3, with gate areas that can require tram or walkway movement after security.",
    transferFact: "Picking the wrong terminal can add a shuttle or roadway correction, so verify the airline and gate area before leaving.",
    transitFact: "RTC buses and hotel shuttles can work for some trips, but resort pickup points and traffic around the Strip need extra cushion.",
    parkingFact: "Short-term, long-term, economy and rental-car plans each add different walking, tram or shuttle time.",
    exampleOrigin: "The Strip",
    exampleFarOrigin: "Summerlin",
    transitOrigin: "South Strip Transit Terminal",
    officialSource: { label: "Las Vegas Airport official guide", url: "https://www.harryreidairport.com/" },
    transitSource: { label: "RTC airport transit", url: "https://www.rtcsnv.com/ways-to-travel/transit-services/airport-transit-routes/" },
    parkingSource: { label: "Las Vegas Airport parking", url: "https://www.harryreidairport.com/Parking" },
  },
  {
    slug: "orlando-mco",
    code: "MCO",
    name: "Orlando International Airport",
    shortName: "Orlando Airport",
    city: "Orlando, Florida",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C"],
    roadAccess: "SR 528, SR 417, theme-park corridor traffic, terminal garages and rental-car returns",
    roadFact: "MCO trips often depend on SR 528, SR 417, I-4 and theme-park corridor traffic, especially for morning departures after resort checkout.",
    terminalFact: "MCO uses Terminals A, B and C, and Terminal C can require a different roadway and walking plan than the older terminal complex.",
    transferFact: "Rental cars, resort shuttles and parking garages add time before check-in, particularly for families traveling with bags.",
    transitFact: "LYNX buses, Brightline and hotel shuttles can all be part of the trip, but schedules and pickup points need to be counted before the airport arrival target.",
    parkingFact: "Garage, economy and valet-style options can put travelers at different distances from check-in.",
    exampleOrigin: "Lake Nona",
    exampleFarOrigin: "Walt Disney World Resort area",
    transitOrigin: "Orlando Brightline Station",
    officialSource: { label: "Orlando Airport official guide", url: "https://orlandoairports.net/" },
    transitSource: { label: "Orlando Airport ground transportation", url: "https://orlandoairports.net/getting-around-mco/ground-transportation/" },
    parkingSource: { label: "Orlando Airport parking", url: "https://orlandoairports.net/parking-transportation/parking/" },
  },
  {
    slug: "miami-mia",
    code: "MIA",
    name: "Miami International Airport",
    shortName: "Miami Airport",
    city: "Miami, Florida",
    terminalNames: ["North Terminal", "Central Terminal", "South Terminal"],
    roadAccess: "Dolphin Expressway, Airport Expressway, LeJeune Road, cruise traffic and garage access",
    roadFact: "MIA trips can change with Dolphin Expressway, Airport Expressway, LeJeune Road and Miami cruise or event traffic.",
    terminalFact: "MIA uses North, Central and South terminal areas with long concourses, so airline location and walking distance matter.",
    transferFact: "The airport can involve long walks, Skytrain movement and baggage or document checks before security for international trips.",
    transitFact: "Metrorail, Tri-Rail and Metrobus connect through Miami Intermodal Center, which adds a station-to-airport movement step.",
    parkingFact: "Garage parking, valet, rental-car return and hotel shuttles each change the final airport-access allowance.",
    exampleOrigin: "Brickell",
    exampleFarOrigin: "Miami Beach",
    transitOrigin: "Miami Intermodal Center",
    officialSource: { label: "Miami Airport official guide", url: "https://www.miami-airport.com/" },
    transitSource: { label: "Miami Airport public transportation", url: "https://www.miami-airport.com/public-transportation.asp" },
    parkingSource: { label: "Miami Airport parking", url: "https://www.miami-airport.com/airport-parking.asp" },
  },
  {
    slug: "charlotte-clt",
    code: "CLT",
    name: "Charlotte Douglas International Airport",
    shortName: "Charlotte Airport",
    city: "Charlotte, North Carolina",
    terminalNames: ["Main Terminal", "Concourse A", "Concourse B", "Concourse C", "Concourse D", "Concourse E"],
    roadAccess: "I-85, I-485, Billy Graham Parkway, Wilkinson Boulevard and terminal-road traffic",
    roadFact: "CLT trips can be affected by I-85, I-485, Billy Graham Parkway, Wilkinson Boulevard and heavy peak-hour airport road demand.",
    terminalFact: "CLT has one main terminal with multiple concourses, and walking distance to the gate can matter after security.",
    transferFact: "Because CLT is a major connecting hub, busy departure banks can make curb, bag-drop and security timing feel tighter.",
    transitFact: "CATS bus service and rideshare are common options, but bus headways and curb location need their own allowance.",
    parkingFact: "Hourly, daily, long-term and business valet parking options vary in distance and shuttle needs.",
    exampleOrigin: "Uptown Charlotte",
    exampleFarOrigin: "Concord",
    transitOrigin: "Charlotte Transportation Center",
    officialSource: { label: "Charlotte Airport official guide", url: "https://www.cltairport.com/" },
    transitSource: { label: "Charlotte Airport ground transportation", url: "https://www.cltairport.com/to-and-from/ground-transportation/" },
    parkingSource: { label: "Charlotte Airport parking", url: "https://www.cltairport.com/parking/" },
  },
  {
    slug: "seattle-sea",
    code: "SEA",
    name: "Seattle-Tacoma International Airport",
    shortName: "Sea-Tac Airport",
    city: "Seattle, Washington",
    terminalNames: ["Main Terminal", "A Gates", "B Gates", "C Gates", "D Gates", "N Gates", "S Gates"],
    roadAccess: "I-5, SR 518, International Boulevard, airport garage traffic and rainy-weather delays",
    roadFact: "SEA trips can change with I-5, SR 518, International Boulevard, weather, stadium traffic and backups into the airport drives.",
    terminalFact: "SEA uses one main terminal with multiple gate areas and satellite trains for N and S gates.",
    transferFact: "Security checkpoint choice, satellite train time and walking distance can change how early you need to reach the terminal.",
    transitFact: "Link light rail serves the airport, but the station walk to the terminal and train headways need to be included.",
    parkingFact: "The large airport garage is convenient but can still add elevator, skybridge and walking time before check-in.",
    exampleOrigin: "Downtown Seattle",
    exampleFarOrigin: "Bellevue",
    transitOrigin: "Westlake Station",
    officialSource: { label: "Sea-Tac official airport guide", url: "https://www.portseattle.org/sea-tac" },
    transitSource: { label: "Sound Transit airport light rail", url: "https://www.soundtransit.org/ride-with-us/stops-stations/seatac-airport-station" },
    parkingSource: { label: "Sea-Tac parking", url: "https://www.portseattle.org/sea-tac/parking" },
  },
  {
    slug: "phoenix-phx",
    code: "PHX",
    name: "Phoenix Sky Harbor International Airport",
    shortName: "Phoenix Sky Harbor",
    city: "Phoenix, Arizona",
    terminalNames: ["Terminal 3", "Terminal 4"],
    roadAccess: "I-10, Loop 202, SR 143, East Economy access and desert-event traffic",
    roadFact: "PHX trips can depend on I-10, Loop 202, SR 143, downtown events and which side of the airport you enter from.",
    terminalFact: "PHX uses Terminals 3 and 4, with airline location determining your curb, parking and walking plan.",
    transferFact: "The PHX Sky Train connects airport facilities, but parking and rental-car transfers still add a separate leg.",
    transitFact: "Valley Metro Rail connects through the 44th Street station and PHX Sky Train, so rail travelers need both legs in the plan.",
    parkingFact: "Terminal garages, East Economy and off-site parking can produce very different transfer times.",
    exampleOrigin: "Downtown Phoenix",
    exampleFarOrigin: "Scottsdale",
    transitOrigin: "44th Street Station",
    officialSource: { label: "Phoenix Sky Harbor official guide", url: "https://www.skyharbor.com/" },
    transitSource: { label: "Phoenix Sky Train", url: "https://www.skyharbor.com/ground-transportation/phx-sky-train/" },
    parkingSource: { label: "Phoenix Sky Harbor parking", url: "https://www.skyharbor.com/parking/" },
  },
  {
    slug: "san-francisco-sfo",
    code: "SFO",
    name: "San Francisco International Airport",
    shortName: "San Francisco Airport",
    city: "San Francisco, California",
    terminalNames: ["Terminal 1", "Terminal 2", "Terminal 3", "International Terminal"],
    roadAccess: "US 101, I-280, Bay Bridge approaches, airport garage access and rideshare curb rules",
    roadFact: "SFO trips can change with US 101, I-280, bridge traffic, peninsula commute patterns and airport curb congestion.",
    terminalFact: "SFO uses Terminals 1, 2, 3 and the International Terminal, with different curb and garage choices by airline.",
    transferFact: "AirTrain can help connect terminals, parking and rental cars, but the transfer should be counted before your check-in target.",
    transitFact: "BART serves the airport directly, but station access, train headways and walking to check-in still need a cushion.",
    parkingFact: "Domestic garage, international garage, long-term parking and rental-car return produce different final-transfer times.",
    exampleOrigin: "SoMa",
    exampleFarOrigin: "Oakland",
    transitOrigin: "Powell Street Station",
    officialSource: { label: "SFO official airport guide", url: "https://www.flysfo.com/" },
    transitSource: { label: "BART airport service", url: "https://www.bart.gov/guide/airport/sfo" },
    parkingSource: { label: "SFO parking", url: "https://www.flysfo.com/passengers/parking" },
  },
  {
    slug: "houston-iah",
    code: "IAH",
    name: "George Bush Intercontinental Airport",
    shortName: "Houston Intercontinental",
    city: "Houston, Texas",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C", "Terminal D", "Terminal E"],
    roadAccess: "I-45, Hardy Toll Road, Sam Houston Tollway, airport entrance roads and terminal construction patterns",
    roadFact: "IAH trips can vary by I-45, Hardy Toll Road, Sam Houston Tollway, airport entrance roads and active airport roadway projects.",
    terminalFact: "IAH has Terminals A, B, C, D and E, with airline and international operations affecting the right drop-off point.",
    transferFact: "Terminal transfers, construction detours and parking shuttles can add time after you reach the airport campus.",
    transitFact: "METRO bus service and rideshare are options, but schedule frequency and pickup areas should be included in the plan.",
    parkingFact: "Terminal garages, ecopark facilities and rental-car shuttles create different last-mile allowances.",
    exampleOrigin: "Downtown Houston",
    exampleFarOrigin: "The Woodlands",
    transitOrigin: "Downtown Transit Center",
    officialSource: { label: "Houston Intercontinental official guide", url: "https://www.fly2houston.com/iah" },
    transitSource: { label: "Houston airport transportation", url: "https://www.fly2houston.com/iah/ground-transportation" },
    parkingSource: { label: "Houston airport parking", url: "https://www.fly2houston.com/parking" },
  },
  {
    slug: "boston-bos",
    code: "BOS",
    name: "Boston Logan International Airport",
    shortName: "Boston Logan",
    city: "Boston, Massachusetts",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C", "Terminal E"],
    roadAccess: "I-90, the Ted Williams Tunnel, Sumner Tunnel patterns, harbor crossings and terminal curb congestion",
    roadFact: "BOS trips can change with tunnel traffic, I-90, harbor crossing work, downtown events and backups near terminal curbs.",
    terminalFact: "Boston Logan uses Terminals A, B, C and E, with Terminal E serving many international departures.",
    transferFact: "Terminal shuttles, central parking and rideshare locations can add time even after a short downtown drive.",
    transitFact: "MBTA Blue Line, Silver Line and water transportation can work well, but each requires station, shuttle or dock movement.",
    parkingFact: "Central parking, economy parking and terminal garages have different walking or shuttle requirements.",
    exampleOrigin: "Back Bay",
    exampleFarOrigin: "Cambridge",
    transitOrigin: "South Station",
    officialSource: { label: "Boston Logan official guide", url: "https://www.massport.com/logan-airport" },
    transitSource: { label: "Massport public transportation", url: "https://www.massport.com/logan-airport/getting-to-logan/public-transportation" },
    parkingSource: { label: "Boston Logan parking", url: "https://www.massport.com/logan-airport/getting-to-logan/parking" },
  },
  {
    slug: "fort-lauderdale-fll",
    code: "FLL",
    name: "Fort Lauderdale-Hollywood International Airport",
    shortName: "Fort Lauderdale Airport",
    city: "Fort Lauderdale, Florida",
    terminalNames: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4"],
    roadAccess: "I-595, US 1, I-95, Port Everglades cruise traffic and terminal garage circulation",
    roadFact: "FLL trips can be shaped by I-595, US 1, I-95, beach traffic and Port Everglades cruise-day demand.",
    terminalFact: "FLL uses Terminals 1, 2, 3 and 4, and the correct terminal affects parking, curbside drop-off and walking distance.",
    transferFact: "Garage access, rental-car return and terminal shuttle movement can add a separate final leg.",
    transitFact: "Tri-Rail, Broward County Transit and rideshare can work, but station shuttles and pickup points need to be included.",
    parkingFact: "Hourly, daily, economy and off-site parking options vary in distance and shuttle time.",
    exampleOrigin: "Downtown Fort Lauderdale",
    exampleFarOrigin: "Boca Raton",
    transitOrigin: "Fort Lauderdale Airport Tri-Rail Station",
    officialSource: { label: "Fort Lauderdale Airport official guide", url: "https://www.broward.org/Airport/" },
    transitSource: { label: "FLL transportation", url: "https://www.broward.org/Airport/passengers/Transportation/Pages/Default.aspx" },
    parkingSource: { label: "FLL parking", url: "https://www.broward.org/Airport/passengers/Parking/Pages/Default.aspx" },
  },
  {
    slug: "minneapolis-msp",
    code: "MSP",
    name: "Minneapolis-Saint Paul International Airport",
    shortName: "Minneapolis-Saint Paul Airport",
    city: "Minneapolis-Saint Paul, Minnesota",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "I-494, Highway 5, Cedar Avenue, winter weather and Terminal 1 or Terminal 2 routing",
    roadFact: "MSP trips can change with I-494, Highway 5, Cedar Avenue, snow conditions and whether you need Terminal 1 or Terminal 2.",
    terminalFact: "MSP has two main terminals, and airlines are split between Terminal 1 and Terminal 2.",
    transferFact: "A wrong-terminal arrival can require light rail or roadway correction, so confirm terminal before leaving.",
    transitFact: "Metro Transit light rail connects both terminals, but headways, station access and walking time belong in the estimate.",
    parkingFact: "Terminal parking, value parking, quick ride ramp and off-site options each change the transfer allowance.",
    exampleOrigin: "Downtown Minneapolis",
    exampleFarOrigin: "Saint Paul",
    transitOrigin: "Nicollet Mall Station",
    officialSource: { label: "MSP official airport guide", url: "https://www.mspairport.com/" },
    transitSource: { label: "Metro Transit airport light rail", url: "https://www.metrotransit.org/airport" },
    parkingSource: { label: "MSP parking", url: "https://www.mspairport.com/parking" },
  },
  {
    slug: "laguardia-lga",
    code: "LGA",
    name: "LaGuardia Airport",
    shortName: "LaGuardia Airport",
    city: "Queens, New York",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C"],
    roadAccess: "Grand Central Parkway, BQE, RFK Bridge approaches, Queens surface streets and terminal curbs",
    roadFact: "LGA trips can change quickly with Grand Central Parkway, BQE, RFK Bridge approaches and Queens surface-street traffic.",
    terminalFact: "LGA uses Terminal A, Terminal B and Terminal C, with different curb and garage choices.",
    transferFact: "The rebuilt terminal areas can still create curb, parking and walking time that should be counted after the drive.",
    transitFact: "MTA bus connections to subway or rail are common, but transfers and headways need a cushion.",
    parkingFact: "Terminal parking and rideshare pickup or drop-off rules can affect the final airport-access leg.",
    exampleOrigin: "Midtown Manhattan",
    exampleFarOrigin: "Brooklyn",
    transitOrigin: "Jackson Heights-Roosevelt Avenue",
    officialSource: { label: "LaGuardia official airport guide", url: "https://www.laguardiaairport.com/" },
    transitSource: { label: "MTA LaGuardia transit guide", url: "https://new.mta.info/guides/airports/laguardia" },
    parkingSource: { label: "LaGuardia parking", url: "https://www.laguardiaairport.com/to-from-airport/parking" },
  },
  {
    slug: "detroit-dtw",
    code: "DTW",
    name: "Detroit Metropolitan Wayne County Airport",
    shortName: "Detroit Metro Airport",
    city: "Detroit, Michigan",
    terminalNames: ["McNamara Terminal", "Evans Terminal"],
    roadAccess: "I-94, I-275, Eureka Road, Merriman Road and terminal-specific airport roads",
    roadFact: "DTW trips can vary with I-94, I-275, Eureka Road, Merriman Road and construction around the airport approaches.",
    terminalFact: "DTW uses McNamara Terminal and Evans Terminal, and airlines are split between them.",
    transferFact: "A wrong terminal can add a roadway correction, so terminal confirmation matters before departure.",
    transitFact: "SMART and rideshare options exist, but limited transit frequency means schedule timing is important.",
    parkingFact: "Terminal garages, green lots, valet and off-site shuttles all have different timing profiles.",
    exampleOrigin: "Downtown Detroit",
    exampleFarOrigin: "Ann Arbor",
    transitOrigin: "Rosa Parks Transit Center",
    officialSource: { label: "Detroit Metro official guide", url: "https://www.metroairport.com/" },
    transitSource: { label: "Detroit Metro ground transportation", url: "https://www.metroairport.com/to-from-dtw/ground-transportation" },
    parkingSource: { label: "Detroit Metro parking", url: "https://www.metroairport.com/to-from-dtw/parking" },
  },
  {
    slug: "philadelphia-phl",
    code: "PHL",
    name: "Philadelphia International Airport",
    shortName: "Philadelphia Airport",
    city: "Philadelphia, Pennsylvania",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C", "Terminal D", "Terminal E", "Terminal F"],
    roadAccess: "I-95, I-76, airport-area ramps, sports-complex traffic and garage access",
    roadFact: "PHL trips can change with I-95, I-76, bridge traffic, stadium events and the airport approach from South Philadelphia.",
    terminalFact: "PHL uses Terminals A through F, and the right terminal affects curbside drop-off, parking and walking distance.",
    transferFact: "Walking between some terminal areas is possible, but a wrong check-in location still costs margin.",
    transitFact: "SEPTA Airport Line trains serve the airport, but station access and train frequency need to be part of the estimate.",
    parkingFact: "Garages, economy parking and off-site shuttles create different final-transfer times before check-in.",
    exampleOrigin: "Center City Philadelphia",
    exampleFarOrigin: "King of Prussia",
    transitOrigin: "Suburban Station",
    officialSource: { label: "Philadelphia Airport official guide", url: "https://www.phl.org/" },
    transitSource: { label: "SEPTA Airport Line", url: "https://www.septa.org/schedules/AIR" },
    parkingSource: { label: "Philadelphia Airport parking", url: "https://www.phl.org/parking" },
  },
  {
    slug: "salt-lake-city-slc",
    code: "SLC",
    name: "Salt Lake City International Airport",
    shortName: "Salt Lake City Airport",
    city: "Salt Lake City, Utah",
    terminalNames: ["Terminal", "Concourse A", "Concourse B"],
    roadAccess: "I-80, Bangerter Highway, North Temple, winter weather and long concourse walks",
    roadFact: "SLC trips can vary with I-80, Bangerter Highway, North Temple, canyon-weather spillover and winter road conditions.",
    terminalFact: "SLC uses one terminal with Concourses A and B, and walking distances can be meaningful for some gates.",
    transferFact: "The newer airport layout can involve longer walks than travelers expect, especially with bags or tight boarding times.",
    transitFact: "UTA TRAX Green Line serves the airport, but train headways and station access must be counted.",
    parkingFact: "Garage, economy and off-site parking each create different walking or shuttle needs.",
    exampleOrigin: "Downtown Salt Lake City",
    exampleFarOrigin: "Park City",
    transitOrigin: "Arena Station",
    officialSource: { label: "Salt Lake City Airport official guide", url: "https://slcairport.com/" },
    transitSource: { label: "UTA airport TRAX service", url: "https://www.rideuta.com/Rider-Tools/Schedules-and-Maps/704-Green-Line" },
    parkingSource: { label: "Salt Lake City Airport parking", url: "https://slcairport.com/parking-and-transportation/parking/" },
  },
  {
    slug: "baltimore-bwi",
    code: "BWI",
    name: "Baltimore/Washington International Thurgood Marshall Airport",
    shortName: "BWI Airport",
    city: "Baltimore, Maryland",
    terminalNames: ["Main Terminal", "Concourses A, B, C, D and E"],
    roadAccess: "I-95, I-195, Baltimore-Washington Parkway, airport loop roads and rail-station shuttles",
    roadFact: "BWI trips can change with I-95, I-195, the Baltimore-Washington Parkway, DC-area traffic and airport loop congestion.",
    terminalFact: "BWI uses one main terminal with multiple concourses, so airline check-in and gate location shape the inside-airport plan.",
    transferFact: "Rail station shuttles, parking shuttles and rental-car shuttles can add time before you reach check-in.",
    transitFact: "MARC, Amtrak, Light Rail and bus options can work, but station shuttles and headways need to be counted.",
    parkingFact: "Hourly garage, daily garage, express and long-term lots each have different shuttle or walk requirements.",
    exampleOrigin: "Downtown Baltimore",
    exampleFarOrigin: "Silver Spring",
    transitOrigin: "BWI Rail Station",
    officialSource: { label: "BWI official airport guide", url: "https://www.bwiairport.com/" },
    transitSource: { label: "BWI transportation", url: "https://www.bwiairport.com/to-from-bwi/transportation/" },
    parkingSource: { label: "BWI parking", url: "https://www.bwiairport.com/to-from-bwi/parking/" },
  },
  {
    slug: "reagan-national-dca",
    code: "DCA",
    name: "Ronald Reagan Washington National Airport",
    shortName: "Reagan National Airport",
    city: "Arlington, Virginia",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "George Washington Parkway, I-395, Route 1, Potomac crossings and terminal garage access",
    roadFact: "DCA trips can be short but volatile because George Washington Parkway, I-395, Route 1 and Potomac River crossings can change quickly.",
    terminalFact: "DCA uses Terminal 1 and Terminal 2, with airline location affecting curbside and garage choices.",
    transferFact: "The airport is compact, but curb congestion, security and garage movement can still erase a small buffer.",
    transitFact: "Metrorail serves the airport directly on the Blue and Yellow lines, but station access and service changes still matter.",
    parkingFact: "Terminal garages and economy parking have different walk or shuttle needs before check-in.",
    exampleOrigin: "Downtown Washington",
    exampleFarOrigin: "Bethesda",
    transitOrigin: "L'Enfant Plaza Station",
    officialSource: { label: "Reagan National official guide", url: "https://www.flyreagan.com/" },
    transitSource: { label: "WMATA Reagan National station", url: "https://www.wmata.com/rider-guide/stations/ronald-reagan-washington-national-airport.cfm" },
    parkingSource: { label: "Reagan National parking", url: "https://www.flyreagan.com/parking-transportation/parking-information" },
  },
  {
    slug: "san-diego-san",
    code: "SAN",
    name: "San Diego International Airport",
    shortName: "San Diego Airport",
    city: "San Diego, California",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "I-5, Harbor Drive, downtown traffic, cruise traffic and terminal construction patterns",
    roadFact: "SAN is close to downtown, but I-5, Harbor Drive, waterfront events and terminal-area construction can change the final approach.",
    terminalFact: "SAN uses Terminals 1 and 2, and terminal construction can affect curb access and walking patterns.",
    transferFact: "A short drive can still require buffer for parking, curb queues, bag drop and temporary construction routing.",
    transitFact: "MTS bus and trolley connections can work through downtown, but transfer and shuttle time need to be included.",
    parkingFact: "Terminal lots, off-airport parking and rental-car shuttles create different final legs.",
    exampleOrigin: "Downtown San Diego",
    exampleFarOrigin: "La Jolla",
    transitOrigin: "Santa Fe Depot",
    officialSource: { label: "San Diego Airport official guide", url: "https://www.san.org/" },
    transitSource: { label: "San Diego Airport transportation", url: "https://www.san.org/to-from/transportation" },
    parkingSource: { label: "San Diego Airport parking", url: "https://www.san.org/to-from/parking" },
  },
  {
    slug: "dulles-iad",
    code: "IAD",
    name: "Washington Dulles International Airport",
    shortName: "Dulles Airport",
    city: "Dulles, Virginia",
    terminalNames: ["Main Terminal", "Concourses A, B, C and D"],
    roadAccess: "Dulles Access Road, Dulles Toll Road, I-495, Route 28 and long airport approaches",
    roadFact: "IAD trips can involve long regional drives on the Dulles Access Road, Dulles Toll Road, Route 28, I-495 and suburban arterials.",
    terminalFact: "IAD uses a main terminal with concourses beyond security, so the terminal arrival target has to include check-in and concourse movement.",
    transferFact: "AeroTrain, mobile lounges and walking routes can affect the gate-to-security plan depending on airline and concourse.",
    transitFact: "Metrorail Silver Line serves the airport, but trip length, headways and station access need a meaningful cushion.",
    parkingFact: "Terminal, garage, economy and valet options vary in walking or shuttle time.",
    exampleOrigin: "Tysons",
    exampleFarOrigin: "Downtown Washington",
    transitOrigin: "Metro Center Station",
    officialSource: { label: "Dulles official airport guide", url: "https://www.flydulles.com/" },
    transitSource: { label: "WMATA Dulles station", url: "https://www.wmata.com/rider-guide/stations/washington-dulles-international-airport.cfm" },
    parkingSource: { label: "Dulles parking", url: "https://www.flydulles.com/parking-transportation/parking-information" },
  },
  {
    slug: "tampa-tpa",
    code: "TPA",
    name: "Tampa International Airport",
    shortName: "Tampa Airport",
    city: "Tampa, Florida",
    terminalNames: ["Main Terminal", "Airside A", "Airside C", "Airside E", "Airside F"],
    roadAccess: "Veterans Expressway, I-275, airport parkways, bridge traffic and rental-car center transfers",
    roadFact: "TPA trips can change with I-275, Veterans Expressway, Courtney Campbell Causeway traffic and airport parkway backups.",
    terminalFact: "TPA uses a main terminal with airsides connected by automated people movers.",
    transferFact: "The airside train is efficient, but rental-car center movement, bag drop and security still need a buffer.",
    transitFact: "HART bus service, rideshare and hotel shuttles can work, but pickup points and schedule timing matter.",
    parkingFact: "Short-term, long-term, economy and rental-car plans add different walk, train or shuttle legs.",
    exampleOrigin: "Downtown Tampa",
    exampleFarOrigin: "St. Petersburg",
    transitOrigin: "Marion Transit Center",
    officialSource: { label: "Tampa Airport official guide", url: "https://www.tampaairport.com/" },
    transitSource: { label: "Tampa Airport ground transportation", url: "https://www.tampaairport.com/ground-transportation" },
    parkingSource: { label: "Tampa Airport parking", url: "https://www.tampaairport.com/parking" },
  },
  {
    slug: "chicago-midway-mdw",
    code: "MDW",
    name: "Chicago Midway International Airport",
    shortName: "Chicago Midway",
    city: "Chicago, Illinois",
    terminalNames: ["Main Terminal", "Concourses A, B and C"],
    roadAccess: "I-55, Cicero Avenue, Southwest Side traffic, winter weather and economy parking shuttles",
    roadFact: "MDW trips often depend on I-55, Cicero Avenue, Southwest Side surface streets, weather and airport-road congestion.",
    terminalFact: "MDW uses one terminal complex with Concourses A, B and C, making check-in simpler but still dependent on security and walking time.",
    transferFact: "Surface-street delays near the airport can be the hidden bottleneck even when highway travel looks fine.",
    transitFact: "CTA Orange Line serves Midway, but station access, headways and the airport walk have to be included.",
    parkingFact: "Terminal garage, daily lot, economy garage and economy lot options have different walk or shuttle requirements.",
    exampleOrigin: "Chicago Loop",
    exampleFarOrigin: "Oak Brook",
    transitOrigin: "State/Lake Station",
    officialSource: { label: "Midway official airport guide", url: "https://www.flychicago.com/midway/home/pages/default.aspx" },
    transitSource: { label: "CTA Orange Line", url: "https://www.transitchicago.com/orangeline/" },
    parkingSource: { label: "Midway parking", url: "https://www.flychicago.com/midway/tofrom/parking/pages/default.aspx" },
  },
  {
    slug: "honolulu-hnl",
    code: "HNL",
    name: "Daniel K. Inouye International Airport",
    shortName: "Honolulu Airport",
    city: "Honolulu, Hawaii",
    terminalNames: ["Terminal 1", "Terminal 2", "Terminal 3"],
    roadAccess: "H-1, Nimitz Highway, Waikiki traffic, interisland peaks and rental-car center transfers",
    roadFact: "HNL trips can shift with H-1, Nimitz Highway, Waikiki traffic, harbor activity and visitor travel peaks.",
    terminalFact: "HNL uses Terminals 1, 2 and 3, with interisland and mainland or international trips often following different patterns.",
    transferFact: "Agriculture inspection, checked bags and interisland departure banks can add time before security.",
    transitFact: "TheBus and hotel shuttles can be useful, but pickup points, bags and Oahu traffic need a cushion.",
    parkingFact: "Terminal parking, rental-car center movement and hotel shuttle transfers all affect the leave-time calculation.",
    exampleOrigin: "Waikiki",
    exampleFarOrigin: "Kapolei",
    transitOrigin: "Ala Moana Center",
    officialSource: { label: "Honolulu Airport official guide", url: "https://airports.hawaii.gov/hnl/" },
    transitSource: { label: "Honolulu Airport transportation", url: "https://airports.hawaii.gov/hnl/getting-to-from/ground-transportation/" },
    parkingSource: { label: "Honolulu Airport parking", url: "https://airports.hawaii.gov/hnl/getting-to-from/parking/" },
  },
  {
    slug: "nashville-bna",
    code: "BNA",
    name: "Nashville International Airport",
    shortName: "Nashville Airport",
    city: "Nashville, Tennessee",
    terminalNames: ["Terminal Garage access", "Concourses A, B, C and D"],
    roadAccess: "I-40, Donelson Pike, downtown event traffic, terminal construction and garage access",
    roadFact: "BNA trips can change with I-40, Donelson Pike, downtown event traffic and airport construction or curb changes.",
    terminalFact: "BNA uses a central terminal with multiple concourses, and expansion work can affect walking and curb patterns.",
    transferFact: "Rideshare, parking garages and rental-car return can require different routing before check-in.",
    transitFact: "WeGo bus service and hotel shuttles are options, but schedule and pickup-point timing should be included.",
    parkingFact: "Terminal garages, economy lots, valet and off-site parking create different final-transfer times.",
    exampleOrigin: "Downtown Nashville",
    exampleFarOrigin: "Franklin",
    transitOrigin: "Music City Central",
    officialSource: { label: "Nashville Airport official guide", url: "https://flynashville.com/" },
    transitSource: { label: "Nashville Airport ground transportation", url: "https://flynashville.com/ground-transportation" },
    parkingSource: { label: "Nashville Airport parking", url: "https://flynashville.com/park-at-bna" },
  },
  {
    slug: "austin-aus",
    code: "AUS",
    name: "Austin-Bergstrom International Airport",
    shortName: "Austin Airport",
    city: "Austin, Texas",
    terminalNames: ["Barbara Jordan Terminal", "South Terminal"],
    roadAccess: "SH 71, US 183, I-35 spillover, event traffic and terminal-specific routing",
    roadFact: "AUS trips can change with SH 71, US 183, I-35 spillover, festival traffic and airport construction.",
    terminalFact: "AUS has the Barbara Jordan Terminal and a separate South Terminal plan, so terminal confirmation is important.",
    transferFact: "A wrong terminal can require a roadway or shuttle correction that consumes your planned margin.",
    transitFact: "CapMetro bus service, rideshare and shuttles can work, but frequency and pickup location should be counted.",
    parkingFact: "Garage, economy, valet and off-site parking options each add different walk or shuttle time.",
    exampleOrigin: "Downtown Austin",
    exampleFarOrigin: "Round Rock",
    transitOrigin: "Republic Square",
    officialSource: { label: "Austin Airport official guide", url: "https://www.austintexas.gov/airport" },
    transitSource: { label: "Austin Airport transportation", url: "https://www.austintexas.gov/page/ground-transportation" },
    parkingSource: { label: "Austin Airport parking", url: "https://www.abiaparking.com/" },
  },
  {
    slug: "dallas-love-field-dal",
    code: "DAL",
    name: "Dallas Love Field",
    shortName: "Dallas Love Field",
    city: "Dallas, Texas",
    terminalNames: ["Main Terminal"],
    roadAccess: "Dallas North Tollway, Mockingbird Lane, Lemmon Avenue, downtown traffic and garage access",
    roadFact: "DAL trips can be short but sensitive to Dallas North Tollway, Mockingbird Lane, Lemmon Avenue and local event traffic.",
    terminalFact: "DAL has one main terminal, so the main timing issues are curb access, parking, bag drop and security.",
    transferFact: "Garage selection and rideshare pickup or drop-off can still add time after reaching airport property.",
    transitFact: "DART bus links and rideshare can work, but bus frequency and station access need to be included.",
    parkingFact: "Garage A, Garage B, Garage C, valet and off-site parking create different walking paths.",
    exampleOrigin: "Uptown Dallas",
    exampleFarOrigin: "Plano",
    transitOrigin: "Inwood/Love Field Station",
    officialSource: { label: "Dallas Love Field official guide", url: "https://www.dallas-lovefield.com/" },
    transitSource: { label: "Dallas Love Field ground transportation", url: "https://www.dallas-lovefield.com/passenger-services/ground-transportation" },
    parkingSource: { label: "Dallas Love Field parking", url: "https://www.dallas-lovefield.com/parking-and-transportation/parking" },
  },
  {
    slug: "st-louis-stl",
    code: "STL",
    name: "St. Louis Lambert International Airport",
    shortName: "St. Louis Airport",
    city: "St. Louis, Missouri",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "I-70, I-170, Lindbergh Boulevard, terminal-specific exits and parking shuttles",
    roadFact: "STL trips often use I-70, I-170 and Lindbergh Boulevard, with terminal-specific exits affecting the final approach.",
    terminalFact: "STL uses Terminal 1 and Terminal 2, and airlines are split between them.",
    transferFact: "A wrong-terminal arrival can require roadway correction or shuttle time before check-in.",
    transitFact: "MetroLink serves both airport terminals, but station access, headways and walking time still belong in the estimate.",
    parkingFact: "Terminal, long-term and off-site parking options can add shuttle time before security.",
    exampleOrigin: "Downtown St. Louis",
    exampleFarOrigin: "St. Charles",
    transitOrigin: "Civic Center Station",
    officialSource: { label: "St. Louis Airport official guide", url: "https://www.flystl.com/" },
    transitSource: { label: "MetroLink airport service", url: "https://www.metrostlouis.org/metrolink-station/lambert-airport-terminal-1/" },
    parkingSource: { label: "St. Louis Airport parking", url: "https://www.flystl.com/parking-and-transport" },
  },
  {
    slug: "raleigh-durham-rdu",
    code: "RDU",
    name: "Raleigh-Durham International Airport",
    shortName: "Raleigh-Durham Airport",
    city: "Raleigh-Durham, North Carolina",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "I-40, I-540, Aviation Parkway, Research Triangle commute traffic and parking access",
    roadFact: "RDU trips can shift with I-40, I-540, Aviation Parkway and Research Triangle commute traffic.",
    terminalFact: "RDU uses Terminal 1 and Terminal 2, with airline location determining the curb and garage plan.",
    transferFact: "The airport is manageable, but wrong-terminal corrections, parking and bag drop still need time.",
    transitFact: "GoTriangle and rideshare options can work, but schedule frequency and stop access matter.",
    parkingFact: "Central, Premier, Express and Economy parking options have different walk or shuttle requirements.",
    exampleOrigin: "Downtown Raleigh",
    exampleFarOrigin: "Durham",
    transitOrigin: "GoTriangle Regional Transit Center",
    officialSource: { label: "RDU official airport guide", url: "https://www.rdu.com/" },
    transitSource: { label: "RDU ground transportation", url: "https://www.rdu.com/ground-transportation/" },
    parkingSource: { label: "RDU parking", url: "https://www.rdu.com/parking/" },
  },
  {
    slug: "houston-hobby-hou",
    code: "HOU",
    name: "William P. Hobby Airport",
    shortName: "Houston Hobby",
    city: "Houston, Texas",
    terminalNames: ["Main Terminal"],
    roadAccess: "I-45, Airport Boulevard, Gulf Freeway traffic, terminal garage access and rental-car shuttles",
    roadFact: "HOU trips often depend on I-45, Airport Boulevard, Gulf Freeway conditions and southeast Houston surface traffic.",
    terminalFact: "HOU has one main terminal, so the key airport timing issues are curb access, parking, security and international processing when relevant.",
    transferFact: "Garage choice, economy parking and rental-car shuttles can add time after the road trip.",
    transitFact: "METRO bus service and rideshare are options, but schedule and pickup-area timing need to be counted.",
    parkingFact: "Terminal parking, ecopark and rental-car transfers create different final legs.",
    exampleOrigin: "Downtown Houston",
    exampleFarOrigin: "Pearland",
    transitOrigin: "Downtown Transit Center",
    officialSource: { label: "Houston Hobby official guide", url: "https://www.fly2houston.com/hou" },
    transitSource: { label: "Houston Hobby ground transportation", url: "https://www.fly2houston.com/hou/ground-transportation" },
    parkingSource: { label: "Houston airport parking", url: "https://www.fly2houston.com/parking" },
  },
  {
    slug: "oakland-oak",
    code: "OAK",
    name: "Oakland San Francisco Bay Airport",
    shortName: "Oakland Airport",
    city: "Oakland, California",
    terminalNames: ["Terminal 1", "Terminal 2"],
    roadAccess: "I-880, Hegenberger Road, Bay Bridge spillover, Coliseum connections and parking lots",
    roadFact: "OAK trips can change with I-880, Hegenberger Road, Bay Bridge spillover and East Bay event traffic.",
    terminalFact: "OAK uses Terminal 1 and Terminal 2, with nearby but separate curb and check-in areas.",
    transferFact: "Airport parking, rental-car movement and wrong-terminal corrections still need time despite the compact layout.",
    transitFact: "BART connects through the Coliseum airport connector, so both the train ride and connector time should be counted.",
    parkingFact: "Premier, hourly, daily and economy parking options vary by walk and shuttle needs.",
    exampleOrigin: "Downtown Oakland",
    exampleFarOrigin: "Walnut Creek",
    transitOrigin: "Coliseum Station",
    officialSource: { label: "Oakland Airport official guide", url: "https://www.oaklandairport.com/" },
    transitSource: { label: "BART Oakland Airport guide", url: "https://www.bart.gov/guide/airport/oak" },
    parkingSource: { label: "Oakland Airport parking", url: "https://www.oaklandairport.com/parking/" },
  },
  {
    slug: "new-orleans-msy",
    code: "MSY",
    name: "Louis Armstrong New Orleans International Airport",
    shortName: "New Orleans Airport",
    city: "New Orleans, Louisiana",
    terminalNames: ["North Terminal", "Concourses A, B and C"],
    roadAccess: "I-10, Loyola Drive, airport interchange traffic, downtown events and parking access",
    roadFact: "MSY trips can shift with I-10, Loyola Drive, downtown convention or festival traffic and airport interchange demand.",
    terminalFact: "MSY uses the North Terminal with multiple concourses, so the correct curb and parking plan matter.",
    transferFact: "Rental-car return, parking shuttles and bag drop can add time after reaching airport property.",
    transitFact: "Jefferson Transit and rideshare can work, but bus frequency and pickup points need a cushion.",
    parkingFact: "Short-term, long-term, economy and surface parking options create different walk or shuttle timelines.",
    exampleOrigin: "French Quarter",
    exampleFarOrigin: "Metairie",
    transitOrigin: "New Orleans Union Passenger Terminal",
    officialSource: { label: "New Orleans Airport official guide", url: "https://flymsy.com/" },
    transitSource: { label: "New Orleans Airport transportation", url: "https://flymsy.com/transportation/" },
    parkingSource: { label: "New Orleans Airport parking", url: "https://flymsy.com/parking/" },
  },
  {
    slug: "sacramento-smf",
    code: "SMF",
    name: "Sacramento International Airport",
    shortName: "Sacramento Airport",
    city: "Sacramento, California",
    terminalNames: ["Terminal A", "Terminal B"],
    roadAccess: "I-5, I-80, airport boulevard approaches, downtown traffic and parking shuttles",
    roadFact: "SMF trips can change with I-5, I-80, downtown Sacramento traffic and the rural final approach to airport parking.",
    terminalFact: "SMF uses Terminal A and Terminal B, and airline location affects garage, curb and shuttle choices.",
    transferFact: "Terminal B has a landside-to-airside train, so airport movement can matter after check-in.",
    transitFact: "Yolobus and rideshare are options, but bus schedule and pickup-point timing must be counted.",
    parkingFact: "Garage, daily, economy and hourly parking options have different walk or shuttle requirements.",
    exampleOrigin: "Downtown Sacramento",
    exampleFarOrigin: "Davis",
    transitOrigin: "Downtown Commons",
    officialSource: { label: "Sacramento Airport official guide", url: "https://sacramento.aero/smf" },
    transitSource: { label: "Sacramento Airport transportation", url: "https://sacramento.aero/smf/to-and-from/transportation" },
    parkingSource: { label: "Sacramento Airport parking", url: "https://sacramento.aero/smf/to-and-from/parking" },
  },
  {
    slug: "san-jose-sjc",
    code: "SJC",
    name: "San Jose Mineta International Airport",
    shortName: "San Jose Airport",
    city: "San Jose, California",
    terminalNames: ["Terminal A", "Terminal B"],
    roadAccess: "US 101, I-880, SR 87, Silicon Valley commute traffic and terminal garage access",
    roadFact: "SJC trips can change with US 101, I-880, SR 87, downtown San Jose traffic and Silicon Valley commute patterns.",
    terminalFact: "SJC uses Terminal A and Terminal B, with airline and parking choice affecting the curb plan.",
    transferFact: "The airport is compact, but parking, rental-car return and security can still consume margin.",
    transitFact: "VTA bus and rail connections can work, but station transfer time and headways should be included.",
    parkingFact: "Hourly, daily and economy lots create different walk or shuttle times.",
    exampleOrigin: "Downtown San Jose",
    exampleFarOrigin: "Palo Alto",
    transitOrigin: "Santa Clara Transit Center",
    officialSource: { label: "San Jose Airport official guide", url: "https://www.flysanjose.com/" },
    transitSource: { label: "San Jose Airport transportation", url: "https://www.flysanjose.com/parking-transportation/ground-transportation" },
    parkingSource: { label: "San Jose Airport parking", url: "https://www.flysanjose.com/parking" },
  },
  {
    slug: "san-antonio-sat",
    code: "SAT",
    name: "San Antonio International Airport",
    shortName: "San Antonio Airport",
    city: "San Antonio, Texas",
    terminalNames: ["Terminal A", "Terminal B"],
    roadAccess: "US 281, Loop 410, Wurzbach Parkway, downtown event traffic and garage access",
    roadFact: "SAT trips can vary with US 281, Loop 410, Wurzbach Parkway, downtown events and north-side commute traffic.",
    terminalFact: "SAT uses Terminal A and Terminal B, with airline location shaping curbside and garage choices.",
    transferFact: "Parking garages, rental-car return and rideshare pickup or drop-off still require a separate airport-access allowance.",
    transitFact: "VIA bus service and rideshare are options, but bus frequency and pickup locations need planning.",
    parkingFact: "Short-term, long-term, economy and green lot parking create different walk or shuttle needs.",
    exampleOrigin: "Downtown San Antonio",
    exampleFarOrigin: "New Braunfels",
    transitOrigin: "Centro Plaza",
    officialSource: { label: "San Antonio Airport official guide", url: "https://flysanantonio.com/" },
    transitSource: { label: "San Antonio Airport transportation", url: "https://flysanantonio.com/home/to-from/ground-transportation/" },
    parkingSource: { label: "San Antonio Airport parking", url: "https://flysanantonio.com/home/to-from/parking/" },
  },
  {
    slug: "portland-pdx",
    code: "PDX",
    name: "Portland International Airport",
    shortName: "Portland Airport",
    city: "Portland, Oregon",
    terminalNames: ["Main Terminal", "Concourses B, C, D and E"],
    roadAccess: "I-205, Airport Way, Columbia River crossings, weather and terminal construction patterns",
    roadFact: "PDX trips can change with I-205, Airport Way, Columbia River crossing traffic, weather and airport construction.",
    terminalFact: "PDX uses one main terminal with concourses, and ongoing airport improvements can affect walking and curb patterns.",
    transferFact: "Parking, rental-car return and temporary routing can add time after the highway segment.",
    transitFact: "MAX Red Line serves the airport, but train headways, station access and walking time need a cushion.",
    parkingFact: "Short-term, long-term, economy and valet parking options produce different last-mile timing.",
    exampleOrigin: "Downtown Portland",
    exampleFarOrigin: "Vancouver",
    transitOrigin: "Pioneer Square North Station",
    officialSource: { label: "Portland Airport official guide", url: "https://www.flypdx.com/" },
    transitSource: { label: "TriMet airport MAX service", url: "https://trimet.org/air/" },
    parkingSource: { label: "Portland Airport parking", url: "https://www.flypdx.com/Parking" },
  },
  {
    slug: "cleveland-cle",
    code: "CLE",
    name: "Cleveland Hopkins International Airport",
    shortName: "Cleveland Hopkins",
    city: "Cleveland, Ohio",
    terminalNames: ["Main Terminal", "Concourses A, B and C"],
    roadAccess: "I-71, I-480, Berea Freeway, winter weather and parking shuttles",
    roadFact: "CLE trips can change with I-71, I-480, the Berea Freeway, lake-effect weather and airport-road conditions.",
    terminalFact: "CLE uses one main terminal with concourses, so security, bag drop and walking distance are the main airport variables.",
    transferFact: "Remote parking, rental-car shuttles and curb congestion can add time before check-in.",
    transitFact: "RTA Red Line serves the airport, but station access, headways and walking time need to be included.",
    parkingFact: "Smart parking garage, red lot, blue lot, orange lot and curbside valet each have different transfer needs.",
    exampleOrigin: "Downtown Cleveland",
    exampleFarOrigin: "Akron",
    transitOrigin: "Tower City Station",
    officialSource: { label: "Cleveland Hopkins official guide", url: "https://www.clevelandairport.com/" },
    transitSource: { label: "RTA airport rail", url: "https://www.riderta.com/facilities/airport" },
    parkingSource: { label: "Cleveland Hopkins parking", url: "https://www.clevelandairport.com/parking" },
  },
  {
    slug: "orange-county-sna",
    code: "SNA",
    name: "John Wayne Airport",
    shortName: "John Wayne Airport",
    city: "Orange County, California",
    terminalNames: ["Terminal A", "Terminal B", "Terminal C"],
    roadAccess: "I-405, SR 55, MacArthur Boulevard, Orange County commute traffic and parking structures",
    roadFact: "SNA trips can vary with I-405, SR 55, MacArthur Boulevard, beach traffic and Orange County commute patterns.",
    terminalFact: "SNA uses Terminals A, B and C, with a compact layout but terminal-specific curb and parking choices.",
    transferFact: "Parking structure choice, rental-car return and security still add time after the road trip.",
    transitFact: "OC Bus, rail connections through nearby stations and rideshare can work, but transfer timing matters.",
    parkingFact: "Terminal parking structures, curbside valet and off-airport lots create different walking or shuttle needs.",
    exampleOrigin: "Irvine",
    exampleFarOrigin: "Anaheim",
    transitOrigin: "Tustin Station",
    officialSource: { label: "John Wayne Airport official guide", url: "https://www.ocair.com/" },
    transitSource: { label: "John Wayne Airport transportation", url: "https://www.ocair.com/travelers/transportation/" },
    parkingSource: { label: "John Wayne Airport parking", url: "https://www.ocair.com/travelers/parking/" },
  },
  {
    slug: "kansas-city-mci",
    code: "MCI",
    name: "Kansas City International Airport",
    shortName: "Kansas City Airport",
    city: "Kansas City, Missouri",
    terminalNames: ["Single Terminal"],
    roadAccess: "I-29, I-435, airport parkways, Northland traffic and economy parking shuttles",
    roadFact: "MCI trips can change with I-29, I-435, downtown-to-Northland traffic and the long final approach to the airport.",
    terminalFact: "MCI now uses a single terminal, simplifying airline choice but not eliminating curb, parking and security timing.",
    transferFact: "The newer terminal still requires planning for parking lot selection, bag drop and walking distance.",
    transitFact: "RideKC bus service and rideshare can work, but transit frequency and pickup location should be counted.",
    parkingFact: "Garage, circle, economy and valet parking options create different walk or shuttle times.",
    exampleOrigin: "Downtown Kansas City",
    exampleFarOrigin: "Overland Park",
    transitOrigin: "East Village Transit Center",
    officialSource: { label: "Kansas City Airport official guide", url: "https://flykc.com/" },
    transitSource: { label: "Kansas City Airport ground transportation", url: "https://flykc.com/getting-to-from/ground-transportation" },
    parkingSource: { label: "Kansas City Airport parking", url: "https://flykc.com/parking" },
  },
  {
    slug: "indianapolis-ind",
    code: "IND",
    name: "Indianapolis International Airport",
    shortName: "Indianapolis Airport",
    city: "Indianapolis, Indiana",
    terminalNames: ["Main Terminal", "Concourse A", "Concourse B"],
    roadAccess: "I-70, I-465, airport expressway access, downtown traffic and economy parking shuttles",
    roadFact: "IND trips can vary with I-70, I-465, downtown event traffic and airport expressway access.",
    terminalFact: "IND uses one main terminal with Concourses A and B, so airline location, security and walking distance set the inside-airport timing.",
    transferFact: "Parking, rental-car return and curbside drop-off each create different final steps before check-in.",
    transitFact: "IndyGo bus service and rideshare are options, but schedule timing and pickup location matter.",
    parkingFact: "Garage, park and walk, economy and valet options create different transfer needs.",
    exampleOrigin: "Downtown Indianapolis",
    exampleFarOrigin: "Carmel",
    transitOrigin: "Julia M. Carson Transit Center",
    officialSource: { label: "Indianapolis Airport official guide", url: "https://www.ind.com/" },
    transitSource: { label: "Indianapolis Airport transportation", url: "https://www.ind.com/transportation-car-rental" },
    parkingSource: { label: "Indianapolis Airport parking", url: "https://www.ind.com/parking" },
  },
  {
    slug: "pittsburgh-pit",
    code: "PIT",
    name: "Pittsburgh International Airport",
    shortName: "Pittsburgh Airport",
    city: "Pittsburgh, Pennsylvania",
    terminalNames: ["Landside Terminal", "Airside Terminal"],
    roadAccess: "I-376, Parkway West, Fort Pitt Tunnel approaches, airport construction and parking lots",
    roadFact: "PIT trips can change with I-376, Parkway West, Fort Pitt Tunnel approaches, weather and airport construction.",
    terminalFact: "PIT has landside and airside terminal movement, so check-in and transit through the airport need to be counted.",
    transferFact: "Parking, rental-car return and terminal construction patterns can add time after the drive.",
    transitFact: "Pittsburgh Regional Transit bus service and rideshare are options, but schedule and curb location matter.",
    parkingFact: "Short-term, long-term, extended and economy lots create different walking or shuttle timelines.",
    exampleOrigin: "Downtown Pittsburgh",
    exampleFarOrigin: "Cranberry Township",
    transitOrigin: "Liberty Avenue",
    officialSource: { label: "Pittsburgh Airport official guide", url: "https://flypittsburgh.com/" },
    transitSource: { label: "Pittsburgh Airport transportation", url: "https://flypittsburgh.com/pittsburgh-international-airport/parking-transport/transportation/" },
    parkingSource: { label: "Pittsburgh Airport parking", url: "https://flypittsburgh.com/pittsburgh-international-airport/parking-transport/parking/" },
  },
  {
    slug: "cincinnati-cvg",
    code: "CVG",
    name: "Cincinnati/Northern Kentucky International Airport",
    shortName: "Cincinnati Airport",
    city: "Hebron, Kentucky",
    terminalNames: ["Terminal", "Concourses A and B"],
    roadAccess: "I-275, I-75, I-71, airport access roads, river-crossing traffic and parking shuttles",
    roadFact: "CVG trips can change with I-275, I-75, I-71, river-crossing traffic and the airport access roads in Northern Kentucky.",
    terminalFact: "CVG uses one terminal with Concourses A and B, so the inside-airport timing depends on security, train movement and walking distance.",
    transferFact: "Parking, rental-car return and shuttle lots can add a final leg before check-in.",
    transitFact: "TANK bus service and rideshare are options, but frequency and pickup location should be counted.",
    parkingFact: "Terminal garage, valet, economy and long-term parking options vary in walk or shuttle time.",
    exampleOrigin: "Downtown Cincinnati",
    exampleFarOrigin: "Mason",
    transitOrigin: "Government Square",
    officialSource: { label: "Cincinnati Airport official guide", url: "https://www.cvgairport.com/" },
    transitSource: { label: "Cincinnati Airport transportation", url: "https://www.cvgairport.com/transportation/" },
    parkingSource: { label: "Cincinnati Airport parking", url: "https://www.cvgairport.com/parking/" },
  },
  {
    slug: "columbus-cmh",
    code: "CMH",
    name: "John Glenn Columbus International Airport",
    shortName: "Columbus Airport",
    city: "Columbus, Ohio",
    terminalNames: ["Main Terminal", "Concourses A, B and C"],
    roadAccess: "I-670, I-270, Stelzer Road, downtown event traffic and parking shuttles",
    roadFact: "CMH trips can change with I-670, I-270, Stelzer Road, Easton-area traffic and downtown events.",
    terminalFact: "CMH uses one main terminal with Concourses A, B and C, so security, bag drop and walking distance drive the airport buffer.",
    transferFact: "Parking-lot choice and rental-car movement can add time after reaching airport property.",
    transitFact: "COTA bus service and rideshare are options, but schedule timing and pickup location need to be included.",
    parkingFact: "Garage, walking lot, shuttle lots and valet each create different transfer times.",
    exampleOrigin: "Downtown Columbus",
    exampleFarOrigin: "Dublin",
    transitOrigin: "COTA Transit Terminal",
    officialSource: { label: "Columbus Airport official guide", url: "https://flycolumbus.com/" },
    transitSource: { label: "Columbus Airport transportation", url: "https://flycolumbus.com/getting-to-from/ground-transportation/" },
    parkingSource: { label: "Columbus Airport parking", url: "https://flycolumbus.com/getting-to-from/parking/" },
  },
  {
    slug: "maui-ogg",
    code: "OGG",
    name: "Kahului Airport",
    shortName: "Maui Airport",
    city: "Kahului, Hawaii",
    terminalNames: ["Main Terminal", "Commuter Terminal"],
    roadAccess: "Hana Highway, Haleakala Highway, Lahaina-side travel, rental-car return and visitor traffic",
    roadFact: "OGG trips can vary with Hana Highway, Haleakala Highway, resort-area travel, visitor traffic and rental-car return lines.",
    terminalFact: "OGG uses a main terminal and commuter areas, with mainland, interisland and commuter trips following different patterns.",
    transferFact: "Agriculture inspection, checked bags and rental-car return can add meaningful time before security.",
    transitFact: "Maui Bus, hotel shuttles and rideshare can work, but island distances and pickup timing need a cushion.",
    parkingFact: "Airport parking, rental-car return and resort shuttles each create a different final airport leg.",
    exampleOrigin: "Kahului",
    exampleFarOrigin: "Lahaina",
    transitOrigin: "Queen Kaahumanu Center",
    officialSource: { label: "Kahului Airport official guide", url: "https://airports.hawaii.gov/ogg/" },
    transitSource: { label: "Kahului Airport transportation", url: "https://airports.hawaii.gov/ogg/getting-to-from/ground-transportation/" },
    parkingSource: { label: "Kahului Airport parking", url: "https://airports.hawaii.gov/ogg/getting-to-from/parking/" },
  },
  {
    slug: "fort-myers-rsw",
    code: "RSW",
    name: "Southwest Florida International Airport",
    shortName: "Fort Myers Airport",
    city: "Fort Myers, Florida",
    terminalNames: ["Main Terminal", "Concourses B, C and D"],
    roadAccess: "I-75, Daniels Parkway, Treeline Avenue, seasonal visitor traffic and parking shuttles",
    roadFact: "RSW trips can change with I-75, Daniels Parkway, Treeline Avenue, seasonal visitor traffic and beach-area congestion.",
    terminalFact: "RSW uses one terminal with multiple concourses, so the main airport variables are parking, bag drop, security and walking distance.",
    transferFact: "Seasonal peaks, rental-car return and parking shuttles can add time before check-in.",
    transitFact: "LeeTran, hotel shuttles and rideshare can work, but schedule and pickup-point timing should be included.",
    parkingFact: "Short-term, long-term and off-site parking options create different walking or shuttle requirements.",
    exampleOrigin: "Downtown Fort Myers",
    exampleFarOrigin: "Naples",
    transitOrigin: "LeeTran Rosa Parks Transportation Center",
    officialSource: { label: "Fort Myers Airport official guide", url: "https://flylcpa.com/" },
    transitSource: { label: "Fort Myers Airport transportation", url: "https://flylcpa.com/transportation/" },
    parkingSource: { label: "Fort Myers Airport parking", url: "https://flylcpa.com/parking/" },
  },
].map(createAirportProfile);

export const travelLocations: TravelLocationProfile[] = [
  ...cruiseTerminalProfiles,
  {
    kind: "airport",
    publishingStatus: "prototype",
    indexable: true,
    slug: "newark-ewr",
    code: "EWR",
    name: "Newark Liberty International Airport",
    shortName: "Newark Airport",
    city: "Newark, New Jersey",
    calculatorDestination: "Newark Liberty International Airport",
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
      localTimingFaq:
        "At EWR, plan around Turnpike and I-78 traffic, Terminal A/B/C access, parking or curbside drop-off, AirTrain transfers and the extra Terminal A walk or shuttle if you are using rail or remote parking.",
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
  {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: "atlanta-atl",
    code: "ATL",
    name: "Hartsfield-Jackson Atlanta International Airport",
    shortName: "Atlanta Airport",
    city: "Atlanta, Georgia",
    calculatorDestination: "Hartsfield-Jackson Atlanta International Airport",
    reviewedOn: "2026-06-28",
    reviewedLabel: "Reviewed June 28, 2026",
    directAnswer:
      "Atlanta Airport leave time depends on I-85, I-75 and Downtown Connector traffic, whether you use the Domestic or International terminal, parking or curbside drop-off, checked bags, TSA PreCheck and any MARTA or shuttle transfer before you reach security.",
    authorityIntro:
      "Atlanta Airport is built for huge passenger volume, but that scale means your arrival plan matters. The airport has separate Domestic and Maynard H. Jackson Jr. International terminal approaches, seven concourses connected by the Plane Train, a MARTA station at the Domestic Terminal and parking or rental-car transfers that can add a second trip after you reach airport property. A useful ATL leave-time estimate has to work backward from your flight, then add the local pieces that slow travelers down: freeway traffic, terminal choice, bag drop, parking, shuttle time and whether you are using rail instead of driving.",
    calculatorExample: {
      eyebrow: "Illustrative ATL example",
      summary: "7:30 AM domestic flight · Midtown Atlanta · parking",
      leaveTime: "Leave around 4:50 AM",
      breakdown: [
        "5:30 AM airport arrival target",
        "20-minute parking and terminal allowance",
        "20-minute illustrative drive plus morning buffer",
      ],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: [
        "Domestic Terminal",
        "Maynard H. Jackson Jr. International Terminal",
        "Concourses T, A, B, C, D, E and F",
      ],
      accessHeading: "Getting to ATL without losing your buffer",
      insideHeading: "Terminals, concourses and transfers at Atlanta Airport",
      transitHeading: "MARTA, parking and shuttle planning for ATL",
      localTimingFaq:
        "At ATL, plan around I-85, I-75 and Downtown Connector traffic, the correct Domestic or International terminal approach, MARTA access at the Domestic Terminal, Plane Train movement between concourses and any parking, rental-car or shuttle transfer.",
    },
    modules: [
      {
        title: "Road access and terminal choice",
        facts: [
          "The main airport approaches use I-85 and local airport roads, with many north-side trips also exposed to Downtown Connector congestion before the airport drive even begins.",
          "Domestic and International terminal plans are not interchangeable. Confirm which terminal your airline wants before you leave, especially for international departures.",
          "Parking is a separate timing decision. Add time to enter the correct facility, unload, and reach check-in or security from the lot you choose.",
        ],
      },
      {
        title: "Concourses and airport transfers",
        facts: [
          "ATL uses concourses T, A, B, C, D, E and F, with the Plane Train and pedestrian walkway connecting the concourse spine after security.",
          "A tight arrival can fail even after you reach the curb if you still need bag drop, security and a concourse transfer before boarding.",
          "International departures may use the International Terminal road and parking plan, so check your airline instructions before using a familiar domestic route.",
        ],
      },
      {
        title: "MARTA, parking and shuttles",
        facts: [
          "MARTA serves the airport at the Domestic Terminal, which can be efficient if your starting point is close to a station and the train schedule fits your departure.",
          "Rental-car and some parking plans add shuttle or SkyTrain time, so include that leg before your terminal-arrival target.",
          "For rail trips, work backward through station access, the train ride, airport arrival, terminal movement and security rather than using the flight time alone.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Midtown Atlanta -> ATL",
        subtitle: "7:30 AM domestic flight · parking · checked bag",
        assumptions: [
          "Illustrative 20-minute drive plus morning traffic buffer",
          "20 minutes to park and reach the terminal",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 7:30 AM",
          "Airport arrival target: 5:30 AM",
          "Reach parking by: 5:10 AM",
          "Illustrative drive and buffer: 20 minutes",
        ],
        result: "Illustrative leave time: 4:50 AM",
      },
      {
        title: "Alpharetta -> ATL",
        subtitle: "6:00 PM international flight · rideshare",
        assumptions: [
          "Illustrative 75-minute weekday drive; actual traffic may differ materially",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 6:00 PM",
          "Airport arrival target: 3:00 PM",
          "Reach terminal curb by: 2:45 PM",
          "Illustrative drive: 75 minutes",
        ],
        result: "Illustrative leave time: 1:30 PM",
      },
      {
        title: "Five Points Station -> ATL",
        subtitle: "MARTA rail · 10:00 AM domestic flight",
        assumptions: [
          "Illustrative 20-minute train ride",
          "15 minutes for station access, waiting and airport movement",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 10:00 AM",
          "Airport arrival target: 8:00 AM",
          "Rail and connection allowance: 35 minutes",
        ],
        result: "Be at Five Points ready to board by about 7:25 AM",
      },
    ],
    sources: [
      {
        label: "Atlanta Airport official guide",
        url: "https://www.atl.com/",
      },
      {
        label: "Atlanta Airport parking",
        url: "https://www.atl.com/parking/",
      },
      {
        label: "MARTA airport station guide",
        url: "https://www.itsmarta.com/airport.aspx",
      },
      {
        label: "Atlanta Airport ground transportation",
        url: "https://www.atl.com/ground-transportation/",
      },
      ...officialAirportSources,
    ],
  },
  {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: "los-angeles-lax",
    code: "LAX",
    name: "Los Angeles International Airport",
    shortName: "LAX",
    city: "Los Angeles, California",
    calculatorDestination: "Los Angeles International Airport",
    reviewedOn: "2026-06-28",
    reviewedLabel: "Reviewed June 28, 2026",
    directAnswer:
      "LAX leave time depends on your freeway approach, Century Boulevard and Sepulveda Boulevard congestion, the terminal loop, parking or shuttle plans, checked bags, rideshare pickup and drop-off rules, TSA PreCheck and whether your flight is domestic or international.",
    authorityIntro:
      "LAX is not one simple curb. Travelers can lose time before the terminal on the 405, the 105, Sepulveda Boulevard, Century Boulevard and the airport horseshoe, then lose more time choosing the right parking, shuttle, curb or rideshare plan. The airport has nine passenger terminals in a loop, a separate rideshare pickup system for many arrivals, FlyAway bus service and terminal-specific check-in decisions. A useful LAX leave-time estimate has to include the LA traffic window plus the airport-specific transfer plan after you reach the airport area.",
    calculatorExample: {
      eyebrow: "Illustrative LAX example",
      summary: "8:00 AM domestic flight · Santa Monica · parking",
      leaveTime: "Leave around 4:55 AM",
      breakdown: [
        "6:00 AM airport arrival target",
        "25-minute parking and shuttle allowance",
        "40-minute illustrative drive",
      ],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: [
        "Terminal 1",
        "Terminal 2",
        "Terminal 3",
        "Terminal 4",
        "Terminal 5",
        "Terminal 6",
        "Terminal 7",
        "Terminal 8",
        "Tom Bradley International Terminal",
      ],
      accessHeading: "Getting to LAX without losing your buffer",
      insideHeading: "Terminals, curb access and transfers at LAX",
      transitHeading: "FlyAway, parking and shuttle planning for LAX",
      localTimingFaq:
        "At LAX, plan around the 405, the 105, Sepulveda Boulevard, Century Boulevard, terminal-loop congestion, your specific terminal, parking or shuttle time, FlyAway timing and the current rideshare pickup or drop-off process.",
    },
    modules: [
      {
        title: "Approaching the terminal loop",
        facts: [
          "Traffic can stack before the airport on the 405, the 105, Century Boulevard, Sepulveda Boulevard and the terminal loop itself.",
          "A navigation estimate to the airport area can understate the final curb time. Add a terminal-loop allowance if you are arriving near a busy departure bank.",
          "Parking location changes the answer. Central terminal parking, economy parking and hotel or off-site shuttles all create different last-mile timing.",
        ],
      },
      {
        title: "Terminals and curb access",
        facts: [
          "LAX uses nine passenger terminals in a loop, including Tom Bradley International Terminal for many international flights.",
          "The right terminal matters because correcting a wrong curb can mean another trip through traffic or a pedestrian transfer with bags.",
          "Rideshare rules differ by trip type and operating condition, so build your leave time around the official current pickup or drop-off process.",
        ],
      },
      {
        title: "FlyAway, parking and shuttles",
        facts: [
          "FlyAway can reduce driving complexity if the schedule and boarding point match your trip, but the bus schedule and station access still need a cushion.",
          "Economy and off-site parking can save money while adding shuttle time before check-in.",
          "For international flights, add more margin for check-in, document checks and terminal movement before security.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Santa Monica -> LAX",
        subtitle: "8:00 AM domestic flight · parking · carry-on",
        assumptions: [
          "Illustrative 40-minute drive; use the calculator for live traffic",
          "25 minutes to park and reach the terminal",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 8:00 AM",
          "Airport arrival target: 6:00 AM",
          "Reach parking by: 5:35 AM",
          "Illustrative drive: 40 minutes",
        ],
        result: "Illustrative leave time: 4:55 AM",
      },
      {
        title: "Downtown Los Angeles -> LAX",
        subtitle: "9:30 PM international flight · rideshare",
        assumptions: [
          "Illustrative 55-minute evening drive",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 9:30 PM",
          "Airport arrival target: 6:30 PM",
          "Reach terminal curb by: 6:15 PM",
          "Illustrative drive: 55 minutes",
        ],
        result: "Illustrative leave time: 5:20 PM",
      },
      {
        title: "Hollywood FlyAway -> LAX",
        subtitle: "FlyAway bus · 1:00 PM domestic flight",
        assumptions: [
          "Illustrative 60-minute bus ride",
          "20 minutes for boarding, waiting and terminal movement",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 1:00 PM",
          "Airport arrival target: 11:00 AM",
          "Bus and connection allowance: 80 minutes",
        ],
        result: "Be at the FlyAway stop ready to board by about 9:40 AM",
      },
    ],
    sources: [
      {
        label: "LAX official airport guide",
        url: "https://www.flylax.com/",
      },
      {
        label: "LAX-it rideshare guide",
        url: "https://www.flylax.com/lax-it",
      },
      {
        label: "LAX FlyAway bus guide",
        url: "https://www.flylax.com/flyaway-bus",
      },
      {
        label: "LAX parking",
        url: "https://www.flylax.com/parking-at-lax",
      },
      ...officialAirportSources,
    ],
  },
  {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: "chicago-ohare-ord",
    code: "ORD",
    name: "Chicago O'Hare International Airport",
    shortName: "Chicago O'Hare",
    city: "Chicago, Illinois",
    calculatorDestination: "Chicago O'Hare International Airport",
    reviewedOn: "2026-06-28",
    reviewedLabel: "Reviewed June 28, 2026",
    directAnswer:
      "Chicago O'Hare leave time depends on Kennedy Expressway and I-190 traffic, the terminal you need, Terminal 5 for many international departures, parking or economy-lot transfers, CTA Blue Line timing, checked bags, TSA PreCheck and your domestic or international arrival target.",
    authorityIntro:
      "Chicago O'Hare sits northwest of downtown Chicago, so the same flight can require very different leave times depending on the Kennedy Expressway, I-190, the suburbs you start from, the terminal you need and whether you use CTA, parking or rideshare. O'Hare uses Terminals 1, 2, 3 and 5, with airport transfers, economy parking and public transit all adding their own timing. A useful ORD estimate has to include the roadway or rail trip plus the airport leg that gets you from curb, lot or station to check-in and security.",
    calculatorExample: {
      eyebrow: "Illustrative ORD example",
      summary: "7:00 AM domestic flight · Chicago Loop · parking",
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
      terminalNames: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 5"],
      accessHeading: "Getting to ORD without losing your buffer",
      insideHeading: "Terminals and transfers at Chicago O'Hare",
      transitHeading: "CTA, parking and shuttle planning for ORD",
      localTimingFaq:
        "At ORD, plan around Kennedy Expressway and I-190 traffic, the correct terminal, Terminal 5 for many international trips, airport transfer time, economy parking or rental-car shuttles and CTA Blue Line schedule risk.",
    },
    modules: [
      {
        title: "Kennedy Expressway and airport access",
        facts: [
          "Downtown trips often depend on the Kennedy Expressway and I-190, while suburban trips can vary by tollway, surface-road and airport-road conditions.",
          "A fast drive to the airport boundary is not the same as a fast arrival at the correct terminal curb.",
          "For evening departures, calculate the trip for the actual departure window instead of using an average downtown-to-airport estimate.",
        ],
      },
      {
        title: "Terminals and transfers",
        facts: [
          "O'Hare uses Terminals 1, 2, 3 and 5 for passenger flights, and the correct terminal depends on airline, destination and current operations.",
          "Terminal 5 is an important planning point for many international trips, with a different curb and transfer pattern than the domestic terminal core.",
          "If you park away from the terminal core or need an airport transfer, include that leg before your check-in and security buffer.",
        ],
      },
      {
        title: "CTA, parking and shuttles",
        facts: [
          "The CTA Blue Line serves the airport, but station access, wait time and walking from the station still belong in the leave-time calculation.",
          "Economy parking and rental-car plans can add shuttle time, so the calculator result should include more than the road segment.",
          "Weather and construction can affect both roadway and rail reliability, so recheck official operator updates on the travel day.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Chicago Loop -> ORD",
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
        title: "Naperville -> ORD",
        subtitle: "6:30 PM international flight · rideshare",
        assumptions: [
          "Illustrative 70-minute evening drive",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 6:30 PM",
          "Airport arrival target: 3:30 PM",
          "Reach terminal curb by: 3:15 PM",
          "Illustrative drive: 70 minutes",
        ],
        result: "Illustrative leave time: 2:05 PM",
      },
      {
        title: "Clark/Lake Station -> ORD",
        subtitle: "CTA Blue Line · 11:00 AM domestic flight",
        assumptions: [
          "Illustrative 45-minute train ride",
          "15 minutes for station access, waiting and airport movement",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 11:00 AM",
          "Airport arrival target: 9:00 AM",
          "Rail and connection allowance: 60 minutes",
        ],
        result: "Be at Clark/Lake ready to board by about 8:00 AM",
      },
    ],
    sources: [
      {
        label: "Chicago O'Hare official airport guide",
        url: "https://www.flychicago.com/ohare/home/pages/default.aspx",
      },
      {
        label: "Chicago O'Hare parking",
        url: "https://www.flychicago.com/ohare/tofrom/parking/pages/default.aspx",
      },
      {
        label: "Chicago O'Hare public transit",
        url: "https://www.flychicago.com/ohare/tofrom/publictransit/pages/default.aspx",
      },
      {
        label: "CTA Blue Line",
        url: "https://www.transitchicago.com/blueline/",
      },
      ...officialAirportSources,
    ],
  },
  {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: "jfk",
    code: "JFK",
    name: "John F. Kennedy International Airport",
    shortName: "JFK Airport",
    city: "Queens, New York",
    calculatorDestination: "John F. Kennedy International Airport",
    reviewedOn: "2026-06-28",
    reviewedLabel: "Reviewed June 28, 2026",
    directAnswer:
      "JFK leave time depends on Van Wyck Expressway and Belt Parkway traffic, your terminal, AirTrain access, LIRR or subway timing, parking or curbside drop-off, checked bags, TSA PreCheck and whether your flight is domestic or international.",
    authorityIntro:
      "JFK sits in southeast Queens, which means a useful leave-time estimate has to handle New York roadway risk and airport-transfer risk together. Driving trips can hinge on the Van Wyck Expressway, Belt Parkway, bridge and tunnel approaches and terminal-road congestion. Rail trips usually require AirTrain from Jamaica or Howard Beach, plus the time to reach that connection in the first place. A useful JFK estimate works backward from the flight, then includes terminal choice, AirTrain or parking movement, bag drop, security and the extra margin many international flights require.",
    calculatorExample: {
      eyebrow: "Illustrative JFK example",
      summary: "11:00 AM domestic flight · Midtown Manhattan · rail",
      leaveTime: "Be at Penn Station around 8:15 AM",
      breakdown: [
        "9:00 AM airport arrival target",
        "45-minute rail and AirTrain allowance",
        "Missed-connection cushion included",
      ],
    },
    airport: {
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: ["Terminal 1", "Terminal 4", "Terminal 5", "Terminal 7", "Terminal 8"],
      accessHeading: "Getting to JFK without losing your buffer",
      insideHeading: "Terminals and AirTrain transfers at JFK",
      transitHeading: "LIRR, subway, parking and AirTrain planning for JFK",
      localTimingFaq:
        "At JFK, plan around Van Wyck Expressway and Belt Parkway traffic, terminal-specific curb access, AirTrain transfers from Jamaica or Howard Beach, LIRR or subway timing, parking movement and the larger buffer often needed for international departures.",
    },
    modules: [
      {
        title: "Queens road access and terminal choice",
        facts: [
          "Driving time can change quickly on the Van Wyck Expressway, Belt Parkway and the approaches that feed them from Manhattan, Brooklyn, Queens and Long Island.",
          "Use the terminal your airline provides. A wrong terminal can add AirTrain, walking or roadway time before you even reach check-in.",
          "Parking and curbside drop-off are different calculations. Parking adds lot entry, unloading and terminal-transfer time.",
        ],
      },
      {
        title: "AirTrain and terminal transfers",
        facts: [
          "AirTrain connects JFK terminals with Jamaica and Howard Beach, making the rail transfer part of the airport timing plan.",
          "Terminal movement can be easy when everything is running normally, but a missed train or platform delay can eat into a tight flight buffer.",
          "For international departures, allow extra margin for document checks, bag drop and terminal congestion before security.",
        ],
      },
      {
        title: "LIRR, subway and parking",
        facts: [
          "LIRR can be a strong option from Manhattan or Long Island when paired with AirTrain, but the train schedule and transfer time need to be counted separately.",
          "Subway routes can be cheaper but may take longer and require more walking or transfer time with bags.",
          "Airport parking and off-site parking both need a final transfer allowance before the terminal-arrival target.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Midtown Manhattan -> JFK",
        subtitle: "11:00 AM domestic flight · LIRR and AirTrain",
        assumptions: [
          "Illustrative 45-minute rail and AirTrain allowance",
          "Missed-connection cushion included",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 11:00 AM",
          "Airport arrival target: 9:00 AM",
          "Rail, AirTrain and connection allowance: 45 minutes",
        ],
        result: "Be at Penn Station ready to board by about 8:15 AM",
      },
      {
        title: "Brooklyn -> JFK",
        subtitle: "8:00 PM international flight · rideshare",
        assumptions: [
          "Illustrative 55-minute evening drive; actual traffic may differ materially",
          "15-minute curb-to-check-in allowance",
          "3-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 8:00 PM",
          "Airport arrival target: 5:00 PM",
          "Reach terminal curb by: 4:45 PM",
          "Illustrative drive: 55 minutes",
        ],
        result: "Illustrative leave time: 3:50 PM",
      },
      {
        title: "Garden City -> JFK",
        subtitle: "2:00 PM domestic flight · parking",
        assumptions: [
          "Illustrative 35-minute drive",
          "25 minutes to park and reach the terminal",
          "2-hour terminal-arrival target",
        ],
        calculation: [
          "Flight departure: 2:00 PM",
          "Airport arrival target: 12:00 PM",
          "Reach parking by: 11:35 AM",
          "Illustrative drive: 35 minutes",
        ],
        result: "Illustrative leave time: 11:00 AM",
      },
    ],
    sources: [
      {
        label: "JFK official airport guide",
        url: "https://www.jfkairport.com/",
      },
      {
        label: "JFK AirTrain guide",
        url: "https://www.jfkairport.com/to-from-airport/air-train",
      },
      {
        label: "JFK parking",
        url: "https://www.jfkairport.com/to-from-airport/parking",
      },
      {
        label: "MTA airport transit guide",
        url: "https://new.mta.info/guides/airports/jfk",
      },
      ...officialAirportSources,
    ],
  },
  ...additionalAirportProfiles,
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
    ...(location.kind === "airport"
      ? [
          location.airport.accessHeading,
          location.airport.insideHeading,
          location.airport.transitHeading,
          location.airport.localTimingFaq,
          ...location.airport.terminalNames,
        ]
      : []),
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
