export interface LocalizedString {
    fr: string;
    uk: string;
}

export interface BookIdentifiers {
    asinKindle?: string;
    asinPrint?: string;
    isbn13Print?: string;
}

export interface BookEditionDetails {
    publicationDate?: string; // ISO yyyy-mm-dd
    edition?: string; // e.g. "1st"
    language?: string; // e.g. "French"
    fileSizeMb?: number;
    printLengthPages?: number;
    publisher?: string;
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
    kindle?: BookEditionDetails;
    print?: BookEditionDetails;
}

export const books: Book[] = [
    {
        id: "khvylovy-sanatorium",
        type: 'commercial',
        title: {
            fr: "La zone du sanatorium",
            uk: "Санаторійна зона"
        },
        author: {
            fr: "Mykola Khvylovy",
            uk: "Микола Хвильовий"
        },
        coverImage: "/assets/books/khvylovy-sanatorium/cover.webp",
        promoImage: "/assets/books/khvylovy-sanatorium/promo.webp",
        amazonKindleUrl: "https://www.amazon.fr/dp/B0G8V24GS2",
        amazonPrintUrl: "https://www.amazon.fr/dp/B0G9G6JGDN",
        teaserVideoId: "CdXmATvTPjg",
        identifiers: {
            asinKindle: 'B0G8V24GS2',
            asinPrint: 'B0G9G6JGDN',
            isbn13Print: '979-8279045938',
        },
        kindle: {
            publicationDate: '2025-12-19',
            edition: '1st',
            language: 'French',
            fileSizeMb: 5.8,
            printLengthPages: 473,
        },
        print: {
            publicationDate: '2025-12-19',
            language: 'French',
            publisher: 'Independently published',
            printLengthPages: 495,
        },
        shortDescription: {
            fr: "L'espace est clos, la morale est fissurée, et la langue se brise pour dire l'indicible. Khvylovy, c'est la révolution vue de l'intérieur, sans slogans.",
            uk: "Простір замкнений, мораль тріщить, а мова ламається, щоб сказати про невимовне. Хвильовий — це революція зсередини, без жодних гасел."
        },
        longDescription: {
            fr: "Une constellation de récits où l'individu se débat avec l'idée et l'Histoire. On y trouve une prose musicale, fragmentée, et un regard impitoyable sur la vulgarité institutionnelle. Nouvelle traduction avec préface et notes.",
            uk: "Сузір'я оповідань, де особистість бореться з ідеєю та Історією. Читач знайде тут музичну, фрагментовану прозу та нещадний погляд на інституційну вульгарність. Новий переклад із передмовою та примітками."
        }
    },
    {
        id: "ianovski-maitre-du-navire",
        type: 'commercial',
        title: {
            fr: "Le Maître du navire",
            uk: "Майстер корабля"
        },
        author: {
            fr: "Iouri Ianovski",
            uk: "Юрій Яновський"
        },
        coverImage: "/assets/books/ianovski-maitre-du-navire/cover.webp",
        promoImage: "/assets/books/ianovski-maitre-du-navire/promo.webp",
        amazonKindleUrl: "https://www.amazon.fr/dp/B0GC9P9VKT",
        amazonPrintUrl: "https://www.amazon.fr/dp/B0GCLLJZJ8",
        teaserVideoId: "GqNzjSkvWvs",
        identifiers: {
            asinKindle: 'B0GC9P9VKT',
            asinPrint: 'B0GCLLJZJ8',
            isbn13Print: '979-8241273000',
        },
        kindle: {
            publicationDate: '2025-12-23',
            edition: '1st',
            language: 'French',
            fileSizeMb: 11.5,
            printLengthPages: 272,
        },
        print: {
            publicationDate: '2025-12-25',
            language: 'French',
            publisher: 'Independently published',
            printLengthPages: 252,
        },
        shortDescription: {
            fr: "Ianovski écrit comme la caméra bouge. Un navire devient le symbole d'une utopie créatrice dans ce texte lumineux, risqué et profondément européen.",
            uk: "Яновський пише так, ніби камера рухається. Корабель стає символом утопії в цьому світлому, ризикованому і глибоко європейському тексті."
        },
        longDescription: {
            fr: "Ianovski a inventé le roman-cinéma : libre, solaire, loin des clichés d'un Orient « sombre ». Ici, Odessa est la fabrique du futur : la mer comme méthode, l'amitié comme moteur, l'art comme promesse. Traduction intégrale accompagnée d'une préface et de notes.",
            uk: "Яновський винайшов роман-кіно: вільний, світлий, глибоко європейський, далекий від кліше «темного» Сходу. Одеса тут — фабрика майбутнього: море як метод, дружба як двигун, мистецтво як обіцянка. Повний французький переклад із передмовою та примітками."
        }
    },
    {
        id: "johansen-leonardo",
        type: 'commercial',
        title: {
            fr: "Le Voyage du savant docteur Leonardo",
            uk: "Подорож ученого доктора Леонардо"
        },
        author: {
            fr: "Maïk Johansen",
            uk: "Майк Йогансен"
        },
        coverImage: "/assets/books/johansen-leonardo/cover.webp",
        promoImage: "/assets/books/johansen-leonardo/promo.webp",
        amazonKindleUrl: "https://www.amazon.fr/dp/B0GDV7283Z",
        amazonPrintUrl: "https://www.amazon.fr/dp/B0GDXGNT6B",
        teaserVideoId: "LWRWb7CKE4I",
        identifiers: {
            asinKindle: 'B0GDV7283Z',
            asinPrint: 'B0GDXGNT6B',
            isbn13Print: '979-8242435131',
        },
        kindle: {
            publicationDate: '2026-01-03',
            edition: '1st',
            language: 'French',
            fileSizeMb: 20.7,
            printLengthPages: 640,
        },
        print: {
            publicationDate: '2026-01-03',
            language: 'French',
            publisher: 'Independently published',
            printLengthPages: 624,
        },
        shortDescription: {
            fr: "Johansen joue avec le roman comme avec un billard : un coup précis, et le genre éclate en mille morceaux. Une parodie de voyage savant délicieusement ironique.",
            uk: "Йогансен грає з романом як з більярдом: точний удар, і жанр розсипається на іронічні уламки. Вигадлива пародія на «наукову» подорож."
        },
        longDescription: {
            fr: "Première édition française d'un auteur clé de la Renaissance fusillée. Johansen livre une prose joueuse et ironique, consciente de ses propres mécanismes — comme si Queneau ou Perec avaient pris le train pour Kharkiv en 1928. Roman, poétique, reportage : une anthologie qui prouve que le modernisme ukrainien est une avant-garde européenne.",
            uk: "Перше французьке видання ключового автора Розстріляного Відродження. Йогансен пише грайливу, іронічну прозу, свідому власних механізмів — ніби Кено та Перек сіли на потяг до Харкова у 1928 році. Роман, поетика, репортаж: антологія, що доводить: український модернізм — це європейський авангард."
        }
    },
    {
        id: "pidmohylny-la-ville",
        type: 'commercial',
        title: {
            fr: "La Ville",
            uk: "Місто"
        },
        author: {
            fr: "Valerian Pidmohylny",
            uk: "Валер'ян Підмогильний"
        },
        coverImage: "/assets/books/pidmohylny-la-ville/cover.webp",
        promoImage: "/assets/books/pidmohylny-la-ville/promo.webp",
        amazonKindleUrl: "https://www.amazon.fr/dp/B0GBY8CHYM",
        amazonPrintUrl: "https://www.amazon.fr/dp/B0GC5ZMBTX",
        teaserVideoId: "sHyGKkFdChY",
        identifiers: {
            asinKindle: 'B0GBY8CHYM',
            asinPrint: 'B0GC5ZMBTX',
            isbn13Print: '979-8279477104',
        },
        kindle: {
            publicationDate: '2025-12-22',
            edition: '1st',
            language: 'French',
            fileSizeMb: 8.3,
            printLengthPages: 416,
        },
        // Print details TBD
        shortDescription: {
            fr: "Un jeune provincial vient « devenir quelqu'un » à Kiev. La ville commence alors son travail sur lui : dur, séducteur, inéluctable. Un grand roman urbain.",
            uk: "Хлопець із провінції приїздить «стати кимось» у Києві. Місто починає працювати з ним: жорстко, спокусливо, невідворотно. Великий урбаністичний роман."
        },
        longDescription: {
            fr: "Pidmohylny écrit la modernité urbaine sans folklore, avec une finesse psychologique qui parlera aux lecteurs du réalisme. Kiev n'est pas un décor, c'est une force. Nouvelle traduction, préface, notes et appareil critique.",
            uk: "Підмогильний пише про міську сучасність без фольклору, з психологічною тонкістю, яка відгукнеться читачам реалізму. Київ — це не декорація, це сила. Новий переклад, передмова, примітки, критичний апарат."
        }
    },
    {
        id: "kosynka-gift",
        type: 'gift',
        title: {
            fr: "Dans les seigles",
            uk: "В житах"
        },
        author: {
            fr: "Hryhorii Kosynka",
            uk: "Григорій Косинка"
        },
        coverImage: "/assets/books/kosynka-gift/cover.webp",
        promoImage: "/assets/books/kosynka-gift/promo.webp",
        downloadPdfUrl: "/assets/books/kosynka-gift/files/kosynka-gift.pdf",
        downloadEpubUrl: "/assets/books/kosynka-gift/files/kosynka-gift.epub",
        teaserVideoId: "4z3O2o2DNyc",
        shortDescription: {
            fr: "Une nouvelle saisissante sur la tragédie de la paysannerie ukrainienne, par l'un des plus grands stylistes de la Renaissance Fusillée.",
            uk: "Вражаюча новела про трагедію українського селянства від одного з найкращих стилістів Розстріляного Відродження."
        },
        longDescription: {
            fr: "Hryhorii Kosynka est le maître de l'impressionnisme rural. Dans 'Dans les seigles', il peint avec une précision cruelle et une compassion infinie le déchirement d'un monde qui bascule. Ce texte, offert ici dans une nouvelle traduction, est une porte d'entrée idéale vers l'univers de Kosynka.",
            uk: "Григорій Косинка — майстер сільського імпресіонізму. У «В житах» він із жорстокою точністю та безмежним співчуттям малює розлом світу, що руйнується. Цей текст, що пропонується тут у новому перекладі, є ідеальним вступом до всесвіту Косинки."
        }
    }
];
