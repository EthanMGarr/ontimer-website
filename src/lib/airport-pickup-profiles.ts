interface SourceLink {
  label: string;
  url: string;
}

export interface AirportPickupFaq {
  question: string;
  answer: string;
}

export interface AirportPickupProfile {
  slug: string;
  code: string;
  directAnswer: string;
  readyTimeGuidance: {
    domesticNoCheckedBag: string;
    domesticCheckedBag: string;
    international: string;
  };
  pickupRules: string[];
  waitingOptions: string[];
  terminalConsiderations: string[];
  groundAccessNotes: string[];
  faqs: AirportPickupFaq[];
  reviewedOn: string;
  reviewedLabel: string;
  sources: SourceLink[];
}

const reviewedOn = "2026-09-20";
const reviewedLabel = "Reviewed September 20, 2026";

export const airportPickupProfiles: AirportPickupProfile[] = [
  {
    slug: "los-angeles-lax",
    code: "LAX",
    directAnswer:
      "For an LAX pickup, work backward from when the passenger is likely to reach the Lower/Arrivals curb—not from scheduled landing. Wait in an official cell phone lot until they are outside with their bags, then allow for traffic through the Central Terminal Area.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Start with the scheduled landing time, then include deplaning and the walk to the Lower/Arrivals level.",
      domesticCheckedBag: "Add baggage-claim time before treating the passenger as ready at the curb.",
      international: "Add immigration, baggage claim and customs before the passenger can reach the public arrivals area.",
    },
    pickupRules: [
      "Private passenger pickup is on the outer curb of the Lower/Arrivals level outside baggage claim.",
      "The arrivals curb is for active pickup; do not park or wait at the terminal curb.",
      "Ask the passenger to send the terminal and nearby column or door marker only after reaching the curb.",
    ],
    waitingOptions: [
      "LAX operates two free, 24-hour cell phone waiting lots for private drivers.",
      "The official parking guidance permits waits of up to two hours, requires the vehicle to remain attended and does not provide a terminal shuttle from the waiting lots.",
    ],
    terminalConsiderations: [
      "LAX terminals sit on a loop, so a wrong terminal can mean another pass through Central Terminal Area traffic.",
      "Confirm the airline's arrival terminal shortly before leaving; schedules and operating terminals can change.",
    ],
    groundAccessNotes: [
      "Approach traffic on Century Boulevard, Sepulveda Boulevard, the 105 and the 405 can change the final drive materially.",
      "The calculator estimates the drive to LAX; keep enough margin for the final terminal-loop segment.",
    ],
    faqs: [
      {
        question: "Where do I pick someone up at LAX?",
        answer: "LAX directs private passenger pickups to the outer curb on the Lower/Arrivals level outside baggage claim. Wait until the passenger is outside and ready before entering the terminal loop.",
      },
      {
        question: "Can I wait at the LAX arrivals curb?",
        answer: "No. Use an official cell phone waiting lot, remain with the vehicle and drive to the terminal only after the passenger calls or texts from the curb.",
      },
      {
        question: "Does this calculator track the arriving flight?",
        answer: "No. It uses the scheduled landing time and planning assumptions. Check the airline or LAX flight information for delays, terminal changes and the current arrival status before leaving.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "LAX pickup and ground transportation", url: "https://www.flylax.com/lax-traffic-and-ground-transportation" },
      { label: "LAX official parking and cell phone lots", url: "https://www.flylax.com/parking-at-lax" },
    ],
  },
  {
    slug: "jfk",
    code: "JFK",
    directAnswer:
      "For a JFK pickup, calculate for the passenger's actual curb-ready time and use an official wait lot until they are outside. JFK currently recommends different free waiting options by terminal, and construction can make terminal access take longer than usual.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Include time to deplane and reach the correct terminal pickup point before the passenger is ready.",
      domesticCheckedBag: "Wait for the passenger to collect bags and reach the curb before leaving the waiting lot.",
      international: "Include passport control, baggage claim and customs before planning the curb handoff.",
    },
    pickupRules: [
      "Terminal curbs are for active pickups and drop-offs only; parking or leaving a vehicle unattended is not allowed.",
      "Ask the passenger to confirm the terminal and exact pickup marker after they reach the public curb.",
      "Review JFK advisories before leaving because construction can alter access and pickup patterns.",
    ],
    waitingOptions: [
      "The free Lefferts Boulevard wait lot connects to all terminals by a free AirTrain ride and is closest to Terminals 1 and 4.",
      "The free East Cell Phone Lot is less than five minutes from the terminals and is the recommended wait lot for Terminals 5, 7 and 8.",
    ],
    terminalConsiderations: [
      "The wait-lot choice changes with the arrival terminal, so confirm the airline's current terminal before choosing where to wait.",
      "AirTrain can be useful for meeting inside, but a curb pickup still requires coordination after the passenger reaches the public side.",
    ],
    groundAccessNotes: [
      "Van Wyck Expressway, Belt Parkway and terminal-road traffic can vary sharply by time of day.",
      "JFK advises that pickups may take longer during construction, so treat the calculated leave time as a plan to recheck—not a guarantee.",
    ],
    faqs: [
      {
        question: "Which JFK waiting lot should I use?",
        answer: "JFK recommends the Lefferts Boulevard wait lot for Terminals 1 and 4 and the East Cell Phone Lot for Terminals 5, 7 and 8. Confirm current advisories before driving.",
      },
      {
        question: "Can I wait outside a JFK terminal?",
        answer: "No. Terminal curbs are for active pickup only. Wait in an official free lot until the passenger is outside with their bags.",
      },
      {
        question: "Does this calculator include JFK construction delays?",
        answer: "It estimates the road trip for the selected time but does not monitor airport construction or a live flight. Review JFK advisories and the airline's arrival status before leaving.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "JFK official pickup and drop-off areas", url: "https://www.jfkairport.com/transportation/pick-up-drop-off" },
      { label: "JFK alerts and advisories", url: "https://www.jfkairport.com/alerts-advisories" },
    ],
  },
  {
    slug: "newark-ewr",
    code: "EWR",
    directAnswer:
      "For a Newark Airport pickup, plan for the passenger to finish deplaning, baggage and any international processing before reaching the curb. Wait in EWR's free Cell Phone Lot until they call; the terminal curb is only for an active pickup.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning and the walk through the terminal before expecting the passenger at the pickup curb.",
      domesticCheckedBag: "Treat baggage claim as a separate step and wait for confirmation that the passenger has their bags.",
      international: "Include passport control, baggage claim and customs before the passenger can call from the public curb.",
    },
    pickupRules: [
      "Parking is not permitted in front of or alongside EWR terminals; the curb is reserved for active pickup and drop-off.",
      "Do not enter the terminal roadway until the passenger and their bags are already outside.",
      "Have the passenger send the terminal and pickup marker to prevent an avoidable loop between terminals.",
    ],
    waitingOptions: [
      "EWR's free Cell Phone Lot is less than five minutes from all terminals.",
      "The lot has more than 100 spaces and sits near the airport entrance beside the P4 Daily Parking garage and AirTrain access.",
    ],
    terminalConsiderations: [
      "EWR has Terminals A, B and C; confirm the arrival terminal rather than navigating only to the airport name.",
      "If you plan to park and meet inside, use an official parking option and add the garage-to-terminal movement to the calculation.",
    ],
    groundAccessNotes: [
      "New Jersey Turnpike, Route 1/9 and terminal-road congestion can change the final drive.",
      "Use the result as the leave-time target, then recheck the arriving flight and airport advisories before setting out.",
    ],
    faqs: [
      {
        question: "Where can I wait to pick someone up at Newark Airport?",
        answer: "Use EWR's free Cell Phone Lot near the airport entrance and P4. It is less than five minutes from all terminals and is intended for drivers waiting for an arriving passenger.",
      },
      {
        question: "Can I wait at the EWR terminal curb?",
        answer: "No. The terminal curb is for active pickup only. Stay in the Cell Phone Lot until the passenger and their bags are outside.",
      },
      {
        question: "What should my passenger send me at EWR?",
        answer: "Ask for the terminal and the posted pickup door or marker after they reach the curb. That is more useful than the airline name alone.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "EWR official pickup and drop-off areas", url: "https://www.newarkairport.com/transportation/pick-up-drop-off" },
      { label: "EWR official parking", url: "https://www.newarkairport.com/transportation/parking" },
    ],
  },
  {
    slug: "laguardia-lga",
    code: "LGA",
    directAnswer:
      "For a LaGuardia pickup, calculate for when the passenger reaches the terminal curb with their bags. The curb is for active pickup only, so use LGA's free off-airport Cell Phone Lot if you arrive early and wait for the passenger to call.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Allow for deplaning and the walk through Terminal B or C before the passenger reaches the pickup level.",
      domesticCheckedBag: "Add baggage-claim time and wait for the passenger to confirm they have every bag.",
      international: "For the international arrivals that use LGA, include any required arrival processing before curb-ready time.",
    },
    pickupRules: [
      "Terminal curbsides are for active pickup and drop-off only; the passenger and all bags must be ready.",
      "Parking is not allowed on airport roadways or terminal frontages, and unattended vehicles may be towed.",
      "Confirm Terminal B or C and the passenger's exact pickup marker before leaving the waiting area.",
    ],
    waitingOptions: [
      "LGA's free Cell Phone Lot is off-airport on 94th Street between 23rd Avenue and Ditmars Boulevard.",
      "The lot is less than ten minutes from all terminals and is open daily from 7:00 AM to 11:59 PM Eastern Time.",
    ],
    terminalConsiderations: [
      "The terminal matters because the airport roadway and pickup approach differ between Terminals B and C.",
      "The All Terminals Shuttle links terminals, parking, rental cars and car-pickup areas when the passenger needs an airport transfer.",
    ],
    groundAccessNotes: [
      "Grand Central Parkway and local Queens traffic can make a short geographic trip take longer than expected.",
      "If the pickup is outside the Cell Phone Lot's operating hours, check current airport guidance before choosing where to wait.",
    ],
    faqs: [
      {
        question: "Where is the LaGuardia Cell Phone Lot?",
        answer: "It is on 94th Street between 23rd Avenue and Ditmars Boulevard, less than ten minutes from LGA terminals. The airport lists daily hours of 7:00 AM to 11:59 PM Eastern Time.",
      },
      {
        question: "Can I wait at the curb at LGA?",
        answer: "No. The terminal curb is for active pickup only, and the passenger must already be present with their bags.",
      },
      {
        question: "Should I navigate to the airline or the terminal?",
        answer: "Use the confirmed arrival terminal and the passenger's pickup marker. Airline operations can use different terminals, so verify the flight before leaving.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "LGA official pickup and drop-off areas", url: "https://www.laguardiaairport.com/transportation/pick-up-drop-off" },
      { label: "LGA official transportation options", url: "https://www.laguardiaairport.com/to-from-airport/airport-directions" },
    ],
  },
  {
    slug: "chicago-ohare-ord",
    code: "ORD",
    directAnswer:
      "For an O'Hare pickup, estimate when the passenger will reach the lower-level arrivals curb, then work backward through your drive. Curbside waiting is prohibited, so use the free Cell Phone Lot until the passenger has deplaned, collected bags and called.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Allow time to deplane and walk from the concourse to the lower-level arrivals curb.",
      domesticCheckedBag: "Wait for baggage claim to finish before treating the passenger as ready for pickup.",
      international: "International arrivals can require passport control, baggage claim and customs before the passenger reaches the public pickup area.",
    },
    pickupRules: [
      "Private passengers can be picked up on the lower level at the outermost curb by following Arrivals signs.",
      "Curbside waiting is prohibited; unattended vehicles may be ticketed and towed.",
      "Ask the passenger for Terminal 1, 2, 3 or 5 and a curb marker only after they reach the pickup level.",
    ],
    waitingOptions: [
      "O'Hare's free Cell Phone Lot is at 560 North Bessie Coleman Drive.",
      "The lot is intended for drivers waiting while passengers deplane, collect baggage and call for curbside pickup.",
    ],
    terminalConsiderations: [
      "Terminals 1, 2 and 3 form the domestic core, while Terminal 5 has a separate roadway approach used by many international arrivals.",
      "Meeting inside requires parking and possibly Airport Transit System movement, so enable the calculator's meet-inside option.",
    ],
    groundAccessNotes: [
      "Kennedy Expressway and I-190 traffic can change the drive from Chicago, especially around commuting periods.",
      "Winter weather and construction can affect both road access and the time needed to reach the correct terminal.",
    ],
    faqs: [
      {
        question: "Where do I pick someone up at O'Hare?",
        answer: "Follow Arrivals signs to the lower level and use the outermost curb. Confirm the terminal and curb marker with the passenger before entering the terminal roadway.",
      },
      {
        question: "Where can I wait at ORD?",
        answer: "Use the free O'Hare Cell Phone Lot at 560 North Bessie Coleman Drive until the passenger calls from the curb.",
      },
      {
        question: "Can I wait at the O'Hare arrivals curb?",
        answer: "No. O'Hare prohibits curbside waiting. The curb is for an active pickup after the passenger is already outside.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "O'Hare official pickup options", url: "https://flychicago.com/ohare/tofrom/dropoff/Pages/default.aspx" },
      { label: "O'Hare official terminal map", url: "https://www.flychicago.com/SiteCollectionDocuments/O%27Hare/Map/FullTerminal.pdf" },
    ],
  },
  {
    slug: "atlanta-atl",
    code: "ATL",
    directAnswer:
      "For an Atlanta Airport pickup, plan for when the passenger reaches the correct domestic or international arrivals curb—not when the aircraft lands. Use ATL's free Park and Wait Lot if you are early, then enter the terminal roadway after the passenger confirms the pickup side and door.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning and Plane Train or concourse-walking time before the passenger reaches the domestic arrivals lobby.",
      domesticCheckedBag: "Include baggage claim before the passenger chooses the North or South lower-level pickup side.",
      international: "Atlanta-bound international passengers must complete immigration, collect bags and clear customs before reaching the arrivals hall and outer curb.",
    },
    pickupRules: [
      "Confirm whether the passenger is exiting at the Domestic Terminal or Maynard H. Jackson Jr. International Terminal.",
      "International passenger pickup is on the outer curb of the lower-level roadway at the international terminal.",
      "For domestic pickup, ask the passenger to confirm the North or South side and door after collecting bags.",
    ],
    waitingOptions: [
      "ATL's free Park and Wait Lot is intended for brief waits while a traveler finishes their arrival.",
      "The official address is 1920 Autoport Drive, College Park, Georgia, with airport signs directing drivers from the domestic approach roads.",
    ],
    terminalConsiderations: [
      "The Domestic and International terminals have separate road approaches; choosing the wrong one creates a substantial correction.",
      "International arrivals at Concourses E or F may exit through the international arrivals hall after customs, so confirm the actual exit terminal with the passenger.",
    ],
    groundAccessNotes: [
      "I-75, I-85, I-285 and Camp Creek Parkway conditions can alter the drive to the airport campus.",
      "The Park and Wait Lot serves the domestic approach; check current ATL guidance if coordinating an international-terminal wait.",
    ],
    faqs: [
      {
        question: "Where should I pick up an international passenger at ATL?",
        answer: "ATL directs arriving international passengers to the lower-level roadway at the international terminal, with private passenger pickup on the outer curb.",
      },
      {
        question: "Where can I wait for a domestic ATL pickup?",
        answer: "Use the free Park and Wait Lot at 1920 Autoport Drive for a brief wait, then drive to the terminal after the passenger confirms their pickup side and door.",
      },
      {
        question: "Why do I need the ATL terminal before leaving?",
        answer: "The Domestic and International terminals have separate roadway approaches. Confirming the exit terminal prevents a time-consuming correction across the airport campus.",
      },
    ],
    reviewedOn,
    reviewedLabel,
    sources: [
      { label: "ATL official maps and international pickup guidance", url: "https://www.atl.com/maps/" },
      { label: "ATL official parking and Park and Wait Lot", url: "https://www.atl.com/parking/" },
    ],
  },
];

