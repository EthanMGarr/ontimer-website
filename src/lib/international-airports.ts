import type { AirportLocationProfile } from "@/lib/travel-locations";

/* Hallmark · pre-emit critique: P5 H4 E5 S5 R5 V5 */

interface InternationalAirportSeed {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  destination: string;
  terminals: string[];
  airportAccess: string;
  terminalAdvice: string;
  transitAdvice: string;
  finalLegAdvice: string;
  exampleOrigin: string;
  officialUrl: string;
  reviewedOn?: string;
  popularity: number;
  coordinates: { latitude: number; longitude: number };
}

const reviewedOn = "2026-07-28";
const reviewedLabel = "Reviewed July 28, 2026";

function createInternationalAirportProfile(seed: InternationalAirportSeed): AirportLocationProfile {
  const terminalList = seed.terminals.join(", ");
  const routeCheckpoint = seed.terminals.length === 1
    ? `the correct check-in area in ${terminalList}`
    : `which of ${terminalList} you need`;

  return {
    kind: "airport",
    publishingStatus: "published",
    indexable: true,
    slug: seed.slug,
    code: seed.code,
    name: seed.name,
    shortName: seed.shortName,
    aliases: [seed.code, `${seed.code} Airport`, seed.shortName],
    city: seed.city,
    calculatorDestination: seed.destination,
    reviewedOn: seed.reviewedOn ?? reviewedOn,
    reviewedLabel: seed.reviewedOn === "2026-07-31" ? "Reviewed July 31, 2026" : reviewedLabel,
    popularity: seed.popularity,
    coordinates: seed.coordinates,
    directAnswer: `For ${seed.shortName}, start with the time your airline says you must be at the terminal. Then add the trip from your starting point, the final transfer from your car or train, bag drop, security and the walk to your gate. The calculator works backward from your flight to give you a leave time.`,
    authorityIntro: `At ${seed.shortName}, arriving at the airport is only one part of the trip. Confirm ${routeCheckpoint} before you choose a route, then count every step from ${seed.exampleOrigin} to the check-in desk. The calculator includes the road or rail journey; your plan should also leave room for the final terminal transfer, airline deadlines, security and the walk to your gate.`,
    destinationKnowledge: {
      commonDelays: [seed.airportAccess, seed.terminalAdvice],
      localPlanningNotes: [
        "A common starting point is to reach the terminal about 2 hours before a short-haul flight and 3 hours before a long-haul flight. Use an earlier airline check-in or bag-drop deadline if one applies.",
        seed.finalLegAdvice,
      ],
      parkingGuidance: [
        `Choose parking for the terminal you need. At ${seed.code}, the time from the car park to departures is part of the trip, not part of the flight buffer.`,
      ],
      walkingConsiderations: [seed.transitAdvice],
      aiSearchSummary: `${seed.code} leave-time planning should use the correct terminal, time-specific road or rail travel, the transfer from parking or the station, the airline's check-in deadline, security and the walk to the gate.`,
    },
    calculatorExample: {
      eyebrow: `Illustrative ${seed.code} example`,
      summary: `10:30 AM short-haul flight · leaving from ${seed.exampleOrigin}`,
      leaveTime: "Use the calculator for your route-specific leave time",
      breakdown: [
        "Start with the airline's terminal-arrival deadline",
        "Add the trip to the airport at the time you will travel",
        "Include the station, parking or drop-off transfer to departures",
      ],
    },
    airport: {
      planningJurisdiction: "international",
      shortHaulLabel: "Short-haul",
      longHaulLabel: "Long-haul",
      securityLabel: `${seed.code} security`,
      domesticArrivalMinutes: 120,
      internationalArrivalMinutes: 180,
      terminalNames: seed.terminals,
      accessHeading: `Choose the right route to ${seed.code}`,
      insideHeading: `Allow time inside ${seed.shortName}`,
      transitHeading: `Train, metro, bus and drop-off planning for ${seed.code}`,
      localTimingFaq: `${seed.terminalAdvice} ${seed.finalLegAdvice}`,
    },
    modules: [
      {
        title: "Confirm your terminal before you leave",
        facts: [
          `${seed.shortName} uses ${terminalList}.`,
          seed.terminalAdvice,
          "Check the terminal again in your airline app on the day you fly. A terminal change can alter the road entrance, rail stop or walking time.",
        ],
      },
      {
        title: "Plan the whole trip to departures",
        facts: [
          seed.airportAccess,
          seed.transitAdvice,
          seed.finalLegAdvice,
        ],
      },
      {
        title: "Let the airline deadline set the minimum",
        facts: [
          "Check when your airline closes check-in and bag drop for your route. That deadline can matter more than the security estimate.",
          "Use the airport's live departures and travel updates before leaving. Security queues, road incidents and rail disruptions can change during the day.",
          "If missing one train or shuttle would put the trip at risk, plan for the service before it.",
        ],
      },
    ],
    workedExamples: [
      {
        title: `${seed.exampleOrigin} -> ${seed.code}`,
        subtitle: "10:30 AM short-haul flight · carry-on only",
        assumptions: [
          "2-hour terminal-arrival starting point",
          `Travel from ${seed.exampleOrigin} at the actual time of day`,
          "Time from the station, car park or drop-off point to check-in",
        ],
        calculation: [
          "Flight departure: 10:30 AM",
          "Starting terminal-arrival target: 8:30 AM",
          "Move the target earlier if the airline deadline requires it",
          "Subtract the full ground journey to find the leave time",
        ],
        result: "Use the calculator above with your starting point and travel date",
      },
      {
        title: `${seed.exampleOrigin} -> ${seed.code} for a long-haul flight`,
        subtitle: "6:00 PM long-haul flight · checked bag",
        assumptions: [
          "3-hour terminal-arrival starting point",
          "Bag drop and any airline document check",
          "Enough room for a delayed road, rail or airport transfer",
        ],
        calculation: [
          "Flight departure: 6:00 PM",
          "Starting terminal-arrival target: 3:00 PM",
          "Add the final transfer before check-in",
          "Subtract traffic-aware travel from that target",
        ],
        result: "Use the calculator above for a route-specific leave time",
      },
    ],
    sources: [
      { label: `${seed.shortName} official passenger information`, url: seed.officialUrl },
      { label: "IATA passenger travel guidance", url: "https://www.iata.org/en/youandiata/travelers/" },
    ],
  };
}

