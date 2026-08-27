/**
 * Photography registry.
 *
 * Every image on the site is referenced by a short id from this file rather
 * than a URL written inline, so swapping stock photography for the real
 * Thurayyā shoot is a change here and nowhere else.
 *
 * An id is one of:
 *   - an Unsplash photo path — `photo-1588436199489-ac376a0b3884`
 *   - a local path          — `/images/products/thurayya-seven-hero.jpg`
 *   - any absolute URL
 *
 * `resolveImage` turns an id into a `src` (plus a `srcSet` for Unsplash, which
 * resizes on its own CDN). See docs/IMAGE-BRIEF.md.
 *
 * Licensing: these are Unsplash photographs, free to use under the Unsplash
 * licence. They stand in for the commissioned shoot — none of them is an actual
 * Thurayyā product.
 */

const UNSPLASH = "https://images.unsplash.com/";
const WIDTHS = [400, 640, 900, 1280, 1600];

export interface ResolvedImage {
  src: string;
  srcSet?: string;
}

function unsplashUrl(id: string, width: number): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&q=70&w=${width}`;
}

export function resolveImage(id?: string): ResolvedImage | undefined {
  if (!id) return undefined;
  if (id.startsWith("photo-")) {
    return {
      src: unsplashUrl(id, 1280),
      srcSet: WIDTHS.map((w) => `${unsplashUrl(id, w)} ${w}w`).join(", "),
    };
  }
  return { src: id };
}

/* ==========================================================================
   Products — hero and lifestyle are the two card images, so they must read
   as a pair. detail / lit / scale fall back per family when not set.
   ========================================================================== */

export interface ProductImageSet {
  hero: string;
  lifestyle: string;
  detail?: string;
  lit?: string;
  scale?: string;
}

export const PRODUCT_IMAGES: Record<string, ProductImageSet> = {
  /* --- chandeliers ----------------------------------------------------- */
  "thurayya-seven-chandelier": {
    hero: "photo-1787682446632-2a1e8569da1a",
    lifestyle: "photo-1586450428662-92fe683549b9",
    detail: "photo-1545873509-33e944ca7655",
    lit: "photo-1761384531209-f0af25c7395d",
  },
  "orion-cascade-chandelier": {
    hero: "photo-1776362355123-ca966d36e29c",
    lifestyle: "photo-1601993957728-1e56ab70c5a8",
    lit: "photo-1774940578514-28b165796456",
  },
  "sidra-linear-suspension": {
    hero: "photo-1636138388621-258a72ecb07e",
    lifestyle: "photo-1606660023296-81d67734170a",
    lit: "photo-1610177567940-cad90e9fb85e",
  },
  "najm-halo-chandelier": {
    hero: "photo-1550608948-b3f8acbd9f2a",
    lifestyle: "photo-1564078516393-cf04bd966897",
    lit: "photo-1763333409678-b0ef2040de91",
  },
  "maha-tiered-chandelier": {
    hero: "photo-1763630868355-fa63678cd4b0",
    lifestyle: "photo-1673300881006-3bd384aa1949",
    lit: "photo-1775937246971-653f4858167c",
  },

  /* --- pendants -------------------------------------------------------- */
  "nocturne-pendant": {
    hero: "photo-1542768581-0ddb91c116ef",
    lifestyle: "photo-1628797285815-453c1d0d21e3",
    lit: "photo-1549686372-e7a5aeaa3ad4",
  },
  "qamar-dome-pendant": {
    hero: "photo-1613271023510-f579875a0334",
    lifestyle: "photo-1704383014594-01bc24b6b840",
    lit: "photo-1634185906067-1f8017a5848e",
  },
  "hilal-crescent-pendant": {
    hero: "photo-1589173956121-8891103b66b0",
    lifestyle: "photo-1618220252344-8ec99ec624b1",
    lit: "photo-1582527305301-54eaad07a9c6",
  },
  "anbar-cluster-pendant": {
    hero: "photo-1566735275348-ce77ba8006c5",
    lifestyle: "photo-1667388968964-4aa652df0a9b",
    lit: "photo-1649799314493-78e878629216",
  },

  /* --- ceiling --------------------------------------------------------- */
  "nour-ceiling-flush": {
    hero: "photo-1764961576606-ffb05ace4062",
    lifestyle: "photo-1552558636-f6a8f071c2b3",
    lit: "photo-1765012873322-00cb5ce0f059",
  },
  "sahn-ceiling-plate": {
    hero: "photo-1744792293815-27d6670692ac",
    lifestyle: "photo-1661655549176-4d5f27b7660d",
    lit: "photo-1673748900496-11006665bf01",
  },

  /* --- wall ------------------------------------------------------------ */
  "alabaster-wall-light": {
    hero: "photo-1755234262671-153ed3385e44",
    lifestyle: "photo-1617104424032-b9bd6972d0e4",
    detail: "photo-1566305977571-5666677c6e98",
    lit: "photo-1655153379896-0cf6da4df553",
  },
  "mashrabiya-wall-sconce": {
    hero: "photo-1652462100264-acfa7c7d8c97",
    lifestyle: "photo-1611764060609-d910bfd78708",
    lit: "photo-1590250998460-ebbc33182ce7",
  },
  "rida-linear-sconce": {
    hero: "photo-1585056050604-f5cd7f56902d",
    lifestyle: "photo-1600210491305-7396500b5b31",
    lit: "photo-1724769244493-677264ea0bf0",
  },

  /* --- floor ----------------------------------------------------------- */
  "meridian-floor-lamp": {
    hero: "photo-1630578877871-1a2f9d372fd2",
    lifestyle: "photo-1619992677751-cb736bd47e2e",
    lit: "photo-1638189311070-d4e5dcc86902",
  },
  "atlas-arc-floor-lamp": {
    hero: "photo-1761864293821-033e75c1eba3",
    lifestyle: "photo-1691036562015-56ebf6648f8c",
    lit: "photo-1772442364436-6ee6e42302a2",
  },
  "samt-column-lamp": {
    hero: "photo-1759647020559-2f91a4290ae4",
    lifestyle: "photo-1708232981795-2baec1d6687b",
    lit: "photo-1616497633466-6c3f7a0cfa93",
  },

  /* --- table ----------------------------------------------------------- */
  "travertine-table-lamp": {
    hero: "photo-1612735849751-38ba2c6f4458",
    lifestyle: "photo-1642689703534-e41f29622078",
    detail: "photo-1600095355173-b970ea5ceb46",
    lit: "photo-1624258391922-0b3056c471e7",
  },
  "qandil-table-lamp": {
    hero: "photo-1612736228052-80e7f381690c",
    lifestyle: "photo-1517862774645-dd398fbfaffa",
    lit: "photo-1698384427487-b839ddc026a3",
  },
  "dune-alabaster-lamp": {
    hero: "photo-1570974802254-4b0ad1a755f5",
    lifestyle: "photo-1505658862213-162b60255cb6",
    detail: "photo-1555181937-efe4e074a301",
    lit: "photo-1579888028917-47462bb03ca9",
  },

  /* --- outdoor --------------------------------------------------------- */
  "layl-outdoor-column": {
    hero: "photo-1594353162824-a8b237f9adae",
    lifestyle: "photo-1643913586401-c7c0b0f1b352",
    lit: "photo-1783103085304-b4945f54844c",
  },
  "bahr-wall-lantern": {
    hero: "photo-1785240822924-6cd62b545dd4",
    lifestyle: "photo-1766281296970-3d77a6e70066",
    lit: "photo-1774355986343-74dafa92499f",
  },

  /* --- smart ----------------------------------------------------------- */
  "safir-smart-pendant": {
    hero: "photo-1695550111538-5657c4c98e78",
    lifestyle: "photo-1781344328679-54cca842940e",
    lit: "photo-1778731525401-982ab0eaa746",
  },
  "manzil-scene-controller": {
    hero: "photo-1608377205619-03a0b4c4e270",
    lifestyle: "photo-1707733260992-73ff6dbed163",
    detail: "photo-1594896733292-9a77b5809c63",
    lit: "photo-1655194827229-a1d3192b533e",
  },

  /* --- accessories ----------------------------------------------------- */
  "warm-led-bulbs": {
    hero: "photo-1507494924047-60b8ee826ca9",
    lifestyle: "photo-1516715651727-95fa73e9799c",
    detail: "photo-1507668077129-56e32842fceb",
    lit: "photo-1608429700640-453a5a242edf",
  },

  /* --- furniture ------------------------------------------------------- */
  "layl-travertine-console": {
    hero: "photo-1717416697464-6c6ad56b258a",
    lifestyle: "photo-1721824296808-92c325601dd8",
    detail: "photo-1717416698017-b0ea714a7658",
    lit: "photo-1779705948722-7745462b7ee3",
  },
  "sahra-dining-table": {
    hero: "photo-1576249720336-35b043fce96d",
    lifestyle: "photo-1761330439843-6265ee24856e",
    detail: "photo-1749476101600-90b2eb7efa89",
    lit: "photo-1782914701565-ab51d55e1479",
  },
  "qamar-brass-mirror": {
    hero: "photo-1513716875652-59c99449ee70",
    lifestyle: "photo-1594296061979-ff47fd918fea",
    detail: "photo-1545873681-d8affd67677b",
    lit: "photo-1758279745939-d116fdfb8f29",
  },
  "nadi-lounge-chair": {
    hero: "photo-1580480055273-228ff5388ef8",
    lifestyle: "photo-1613807871118-9e983601b759",
    detail: "photo-1579656592043-a20e25a4aa4b",
    lit: "photo-1712926382189-dacbc6b89a01",
  },
  "nujum-side-table": {
    hero: "photo-1540177656454-3f6c4547bed1",
    lifestyle: "photo-1652452083348-5c9611f8ada5",
    detail: "photo-1643558544531-bff73bbffc28",
    lit: "photo-1762856490803-8e200418973a",
  },
  "thurayya-cluster-rug": {
    hero: "photo-1532526674046-5b3f6d7d2ab1",
    lifestyle: "photo-1545078194-2ec3c4e53ed1",
    detail: "photo-1647699926980-b7d360761521",
    lit: "photo-1671624760664-8946fd3037a3",
  },
};

/** Used when a product has no explicit detail / lit / scale frame. */
export const FAMILY_FALLBACK: Record<
  "lighting" | "furniture",
  { detail: string; lit: string; scale: string }
> = {
  lighting: {
    detail: "photo-1545873509-33e944ca7655",
    lit: "photo-1549686372-e7a5aeaa3ad4",
    scale: "photo-1721244654210-a505a99661e9",
  },
  furniture: {
    detail: "photo-1547609434-b732edfee020",
    lit: "photo-1600095355173-b970ea5ceb46",
    scale: "photo-1721244653721-bc681b2dfd27",
  },
};

/* ==========================================================================
   Categories
   ========================================================================== */

export const CATEGORY_IMAGES: Record<string, { tile: string; banner: string }> = {
  chandeliers: { tile: "photo-1586057663950-3094814c5d9b", banner: "photo-1476886188504-fd741bfc8e8a" },
  "pendant-lights": { tile: "photo-1682888813795-192fca4a10d9", banner: "photo-1730991568658-ad8638395a9e" },
  "ceiling-lights": { tile: "photo-1765012873322-00cb5ce0f059", banner: "photo-1763060722627-e06bfa20faaf" },
  "wall-lights": { tile: "photo-1778604287400-71b0174c4e7a", banner: "photo-1785960862319-fcdd9e7d3533" },
  "floor-lamps": { tile: "photo-1616497633466-6c3f7a0cfa93", banner: "photo-1606425288528-4cebbfc69de7" },
  "table-lamps": { tile: "photo-1624258391922-0b3056c471e7", banner: "photo-1579888028917-47462bb03ca9" },
  "outdoor-lighting": { tile: "photo-1774355986343-74dafa92499f", banner: "photo-1739520081275-f893dc11fbd6" },
  "smart-lighting": { tile: "photo-1739083168122-f1f59db99e78", banner: "photo-1711006439997-f06ab27d529b" },
  accessories: { tile: "photo-1623780569981-8ecf6b181928", banner: "photo-1608429700640-453a5a242edf" },
  "consoles-storage": { tile: "photo-1779705948722-7745462b7ee3", banner: "photo-1717416697965-181d1ed75888" },
  tables: { tile: "photo-1615066390971-03e4e1c36ddf", banner: "photo-1609348594312-4e9e07be9530" },
  seating: { tile: "photo-1579656592043-a20e25a4aa4b", banner: "photo-1712926382189-dacbc6b89a01" },
  mirrors: { tile: "photo-1758279745939-d116fdfb8f29", banner: "photo-1771596378757-2ec9519418b7" },
  "rugs-accessories": { tile: "photo-1647699926980-b7d360761521", banner: "photo-1671624760664-8946fd3037a3" },
};

/* ==========================================================================
   Rooms
   ========================================================================== */

export const ROOM_IMAGES: Record<string, { hero: string; tile: string }> = {
  "living-room": { hero: "photo-1560185009-dddeb820c7b7", tile: "photo-1724582586529-62622e50c0b3" },
  "dining-room": { hero: "photo-1750672831807-02188adaa7b0", tile: "photo-1681669778757-37a347f9002b" },
  bedroom: { hero: "photo-1696762932825-2737db830bbe", tile: "photo-1631048501786-4e97f20eac71" },
  "entrance-hallway": { hero: "photo-1724176308224-e6d7232f31e0", tile: "photo-1563724680425-560215e83057" },
  kitchen: { hero: "photo-1778731660344-09eda016c6b3", tile: "photo-1749704647283-3ad79f4acc6a" },
  "garden-terrace": { hero: "photo-1621607182093-09e9f59523ba", tile: "photo-1624889229800-7ca4c6c0d52b" },
  bathroom: { hero: "photo-1576698483491-8c43f0862543", tile: "photo-1564540583246-934409427776" },
  hospitality: { hero: "photo-1637730827702-de34e9ae4ede", tile: "photo-1692153142524-60285a93c249" },
};

/* ==========================================================================
   Collections
   ========================================================================== */

export const COLLECTION_IMAGES: Record<string, { hero: string; campaign: [string, string, string] }> = {
  celestial: {
    hero: "photo-1758528698093-e66a07884aca",
    campaign: [
      "photo-1673300881006-3bd384aa1949",
      "photo-1566305977571-5666677c6e98",
      "photo-1528717384022-f8d665c86909",
    ],
  },
  nocturne: {
    hero: "photo-1708232981795-2baec1d6687b",
    campaign: [
      "photo-1667388969250-1c7220bf3f37",
      "photo-1545873681-d8affd67677b",
      "photo-1702165641149-f7b957f8c91e",
    ],
  },
  alabaster: {
    hero: "photo-1555181937-efe4e074a301",
    campaign: [
      "photo-1533628635777-112b2239b1c7",
      "photo-1659362549741-c32157cc71f4",
      "photo-1600095355173-b970ea5ceb46",
    ],
  },
  "brass-atelier": {
    hero: "photo-1717416697965-181d1ed75888",
    campaign: [
      "photo-1547609434-b732edfee020",
      "photo-1631396326838-de37e5f8bcbc",
      "photo-1506599667882-385dd6673353",
    ],
  },
  "modern-heritage": {
    hero: "photo-1611764060609-d910bfd78708",
    campaign: [
      "photo-1590250998460-ebbc33182ce7",
      "photo-1760727467204-981086f6adfc",
      "photo-1579196179453-1531eddf62e3",
    ],
  },
  "limited-editions": {
    hero: "photo-1774940578514-28b165796456",
    campaign: [
      "photo-1594896733292-9a77b5809c63",
      "photo-1573998648748-fa6ef521cdf9",
      "photo-1686236589375-15fd83d4584e",
    ],
  },
};

/* ==========================================================================
   Journal — article heroes and the in-article shot blocks
   ========================================================================== */

export const JOURNAL_IMAGES: Record<string, { hero: string; blocks?: string[] }> = {
  "choosing-a-chandelier-for-your-dining-room": {
    hero: "photo-1628745423010-bfb4df95f3eb",
    blocks: ["photo-1603901622056-0a5bee231395"],
  },
  "layering-light": {
    hero: "photo-1666585958641-4f70887372a1",
    blocks: ["photo-1738168246881-40f35f8aba0a"],
  },
  "brass-glass-and-stone": { hero: "photo-1511306162219-1c5a469ab86c" },
  "six-cairo-apartments": {
    hero: "photo-1641232458416-feace752b346",
    blocks: ["photo-1618220252344-8ec99ec624b1"],
  },
  "where-to-stop": { hero: "photo-1666300593384-2dd896e1a222" },
  "the-seven-stars": {
    hero: "photo-1649688066830-a0cf04d1bc41",
    blocks: ["photo-1624382085368-791f6bd1b197"],
  },
};

/* ==========================================================================
   Everything else — one-off slots, keyed by where they appear
   ========================================================================== */

export const SITE_IMAGES = {
  homeHero: "photo-1476886188504-fd741bfc8e8a",
  homeStory: "photo-1528717384022-f8d665c86909",
  homeCollection: "photo-1763630868355-fa63678cd4b0",
  homeCollectionInset: "photo-1775937246971-653f4858167c",
  homeConsultation: "photo-1664638413302-d1ca29ac885b",

  lightingBanner: "photo-1780328863316-4e22585da72f",
  furnitureBanner: "photo-1717416697965-181d1ed75888",
  newArrivalsBanner: "photo-1782834294783-dff56aa2a540",

  customHero: "photo-1646991761123-d83ce47c30c9",
  projects: [
    "photo-1601993957728-1e56ab70c5a8",
    "photo-1667388968964-4aa652df0a9b",
    "photo-1726873800099-53f5496281e0",
    "photo-1638189311070-d4e5dcc86902",
    "photo-1682888813795-192fca4a10d9",
  ] as string[],

  tradeSamples: "photo-1664638413509-6aa486866f9a",
  tradeProjectA: "photo-1723516908282-b3c795e9416a",
  tradeProjectB: "photo-1758193783649-13371d7fb8dd",

  aboutHero: "photo-1511306162219-1c5a469ab86c",
  aboutAtelier: "photo-1579196179453-1531eddf62e3",

  signIn: "photo-1627306411131-358d6d0fd2cb",

  menuLighting: "photo-1545873509-33e944ca7655",
  menuFurniture: "photo-1717416697464-6c6ad56b258a",
  menuCollections: "photo-1758528698093-e66a07884aca",
  menuRooms: "photo-1750672831807-02188adaa7b0",
};

/** Craft macro shots on the home page and the about page, keyed by craft slug. */
export const CRAFT_IMAGES: Record<string, string> = {
  brass: "photo-1545873509-33e944ca7655",
  glass: "photo-1702165639480-f55d5391b9f6",
  stone: "photo-1566305977571-5666677c6e98",
  wood: "photo-1659930087003-2d64e33181f7",
  "hand-finishing": "photo-1573998648748-fa6ef521cdf9",
};

/** Team portraits, in the order `TEAM` declares them. */
export const TEAM_IMAGES: string[] = [
  "photo-1654765437547-6b572f52ee1a",
  "photo-1654707264308-286492443b37",
  "photo-1654514434402-bc8d2b179817",
  "photo-1619441523947-6ecdc0918d65",
];

export const SHOWROOM_IMAGES: Record<string, string> = {
  zamalek: "photo-1771402382398-7210f67eb41b",
  dubai: "photo-1765181539706-361512106019",
  riyadh: "photo-1772516912380-d39c64f5a85f",
};