const pickupProfilesBySlug = new Map(
  airportPickupProfiles.map((profile) => [profile.slug, profile])
);

export function getAirportPickupProfile(slug: string): AirportPickupProfile | undefined {
  return pickupProfilesBySlug.get(slug);
}

export function getAirportPickupPath(slug: string): string {
  return `/airport-pickup/${slug}`;
}

export function isAirportPickupPilotSlug(slug: string): boolean {
  return pickupProfilesBySlug.has(slug);
}

export function validateAirportPickupProfiles(): void {
  const slugs = new Set<string>();
  const codes = new Set<string>();

  for (const profile of airportPickupProfiles) {
    if (slugs.has(profile.slug)) throw new Error(`Duplicate airport pickup slug: ${profile.slug}`);
    if (codes.has(profile.code)) throw new Error(`Duplicate airport pickup code: ${profile.code}`);
    if (profile.sources.length < 2) throw new Error(`${profile.code} needs at least two pickup sources`);
    if (profile.faqs.length < 3) throw new Error(`${profile.code} needs at least three pickup FAQs`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.reviewedOn)) throw new Error(`${profile.code} needs a valid review date`);
    if (profile.directAnswer.length < 120) throw new Error(`${profile.code} needs a substantive direct answer`);
    for (const source of profile.sources) {
      if (!source.url.startsWith("https://")) throw new Error(`${profile.code} has a non-HTTPS source`);
    }
    slugs.add(profile.slug);
    codes.add(profile.code);
  }
}

validateAirportPickupProfiles();
