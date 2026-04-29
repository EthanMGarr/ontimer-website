export const COUNTRY_TO_REGION: Record<string, string> = {
  // Asia-Pacific
  AU: 'Asia-Pacific', NZ: 'Asia-Pacific', JP: 'Asia-Pacific', KR: 'Asia-Pacific',
  CN: 'Asia-Pacific', HK: 'Asia-Pacific', TW: 'Asia-Pacific', SG: 'Asia-Pacific',
  MY: 'Asia-Pacific', TH: 'Asia-Pacific', VN: 'Asia-Pacific', PH: 'Asia-Pacific',
  ID: 'Asia-Pacific',
  // IN / SEA
  IN: 'IN / SEA', PK: 'IN / SEA', BD: 'IN / SEA', LK: 'IN / SEA',
  // Latin America
  BR: 'Latin America', MX: 'Latin America', AR: 'Latin America', CO: 'Latin America',
  CL: 'Latin America', PE: 'Latin America', VE: 'Latin America', EC: 'Latin America',
  BO: 'Latin America', PY: 'Latin America', UY: 'Latin America',
  // MEA
  AE: 'MEA', SA: 'MEA', EG: 'MEA', NG: 'MEA', ZA: 'MEA', KE: 'MEA',
  MA: 'MEA', GH: 'MEA', TZ: 'MEA', ET: 'MEA',
  // North America
  US: 'North America', CA: 'North America',
  // Western Europe
  GB: 'Western Europe', DE: 'Western Europe', FR: 'Western Europe', IT: 'Western Europe',
  ES: 'Western Europe', NL: 'Western Europe', SE: 'Western Europe', NO: 'Western Europe',
  DK: 'Western Europe', FI: 'Western Europe', CH: 'Western Europe', AT: 'Western Europe',
  BE: 'Western Europe', PT: 'Western Europe', IE: 'Western Europe', PL: 'Western Europe',
  CZ: 'Western Europe',
};

export function getRegion(countryCode: string): string {
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? 'ROW';
}
