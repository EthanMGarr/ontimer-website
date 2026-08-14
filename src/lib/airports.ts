export interface AirportSource {
  label: string;
  url: string;
}

export interface AirportExample {
  flight: string;
  situation: string;
  plan: string;
}

export interface AirportData {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  calculatorValue: string;
  directAnswer: string;
  roadNotes: string[];
  airportNotes: string[];
  transitNotes: string[];
  examples: AirportExample[];
  sources: AirportSource[];
}

export const airports: AirportData[] = [
  {
    slug: "newark-ewr",
    code: "EWR",
    name: "Newark Liberty International Airport",
    shortName: "Newark Airport",
    city: "Newark, New Jersey",
    calculatorValue: "EWR Airport",
    directAnswer:
      "For a domestic flight from Newark, work backward from an airport arrival target about 2 hours before departure; use about 3 hours for international travel. Then add your traffic-adjusted trip to EWR plus time for parking, AirTrain or a terminal drop-off.",
    roadNotes: [
      "The drive to EWR can change sharply with New Jersey Turnpike, Routes 1–9, I-78 and airport-loop traffic. Calculate the trip for the time you will actually travel.",
      "Terminal and parking access happen after you reach the airport complex. Do not treat the highway exit as your arrival time.",
      "If another person is dropping you off, confirm the airline and terminal before leaving. A wrong-terminal correction can consume the margin you planned to keep.",
    ],
    airportNotes: [
      "Newark has three passenger terminals: A, B and C. Your airline and flight determine where you need to be dropped off.",
      "Economy or remote parking requires additional transfer time. Add that separately instead of assuming the drive ends at the terminal door.",
      "International departures, checked bags and peak travel periods deserve more margin than a carry-on domestic trip.",
    ],
    transitNotes: [
      "Rail travelers should plan the full trip through Newark Liberty International Airport Station and the airport connection—not just the train ride from their origin.",
      "Build in time for transfers, platform waits and the walk from the final airport stop to check-in or security.",
    ],
    examples: [
      {
        flight: "7:00 AM domestic flight",
        situation: "Driving, parking and checking a bag",
        plan: "Target the terminal area near 5:00 AM, then add parking transfer time and the traffic-adjusted drive. An early flight does not eliminate airport processing time.",
      },
      {
        flight: "6:30 PM international flight",
        situation: "Weekday drop-off",
        plan: "Target airport arrival near 3:30 PM and calculate the road trip during the afternoon travel window, not using a late-night map estimate.",
      },
    ],
    sources: [
      { label: "Newark Liberty official airport guide", url: "https://www.newarkairport.com/" },
      { label: "Newark Liberty ground transportation", url: "https://www.newarkairport.com/to-from-airport/airport-directions" },
      { label: "TSA security screening guidance", url: "https://www.tsa.gov/travel/security-screening" },
    ],
  },
  {
    slug: "jfk",
    code: "JFK",
    name: "John F. Kennedy International Airport",
    shortName: "JFK Airport",
    city: "Queens, New York",
    calculatorValue: "JFK Airport",
    directAnswer:
      "For JFK, start with an airport arrival target about 2 hours before a domestic flight or 3 hours before an international flight. Add the travel time for the exact hour you are leaving, then include parking, AirTrain, terminal and check-in time.",
    roadNotes: [
      "JFK travel time is highly sensitive to the Belt Parkway, Van Wyck Expressway and surrounding Queens traffic. A generic distance estimate is not enough.",
      "Road construction and terminal circulation can add delay after you enter airport property. Keep a separate airport-access cushion.",
      "Confirm the terminal before departure; changing terminals after entering the airport can cost meaningful time.",
    ],
    airportNotes: [
      "JFK is a large multi-terminal international airport. Walking, check-in and security needs vary by terminal and airline.",
      "Parking outside the terminal area adds an AirTrain or shuttle leg. Count that transfer explicitly.",
      "For international travel, airline document checks and bag-drop cutoffs may require more time than security alone.",
    ],
    transitNotes: [
      "Public transit plans should include the subway or LIRR leg, the transfer at Jamaica or Howard Beach, and AirTrain time to the correct terminal.",
      "Use the scheduled journey as a baseline and keep margin for missed connections, platform waits and luggage movement.",
    ],
    examples: [
      {
        flight: "9:00 AM domestic flight",
        situation: "Rideshare from Manhattan",
        plan: "Target JFK near 7:00 AM and estimate the ride for the early-morning crossing you will actually make. Add a cushion for terminal-road congestion.",
      },
      {
        flight: "8:00 PM international flight",
        situation: "LIRR and AirTrain",
        plan: "Target the terminal near 5:00 PM, then work backward through AirTrain, the Jamaica transfer and your train trip—with one missed connection of margin.",
      },
    ],
    sources: [
      { label: "JFK official airport guide", url: "https://www.jfkairport.com/" },
      { label: "JFK public transportation", url: "https://www.jfkairport.com/to-from-airport/public-transportation" },
      { label: "TSA security screening guidance", url: "https://www.tsa.gov/travel/security-screening" },
    ],
  },
  {
    slug: "los-angeles-lax",
    code: "LAX",
    name: "Los Angeles International Airport",
    shortName: "LAX",
    city: "Los Angeles, California",
    calculatorValue: "LAX Airport",
    directAnswer:
      "For LAX, plan to reach the airport roughly 2 hours before a domestic flight or 3 hours before an international flight. Then add traffic for your actual departure window and enough time to reach the correct terminal from parking, transit or your drop-off point.",
    roadNotes: [
      "Los Angeles traffic varies dramatically by corridor and time of day. Calculate from your real starting address rather than using a citywide average.",
      "The central terminal area can move more slowly than the surrounding highway approach. Reaching airport property is not the same as reaching your airline.",
      "Hotel, rental-car and off-airport parking shuttles add waiting and transfer time that should be included separately.",
    ],
    airportNotes: [
      "LAX has a large terminal loop. Airline, terminal and check-in location should be confirmed before you leave.",
      "International travel may involve additional document checks and longer walks even after security.",
      "Parking and rental-car returns can create a second journey before you reach the terminal. Treat them as separate steps in the plan.",
    ],
    transitNotes: [
      "Transit travelers should calculate to their actual terminal, including the final airport connection and walking time.",
      "If your route involves multiple transfers, preserve enough margin to absorb one delayed connection.",
    ],
    examples: [
      {
        flight: "10:00 AM domestic flight",
        situation: "Driving from downtown and parking",
        plan: "Target the terminal near 8:00 AM, then add parking transfer time and calculate the drive during the morning traffic window.",
      },
      {
        flight: "11:30 PM international flight",
        situation: "Rental-car return",
        plan: "Target check-in near 8:30 PM, then add fuel, return processing and the airport transfer before calculating when to leave your origin.",
      },
    ],
    sources: [
      { label: "LAX official airport guide", url: "https://www.flylax.com/" },
      { label: "LAX ground transportation", url: "https://www.flylax.com/lax-traffic-and-ground-transportation" },
      { label: "TSA security screening guidance", url: "https://www.tsa.gov/travel/security-screening" },
    ],
  },
  {
    slug: "chicago-ohare-ord",
    code: "ORD",
    name: "Chicago O'Hare International Airport",
    shortName: "Chicago O'Hare",
    city: "Chicago, Illinois",
    calculatorValue: "ORD Airport",
    directAnswer:
      "For O'Hare, aim to be at the airport about 2 hours before a domestic departure or 3 hours before an international departure. Add traffic-adjusted travel plus the transfer from parking, the CTA station or your drop-off point to the correct terminal.",
    roadNotes: [
      "O'Hare drive times are affected by the Kennedy Expressway and regional rush-hour traffic. Estimate the route for the day and hour of travel.",
      "Remote parking and rental-car returns require an additional airport transfer. Do not fold that into an optimistic drive estimate.",
      "Winter weather can affect both road travel and airport movement, so check conditions and increase the margin when needed.",
    ],
    airportNotes: [
      "O'Hare is a large multi-terminal hub. Confirm both airline and terminal before setting your destination.",
      "Terminal transfers and long walks can matter, particularly for international itineraries or unfamiliar gates.",
      "Checked bags create a hard airline cutoff before departure; arriving at the curb is not the same as completing bag drop.",
    ],
    transitNotes: [
      "CTA Blue Line travelers should include station access, train headways and the walk from the airport station to the airline check-in area.",
      "Commuter-rail or bus connections need additional transfer margin beyond the published in-vehicle travel time.",
    ],
    examples: [
      {
        flight: "8:30 AM domestic flight",
        situation: "Driving and economy parking",
        plan: "Target the terminal near 6:30 AM, add the parking transfer, then calculate the inbound drive during the early commute period.",
      },
      {
        flight: "5:00 PM international flight",
        situation: "CTA Blue Line",
        plan: "Target check-in near 2:00 PM and work backward through the airport walk, train ride and station access—with transfer margin.",
      },
    ],
    sources: [
      { label: "O'Hare official airport guide", url: "https://www.flychicago.com/ohare/home/pages/default.aspx" },
      { label: "O'Hare transportation options", url: "https://www.flychicago.com/ohare/tofrom/Pages/default.aspx" },
      { label: "TSA security screening guidance", url: "https://www.tsa.gov/travel/security-screening" },
    ],
  },
  {
    slug: "atlanta-atl",
    code: "ATL",
    name: "Hartsfield-Jackson Atlanta International Airport",
    shortName: "Atlanta Airport",
    city: "Atlanta, Georgia",
    calculatorValue: "ATL Airport",
    directAnswer:
      "For Atlanta, work backward from an airport arrival about 2 hours before a domestic flight or 3 hours before an international flight. Add real travel time plus parking, rental-car, MARTA or terminal-transfer time.",
    roadNotes: [
      "Atlanta traffic can change quickly around I-75, I-85, I-285 and the Downtown Connector. Use a time-specific route estimate.",
      "Domestic and international terminal approaches are different. Set the destination for the correct side of the airport.",
      "Off-airport parking and rental-car facilities add a transfer step before check-in.",
    ],
    airportNotes: [
      "ATL's domestic and international terminal areas feed a large concourse system. Leave time for check-in, security and movement to the gate.",
      "The Plane Train speeds concourse travel, but waiting, walking and escalator time still count.",
      "Airline bag-drop deadlines and international document checks can become the binding constraint before security.",
    ],
    transitNotes: [
      "MARTA reaches the airport at the domestic terminal. Travelers using the international terminal should include the required airport connection.",
      "Add access and waiting time to the published train ride, particularly when traveling with luggage.",
    ],
    examples: [
      {
        flight: "7:30 AM domestic flight",
        situation: "Driving, parking and carry-on only",
        plan: "Target the terminal near 5:30 AM, add parking and shuttle time, then calculate the road trip for the early-morning departure.",
      },
      {
        flight: "4:00 PM international flight",
        situation: "MARTA from Midtown",
        plan: "Target airport processing near 1:00 PM and work backward through the terminal connection, MARTA ride and station access.",
      },
    ],
    sources: [
      { label: "ATL official airport guide", url: "https://www.atl.com/" },
      { label: "ATL ground transportation", url: "https://www.atl.com/ground-transportation/" },
      { label: "TSA security screening guidance", url: "https://www.tsa.gov/travel/security-screening" },
    ],
  },
];

export function getAirport(slug: string): AirportData | undefined {
  return airports.find((airport) => airport.slug === slug);
}
