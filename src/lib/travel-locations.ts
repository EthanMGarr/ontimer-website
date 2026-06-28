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
    calculatorDestination: "ATL Airport",
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
    calculatorDestination: "LAX Airport",
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
    calculatorDestination: "ORD Airport",
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
    calculatorDestination: "JFK Airport",
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
  ...[
    ["denver-den", "DEN", "Denver International Airport", "Denver Airport", "Denver, Colorado"],
    ["dallas-fort-worth-dfw", "DFW", "Dallas Fort Worth International Airport", "DFW Airport", "Dallas-Fort Worth, Texas"],
    ["las-vegas-las", "LAS", "Harry Reid International Airport", "Las Vegas Airport", "Las Vegas, Nevada"],
    ["phoenix-phx", "PHX", "Phoenix Sky Harbor International Airport", "Phoenix Sky Harbor", "Phoenix, Arizona"],
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
      localTimingFaq:
        `This ${shortName} timing FAQ is intentionally unpublished until its location-specific transfer details are reviewed.`,
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
