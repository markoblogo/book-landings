export interface LocalizedString {
    en: string;
    tp: string;
}

export interface BookIdentifiers {
    asinKindle?: string;
    asinPrint?: string;
    isbn13Print?: string;
}

export interface Book {
    id: string; // The slug (folder name)
    type: 'commercial' | 'gift';
    title: LocalizedString;
    author: LocalizedString;
    coverImage: string;
    promoImage: string;
    amazonKindleUrl?: string;
    amazonPrintUrl?: string;
    downloadPdfUrl?: string;
    downloadEpubUrl?: string;
    teaserVideoId?: string;
    shortDescription: LocalizedString;
    longDescription: LocalizedString;

    identifiers?: BookIdentifiers;
}

export const books: Book[] = [
    {
        id: "marcus-meditations",
        type: 'commercial',
        title: {
            en: "Meditations of Marcus Aurelius — in Toki Pona",
            tp: "lipu pi lukin insa"
        },
        author: {
            en: "Marcus Aurelius",
            tp: "jan lawa pi pilin awen"
        },
        coverImage: "/assets/books/marcus-meditations/cover.webp",
        promoImage: "/assets/books/marcus-meditations/promo.webp",
        amazonKindleUrl: "https://www.amazon.com/dp/B0FV3F1RC5",
        amazonPrintUrl: "https://www.amazon.com/dp/B0FVLPD69K",
        identifiers: {
            asinKindle: 'B0FV3F1RC5',
            asinPrint: 'B0FVLPD69K',
            isbn13Print: '979-8268811124',
        },
        teaserVideoId: "ILN2qILESH0",
        shortDescription: {
            en: "A minimalist Stoic classic, reimagined in the world’s simplest language.",
            tp: "lipu open pi sona pi pilin awen li kama lon toki pona."
        },
        longDescription: {
            en: "What happens when ancient Stoic wisdom meets the world’s simplest language? “Meditations of Marcus Aurelius — in Toki Pona” invites readers to rediscover the timeless reflections of the Roman emperor through the lens of Toki Pona — a constructed language built on simplicity, clarity, and harmony. Each passage is carefully rendered in Toki Pona and mirrored in sitelen pona. This edition includes the full translation, an introduction, and a glossary/reading guide.",
            tp: "lipu ni li pana e toki pi lukin insa lon nasin lili. toki pona en sitelen pona li lon poka. sina ken lukin e nimi lili, lukin sin e toki sama, kama jo e nasin pi tenpo suno ale."
        }
    },
    {
        id: "epictetus-enchiridion",
        type: 'commercial',
        title: {
            en: "Epictetus: The Enchiridion in toki pona",
            tp: "lipu lili pi nasin pali"
        },
        author: {
            en: "Epictetus",
            tp: "jan sona pi wile insa"
        },
        coverImage: "/assets/books/epictetus-enchiridion/cover.webp",
        promoImage: "/assets/books/epictetus-enchiridion/promo.webp",
        amazonKindleUrl: "https://www.amazon.com/dp/B0GKWR5NL1",
        amazonPrintUrl: "https://www.amazon.com/dp/B0GKXXJGZV",
        teaserVideoId: "DNgkm9tf6Cg",
        shortDescription: {
            en: "A compact Stoic manual for clear choices under pressure: learn what is in your control, what is not, and how to act without noise.",
            tp: "lipu lili ni li pana e nasin pona tawa pali, tawa wile, tawa pilin lon tenpo ike."
        },
        longDescription: {
            en: "The Enchiridion is a practical handbook: short chapters meant to be revisited, especially when life gets loud. This edition reimagines Epictetus in toki pona for a calmer, more inspectable kind of reading. What you get in this volume: Public-domain English reference text (Elizabeth Carter, 1758) for comparison. Two-layer toki pona reading format: Latin script + the same line repeated for sitelen pona. A reading method designed for slow progress: small daily units, repetition, and “What is the instruction?” as the main question. Links to the free beginner kit and the series page. Created & curated by Biletskyi-Volokh Anton.",
            tp: "lipu ni li toki e ijo lon wawa sina, e ijo lon wawa sina ala. ona li pana e nasin pali kepeken kalama lili. lipu ni li pona tawa lukin sin: o lukin e toki lili, o wile sona e nasin, o pali kepeken ona lon tenpo suno."
        }
    },
    {
        id: "seneca-shortness-of-life",
        type: 'commercial',
        title: {
            en: "Seneca: On the Shortness of Life in toki pona",
            tp: "lipu pi tenpo lili"
        },
        author: {
            en: "Seneca",
            tp: "jan sona pi tenpo"
        },
        coverImage: "/assets/books/seneca-shortness-of-life/cover.webp",
        promoImage: "/assets/books/seneca-shortness-of-life/promo.webp",
        amazonKindleUrl: "https://www.amazon.com/dp/B0GKCJ72PG",
        amazonPrintUrl: "https://www.amazon.com/dp/B0GL1ZBK18",
        teaserVideoId: "_JL2xu4Sn70",
        shortDescription: {
            en: "A sharp, calming reminder that life isn’t “too short” — we simply waste much of it. Readable, practical Stoic advice on attention, priorities, and reclaiming your days, reimagined in toki pona.",
            tp: "lipu ni li toki e ni: tenpo li lili ala; jan li weka e tenpo mute."
        },
        longDescription: {
            en: "“Life is short” is the common complaint. Seneca’s answer is tougher and more useful: the problem isn’t the length of life, but what we trade it for. This short classic is a practical guide to noticing waste, resisting distraction, and investing your days on purpose. This edition is part of Stoic Wisdom in Toki Pona — classic Stoic texts reimagined in the world’s simplest language. The English text is public domain; the toki pona version is a new creative work, written to keep the language clean, small, and readable while preserving Seneca’s practical force. Reading help is built into the edition: the translation keeps key phrases stable so repeated ideas stay easy to spot, and the glossary is designed around recurring “anchor patterns.” You can also start with the free Reader’s Kit and links provided in the book.",
            tp: "jan mute li toki e ni: tenpo li lili. lipu ni li toki ante: tenpo li kama weka tan pali ike, tan wile mute, tan lukin ala. nasin pi lipu ni li pana e lukin tawa tenpo, tawa wile, tawa pali pona."
        }
    },
    {
        id: "cicero-on-duties",
        type: 'commercial',
        title: {
            en: "Cicero: On Duties (De Officiis) in toki pona — with sitelen pona",
            tp: "lipu pi pali pona"
        },
        author: {
            en: "Cicero",
            tp: "jan toki pi nasin pona"
        },
        coverImage: "/assets/books/cicero-on-duties/cover.webp",
        promoImage: "/assets/books/cicero-on-duties/promo.webp",
        amazonKindleUrl: "https://www.amazon.com/dp/B0GL86LVF1",
        amazonPrintUrl: "https://www.amazon.com/dp/B0GLFN8KBX",
        teaserVideoId: "61dVZDB-tYs",
        shortDescription: {
            en: "A practical handbook for moral decision-making in real life—promises, reputation, money, public duty, friendship, and pressure—reimagined in toki pona with sitelen pona for slow, clear rereading.",
            tp: "lipu ni li toki e nasin pali lon tenpo pi wile ante: mani, nimi pona, kulupu, jan pona, en ike."
        },
        longDescription: {
            en: "Cicero’s On Duties is built for the hardest everyday question: what to do when advantage pulls one way and conscience pulls another. This edition keeps the public-domain English reference text for comparison, then presents a full toki pona translation in two reading layers—Latin script and sitelen pona—so you can reread the same claims with fresh attention. Book I lays the foundation: what moral rightness is, where it comes from, and how it becomes practical rules you can carry into any situation. Book II tests “useful” choices in work, wealth, reputation, favors, and public life. Book III is the stress test: when the honorable and the useful seem to clash, Cicero argues that real advantage can’t be built on injustice—and that “benefit” bought by wrongdoing is a hidden debt paid later by you or the community.",
            tp: "lipu ni li toki e wile suli: mi o pali e seme lon tenpo ni? pona li tawa nasin wan, pona pi kama jo li tawa nasin ante la mi o seme? lipu ni li pana e nasin pi lukin, nasin pi pali, nasin pi awen pona lon kulupu."
        }
    },
    {
        id: "readers-kit",
        type: 'gift',
        title: {
            en: "The Toki Pona Reader’s Kit (Free PDF)",
            tp: "kulupu lipu pi kama lukin"
        },
        author: {
            en: "ABV & Pythagoras",
            tp: "jan pali lipu"
        },
        coverImage: "/assets/books/readers-kit/cover.webp",
        promoImage: "/assets/books/readers-kit/promo.webp",
        downloadPdfUrl: "https://toki-free.abvx.xyz/en",
        teaserVideoId: "F7fSBElppzI",
        shortDescription: {
            en: "A beginner-friendly entry point into reading toki pona with philosophical texts — plus the full practice text: The Golden Verses of Pythagoras.",
            tp: "lipu ni li open pona tawa lukin e toki pona kepeken lipu pi sona."
        },
        longDescription: {
            en: "Download it, learn the cues, and use it as your fast start before diving into the series.",
            tp: "lipu ni li pana e nasin open tawa lukin e toki pona lon lipu pi sona. ona li jo e toki pona ale pi jan sona pi nanpa. o kama jo e lipu ilo, o kama sona e nasin lukin, o open kama lon kulupu lipu."
        }
    }
];
