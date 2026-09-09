export type TradeoffPoint = {
  title: string;
  summary: string;
  effects: string[];
  steelman: string;
};

export type TradeoffScenario = {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  leftLabel: string;
  rightLabel: string;
  context: string;
  left: TradeoffPoint;
  right: TradeoffPoint;
};

export const tradeoffScenarios: TradeoffScenario[] = [
  {
    id: "capital-tax-investment",
    slug: "kapitalskatt-vs-investeringsvilja",
    title: "Kapitalskatt vs investeringsvilja",
    prompt: "Hur ska ett samhälle väga skatteuttag mot incitament att investera och bygga nytt kapital?",
    leftLabel: "Mer kapitalskatt",
    rightLabel: "Starkare investeringsincitament",
    context:
      "Båda sidor försöker lösa verkliga problem: den ena betonar finansiering, jämlikhet och legitimitet; den andra kapitalbildning, risktagande och långsiktig tillväxt.",
    left: {
      title: "Fokus på jämlikhet och kollektiv finansiering",
      summary:
        "Ett högre uttag på kapital kan stärka statens förmåga att finansiera välfärd och minska skillnader mellan den som lever på arbete och den som främst lever på ägande.",
      effects: [
        "Kan öka skatteintäkter till gemensam service och trygghetssystem.",
        "Kan upplevas som mer legitimt när kapitalinkomster beskattas närmare arbetsinkomster.",
        "Riskerar att minska vissa investeringar eller driva kapital till andra marknader om utformningen blir för trubbig.",
      ],
      steelman:
        "Det starkaste argumentet är att stabila samhällen kräver fungerande institutioner och social legitimitet. Om kapital koncentreras för snabbt utan rimligt återflöde till det gemensamma blir både sammanhållning och marknadsekonomi politiskt skörare.",
    },
    right: {
      title: "Fokus på frihet, risktagande och kapitalbildning",
      summary:
        "Lägre skatt på kapital kan göra det mer attraktivt att investera, anställa och ta långsiktiga risker i produktiva verksamheter som stärker ekonomin över tid.",
      effects: [
        "Kan förbättra avkastningen på entreprenörskap och innovation.",
        "Kan göra det lättare att attrahera investeringar i konkurrens med andra länder.",
        "Riskerar att öka skillnader i förmögenhet och minska resurser till offentlig sektor om effekterna inte fångas upp på annat sätt.",
      ],
      steelman:
        "Det starkaste argumentet är att nästan all framtida välfärd bygger på att människor vågar spara, investera och bygga företag. Om systemet beskattar kapitalbildning för hårt blir kakan mindre innan den ens hinner fördelas.",
    },
  },
];
