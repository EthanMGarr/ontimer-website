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
const expansionReviewedOn = "2026-10-08";
const expansionReviewedLabel = "Reviewed October 8, 2026";

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
  {
    slug: "las-vegas-las",
    code: "LAS",
    directAnswer:
      "For a Las Vegas Airport pickup, calculate for when the passenger reaches the correct Terminal 1 or Terminal 3 pickup area with their bags. Wait in the free Cell Phone Lot until they are ready, then allow extra time for Strip traffic and the airport connector tunnel roadwork scheduled through December 2026.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning, any tram or concourse walk and the trip to the passenger-pickup level before expecting the traveler outside.",
      domesticCheckedBag: "Wait for baggage claim to finish before the passenger sends the terminal and numbered pickup column.",
      international: "Include immigration, baggage claim and customs before treating the passenger as ready at the Terminal 3 public pickup area.",
    },
    pickupRules: [
      "Confirm Terminal 1 or Terminal 3 before entering the airport road system; the two terminals have separate pickup approaches.",
      "Use the numbered columns in the passenger pickup area so the driver and passenger agree on one exact meeting point.",
      "Terminal curbs are for active loading only. If the passenger is not outside, return to the Cell Phone Lot or use short-term parking.",
    ],
    waitingOptions: [
      "LAS operates a free Cell Phone Lot on Kitty Hawk Way for drivers waiting for arriving passengers.",
      "The airport currently lists daily Cell Phone Lot hours of 6:00 AM to 1:00 AM; outside those hours, check the current parking guidance before leaving.",
    ],
    terminalConsiderations: [
      "Terminal 1 serves the A, B, C and some D gates, while Terminal 3 serves the E and some D gates; verify the airline's current arrival terminal rather than guessing from the gate letter.",
      "Passengers may need a tram or a long concourse walk before reaching baggage claim, so a gate arrival is not a curb-ready time.",
    ],
    groundAccessNotes: [
      "I-15, Paradise Road, Tropicana Avenue, resort traffic, conventions and Allegiant Stadium events can change the final drive materially.",
      "LAS is warning of airport connector tunnel lane closures through December 2026, so review current road alerts before relying on the calculated leave time.",
    ],
    faqs: [
      {
        question: "Where can I wait for a pickup at LAS?",
        answer: "Use the free Cell Phone Lot on Kitty Hawk Way while the passenger deplanes and collects bags. LAS currently lists the lot as open daily from 6:00 AM to 1:00 AM.",
      },
      {
        question: "How should my passenger identify the LAS pickup spot?",
        answer: "Ask for Terminal 1 or Terminal 3 plus the numbered pickup column after the passenger reaches the designated passenger-pickup area.",
      },
      {
        question: "Does this calculator include Las Vegas event traffic?",
        answer: "It estimates the road trip for the selected time, but it does not monitor conventions, stadium events or temporary tunnel closures. Check current traffic and airport alerts before leaving.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "LAS official passenger pickup guidance", url: "https://www.harryreidairport.com/passenger-drop-off-pick-up" },
      { label: "LAS official parking guidance", url: "https://www.harryreidairport.com/Parking" },
    ],
  },
  {
    slug: "dulles-iad",
    code: "IAD",
    directAnswer:
      "For a Dulles pickup, plan for the passenger to collect bags and reach the terminal curb before you leave the free Cell Phone Lot. Ask for the door number and whether they are on the arrivals or departures level, then include the long regional approach on the Dulles Access Road, Toll Road, Route 28 or I-495.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Allow for deplaning, concourse movement by AeroTrain or mobile lounge and the walk through the Main Terminal to the curb.",
      domesticCheckedBag: "Add baggage-claim time and wait until the passenger has their bags before approaching the terminal roadway.",
      international: "Include immigration, baggage claim and customs before the passenger can enter the public arrivals area and choose a pickup door.",
    },
    pickupRules: [
      "Have the passenger call only after reaching the curb, then send the door number and the arrivals or departures level.",
      "There is no waiting at the terminal curb; a longer stop can lead to a ticket or towing.",
      "Use any open pickup space near the confirmed door rather than blocking a travel lane while searching for the passenger.",
    ],
    waitingOptions: [
      "IAD's free Cell Phone Lot is on Autopilot Drive near Aviation Drive and the airport Marriott approach.",
      "The airport limits the wait to one hour, requires the vehicle to remain attended and notes that the lot has no restroom facilities.",
    ],
    terminalConsiderations: [
      "All passengers exit through the Main Terminal, but the time from aircraft to curb varies with the arrival concourse and whether AeroTrain or a mobile lounge is involved.",
      "A door number and level are more useful for the final handoff than the airline name alone.",
    ],
    groundAccessNotes: [
      "Dulles trips often involve long approaches on the Dulles Access Road, Dulles Toll Road, Route 28, I-495 and suburban arterials.",
      "Treat the calculator result as the time to start the regional drive, then recheck the flight before leaving the Cell Phone Lot for the curb.",
    ],
    faqs: [
      {
        question: "Where is the Dulles Cell Phone Lot?",
        answer: "It is on Autopilot Drive. Follow the SERVICES exit toward Aviation Drive, turn onto Autopilot Drive and follow airport signs to the free waiting lot.",
      },
      {
        question: "How long can I wait in the IAD Cell Phone Lot?",
        answer: "Dulles currently permits a free wait of up to one hour. The vehicle must remain attended, and the airport says the lot has no restroom facilities.",
      },
      {
        question: "What should an arriving passenger send me at IAD?",
        answer: "Ask for the terminal door number and whether they are waiting on the arrivals or departures level after they have collected every bag and reached the curb.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "Dulles official Cell Phone Lot guidance", url: "https://www.flydulles.com/cell-phone-lot" },
      { label: "Dulles official parking information", url: "https://www.flydulles.com/parking-transportation/parking-information" },
    ],
  },
  {
    slug: "denver-den",
    code: "DEN",
    directAnswer:
      "For a Denver Airport pickup, calculate for when the passenger reaches Jeppesen Terminal Level 4—not when the flight lands. Friends and family pickup uses both the east and west sides on Level 4, and the long Peña Boulevard approach means the passenger's side and door should be confirmed before you leave the waiting lot.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning, the train or Concourse A bridge route, and the trip from Level 5 baggage claim down to Level 4.",
      domesticCheckedBag: "Wait for baggage claim on Level 5 to finish before the passenger goes down to the Level 4 pickup curb.",
      international: "Include immigration, baggage claim and customs before the passenger can reach the public side of Jeppesen Terminal and descend to Level 4.",
    },
    pickupRules: [
      "Private friends-and-family pickup is on Jeppesen Terminal Level 4 on both the east and west sides.",
      "Ask for east or west plus the nearest door after the passenger reaches Level 4; a door number without the side is incomplete.",
      "Do not wait on the terminal roadway. Use the free Final Approach waiting lot until the passenger is ready.",
    ],
    waitingOptions: [
      "DEN's Final Approach cell phone waiting lot is free and sits about three miles from Jeppesen Terminal on the north side of Peña Boulevard at 77th Avenue.",
      "The airport is developing a new south-side waiting facility, so verify current signage before the drive rather than relying on an old map pin.",
    ],
    terminalConsiderations: [
      "All friends-and-family pickups use Jeppesen Terminal, but the passenger still needs to choose the east or west Level 4 curb.",
      "Passengers arriving at Concourses B or C must take the train to Jeppesen Terminal; Concourse A passengers may use the train or bridge route.",
    ],
    groundAccessNotes: [
      "I-70, Peña Boulevard, winter weather and the unusually long final airport approach can all move the leave-time answer.",
      "If weather or a Peña Boulevard incident is developing, add margin before starting the drive rather than trying to recover it at the terminal curb.",
    ],
    faqs: [
      {
        question: "Where do I pick up family or friends at DEN?",
        answer: "Use Level 4 of Jeppesen Terminal. Pickup is available on both east and west sides at all doors, so ask the passenger for both the side and door.",
      },
      {
        question: "Where can I wait for a Denver Airport pickup?",
        answer: "Use the free Final Approach cell phone waiting lot, about three miles from Jeppesen Terminal along Peña Boulevard near 77th Avenue.",
      },
      {
        question: "Why can a DEN passenger take time to reach pickup after landing?",
        answer: "The passenger may need a concourse train or bridge route, baggage claim on Level 5 and then an elevator or escalator down to the Level 4 pickup curb.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "DEN official passenger pickup locations", url: "https://www.flydenver.com/parking-and-transportation/passenger-pickup/" },
      { label: "DEN official parking and Final Approach guidance", url: "https://www.flydenver.com/parking-and-transportation/parking-lots/" },
    ],
  },
  {
    slug: "boston-bos",
    code: "BOS",
    directAnswer:
      "For a Boston Logan pickup, calculate for when the passenger reaches the correct Terminal A, B, C or E passenger-pickup area with their bags. Use the free Cell Phone Lot for a short wait, then account for tunnel traffic, airport roadway construction and terminal-specific pickup routing before entering the curb system.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning and the walk through the correct terminal to its signed passenger-pickup area.",
      domesticCheckedBag: "Wait for baggage claim to finish before the passenger sends the terminal, door and pickup zone.",
      international: "Include immigration, baggage claim and customs before the passenger reaches the public Terminal E pickup area.",
    },
    pickupRules: [
      "Confirm Terminal A, B, C or E and follow current signs for private passenger pickup; airport construction can change the final route.",
      "Ask the passenger for the terminal and nearest posted door or pickup-zone marker only after they reach the public side.",
      "Use short-term parking if you plan to meet inside rather than trying to wait at the terminal curb.",
    ],
    waitingOptions: [
      "Massport provides a free Cell Phone Lot for drivers waiting for an arriving passenger and currently limits the wait to 30 minutes.",
      "Massport has announced a Cell Phone Lot move to 6 Tomahawk Drive, so follow current airport signs and construction notices rather than an older saved location.",
    ],
    terminalConsiderations: [
      "Boston Logan has four terminals with separate roadway branches, so the terminal is essential even when the airport is close to downtown.",
      "Terminal E handles many international arrivals, while construction or curb changes can alter the signed private-vehicle pickup path.",
    ],
    groundAccessNotes: [
      "I-90, the Ted Williams Tunnel, Sumner Tunnel traffic, harbor crossings and downtown events can turn a short geographic trip into a variable drive.",
      "Check Massport's roadway and construction updates before leaving, especially when a tunnel closure or terminal detour is active.",
    ],
    faqs: [
      {
        question: "Where can I wait for a pickup at Boston Logan?",
        answer: "Use Massport's free Cell Phone Lot for a short wait. Massport currently lists a 30-minute maximum and has announced a relocation to 6 Tomahawk Drive, so follow current signs.",
      },
      {
        question: "What should my passenger send me at BOS?",
        answer: "Ask for Terminal A, B, C or E plus the nearest posted door or passenger-pickup marker after the passenger has collected every bag.",
      },
      {
        question: "Does the BOS calculator account for tunnel closures?",
        answer: "It estimates the road trip for the selected time, but it does not monitor a live tunnel closure or temporary airport detour. Check Massport roadway updates before leaving.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "Boston Logan official parking and Cell Phone Lot guidance", url: "https://www.massport.com/logan-airport/getting-to-logan/parking" },
      { label: "Boston Logan roadway and construction updates", url: "https://www.massport.com/logan-airport/getting-to-logan/roadway-and-construction-updates" },
    ],
  },
  {
    slug: "portland-pdx",
    code: "PDX",
    directAnswer:
      "For a Portland Airport pickup, calculate for when the passenger reaches the curb with every bag, then choose the upper or lower terminal roadway based on current congestion. PDX allows active pickup on either level and recommends the Cell Phone Waiting Lot instead of circling while the passenger is still inside.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning and the walk through the main terminal before the passenger reaches the upper or lower pickup roadway.",
      domesticCheckedBag: "Wait for baggage claim to finish and for every bag to be at the curb before entering the active-loading area.",
      international: "Include immigration, baggage claim and customs before the passenger can reach the public terminal roadway.",
    },
    pickupRules: [
      "Private pickup is allowed on both the upper and lower roadways in front of the terminal, but only while the passenger and luggage are ready to load.",
      "The vehicle may not be left unattended at the curb.",
      "Ask the passenger which level and door they chose; PDX notes that the upper roadway is often less congested for evening pickups.",
    ],
    waitingOptions: [
      "Use the PDX Cell Phone Waiting Lot instead of circling when the passenger has not yet reached the curb.",
      "If you need more time or plan to meet inside, use the parking garage directly across from the terminal and add the walk to the calculation.",
    ],
    terminalConsiderations: [
      "PDX has one main terminal, so the most useful handoff detail is the upper or lower roadway plus the nearest door.",
      "The rebuilt main terminal changed walking patterns, and ongoing airport work can still affect curb routing and the passenger's path from the concourse.",
    ],
    groundAccessNotes: [
      "I-205, Airport Way, Columbia River bridge traffic, weather and airport construction can change the drive from Portland or Vancouver.",
      "The lower roadway can become congested; coordinate the level before leaving the waiting lot rather than switching after entering the terminal loop.",
    ],
    faqs: [
      {
        question: "Can I pick someone up on the upper roadway at PDX?",
        answer: "Yes. PDX permits active pickup on both upper and lower terminal roadways and notes that the upper roadway is often a useful evening alternative when the lower level is congested.",
      },
      {
        question: "Can I wait at the PDX curb?",
        answer: "No. The passenger and all luggage must be at the curb for active loading. Use the Cell Phone Waiting Lot if they are still inside.",
      },
      {
        question: "What pickup detail should a PDX passenger send?",
        answer: "Ask for upper or lower roadway plus the nearest door after the passenger has every bag and is standing at the curb.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "PDX official curbside pickup guidance", url: "https://www.flypdx.com/TravelTips" },
      { label: "PDX official parking guidance", url: "https://www.flypdx.com/Parking" },
    ],
  },
  {
    slug: "dallas-fort-worth-dfw",
    code: "DFW",
    directAnswer:
      "For a DFW pickup, calculate for when the passenger reaches the correct Terminal A, B, C, D or E baggage-claim exit, then work backward through International Parkway and the airport entry plaza. Use the north or south Cell Phone Lot until they call, because all terminal curbs are for active loading only.",
    readyTimeGuidance: {
      domesticNoCheckedBag: "Add deplaning and the walk to the baggage-claim level and correct terminal exit before expecting the passenger at the curb.",
      domesticCheckedBag: "Wait for baggage claim to finish and have the passenger send the terminal plus the nearest exit door.",
      international: "Include immigration, baggage claim and customs in Terminal D before the passenger can reach the public pickup curb.",
    },
    pickupRules: [
      "Confirm Terminal A, B, C, D or E before entering International Parkway; correcting to another terminal can consume meaningful time.",
      "All terminal curbs are for active loading and unloading only. Vehicles that are unattended or not loading may be fined.",
      "If you need time to meet the passenger, DFW provides one-hour spaces in the first rows of Terminal Parking.",
    ],
    waitingOptions: [
      "DFW operates free Cell Phone Lots at both the north and south ends of the airport, allowing a wait of up to two hours.",
      "Both lots are open 24 hours, and the vehicle must remain attended; choose the lot that matches your regional approach and the passenger's terminal.",
    ],
    terminalConsiderations: [
      "DFW's five terminals stretch along International Parkway, so the terminal and north-or-south approach matter before the final drive.",
      "Skylink is inside security; it does not make a wrong curbside terminal choice quick for a driver waiting outside.",
    ],
    groundAccessNotes: [
      "SH 183, SH 114, SH 121, I-635, International Parkway and entry-plaza traffic vary with the driver's Dallas, Fort Worth or northern-suburb approach.",
      "DFW uses north and south entry plazas, and non-TollTag drivers should be prepared for contactless payment lanes rather than assuming a cash lane.",
    ],
    faqs: [
      {
        question: "Where can I wait for a DFW pickup?",
        answer: "Use the free north or south Cell Phone Lot. DFW currently allows up to two hours, keeps both lots open 24/7 and requires the vehicle to remain attended.",
      },
      {
        question: "Can I wait at a DFW terminal curb?",
        answer: "No. Terminal curbs are for active loading only. Use a Cell Phone Lot or a one-hour Terminal Parking space until the passenger is ready.",
      },
      {
        question: "Why should I confirm the DFW terminal before leaving?",
        answer: "Terminals A through E are spread along International Parkway. A wrong terminal or wrong north-or-south approach can add a substantial correction to the pickup.",
      },
    ],
    reviewedOn: expansionReviewedOn,
    reviewedLabel: expansionReviewedLabel,
    sources: [
      { label: "DFW official pickup and driving directions", url: "https://www.dfwairport.com/explore/transportation/directions/" },
      { label: "DFW official Cell Phone Lot guidance", url: "https://www.dfwairport.com/park/" },
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
    if (profile.pickupRules.length < 3) throw new Error(`${profile.code} needs at least three pickup rules`);
    if (profile.waitingOptions.length < 2) throw new Error(`${profile.code} needs at least two waiting options`);
    if (profile.terminalConsiderations.length < 2) throw new Error(`${profile.code} needs at least two terminal considerations`);
    if (profile.groundAccessNotes.length < 2) throw new Error(`${profile.code} needs at least two ground-access notes`);
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
