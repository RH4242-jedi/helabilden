export type EvidenceLevel = "hög" | "medel" | "låg" | "omstridd";

export type SourceLink = {
  id: string;
  label: string;
  url: string;
  publisher?: string;
  year?: number;
};

export type ArgumentItem = {
  title: string;
  body: string;
  evidenceLevel?: EvidenceLevel;
  sourceIds?: string[];
};

export type Perspective = {
  id: string;
  title: string;
  summary: string;
  steelman: string;
  arguments: ArgumentItem[];
  risks: string[];
  whoBenefits?: string[];
  whoPays?: string[];
};

export type FactItem = {
  statement: string;
  evidenceLevel?: EvidenceLevel;
  sourceIds?: string[];
};

export type Misconception = {
  claim: string;
  correction: string;
  sourceIds?: string[];
};

export type TradeoffScenario = {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  context: string;
  category: string;
  tags: string[];
  updatedAt: string;
  sources: SourceLink[];
  facts: FactItem[];
  perspectives: Perspective[];
  misconceptions: Misconception[];
};

export const tradeoffScenarios: TradeoffScenario[] = [
  {
    id: "capital-tax-investment",
    slug: "kapitalskatt-vs-investeringsvilja",
    title: "Kapitalskatt och investeringsvilja",
    prompt:
      "Hur ska ett samhälle väga skatteuttag på kapital mot incitament att spara, investera och bygga nytt produktivt kapital?",
    context:
      "Det här är en klassisk målkonflikt mellan legitimitet, omfördelning och finansiering å ena sidan, och kapitalbildning, risktagande och långsiktig tillväxt å andra sidan. Frågan rymmer mer än en enkel höger/vänster-etikett.",
    category: "Ekonomi",
    tags: ["skatt", "investeringar", "jämlikhet", "tillväxt"],
    updatedAt: "2026-09-09",
    sources: [
      {
        id: "scb-kapital",
        label: "SCB om hushållens tillgångar och skulder",
        url: "https://www.scb.se/",
        publisher: "SCB",
      },
      {
        id: "fi-skatt",
        label: "Skatteverkets översikt av kapitalinkomstbeskattning",
        url: "https://www.skatteverket.se/",
        publisher: "Skatteverket",
      },
      {
        id: "oecd-tax",
        label: "OECD Tax Policy Reviews / jämförelser av kapitalbeskattning",
        url: "https://www.oecd.org/tax/",
        publisher: "OECD",
      },
    ],
    facts: [
      {
        statement:
          "Kapitalinkomster och arbetsinkomster beskattas ofta enligt olika regelverk, vilket påverkar både fördelning och investeringsincitament.",
        evidenceLevel: "hög",
        sourceIds: ["fi-skatt", "oecd-tax"],
      },
      {
        statement:
          "Hur starkt en kapitalskatteförändring påverkar investeringar beror på utformning, undantag, rörlighet och vilka alternativa skatteregimer som finns.",
        evidenceLevel: "medel",
        sourceIds: ["oecd-tax"],
      },
      {
        statement:
          "Förmögenhet är mer ojämnt fördelad än årsinkomster i de flesta jämförbara länder, inklusive Sverige.",
        evidenceLevel: "hög",
        sourceIds: ["scb-kapital"],
      },
    ],
    perspectives: [
      {
        id: "equality-finance",
        title: "Fokus på jämlikhet och gemensam finansiering",
        summary:
          "Ett högre uttag på kapital kan stärka statens förmåga att finansiera välfärd och minska skillnader mellan den som lever på arbete och den som främst lever på ägande.",
        steelman:
          "Stabila samhällen behöver både fungerande marknader och social legitimitet. Om kapital koncentreras för snabbt utan rimligt återflöde till det gemensamma blir både sammanhållning och marknadsekonomi politiskt skörare.",
        arguments: [
          {
            title: "Finansieringsbas",
            body: "Kapitalbeskattning kan bredda skattebasen och minska trycket på enbart arbetsinkomster.",
            evidenceLevel: "medel",
            sourceIds: ["fi-skatt"],
          },
          {
            title: "Fördelningslegitimitet",
            body: "När avkastning på ägande växer snabbare än löner ökar behovet av regler som upplevs som rimliga mellan olika inkomstslag.",
            evidenceLevel: "medel",
            sourceIds: ["scb-kapital", "oecd-tax"],
          },
        ],
        risks: [
          "Trubbig utformning kan minska vissa produktiva investeringar.",
          "Kapital kan omlokaliseras till mer förmånliga jurisdiktioner.",
        ],
        whoBenefits: ["Offentlig sektor", "Hushåll med lägre kapitalinkomster"],
        whoPays: ["Kapitalägare", "Vissa tillväxtföretag på marginalen"],
      },
      {
        id: "investment-incentives",
        title: "Fokus på kapitalbildning och risktagande",
        summary:
          "Lägre eller mer förutsägbar skatt på kapital kan göra det mer attraktivt att investera, anställa och ta långsiktiga risker i produktiva verksamheter.",
        steelman:
          "Nästan all framtida välfärd bygger på att människor vågar spara, investera och bygga företag. Om systemet beskattar kapitalbildning för hårt blir kakan mindre innan den ens hinner fördelas.",
        arguments: [
          {
            title: "Investeringsincitament",
            body: "Avkastning efter skatt påverkar viljan att binda kapital i långsiktiga och riskfyllda projekt.",
            evidenceLevel: "medel",
            sourceIds: ["oecd-tax"],
          },
          {
            title: "Internationell konkurrens",
            body: "Kapital är rörligare än arbete, vilket gör utformningen mer känslig för jämförelser med andra länder.",
            evidenceLevel: "medel",
            sourceIds: ["oecd-tax"],
          },
        ],
        risks: [
          "Kan öka skillnader i förmögenhet.",
          "Kan minska skatteintäkter om kompensation saknas.",
        ],
        whoBenefits: ["Investerare", "Tillväxtbolag", "Långsiktiga sparare"],
        whoPays: ["Offentlig sektor på kort sikt", "Grupp med låg kapitalexponering"],
      },
    ],
    misconceptions: [
      {
        claim: "Alla som vill ha lägre kapitalskatt vill bara skydda de redan rika.",
        correction:
          "Argumentet kan också handla om hur man får fler produktiva investeringar, nya företag och högre framtida skattebas. Det är möjligt att kritisera fördelningseffekter utan att förneka tillväxtargumentet.",
        sourceIds: ["oecd-tax"],
      },
      {
        claim: "Högre kapitalskatt är alltid gratis för tillväxten.",
        correction:
          "Utformning spelar stor roll. Vissa förändringar kan ha begränsade reala effekter, medan andra påverkar marginalincitament, flyttbeteende och investeringskalender.",
        sourceIds: ["oecd-tax"],
      },
    ],
  },
  {
    id: "privacy-security-rule-of-law",
    slug: "integritet-sakerhet-rattssakerhet",
    title: "Integritet, säkerhet och rättssäkerhet",
    prompt:
      "När staten vill förebygga allvarlig brottslighet, hur ska vi väga personlig integritet, effektiv brottsbekämpning och rättsstatliga gränser mot varandra?",
    context:
      "Det här är ett typexempel på en fråga som inte ryms i två läger. Integritet, säkerhet och rättssäkerhet kan stödja varandra i vissa delar, men konkurrera i andra. Därför visas tre perspektiv i stället för en binär vågskål.",
    category: "Rättsstat",
    tags: ["integritet", "säkerhet", "övervakning", "rättssäkerhet"],
    updatedAt: "2026-09-09",
    sources: [
      {
        id: "imyn",
        label: "Integritetsskyddsmyndigheten om kamerabevakning och personuppgifter",
        url: "https://www.imy.se/",
        publisher: "IMY",
      },
      {
        id: "bra",
        label: "Brå om brottsutveckling och brottsbekämpning",
        url: "https://bra.se/",
        publisher: "Brå",
      },
      {
        id: "jo",
        label: "Justitieombudsmannen om rättssäkerhet och myndighetsutövning",
        url: "https://www.jo.se/",
        publisher: "JO",
      },
    ],
    facts: [
      {
        statement:
          "Myndigheter som behandlar personuppgifter styrs av särskilda rättsliga ramar för nödvändighet, proportionalitet och ändamålsbegränsning.",
        evidenceLevel: "hög",
        sourceIds: ["imyn"],
      },
      {
        statement:
          "Effekten av övervakning och tvångsmedel varierar kraftigt beroende på hur precist de riktas, hur de används operativt och vilka rättssäkerhetsgarantier som omger dem.",
        evidenceLevel: "omstridd",
        sourceIds: ["bra"],
      },
      {
        statement:
          "Rättsstatliga kontroller finns just för att minska risken att tillfälliga säkerhetsbehov skapar permanenta maktöverskott.",
        evidenceLevel: "hög",
        sourceIds: ["jo"],
      },
    ],
    perspectives: [
      {
        id: "privacy",
        title: "Fokus på personlig integritet",
        summary:
          "Skyddet för privatliv är inte bara en privat bekvämlighet utan en förutsättning för yttrandefrihet, föreningsfrihet och tillit till staten.",
        steelman:
          "Om staten samlar mer data än den kan kontrollera demokratiskt, skapas en asymmetri där den enskilde blir genomlyst medan maktutövningen blir svårare att granska. Då försvagas friheten även om syftet är gott.",
        arguments: [
          {
            title: "Maktasymmetri",
            body: "Omfattande datainsamling ger staten ett informationsövertag som är svårt att rulla tillbaka när det väl normaliserats.",
            evidenceLevel: "medel",
            sourceIds: ["imyn"],
          },
          {
            title: "Avkylningseffekter",
            body: "När människor misstänker ständig övervakning kan laglig opinionsbildning, journalistik och föreningsliv påverkas negativt.",
            evidenceLevel: "medel",
            sourceIds: ["imyn"],
          },
        ],
        risks: [
          "För stark integritetsrestriktion kan försvåra utredning av allvarlig brottslighet.",
          "Teknikutveckling kan göra äldre skyddsregler otillräckliga eller otydliga.",
        ],
        whoBenefits: ["Medborgare i vardagen", "Whistleblowers", "Civilsamhälle"],
        whoPays: ["Polis och underrättelseverksamhet i vissa fall"],
      },
      {
        id: "security",
        title: "Fokus på säkerhet och brottsbekämpning",
        summary:
          "När våld, infiltration och organiserad brottslighet blir mer sofistikerad kan äldre verktyg vara för långsamma. Staten behöver då bättre förmåga att upptäcka och stoppa hot i tid.",
        steelman:
          "Rätten till liv och trygghet är också en frihetsfråga. Om staten saknar precisa verktyg mot allvarliga hot drabbas de mest utsatta först, och förtroendet för rättsordningen eroderar.",
        arguments: [
          {
            title: "Operativ förmåga",
            body: "Tidig upptäckt och bättre informationsdelning kan vara avgörande i fall där skadan redan är irreversibel när den syns öppet.",
            evidenceLevel: "medel",
            sourceIds: ["bra"],
          },
          {
            title: "Utsatta miljöer",
            body: "I områden eller nätverk med högt våldskapital kan frånvaro av effektiva verktyg i praktiken betyda att oskyldiga lämnas utan skydd.",
            evidenceLevel: "medel",
            sourceIds: ["bra"],
          },
        ],
        risks: [
          "Verktyg kan användas bredare än det ursprungliga syftet.",
          "Felträffar och misstänkliggörande kan skada tillit.",
        ],
        whoBenefits: ["Brottsutsatta", "Polisiära utredningar", "Allmänhetens trygghet"],
        whoPays: ["Personer som träffas av bred datainsamling"],
      },
      {
        id: "rule-of-law",
        title: "Fokus på rättssäkerhet och maktdelning",
        summary:
          "Även när mer verktyg behövs måste de omgärdas av tydliga trösklar, oberoende kontroll och möjlighet till överprövning. Annars blir säkerhetsåtgärder godtyckliga.",
        steelman:
          "Det avgörande är inte bara vilka verktyg staten får, utan vilka beviskrav, tidsgränser, loggning och tillsynsmekanismer som gör att makten kan granskas. Utan det förlorar både integritet och säkerhet sin långsiktiga legitimitet.",
        arguments: [
          {
            title: "Proportionalitet",
            body: "Tvångsmedel bör vara nödvändiga, tidsbegränsade och riktade mot konkreta risker snarare än lösa kategorier.",
            evidenceLevel: "hög",
            sourceIds: ["jo", "imyn"],
          },
          {
            title: "Kontrollsystem",
            body: "Oberoende tillsyn, dokumentation och möjlighet till rättelse minskar risken för mission creep och rättsövergrepp.",
            evidenceLevel: "hög",
            sourceIds: ["jo"],
          },
        ],
        risks: [
          "För tunga processkrav kan göra akuta insatser långsamma.",
          "Formella garantier utan reell tillsyn kan bli skenbara.",
        ],
        whoBenefits: ["Rättssubjekt under utredning", "Demokratisk kontroll"],
        whoPays: ["Myndigheter med högre administrativ börda"],
      },
    ],
    misconceptions: [
      {
        claim: "Antingen är man för övervakning eller emot trygghet.",
        correction:
          "Det finns flera legitima positioner samtidigt: man kan vilja ha mer kapacitet mot allvarlig brottslighet och samtidigt kräva hårda rättssäkerhetsvillkor och smalare datainsamling.",
        sourceIds: ["jo"],
      },
      {
        claim: "Mer data ger automatiskt mer säkerhet.",
        correction:
          "Volym är inte samma sak som träffsäkerhet. Utan analyskapacitet, prioritering och rättsliga trösklar kan mer data skapa brus, felriktning och lägre tillit.",
        sourceIds: ["bra", "imyn"],
      },
    ],
  },
];

export function getScenarioBySlug(slug: string): TradeoffScenario | undefined {
  return tradeoffScenarios.find((scenario) => scenario.slug === slug);
}
