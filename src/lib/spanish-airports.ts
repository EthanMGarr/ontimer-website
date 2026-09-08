import { spanishAirportSlugs } from "./i18n";

export type SpanishAirportSlug = (typeof spanishAirportSlugs)[number];

export interface SpanishAirportCopy {
  shortName: string;
  city: string;
  directAnswer: string;
  airportAccess: string;
  terminalAdvice: string;
  transitAdvice: string;
  finalLegAdvice: string;
}

export const spanishAirportCopy: Record<SpanishAirportSlug, SpanishAirportCopy> = {
  "madrid-barajas-mad": {
    shortName: "Aeropuerto Adolfo Suárez Madrid-Barajas",
    city: "Madrid, España",
    directAnswer: "Calcula hacia atrás desde la salida de tu vuelo e incluye el trayecto hasta MAD, el acceso a la terminal correcta, la facturación, la seguridad y el recorrido hasta la puerta. La T4S requiere además el tren automático desde la T4 y, cuando corresponda, el control de pasaportes.",
    airportAccess: "Las vías M-11, M-12, M-13 y M-14 sirven zonas distintas del aeropuerto. El tráfico de Madrid puede cambiar tanto la duración como la ruta más conveniente.",
    terminalAdvice: "Las terminales T1–T3 y la T4 están en zonas separadas. La T4S es un edificio satélite al que se llega desde la T4 después de facturar y pasar seguridad.",
    transitAdvice: "Metro y Cercanías no paran del mismo modo en todas las terminales. Elige la estación de T1–T2–T3 o T4 y añade cualquier traslado dentro del aeropuerto.",
    finalLegAdvice: "Para un vuelo desde T4S, incluye el tren automático, el posible control de pasaportes y el recorrido hasta la puerta.",
  },
  "barcelona-el-prat-bcn": {
    shortName: "Aeropuerto Josep Tarradellas Barcelona-El Prat",
    city: "Barcelona, España",
    directAnswer: "Trabaja hacia atrás desde la salida del vuelo e incluye el trayecto hasta BCN, la terminal correcta, la facturación, la seguridad y el recorrido hasta la puerta. Llegar a la terminal equivocada puede añadir un traslado considerable entre T1 y T2.",
    airportAccess: "La C-31, la C-32 y las rondas de Barcelona pueden ralentizarse en horas punta, durante el verano y cuando hay grandes eventos en la ciudad.",
    terminalAdvice: "La T1 y el complejo T2 están separados. Aena ofrece un autobús gratuito entre terminales, pero el traslado añade espera y recorrido antes de facturar.",
    transitAdvice: "La L9 Sud del metro sirve ambas zonas. La estación de Rodalies está en la T2, por lo que quienes necesiten la T1 deben incluir el enlace correspondiente.",
    finalLegAdvice: "Confirma T1 o la zona concreta de T2 y añade el recorrido desde la estación o parada, la entrega de equipaje, la seguridad y el control de pasaportes para vuelos no Schengen.",
  },
  "mexico-city-mex": {
    shortName: "Aeropuerto Internacional de la Ciudad de México",
    city: "Ciudad de México, México",
    directAnswer: "Calcula hacia atrás desde la salida del vuelo e incluye el tráfico hasta MEX, la terminal correcta, la facturación, la seguridad y el recorrido hasta la puerta. Confirma tanto el código MEX como la terminal, porque la zona metropolitana también cuenta con NLU y TLC.",
    airportAccess: "La congestión, la lluvia, las manifestaciones y los cuellos de botella de Circuito Interior pueden hacer muy variable el tramo final hasta el aeropuerto.",
    terminalAdvice: "Las terminales 1 y 2 están en lados opuestos del aeródromo. Verifica la terminal asignada antes de organizar el transporte o aparcamiento.",
    transitAdvice: "El Metro llega al lado de la Terminal 1; la Terminal 2 requiere otra conexión. El Aerotrén tiene restricciones de acceso, así que no resuelve todos los traslados entre terminales.",
    finalLegAdvice: "Añade tiempo para orientarte, documentar equipaje, pasar seguridad, completar migración en vuelos internacionales y llegar a la puerta.",
  },
  "bogota-el-dorado-bog": {
    shortName: "Aeropuerto Internacional El Dorado",
    city: "Bogotá, Colombia",
    directAnswer: "Calcula hacia atrás desde la salida del vuelo e incluye el trayecto por Bogotá, la terminal correcta, la facturación, la seguridad y el recorrido hasta la puerta. El tráfico de la Calle 26 puede cambiar mucho incluso en distancias cortas.",
    airportAccess: "La congestión de la Calle 26, la lluvia, los incidentes viales y los eventos de la ciudad pueden variar ampliamente la duración del viaje.",
    terminalAdvice: "La mayoría de los vuelos usan la Terminal 1; algunas operaciones nacionales usan Puente Aéreo. Confirma la terminal para evitar llegar al edificio equivocado.",
    transitAdvice: "TransMilenio y sus alimentadores requieren transbordos y movimiento de equipaje. Taxis y autobuses comparten el tráfico de la Calle 26: planifica el trayecto completo hasta la terminal.",
    finalLegAdvice: "Los viajes internacionales añaden revisión documental, emigración y seguridad. La terminal principal también puede requerir un recorrido largo hasta la puerta.",
  },
  "lima-jorge-chavez-lim": {
    shortName: "Aeropuerto Internacional Jorge Chávez",
    city: "Lima, Perú",
    directAnswer: "Calcula hacia atrás desde la salida del vuelo e incluye el trayecto hasta el nuevo terminal de LIM, la facturación, la seguridad y el recorrido hasta la puerta. Comprueba que el mapa o transporte utilice el acceso actual para pasajeros.",
    airportAccess: "La ubicación en Callao, la congestión de Lima y los accesos al nuevo terminal hacen que el tiempo de viaje dependa mucho del distrito de partida.",
    terminalAdvice: "Todos los pasajeros comerciales utilizan ahora el nuevo terminal. Algunas rutas guardadas todavía pueden apuntar al antiguo acceso, así que verifica el destino antes de salir.",
    transitAdvice: "Los autobuses y servicios Airport Express siguen circulando por carretera. Confirma la entrada que utiliza el servicio y añade el tráfico y el recorrido desde la parada.",
    finalLegAdvice: "El nuevo edificio cambia los accesos, el aparcamiento y la facturación. Incluye controles de la aerolínea, migración, seguridad y un recorrido por una terminal todavía poco familiar.",
  },
  "santiago-scl": {
    shortName: "Aeropuerto Internacional Arturo Merino Benítez",
    city: "Santiago, Chile",
    directAnswer: "Calcula hacia atrás desde la salida del vuelo e incluye el trayecto hasta SCL, el acceso a la terminal nacional o internacional correcta, la facturación, la seguridad y el recorrido hasta la puerta.",
    airportAccess: "Costanera Norte, Vespucio Norte y el tráfico de Santiago pueden afectar el acceso, especialmente desde los barrios del sector oriente.",
    terminalAdvice: "La Terminal 1 nacional y la Terminal 2 internacional están conectadas, pero tienen accesos y zonas de facturación distintos. Dirígete al edificio que corresponde a tu vuelo.",
    transitAdvice: "Los autobuses del aeropuerto conectan con estaciones de metro, pero el tramo aeroportuario sigue siendo por carretera. Incluye el transbordo, la espera y el movimiento de equipaje.",
    finalLegAdvice: "Los pasajeros internacionales necesitan tiempo para la revisión documental, emigración, seguridad y el recorrido por los espigones de la Terminal 2.",
  },
};

export function isSpanishAirportSlug(slug: string): slug is SpanishAirportSlug {
  return Object.prototype.hasOwnProperty.call(spanishAirportCopy, slug);
}