const internationalAirportSeeds: InternationalAirportSeed[] = [
  {
    slug: "london-gatwick-lgw", code: "LGW", name: "London Gatwick Airport", shortName: "Gatwick Airport", city: "London, United Kingdom", destination: "London Gatwick Airport (LGW), UK",
    terminals: ["North Terminal", "South Terminal"],
    airportAccess: "The M23 and A23 are the main road approaches, and disruption on the M25 can affect trips from much of London and southeast England.",
    terminalAdvice: "North and South terminals have different forecourts and car parks. A free inter-terminal shuttle connects them, but going to the wrong terminal costs time.",
    transitAdvice: "Gatwick railway station is at the South Terminal. North Terminal passengers must add the inter-terminal shuttle after the train.",
    finalLegAdvice: "Include station exits, the terminal shuttle if needed, airline bag drop and the walk to the gate after security.",
    exampleOrigin: "London Victoria", officialUrl: "https://www.gatwickairport.com/", popularity: 98, coordinates: { latitude: 51.1537, longitude: -0.1821 },
  },
  {
    slug: "paris-charles-de-gaulle-cdg", code: "CDG", name: "Paris Charles de Gaulle Airport", shortName: "Charles de Gaulle Airport", city: "Paris, France", destination: "Paris Charles de Gaulle Airport (CDG), France",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "The A1 and A3 approaches can slow sharply around Paris commuting periods, events and incidents near the airport.",
    terminalAdvice: "Terminal 2 is a group of separate halls rather than one front door. Confirm the full terminal, such as 2E or 2F, before choosing a station or drop-off.",
    transitAdvice: "RER B serves Aéroport Charles de Gaulle 1 and 2 stations; CDGVAL links terminals and parking areas. The station named for Terminal 1 is not inside Terminal 1.",
    finalLegAdvice: "Allow for CDGVAL, lifts, hall changes, document checks and a potentially long walk to the boarding gate.",
    exampleOrigin: "Gare du Nord", officialUrl: "https://www.parisaeroport.fr/en/passengers", popularity: 99, coordinates: { latitude: 49.0097, longitude: 2.5479 },
  },
  {
    slug: "amsterdam-schiphol-ams", code: "AMS", name: "Amsterdam Airport Schiphol", shortName: "Schiphol Airport", city: "Amsterdam, Netherlands", destination: "Amsterdam Airport Schiphol (AMS), Netherlands",
    terminals: ["Schiphol Terminal", "Departure Halls 1, 2 and 3"],
    airportAccess: "A4 motorway traffic and congestion on the airport access roads can add time, particularly during Dutch commuting periods.",
    terminalAdvice: "Schiphol uses one connected terminal, but the departure halls and piers cover a large footprint. Your airline's hall and check-in desk matter more than a terminal number.",
    transitAdvice: "The railway station is directly beneath Schiphol Plaza. Include the walk from the platforms to the correct departure hall and check current rail engineering work.",
    finalLegAdvice: "Non-Schengen departures may require passport control as well as security, and distant piers can add a substantial walk.",
    exampleOrigin: "Amsterdam Centraal", officialUrl: "https://www.schiphol.nl/en/", popularity: 97, coordinates: { latitude: 52.3105, longitude: 4.7683 },
  },
  {
    slug: "frankfurt-fra", code: "FRA", name: "Frankfurt Airport", shortName: "Frankfurt Airport", city: "Frankfurt, Germany", destination: "Frankfurt Airport (FRA), Germany",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "The A3, A5 and airport interchange carry heavy regional traffic, so a short distance on the map can still produce an unpredictable drive.",
    terminalAdvice: "Terminals 1 and 2 use different road entrances and stations. Confirm the terminal and concourse letter before leaving.",
    transitAdvice: "Regional trains use the Regionalbahnhof and many long-distance trains use the Fernbahnhof. Neither station choice removes the walk or transfer to check-in.",
    finalLegAdvice: "Add time for the SkyLine or shuttle between terminals, airline document checks and long concourse walks.",
    exampleOrigin: "Frankfurt Hauptbahnhof", officialUrl: "https://www.frankfurt-airport.com/en.html", popularity: 96, coordinates: { latitude: 50.0379, longitude: 8.5622 },
  },
  {
    slug: "munich-muc", code: "MUC", name: "Munich Airport", shortName: "Munich Airport", city: "Munich, Germany", destination: "Munich Airport (MUC), Germany",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 2 Satellite"],
    airportAccess: "The A92 is the main motorway approach, while weather and traffic around Munich can affect both driving and S-Bahn reliability.",
    terminalAdvice: "Terminal 1 is divided into modules and Terminal 2 has a satellite reached by an underground train after security. Confirm the airline area, not just the terminal.",
    transitAdvice: "S1 and S8 trains reach the airport from different sides of Munich. Check the day's service pattern and allow for the walk from the station below the central area.",
    finalLegAdvice: "Passengers using the Terminal 2 Satellite need time for the underground connection after screening and passport control where required.",
    exampleOrigin: "München Hauptbahnhof", officialUrl: "https://www.munich-airport.com/", popularity: 91, coordinates: { latitude: 48.3538, longitude: 11.7861 },
  },
  {
    slug: "madrid-barajas-mad", code: "MAD", name: "Adolfo Suárez Madrid-Barajas Airport", shortName: "Madrid-Barajas Airport", city: "Madrid, Spain", destination: "Adolfo Suárez Madrid-Barajas Airport (MAD), Spain",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4", "Terminal 4S"],
    airportAccess: "M-11, M-12, M-13 and M-14 approaches serve different parts of the airport, and Madrid rush-hour traffic can change the best route.",
    terminalAdvice: "Terminals 1–3 and Terminal 4 are separate airport areas. Terminal 4S is a satellite reached after check-in and security from Terminal 4.",
    transitAdvice: "Metro and Cercanías services do not stop at every terminal in the same way. Choose the stop for T1–T2–T3 or T4 and add any airport transfer.",
    finalLegAdvice: "For a T4S departure, include the automated train and passport-control path between the main building and satellite.",
    exampleOrigin: "Madrid Atocha", officialUrl: "https://www.aena.es/en/adolfo-suarez-madrid-barajas.html", popularity: 94, coordinates: { latitude: 40.4983, longitude: -3.5676 },
  },
  {
    slug: "rome-fiumicino-fco", code: "FCO", name: "Rome Fiumicino Airport", shortName: "Fiumicino Airport", city: "Rome, Italy", destination: "Rome Fiumicino Airport (FCO), Italy",
    terminals: ["Terminal 1", "Terminal 3"],
    airportAccess: "The A91, Grande Raccordo Anulare and roads from central Rome can become congested, especially around commuting and holiday travel periods.",
    terminalAdvice: "Terminal 1 and Terminal 3 serve different airlines and routes. Confirm the terminal and check-in area before selecting parking or drop-off.",
    transitAdvice: "Leonardo Express runs from Roma Termini, while regional trains serve other stations. Leave room for platform access, service disruption and the walk into departures.",
    finalLegAdvice: "Schengen and non-Schengen journeys follow different passport-control paths, and some boarding areas require extra walking or people-mover time.",
    exampleOrigin: "Roma Termini", officialUrl: "https://www.adr.it/web/aeroporti-di-roma-en/", popularity: 93, coordinates: { latitude: 41.8003, longitude: 12.2389 },
  },
  {
    slug: "dublin-dub", code: "DUB", name: "Dublin Airport", shortName: "Dublin Airport", city: "Dublin, Ireland", destination: "Dublin Airport (DUB), Ireland",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "The M1, M50 and local airport roads can back up during Dublin commuting periods and busy holiday departures.",
    terminalAdvice: "Terminals 1 and 2 are connected on foot but have different check-in halls and forecourts. Use the airline's assigned terminal from the start.",
    transitAdvice: "Dublin Airport has no rail station. Airport coaches and city buses are exposed to road traffic, so timetable time is not the full planning allowance.",
    finalLegAdvice: "US-bound passengers may complete US preclearance before departure; allow the airline's recommended extra time for that process.",
    exampleOrigin: "Dublin city centre", officialUrl: "https://www.dublinairport.com/", popularity: 89, coordinates: { latitude: 53.4264, longitude: -6.2499 },
  },
  {
    slug: "istanbul-ist", code: "IST", name: "Istanbul Airport", shortName: "Istanbul Airport", city: "Istanbul, Türkiye", destination: "Istanbul Airport (IST), Türkiye",
    terminals: ["Main Passenger Terminal"],
    airportAccess: "Istanbul Airport is far northwest of the city; D020, TEM and Northern Marmara routes can vary dramatically with traffic and weather.",
    terminalAdvice: "There is one very large passenger terminal. The key detail is the correct entrance, check-in island and gate area rather than a terminal transfer.",
    transitAdvice: "The M11 metro reaches the airport, while buses and taxis remain subject to Istanbul traffic. Include the trip to the metro and the walk from the airport station.",
    finalLegAdvice: "The building and piers are extensive. Allow real time between check-in, passport control, security and a distant gate.",
    exampleOrigin: "Taksim Square", officialUrl: "https://www.istairport.com/en/", popularity: 97, coordinates: { latitude: 41.2753, longitude: 28.7519 },
  },
  {
    slug: "dubai-dxb", code: "DXB", name: "Dubai International Airport", shortName: "Dubai Airport", city: "Dubai, United Arab Emirates", destination: "Dubai International Airport (DXB), UAE",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Airport Road, Sheikh Mohammed bin Zayed Road and central Dubai approaches can slow during peak traffic and major events.",
    terminalAdvice: "Terminal 2 is on a different side of the airfield from Terminals 1 and 3. A wrong-terminal drop-off can require a road transfer, not a quick indoor walk.",
    transitAdvice: "Dubai Metro's Red Line serves Terminals 1 and 3, but not Terminal 2. Check operating hours if your flight leaves late at night or early in the morning.",
    finalLegAdvice: "Terminal 3 concourses and remote gates can require train or bus movement after security, so reaching the terminal door is not the end of the trip.",
    exampleOrigin: "Downtown Dubai", officialUrl: "https://www.dubaiairports.ae/", popularity: 100, coordinates: { latitude: 25.2532, longitude: 55.3657 },
  },
  {
    slug: "doha-doh", code: "DOH", name: "Hamad International Airport", shortName: "Hamad International Airport", city: "Doha, Qatar", destination: "Hamad International Airport (DOH), Qatar",
    terminals: ["Passenger Terminal"],
    airportAccess: "Doha's expressways provide several approaches, but event traffic, construction and the final airport roads can change travel time.",
    terminalAdvice: "The airport uses one connected passenger terminal with multiple concourses. Check the departure door or check-in zone for the shortest arrival path.",
    transitAdvice: "The Doha Metro Red Line serves the airport. Include station access, service hours, luggage movement and the walk from the airport station to check-in.",
    finalLegAdvice: "Concourse trains and long gate distances can add time after security, especially for gates in the newer terminal extensions.",
    exampleOrigin: "West Bay", officialUrl: "https://dohahamadairport.com/", popularity: 94, coordinates: { latitude: 25.2731, longitude: 51.6081 },
  },
  {
    slug: "singapore-changi-sin", code: "SIN", name: "Singapore Changi Airport", shortName: "Changi Airport", city: "Singapore", destination: "Singapore Changi Airport (SIN), Singapore",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4"],
    airportAccess: "The East Coast Parkway, Pan Island Expressway and Tampines Expressway feed Changi from different parts of Singapore; rain, incidents and peak traffic can change the quickest approach.",
    terminalAdvice: "Terminals 1–3 are linked by Skytrain and walkways, while Terminal 4 uses a separate shuttle connection. Confirm the terminal before taking a taxi or train.",
    transitAdvice: "MRT passengers change at Tanah Merah or Expo depending on the route. The airport station serves Terminals 2 and 3, so T1 and T4 need another transfer.",
    finalLegAdvice: "Security screening may occur nearer the gate, and Jewel is landside. Do not let time in Jewel replace the time needed for immigration and the trip to your gate.",
    exampleOrigin: "City Hall", officialUrl: "https://www.changiairport.com/", popularity: 99, coordinates: { latitude: 1.3644, longitude: 103.9915 },
  },
  {
    slug: "hong-kong-hkg", code: "HKG", name: "Hong Kong International Airport", shortName: "Hong Kong Airport", city: "Hong Kong", destination: "Hong Kong International Airport (HKG), Hong Kong",
    terminals: ["Terminal 1"],
    airportAccess: "Lantau Link incidents, cross-harbour traffic and weather can affect road trips to the airport from Hong Kong Island, Kowloon and the New Territories.",
    terminalAdvice: "Most passenger departures use Terminal 1, but check-in aisles and gate areas span a very large building and satellite areas.",
    transitAdvice: "Airport Express is usually the most predictable trip from Central or Kowloon. Include the trip to the station, platform wait and walk from the airport platform to check-in.",
    finalLegAdvice: "Some gates require an automated people mover, bridge or bus. Add that movement after immigration and security rather than treating check-in as the finish line.",
    exampleOrigin: "Hong Kong Station", officialUrl: "https://www.hongkongairport.com/en/", popularity: 96, coordinates: { latitude: 22.3080, longitude: 113.9185 },
  },
  {
    slug: "tokyo-haneda-hnd", code: "HND", name: "Tokyo Haneda Airport", shortName: "Haneda Airport", city: "Tokyo, Japan", destination: "Tokyo Haneda Airport (HND), Japan",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Tokyo expressway congestion and bay-area traffic can make taxi time less predictable than the distance suggests.",
    terminalAdvice: "Terminals 1, 2 and 3 have separate stations and road entrances. Some international flights use Terminal 2 and others Terminal 3, so do not assume all international departures use one terminal.",
    transitAdvice: "Tokyo Monorail and Keikyu trains serve different city connections and terminal stations. Board for the exact terminal and check first-train times for early departures.",
    finalLegAdvice: "Add time for ticket gates, lifts with luggage, airline document checks and the walk from security to the assigned gate.",
    exampleOrigin: "Tokyo Station", officialUrl: "https://tokyo-haneda.com/en/", popularity: 100, coordinates: { latitude: 35.5494, longitude: 139.7798 },
  },
  {
    slug: "tokyo-narita-nrt", code: "NRT", name: "Narita International Airport", shortName: "Narita Airport", city: "Tokyo, Japan", destination: "Narita International Airport (NRT), Japan",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Narita is well outside central Tokyo. Expressway congestion, weather and the long distance make a missed rail connection more consequential.",
    terminalAdvice: "Terminals 1 and 2 have separate rail stations. Terminal 3 passengers use the Terminal 2 station and then walk or take the terminal bus.",
    transitAdvice: "Narita Express and Keisei services start from different Tokyo stations and have different stopping patterns. Choose the train for both your origin and terminal.",
    finalLegAdvice: "Terminal 3 adds a transfer from Terminal 2 station, and all terminals require time for airline checks, security, immigration and the gate walk.",
    exampleOrigin: "Shinjuku Station", officialUrl: "https://www.narita-airport.jp/en/", popularity: 95, coordinates: { latitude: 35.7720, longitude: 140.3929 },
  },
  {
    slug: "seoul-incheon-icn", code: "ICN", name: "Incheon International Airport", shortName: "Incheon Airport", city: "Seoul, South Korea", destination: "Incheon International Airport (ICN), South Korea",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "The airport expressway and bridges create a long trip from many parts of Seoul, with weather and peak traffic affecting road journeys.",
    terminalAdvice: "Terminal 1 and Terminal 2 are separate. Confirm the airline terminal before choosing an AREX stop, bus or taxi destination.",
    transitAdvice: "AREX serves both terminals, but Terminal 2 comes after Terminal 1 from Seoul. Airport buses can be convenient but remain exposed to road traffic.",
    finalLegAdvice: "Do not budget only to reach the airport station. Add check-in, immigration, security and the walk or train to distant concourses.",
    exampleOrigin: "Seoul Station", officialUrl: "https://www.airport.kr/ap/en/index.do", popularity: 96, coordinates: { latitude: 37.4602, longitude: 126.4407 },
  },
  {
    slug: "beijing-capital-pek", code: "PEK", name: "Beijing Capital International Airport", shortName: "Beijing Capital Airport", city: "Beijing, China", destination: "Beijing Capital International Airport (PEK), China",
    terminals: ["Terminal 2", "Terminal 3"],
    airportAccess: "Airport Expressway traffic and conditions across Beijing can make driving time highly dependent on the hour and starting district.",
    terminalAdvice: "Terminal 2 and Terminal 3 are separate buildings with different road approaches and Airport Express stops. Confirm PEK as well as the terminal; Beijing Daxing uses code PKX.",
    transitAdvice: "The Capital Airport Express serves Terminals 2 and 3. Include the trip to the metro, security checks entering transit and the walk from the airport station.",
    finalLegAdvice: "Terminal 3 is exceptionally large and can require an internal train and long walks before boarding.",
    exampleOrigin: "Dongzhimen", officialUrl: "https://en.bcia.com.cn/", popularity: 92, coordinates: { latitude: 40.0799, longitude: 116.6031 },
  },
  {
    slug: "shanghai-pudong-pvg", code: "PVG", name: "Shanghai Pudong International Airport", shortName: "Shanghai Pudong Airport", city: "Shanghai, China", destination: "Shanghai Pudong International Airport (PVG), China",
    terminals: ["Terminal 1", "Terminal 2", "Satellite Halls"],
    airportAccess: "Pudong is far from central Shanghai, and expressway traffic can vary sharply by time of day, weather and holiday travel.",
    terminalAdvice: "Terminal 1 and Terminal 2 connect to large satellite halls. Confirm the airline terminal and leave time for the airside people mover to the satellite gate.",
    transitAdvice: "Metro Line 2 and the Maglev reach Pudong with different transfer patterns and operating hours. The advertised ride time does not include the trip to the departure station.",
    finalLegAdvice: "Add airline document checks, exit or immigration formalities where applicable, security and the train or walk to the satellite concourse.",
    exampleOrigin: "People's Square", officialUrl: "https://www.shanghaiairport.com/enpd/index.html", popularity: 94, coordinates: { latitude: 31.1443, longitude: 121.8083 },
  },
  {
    slug: "delhi-del", code: "DEL", name: "Indira Gandhi International Airport", shortName: "Delhi Airport", city: "Delhi, India", destination: "Indira Gandhi International Airport (DEL), India",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Delhi and Gurugram traffic, weather, road closures and the final airport approaches can make journey times swing widely.",
    terminalAdvice: "Terminals 1, 2 and 3 are not one walkable check-in complex. Confirm the terminal in the airline booking before selecting a cab or metro route.",
    transitAdvice: "The Airport Express serves Terminal 3; Terminal 1 uses the Magenta Line, and Terminal 2 requires access from the T3 side. Include any inter-terminal transfer.",
    finalLegAdvice: "Airlines may check tickets or identification at terminal entry before check-in. Add that queue along with bag drop, security and the gate walk.",
    exampleOrigin: "New Delhi Station", officialUrl: "https://www.newdelhiairport.in/", popularity: 97, coordinates: { latitude: 28.5562, longitude: 77.1000 },
  },
  {
    slug: "mumbai-bom", code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", shortName: "Mumbai Airport", city: "Mumbai, India", destination: "Chhatrapati Shivaji Maharaj International Airport (BOM), India",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "Western Express Highway, city congestion, monsoon weather and construction can make Mumbai airport trips much longer than their distance suggests.",
    terminalAdvice: "Terminal 1 and Terminal 2 sit in different locations and are not connected by a quick passenger walkway. Going to the wrong terminal requires a road transfer.",
    transitAdvice: "Metro and suburban rail can cover part of the journey, but most routes still need a road connection with luggage to the correct terminal.",
    finalLegAdvice: "Allow for terminal-entry checks, airline document review, bag drop, security and potentially long walks inside Terminal 2.",
    exampleOrigin: "Bandra", officialUrl: "https://csmia.adaniairports.com/", popularity: 93, coordinates: { latitude: 19.0896, longitude: 72.8656 },
  },
  {
    slug: "sydney-syd", code: "SYD", name: "Sydney Airport", shortName: "Sydney Airport", city: "Sydney, Australia", destination: "Sydney Airport (SYD), Australia",
    terminals: ["Terminal 1 International", "Terminal 2 Domestic", "Terminal 3 Domestic"],
    airportAccess: "The M5, General Holmes Drive and airport precinct roads can congest heavily during Sydney peaks and incidents around the terminals.",
    terminalAdvice: "Terminal 1 is on the opposite side of the runways from domestic Terminals 2 and 3. A domestic-to-international terminal mistake requires a bus, train or road transfer.",
    transitAdvice: "Airport Link trains serve International and Domestic stations separately. Get off at the station for the terminal and include station access charges and platform-to-check-in time.",
    finalLegAdvice: "International departures add passport processing and may involve long walks. Domestic connections do not remove the landside transfer between terminal precincts.",
    exampleOrigin: "Sydney Central", officialUrl: "https://www.sydneyairport.com.au/", popularity: 95, coordinates: { latitude: -33.9399, longitude: 151.1753 },
  },
  {
    slug: "melbourne-mel", code: "MEL", name: "Melbourne Airport", shortName: "Melbourne Airport", city: "Melbourne, Australia", destination: "Melbourne Airport (MEL), Australia",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4"],
    airportAccess: "The Tullamarine Freeway and CityLink are vulnerable to Melbourne peak traffic, crashes and roadworks, with few equally fast alternatives.",
    terminalAdvice: "All four terminals share the same precinct, but they have different forecourts, parking access and check-in halls. Terminal 2 handles international flights.",
    transitAdvice: "Melbourne Airport has no passenger rail station. SkyBus, regional coaches and public buses all need road-time allowance and a walk from the stop.",
    finalLegAdvice: "Parking garages and bus stops do not place you at check-in. Add the terminal walk, bag drop, outbound passport control, security and gate distance.",
    exampleOrigin: "Southern Cross Station", officialUrl: "https://www.melbourneairport.com.au/", popularity: 92, coordinates: { latitude: -37.6690, longitude: 144.8410 },
  },
  {
    slug: "toronto-pearson-yyz", code: "YYZ", name: "Toronto Pearson International Airport", shortName: "Toronto Pearson Airport", city: "Toronto, Canada", destination: "Toronto Pearson International Airport (YYZ), Canada",
    terminals: ["Terminal 1", "Terminal 3"],
    airportAccess: "Highway 401, 409, 427 and airport roads can become congested during Toronto peaks, snow and major incidents.",
    terminalAdvice: "Terminal 1 and Terminal 3 have different road approaches, garages and UP Express access. Confirm the airline terminal before leaving.",
    transitAdvice: "UP Express arrives at Terminal 1. Terminal 3 passengers need the Terminal Link train after arriving at the airport.",
    finalLegAdvice: "US-bound passengers may complete US preclearance before departure. Add the airline's recommended time for check-in, security and border processing.",
    exampleOrigin: "Toronto Union Station", officialUrl: "https://www.torontopearson.com/", popularity: 96, coordinates: { latitude: 43.6777, longitude: -79.6248 },
  },
  {
    slug: "vancouver-yvr", code: "YVR", name: "Vancouver International Airport", shortName: "Vancouver Airport", city: "Vancouver, Canada", destination: "Vancouver International Airport (YVR), Canada",
    terminals: ["Main Terminal", "South Terminal"],
    airportAccess: "Bridge traffic, Richmond congestion, snow and incidents on the limited approaches to Sea Island can affect road arrival times.",
    terminalAdvice: "Most flights use the Main Terminal, while regional services may use the separate South Terminal. Confirm the building before choosing a train or road destination.",
    transitAdvice: "Canada Line trains reach the Main Terminal. South Terminal passengers need a separate ground connection and should not treat YVR station as arrival at check-in.",
    finalLegAdvice: "US departures may include US preclearance. International, US and domestic check-in areas follow different paths inside the Main Terminal.",
    exampleOrigin: "Waterfront Station", officialUrl: "https://www.yvr.ca/", popularity: 91, coordinates: { latitude: 49.1967, longitude: -123.1815 },
  },
  {
    slug: "manila-mnl", code: "MNL", name: "Ninoy Aquino International Airport", shortName: "Manila Airport", city: "Manila, Philippines", destination: "Ninoy Aquino International Airport (MNL), Philippines",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4"],
    airportAccess: "Metro Manila traffic can change dramatically with the hour, rain, incidents and queues on the final airport roads.",
    terminalAdvice: "The four terminals are separate and terminal assignments can change. A wrong-terminal arrival requires a road or shuttle transfer through airport-area traffic.",
    transitAdvice: "There is no direct passenger rail station inside the terminal system. Buses, hotel shuttles, taxis and rideshare all need a traffic allowance and exact terminal destination.",
    finalLegAdvice: "Allow for terminal-entry screening, airline document checks, bag drop, immigration, security and the walk to the gate.",
    exampleOrigin: "Makati", officialUrl: "https://www.miaa.gov.ph/", popularity: 90, coordinates: { latitude: 14.5086, longitude: 121.0198 },
  },
  {
    slug: "zurich-zrh", code: "ZRH", name: "Zurich Airport", shortName: "Zurich Airport", city: "Zurich, Switzerland", destination: "Zurich Airport (ZRH), Switzerland",
    terminals: ["Check-in 1", "Check-in 2", "Check-in 3", "Gates A, B/D and E"],
    airportAccess: "The A51 is the main motorway approach, while snow, commuting traffic and congestion around the airport exits can change driving time.",
    terminalAdvice: "Zurich is organized by check-in areas and gate zones rather than separate airline terminals. Gates E require the Skymetro after security and passport control.",
    transitAdvice: "The railway station is beneath the Airport Shopping complex and has frequent local and long-distance trains. Allow time to move upstairs with luggage to the assigned check-in area.",
    finalLegAdvice: "A non-Schengen flight may add passport control, and an E-gate departure adds the Skymetro and another walk after screening.",
    exampleOrigin: "Zurich Hauptbahnhof", officialUrl: "https://www.flughafen-zuerich.ch/en/passengers", reviewedOn: "2026-07-31", popularity: 91, coordinates: { latitude: 47.4581, longitude: 8.5555 },
  },
  {
    slug: "barcelona-el-prat-bcn", code: "BCN", name: "Josep Tarradellas Barcelona-El Prat Airport", shortName: "Barcelona Airport", city: "Barcelona, Spain", destination: "Barcelona-El Prat Airport (BCN), Spain",
    terminals: ["Terminal 1", "Terminal 2A", "Terminal 2B", "Terminal 2C"],
    airportAccess: "The C-31, C-32 and Barcelona ring roads can slow during commuter peaks, summer travel and events in the city.",
    terminalAdvice: "Terminal 1 and the Terminal 2 complex are separate. Aena provides a free shuttle, but a wrong-terminal arrival creates an avoidable transfer before check-in.",
    transitAdvice: "Metro L9 Sud serves both terminal areas, while the Rodalies railway station is at Terminal 2. Terminal 1 rail passengers must include the airport shuttle unless their chosen service stops there.",
    finalLegAdvice: "Confirm T1 or the specific T2 hall, then add the station or shuttle walk, bag drop, security and passport control for non-Schengen departures.",
    exampleOrigin: "Plaça de Catalunya", officialUrl: "https://www.aena.es/en/josep-tarradellas-barcelona-el-prat.html", reviewedOn: "2026-07-31", popularity: 94, coordinates: { latitude: 41.2974, longitude: 2.0833 },
  },
  {
    slug: "abu-dhabi-auh", code: "AUH", name: "Zayed International Airport", shortName: "Abu Dhabi Airport", city: "Abu Dhabi, United Arab Emirates", destination: "Zayed International Airport (AUH), Abu Dhabi, UAE",
    terminals: ["Terminal A"],
    airportAccess: "E10, E11 and Yas Island approaches can vary with Abu Dhabi commuting traffic, events and the longer road trip from Dubai.",
    terminalAdvice: "Scheduled passenger flights use the large Terminal A. Confirm the departure zone and airline check-in row so the driver uses the most useful entrance.",
    transitAdvice: "Public buses, airport taxis and intercity coaches are road-based. Travelers coming from Dubai should plan the full inter-emirate journey rather than a city-airport transfer.",
    finalLegAdvice: "Terminal A has four piers and long internal distances; US-bound Etihad passengers may also need time for US preclearance before the gate.",
    exampleOrigin: "Abu Dhabi Corniche", officialUrl: "https://www.zayedinternationalairport.ae/", reviewedOn: "2026-07-31", popularity: 92, coordinates: { latitude: 24.4330, longitude: 54.6511 },
  },
  {
    slug: "taipei-taoyuan-tpe", code: "TPE", name: "Taiwan Taoyuan International Airport", shortName: "Taoyuan Airport", city: "Taipei, Taiwan", destination: "Taiwan Taoyuan International Airport (TPE), Taiwan",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "National Freeway 2 and approaches from Taipei can slow during commuter periods, rain and holiday travel.",
    terminalAdvice: "Terminals 1 and 2 have separate check-in halls and Airport MRT stops. Confirm the airline terminal before boarding an express train or arranging a drop-off.",
    transitAdvice: "Taoyuan Airport MRT express and commuter trains have different stopping patterns. From Taipei Main Station, leave time for the long transfer through the station complex to the airport platforms.",
    finalLegAdvice: "Add terminal-entry walking, airline document checks, outbound immigration, security and the trip to a distant concourse gate.",
    exampleOrigin: "Taipei Main Station", officialUrl: "https://www.taoyuan-airport.com/?lang=en", reviewedOn: "2026-07-31", popularity: 94, coordinates: { latitude: 25.0797, longitude: 121.2342 },
  },
  {
    slug: "bangkok-suvarnabhumi-bkk", code: "BKK", name: "Suvarnabhumi Airport", shortName: "Bangkok Suvarnabhumi Airport", city: "Bangkok, Thailand", destination: "Suvarnabhumi Airport (BKK), Thailand",
    terminals: ["Main Terminal", "Satellite 1 Terminal"],
    airportAccess: "Bangkok expressways and the airport approach can become heavily congested, particularly in rain and weekday peaks.",
    terminalAdvice: "Suvarnabhumi and Don Mueang are different airports, so verify BKK rather than DMK first. Some BKK gates are in Satellite 1, reached by an automated train after screening.",
    transitAdvice: "The Airport Rail Link reaches the basement of the main terminal. Include the trip to the city station, platform wait and movement from the airport station to the airline row.",
    finalLegAdvice: "Outbound immigration, security and a possible train to Satellite 1 make the distance from check-in to the gate a meaningful part of the plan.",
    exampleOrigin: "Phaya Thai", officialUrl: "https://suvarnabhumi.airportthai.co.th/", reviewedOn: "2026-07-31", popularity: 97, coordinates: { latitude: 13.6900, longitude: 100.7501 },
  },
  {
    slug: "kuala-lumpur-kul", code: "KUL", name: "Kuala Lumpur International Airport", shortName: "Kuala Lumpur Airport", city: "Kuala Lumpur, Malaysia", destination: "Kuala Lumpur International Airport (KUL), Malaysia",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "KUL is far south of central Kuala Lumpur, and ELITE Highway traffic, storms and crashes can affect the long road journey.",
    terminalAdvice: "Terminal 1 and Terminal 2 are separate complexes several kilometres apart. Check the airline before choosing a KLIA Ekspres stop, bus or road destination.",
    transitAdvice: "KLIA Ekspres and KLIA Transit serve both terminals in sequence. Account for the correct stop and do not treat arrival at the first terminal as arrival at your airline.",
    finalLegAdvice: "Terminal 1 satellite gates and Terminal 2's long piers can add substantial walking or internal-transfer time after immigration and security.",
    exampleOrigin: "KL Sentral", officialUrl: "https://airports.malaysiaairports.com.my/kuala-lumpur-international-airport", reviewedOn: "2026-07-31", popularity: 94, coordinates: { latitude: 2.7456, longitude: 101.7072 },
  },
  {
    slug: "jakarta-soekarno-hatta-cgk", code: "CGK", name: "Soekarno-Hatta International Airport", shortName: "Jakarta Airport", city: "Jakarta, Indonesia", destination: "Soekarno-Hatta International Airport (CGK), Indonesia",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Jakarta toll-road congestion, flooding and crashes can turn the city-to-airport trip into the largest uncertainty in the calculation.",
    terminalAdvice: "Terminals 1, 2 and 3 are separate and airline assignments matter. A wrong-terminal arrival requires Skytrain or road movement before check-in.",
    transitAdvice: "The airport rail link reaches the integrated railway station, not an airline check-in desk. Add Skytrain or shuttle time from the station to the correct terminal.",
    finalLegAdvice: "Build in terminal-entry checks, airline document review, immigration, security and long concourse walks, especially in Terminal 3.",
    exampleOrigin: "Central Jakarta", officialUrl: "https://soekarnohatta.injourneyairports.id/", reviewedOn: "2026-07-31", popularity: 95, coordinates: { latitude: -6.1256, longitude: 106.6559 },
  },
  {
    slug: "bengaluru-blr", code: "BLR", name: "Kempegowda International Airport", shortName: "Bengaluru Airport", city: "Bengaluru, India", destination: "Kempegowda International Airport Bengaluru (BLR), India",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "The airport is north of Bengaluru, and Hebbal, Bellary Road and city traffic can make the trip far longer than the off-peak estimate.",
    terminalAdvice: "Terminal 1 and Terminal 2 have different forecourts and airline assignments. Confirm the terminal before boarding a bus or setting a cab destination.",
    transitAdvice: "Vayu Vajra airport buses are useful but share city roads. Their schedule is not protection against Bengaluru traffic, so include a missed or delayed service margin.",
    finalLegAdvice: "Allow for terminal-entry document checks, bag drop, security, outbound immigration and the walk through the assigned terminal.",
    exampleOrigin: "MG Road", officialUrl: "https://www.bengaluruairport.com/", reviewedOn: "2026-07-31", popularity: 92, coordinates: { latitude: 13.1986, longitude: 77.7066 },
  },
  {
    slug: "brisbane-bne", code: "BNE", name: "Brisbane Airport", shortName: "Brisbane Airport", city: "Brisbane, Australia", destination: "Brisbane Airport (BNE), Australia",
    terminals: ["Domestic Terminal", "International Terminal"],
    airportAccess: "Airport Drive, the Gateway Motorway and Brisbane commuter traffic can affect both car and bus journeys to the airport precinct.",
    terminalAdvice: "Domestic and International terminals are separate buildings. Going to the wrong one requires a train, bus or road transfer before check-in.",
    transitAdvice: "Airtrain serves both terminals at separate stations. Check the service schedule for early or late flights and get off at the terminal named on the booking.",
    finalLegAdvice: "International passengers need time for bag drop, outbound processing, security and the walk to the gate after leaving the station or car park.",
    exampleOrigin: "Brisbane Central", officialUrl: "https://www.bne.com.au/", reviewedOn: "2026-07-31", popularity: 88, coordinates: { latitude: -27.3842, longitude: 153.1175 },
  },
  {
    slug: "auckland-akl", code: "AKL", name: "Auckland Airport", shortName: "Auckland Airport", city: "Auckland, New Zealand", destination: "Auckland Airport (AKL), New Zealand",
    terminals: ["Domestic Terminal", "International Terminal"],
    airportAccess: "State Highway 20, Waterview and airport-area construction can produce significant delays from central Auckland and the North Shore.",
    terminalAdvice: "Domestic and International terminals are separate. The marked outdoor walkway or terminal bus adds time if parking, rideshare or a connection leaves you at the wrong building.",
    transitAdvice: "Auckland has no direct airport train. Airport buses and bus-to-train connections remain exposed to traffic and transfer timing.",
    finalLegAdvice: "Add the terminal transfer if required, airline check-in, outbound processing, security and the walk through the international pier.",
    exampleOrigin: "Britomart", officialUrl: "https://www.aucklandairport.co.nz/", reviewedOn: "2026-07-31", popularity: 89, coordinates: { latitude: -37.0082, longitude: 174.7850 },
  },
  {
    slug: "montreal-trudeau-yul", code: "YUL", name: "Montréal-Trudeau International Airport", shortName: "Montréal-Trudeau Airport", city: "Montréal, Canada", destination: "Montréal-Trudeau International Airport (YUL), Canada",
    terminals: ["Main Terminal", "Domestic, International and US checkpoints"],
    airportAccess: "Autoroutes 20 and 520, Montréal construction, winter weather and interchange congestion can make road travel unpredictable.",
    terminalAdvice: "YUL uses one terminal, but domestic, international and US departures split into different check-in and screening paths.",
    transitAdvice: "The 747 bus shares Montréal roads and can be affected by congestion. Plan from the actual stop and include the walk from the airport bus area to check-in.",
    finalLegAdvice: "US-bound travelers complete US preclearance before departure, so the airline's earlier check-in guidance may be the controlling deadline.",
    exampleOrigin: "Downtown Montréal", officialUrl: "https://www.admtl.com/en", reviewedOn: "2026-07-31", popularity: 90, coordinates: { latitude: 45.4706, longitude: -73.7408 },
  },
  {
    slug: "mexico-city-mex", code: "MEX", name: "Mexico City International Airport", shortName: "Mexico City Airport", city: "Mexico City, Mexico", destination: "Mexico City International Airport (MEX), Mexico",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "Mexico City congestion, demonstrations, rain and bottlenecks on Circuito Interior can make the final kilometres highly variable.",
    terminalAdvice: "Terminals 1 and 2 sit on opposite sides of the airfield. Confirm both the airport code MEX and terminal because the metropolitan area also has NLU and TLC airports.",
    transitAdvice: "Metro serves the Terminal 1 side; Terminal 2 requires another ground connection. The Aerotrén between terminals has access restrictions, so do not assume it solves every wrong-terminal trip.",
    finalLegAdvice: "Leave time for terminal-entry navigation, bag drop, security, immigration for international travel and crowded gate areas.",
    exampleOrigin: "Paseo de la Reforma", officialUrl: "https://www.aicm.com.mx/", reviewedOn: "2026-07-31", popularity: 96, coordinates: { latitude: 19.4361, longitude: -99.0719 },
  },
  {
    slug: "cancun-cun", code: "CUN", name: "Cancún International Airport", shortName: "Cancún Airport", city: "Cancún, Mexico", destination: "Cancún International Airport (CUN), Mexico",
    terminals: ["Terminal 2", "Terminal 3", "Terminal 4", "FBO Terminal"],
    airportAccess: "Highway 307 carries resort, construction and excursion traffic from Cancún, Playa del Carmen and the Riviera Maya.",
    terminalAdvice: "Terminals 2, 3 and 4 serve different airlines and routes and are not one indoor hall. A free airport shuttle connects them, but it adds waiting and transfer time.",
    transitAdvice: "Hotel transfers and ADO buses use terminal-specific stops and remain subject to Highway 307 traffic. Confirm pickup time and terminal rather than relying only on scheduled journey time.",
    finalLegAdvice: "Tourist-season queues, bag drop, exit-document checks where applicable, security and terminal transfers all belong before the gate deadline.",
    exampleOrigin: "Cancún Hotel Zone", officialUrl: "https://www.asur.com.mx/Contenido/Cancun/shopping", reviewedOn: "2026-07-31", popularity: 94, coordinates: { latitude: 21.0365, longitude: -86.8771 },
  },
  {
    slug: "sao-paulo-guarulhos-gru", code: "GRU", name: "São Paulo/Guarulhos International Airport", shortName: "São Paulo Guarulhos Airport", city: "São Paulo, Brazil", destination: "São Paulo Guarulhos International Airport (GRU), Brazil",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    airportAccess: "Marginal Tietê, Ayrton Senna and Dutra traffic can make the trip from São Paulo much longer during peaks, rain and incidents.",
    terminalAdvice: "The three terminals have different airline assignments; Terminal 3 handles many international flights. A wrong-terminal drop-off creates a walk or shuttle transfer.",
    transitAdvice: "Airport rail services reach the airport station, with transfer arrangements depending on the service. Include the connection from the platform area to the correct terminal.",
    finalLegAdvice: "International departures add airline document checks, emigration, security and long walks in Terminal 3.",
    exampleOrigin: "Avenida Paulista", officialUrl: "https://www.gru.com.br/en", reviewedOn: "2026-07-31", popularity: 96, coordinates: { latitude: -23.4356, longitude: -46.4731 },
  },
  {
    slug: "rio-galeao-gig", code: "GIG", name: "Rio de Janeiro/Galeão International Airport", shortName: "Rio Galeão Airport", city: "Rio de Janeiro, Brazil", destination: "Rio de Janeiro Galeão International Airport (GIG), Brazil",
    terminals: ["Terminal 2"],
    airportAccess: "Linha Vermelha, Avenida Brasil, bridge traffic, rain and incidents can sharply change the journey from Rio's South Zone or Niterói.",
    terminalAdvice: "Passenger operations are concentrated in Terminal 2. The important choice is the correct departure sector and airline check-in area rather than a terminal transfer.",
    transitAdvice: "BRT and airport buses are road-based and exposed to Rio traffic. Include the first connection to the bus and the walk from the airport stop to departures.",
    finalLegAdvice: "Allow for bag drop, airline document review, emigration, security and the walk through the concourse after reaching Ilha do Governador.",
    exampleOrigin: "Copacabana", officialUrl: "https://www.riogaleao.com/en", reviewedOn: "2026-07-31", popularity: 86, coordinates: { latitude: -22.8090, longitude: -43.2506 },
  },
  {
    slug: "bogota-el-dorado-bog", code: "BOG", name: "El Dorado International Airport", shortName: "Bogotá El Dorado Airport", city: "Bogotá, Colombia", destination: "El Dorado International Airport (BOG), Colombia",
    terminals: ["Terminal 1", "Puente Aéreo Terminal 2"],
    airportAccess: "Calle 26 congestion, Bogotá rain, road incidents and city events can make the airport trip vary widely even over a short distance.",
    terminalAdvice: "Most flights use Terminal 1, while selected domestic operations use Puente Aéreo. Confirm the terminal so a driver does not leave you at the wrong building.",
    transitAdvice: "TransMilenio and feeder services require transfers and luggage movement; taxis and buses share Calle 26 traffic. Plan the complete door-to-terminal trip.",
    finalLegAdvice: "International trips add airline document checks, emigration and security; the large main terminal can also involve a long walk to the gate.",
    exampleOrigin: "Chapinero", officialUrl: "https://eldorado.aero/en/", reviewedOn: "2026-07-31", popularity: 94, coordinates: { latitude: 4.7016, longitude: -74.1469 },
  },
  {
    slug: "lima-jorge-chavez-lim", code: "LIM", name: "Jorge Chávez International Airport", shortName: "Lima Airport", city: "Lima, Peru", destination: "Jorge Chávez International Airport (LIM), Peru",
    terminals: ["New Passenger Terminal"],
    airportAccess: "The airport's Callao location, Lima congestion and approaches to the new terminal can make travel time highly dependent on the starting district.",
    terminalAdvice: "All commercial passengers now use the new terminal. Old directions and saved map pins may point toward the former entrance, so route to the current passenger access.",
    transitAdvice: "Airport Express and public buses remain road-based. Confirm which terminal entrance the service uses and allow for Lima traffic plus the walk from the stop.",
    finalLegAdvice: "The new building changes curb, parking and check-in patterns; add airline checks, emigration, security and an unfamiliar gate walk.",
    exampleOrigin: "Miraflores", officialUrl: "https://www.lima-airport.com/en", reviewedOn: "2026-07-31", popularity: 92, coordinates: { latitude: -12.0219, longitude: -77.1143 },
  },
  {
    slug: "santiago-scl", code: "SCL", name: "Arturo Merino Benítez International Airport", shortName: "Santiago Airport", city: "Santiago, Chile", destination: "Santiago International Airport (SCL), Chile",
    terminals: ["Terminal 1 Domestic", "Terminal 2 International"],
    airportAccess: "Costanera Norte, Vespucio Norte and Santiago commuter traffic can affect the airport approach, especially from the eastern districts.",
    terminalAdvice: "Domestic Terminal 1 and International Terminal 2 are connected but have different forecourts and check-in halls. Route to the building that matches the flight.",
    transitAdvice: "Airport buses connect with city metro stations but the airport leg is still on the road. Include transfer, wait and luggage time at the city interchange.",
    finalLegAdvice: "International passengers need time for airline document checks, emigration, security and the walk through Terminal 2's piers.",
    exampleOrigin: "Providencia", officialUrl: "https://www.nuevopudahuel.cl/", reviewedOn: "2026-07-31", popularity: 91, coordinates: { latitude: -33.3930, longitude: -70.7858 },
  },
  {
    slug: "buenos-aires-ezeiza-eze", code: "EZE", name: "Ministro Pistarini International Airport", shortName: "Buenos Aires Ezeiza Airport", city: "Buenos Aires, Argentina", destination: "Ministro Pistarini International Airport (EZE), Argentina",
    terminals: ["New Departures Terminal", "International Arrivals Terminal", "Domestic Arrivals Terminal"],
    airportAccess: "Autopista Riccheri, Buenos Aires traffic, toll approaches and storms can affect the long journey to Ezeiza.",
    terminalAdvice: "Buenos Aires has two major airports: EZE and AEP. Confirm EZE first, then use the airline's current check-in zone within the connected terminal complex.",
    transitAdvice: "Airport coaches, public buses and taxis are road-based. Include city pickup, luggage loading and Riccheri traffic rather than using an advertised ride time alone.",
    finalLegAdvice: "International departures require airline checks, emigration, security and time to reach the assigned pier after check-in.",
    exampleOrigin: "Recoleta", officialUrl: "https://www.aeropuertosargentina.com/en/eze", reviewedOn: "2026-07-31", popularity: 91, coordinates: { latitude: -34.8222, longitude: -58.5358 },
  },
  {
    slug: "johannesburg-or-tambo-jnb", code: "JNB", name: "O. R. Tambo International Airport", shortName: "Johannesburg O. R. Tambo Airport", city: "Johannesburg, South Africa", destination: "O. R. Tambo International Airport (JNB), South Africa",
    terminals: ["Terminal A", "Terminal B"],
    airportAccess: "R24, R21 and Johannesburg-Pretoria traffic can slow airport trips, while severe storms can disrupt both roads and rail.",
    terminalAdvice: "Terminal A and Terminal B are connected but serve different check-in areas and route types. Confirm the airline hall before parking or drop-off.",
    transitAdvice: "Gautrain reaches the airport above the terminal complex from Sandton and Pretoria connections. Include the transfer at Sandton where required and the walk down to check-in.",
    finalLegAdvice: "International passengers should include airline document checks, emigration, security and the walk to gates beyond the central terminal spine.",
    exampleOrigin: "Sandton", officialUrl: "https://www.airports.co.za/airports/or-tambo-international-airport", reviewedOn: "2026-07-31", popularity: 93, coordinates: { latitude: -26.1337, longitude: 28.2420 },
  },
  {
    slug: "cape-town-cpt", code: "CPT", name: "Cape Town International Airport", shortName: "Cape Town Airport", city: "Cape Town, South Africa", destination: "Cape Town International Airport (CPT), South Africa",
    terminals: ["Central Terminal", "Domestic Departures", "International Departures"],
    airportAccess: "The N2 is the main city-airport route and can be affected by commuter traffic, crashes, road closures and strong winter weather.",
    terminalAdvice: "Domestic and international departure halls connect through the central building but have different check-in and processing paths.",
    transitAdvice: "Most travelers rely on private transfers, taxis, rideshare or rental cars. Every option uses the N2 or local roads, so live traffic matters.",
    finalLegAdvice: "Rental-car return, bag drop and outbound processing can add more time than the relatively compact terminal map suggests.",
    exampleOrigin: "V&A Waterfront", officialUrl: "https://www.airports.co.za/airports/cape-town-international-airport", reviewedOn: "2026-07-31", popularity: 89, coordinates: { latitude: -33.9715, longitude: 18.6021 },
  },
  {
    slug: "cairo-cai", code: "CAI", name: "Cairo International Airport", shortName: "Cairo Airport", city: "Cairo, Egypt", destination: "Cairo International Airport (CAI), Egypt",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3", "Seasonal Flights Terminal"],
    airportAccess: "Cairo traffic, the Ring Road, Suez Road and airport-area security approaches can make travel time vary greatly by hour.",
    terminalAdvice: "Terminals 1, 2 and 3 are separate. Confirm the airline terminal because a wrong drop-off requires an airport shuttle or another road movement.",
    transitAdvice: "Cairo Airport has no direct metro station. Buses, taxis and hotel transfers all depend on road conditions and terminal-specific drop-off.",
    finalLegAdvice: "Allow for terminal-entry screening, airline document checks, passport control, security and possible bus boarding to a remote stand.",
    exampleOrigin: "Downtown Cairo", officialUrl: "https://www.cairo-airport.com/", reviewedOn: "2026-07-31", popularity: 91, coordinates: { latitude: 30.1219, longitude: 31.4056 },
  },
  {
    slug: "addis-ababa-add", code: "ADD", name: "Addis Ababa Bole International Airport", shortName: "Addis Ababa Bole Airport", city: "Addis Ababa, Ethiopia", destination: "Addis Ababa Bole International Airport (ADD), Ethiopia",
    terminals: ["Terminal 1", "Terminal 2"],
    airportAccess: "Bole Road and city traffic can slow the short geographic trip, particularly during commuting periods and major events.",
    terminalAdvice: "Terminal 2 handles most international traffic while Terminal 1 serves selected regional and domestic flights. Confirm the terminal before drop-off.",
    transitAdvice: "There is no direct rail service to the terminal. Hotel shuttles, taxis and private transfers must include Addis Ababa road conditions and curb access.",
    finalLegAdvice: "Terminal-entry checks, airline document review, immigration, security and crowded departure areas can all add time before the gate.",
    exampleOrigin: "Meskel Square", officialUrl: "https://www.ethiopianairports.com/", reviewedOn: "2026-07-31", popularity: 88, coordinates: { latitude: 8.9779, longitude: 38.7993 },
  },
  {
    slug: "nairobi-jomo-kenyatta-nbo", code: "NBO", name: "Jomo Kenyatta International Airport", shortName: "Nairobi Airport", city: "Nairobi, Kenya", destination: "Jomo Kenyatta International Airport (NBO), Kenya",
    terminals: ["Terminal 1A", "Terminal 1B", "Terminal 1C", "Terminal 1D", "Terminal 1E", "Terminal 2"],
    airportAccess: "Mombasa Road, the Expressway, city traffic and incidents near the airport interchange can produce large differences in journey time.",
    terminalAdvice: "JKIA's Terminal 1 is divided into separate units and Terminal 2 is another building. Confirm the full unit, not merely Terminal 1.",
    transitAdvice: "Taxis, hotel transfers, buses and the airport rail connection all require a final road or shuttle step to the correct departures unit.",
    finalLegAdvice: "Include terminal-entry screening, airline checks, immigration, security and movement between the central processing area and gate.",
    exampleOrigin: "Westlands", officialUrl: "https://www.kaa.go.ke/airports/jomo-kenyatta-international-airport/", reviewedOn: "2026-07-31", popularity: 89, coordinates: { latitude: -1.3192, longitude: 36.9278 },
  },
];

export const additionalInternationalAirportProfiles: AirportLocationProfile[] =
  internationalAirportSeeds.map(createInternationalAirportProfile);

function validateInternationalAirportTexture(profiles: AirportLocationProfile[]): void {
  const seenFacts = new Map<string, string>();

  for (const profile of profiles) {
    const contextualFacts = [
      profile.modules[0]?.facts[1],
      ...((profile.modules[1]?.facts ?? [])),
    ].filter((fact): fact is string => Boolean(fact));

    if (contextualFacts.length < 4) {
      throw new Error(`${profile.code} needs four airport-specific planning facts`);
    }

    for (const fact of contextualFacts) {
      if (fact.length < 80) {
        throw new Error(`${profile.code} has an airport-specific fact that is too thin`);
      }
      const duplicateCode = seenFacts.get(fact);
      if (duplicateCode) {
        throw new Error(`${profile.code} repeats airport-specific copy from ${duplicateCode}`);
      }
      seenFacts.set(fact, profile.code);
    }
  }
}

validateInternationalAirportTexture(additionalInternationalAirportProfiles);
