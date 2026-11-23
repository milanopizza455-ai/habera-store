import { CollectionItem, HeroBanner, Product, ReviewItem, StoreSettings } from '../types';
import { buildSixAngleGallery } from '../utils/galleryBuilder';

export const IMG = {
  // 4 Pakistani-model editorial Hero Banners
  bannerElegance: '/src/assets/images/pk_banner_1_elegance_1795416223015.jpg',
  bannerModesty: '/src/assets/images/pk_banner_2_luxury_1795416222556.jpg',
  bannerEssentials: '/src/assets/images/pk_banner_3_essentials_1795416222589.jpg',
  bannerSale: '/src/assets/images/pk_banner_4_sale_1795416224323.jpg',

  // Unique Pakistani-model Abaya silhouettes & colors
  plainBlack: '/src/assets/images/pk_abaya_plain_black_1795416223594.jpg',
  everydayBeige: '/src/assets/images/pk_prod_everyday_beige_1795416442735.jpg',
  chocolateClosed: '/src/assets/images/pk_abaya_chocolate_closed_1795416314714.jpg',
  chocolateBack: '/src/assets/images/back_hbr03_chocolate_1795417219878.jpg',
  zipGrey: '/src/assets/images/pk_abaya_zip_grey_1795416377771.jpg',
  luxuryMaroon: '/src/assets/images/pk_abaya_luxury_maroon_1795416313594.jpg',
  luxuryBlackGold: '/src/assets/images/pk_prod_luxury_black_gold_1795416443308.jpg',
  luxuryBlackGoldBack: '/src/assets/images/back_hbr06_luxury_black_1795417219886.jpg',
  occasionGrey: '/src/assets/images/pk_abaya_occasion_grey_1795416314775.jpg',
  occasionGreyBack: '/src/assets/images/back_hbr08_occasion_grey_1795417219289.jpg',
  butterflyOlive: '/src/assets/images/pk_abaya_butterfly_olive_1795416223559.jpg',
  butterflyOliveBack: '/src/assets/images/pk_abaya_back_olive_1795416375477.jpg',
  pleatedDustyPink: '/src/assets/images/pk_abaya_pleated_dustypink_1795416222990.jpg',
  turkishCoffee: '/src/assets/images/pk_abaya_turkish_coffee_1795416222490.jpg',
  turkishNavy: '/src/assets/images/pk_prod_turkish_navy_1795416442817.jpg',
  beltedBeige: '/src/assets/images/pk_abaya_belted_beige_1795416314908.jpg',
  kimonoMocha: '/src/assets/images/pk_abaya_kimono_mocha_1795416314186.jpg',
  kimonoOlive: '/src/assets/images/pk_prod_kimono_olive_1795416443194.jpg',
  openNavy: '/src/assets/images/pk_abaya_open_navy_1795416223912.jpg',
  creamOpen: '/src/assets/images/pk_abaya_cream_open_1795416316085.jpg',

  // Pakistani-model Stoles, Hijabs, Niqabs & Khimars
  stoleBeigePk: '/src/assets/images/pk_stole_pakistan_trio_1795416316404.jpg',
  stoleMaroonPk: '/src/assets/images/pk_prod_stole_maroon_silk_1795416444647.jpg',
  stoleTravertine: '/src/assets/images/prod_premium_stole_1795415430224.jpg',
  hijabCreamPk: '/src/assets/images/pk_hijab_pakistan_pastel_1795416317504.jpg',
  hijabBlackPk: '/src/assets/images/pk_prod_hijab_black_medina_1795416442503.jpg',
  regularNiqabPk: '/src/assets/images/pk_niqab_regular_pk_1795416374918.jpg',
  regularNiqabGreyPk: '/src/assets/images/pk_prod_niqab_grey_regular_1795416441891.jpg',
  regularNiqabBust: '/src/assets/images/prod_regular_niqab_1795415430232.jpg',
  saudiNiqabBlackPk: '/src/assets/images/pk_saudi_niqab_pk_1795416316945.jpg',
  saudiNiqabMochaPk: '/src/assets/images/pk_prod_niqab_mocha_saudi_1795416442348.jpg',
  khimarFrenchMocha: '/src/assets/images/pk_khimar_french_pk_1795416374853.jpg',
  khimarButterflyBlack: '/src/assets/images/pk_prod_khimar_black_butterfly_1795416442991.jpg',
} as const;

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  brandName: 'HABERA',
  tagline: 'Elegance in Modesty',
  announcementText: 'LIMITED TIME OFFER – ENJOY UP TO 30% OFF',
  whatsappNumber: '+923296899140',
  whatsappWelcomeMessage:
    'Assalam-o-Alaikum HABERA! I would like assistance with an order or product.',
  supportEmail: 'care@habera.pk',
  shippingFee: 250,
  freeShippingThreshold: 5000,
};

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'banner-1',
    headline: 'Elegance in Every Layer',
    subtitle: 'Discover Your Perfect Abaya',
    ctaLabel: 'SHOP NOW',
    targetCollection: 'all',
    image: IMG.bannerElegance,
  },
  {
    id: 'banner-2',
    headline: 'Modesty Meets Luxury',
    subtitle: 'Explore Our Beautiful Abaya Collection',
    ctaLabel: 'EXPLORE COLLECTION',
    targetCollection: 'luxury-abayas',
    image: IMG.bannerModesty,
  },
  {
    id: 'banner-3',
    headline: 'Your Modest Essentials',
    subtitle: 'Beautiful Stoles, Hijabs & Niqabs',
    ctaLabel: 'SHOP NOW',
    targetCollection: 'premium-stoles',
    image: IMG.bannerEssentials,
  },
  {
    id: 'banner-4',
    headline: 'Special HABERA Sale',
    subtitle: 'Enjoy Up To 30% OFF',
    ctaLabel: 'SHOP THE SALE',
    targetCollection: 'special-offers',
    image: IMG.bannerSale,
  },
];

export const COLLECTIONS: CollectionItem[] = [
  {
    slug: 'everyday-abayas',
    title: 'Everyday Abayas',
    subtitle: 'Breathable Korean Nida, zip-front, and Mandarin-collar daily wear.',
    image: IMG.plainBlack,
    priceRangeHint: 'Rs. 1,800 – 3,000',
  },
  {
    slug: 'luxury-abayas',
    title: 'Luxury Abayas',
    subtitle: 'Hand-finished zardozi embroidery, pearl cuffs, and formal occasion drapes.',
    image: IMG.luxuryMaroon,
    priceRangeHint: 'Rs. 3,000 – 4,500',
  },
  {
    slug: 'open-abayas',
    title: 'Open Abayas',
    subtitle: 'Layered front-open kimono, scalloped lace, and belted trench silhouettes.',
    image: IMG.openNavy,
    priceRangeHint: 'Rs. 2,500 – 4,000',
  },
  {
    slug: 'premium-stoles',
    title: 'Premium Stoles',
    subtitle: 'Featherlight modal, crinkle cotton, and embroidered silk stoles.',
    image: IMG.stoleBeigePk,
    priceRangeHint: 'Rs. 400 – 900',
  },
  {
    slug: 'everyday-hijabs',
    title: 'Everyday Hijabs',
    subtitle: 'Non-slip georgette chiffon and Medina silk hijabs for Pakistani weather.',
    image: IMG.hijabCreamPk,
    priceRangeHint: 'Rs. 450 – 1,000',
  },
  {
    slug: 'regular-niqabs',
    title: 'Regular Niqabs',
    subtitle: 'Breathable single-layer and tie-back matte niqabs in classic tones.',
    image: IMG.regularNiqabPk,
    priceRangeHint: 'Rs. 350 – 700',
  },
  {
    slug: 'saudi-niqabs',
    title: 'Saudi Niqabs',
    subtitle: 'Authentic multi-layer Saudi chiffon niqabs with adjustable nose-string drape.',
    image: IMG.saudiNiqabBlackPk,
    priceRangeHint: 'Rs. 500 – 1,200',
  },
  {
    slug: 'premium-khimars',
    title: 'Premium Khimars',
    subtitle: 'Graceful overhead French and butterfly khimars offering complete coverage.',
    image: IMG.khimarFrenchMocha,
    priceRangeHint: 'Rs. 1,000 – 2,000',
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Fresh 2026 Pakistani modest silhouettes in olive, dusty pink, maroon, and beige.',
    image: IMG.pleatedDustyPink,
    priceRangeHint: 'Latest Drops',
  },
  {
    slug: 'special-offers',
    title: 'Special Offers',
    subtitle: 'Curated signature pieces now available at flat 30% OFF for a limited time.',
    image: IMG.turkishCoffee,
    priceRangeHint: 'Up To 30% OFF',
  },
];

const DELIVERY_PAKISTAN =
  'Nationwide Cash on Delivery across Pakistan in 2–4 working days (Lahore, Karachi, Islamabad, Rawalpindi & all major cities). Free shipping on orders above Rs. 5,000.';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Everyday Abayas
  {
    id: 'hbr-01',
    slug: 'noor-mandarin-plain-nida-abaya',
    name: 'Noor Mandarin-Collar Plain Abaya',
    silhouetteStyle: 'Plain Everyday · Closed Front',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Minimalist jet-black closed-front everyday Korean Nida abaya with crisp Mandarin collar and concealed placket.',
    description:
      'Tailored for daily elegance in Pakistani summers, the Noor Mandarin-Collar Abaya combines an opaque matte Korean Nida drape with a clean concealed button placket and narrow tailored cuffs.',
    fabricDetails: '100% Breathable Korean Nida · Opaque Matte Finish · Machine Washable Cold',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2600,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.plainBlack,
        gallery: buildSixAngleGallery('hbr01-blk', IMG.plainBlack, {
          closeupOrigin: '50% 34%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.plainBlack],
  },
  {
    id: 'hbr-02',
    slug: 'hina-raglan-pocket-beige-abaya',
    name: 'Hina Raglan-Sleeve Everyday Abaya',
    silhouetteStyle: 'Everyday Relaxed · Raglan Cut',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Relaxed warm-beige closed abaya featuring sporty raglan shoulder seams, deep side pockets, and ribbed cuffs.',
    description:
      'Built for effortless campus and daily wear, the Hina Raglan Abaya offers generous arm mobility, two deep functional welt pockets, and a cool cotton-touch crepe weave.',
    fabricDetails: 'Soft Cotton-Touch Medina Crepe · Deep Side Pockets · Wrinkle-Resistant',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2450,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Beige',
        hex: '#D4BC9B',
        image: IMG.everydayBeige,
        gallery: buildSixAngleGallery('hbr02-bge', IMG.everydayBeige, {
          closeupOrigin: '42% 46%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.everydayBeige],
  },
  {
    id: 'hbr-03',
    slug: 'rabia-chocolate-bishop-closed-abaya',
    name: 'Rabia Bishop-Sleeve Button Abaya',
    silhouetteStyle: 'Closed-Front · Bishop Sleeve',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Rich chocolate-brown closed-front abaya with gathered bishop sleeves and full-length fabric-covered buttons.',
    description:
      'Featuring romantic gathered bishop sleeves and tonal covered buttons down the front bodice, the Rabia Abaya blends modest structure with breathable linen-crepe comfort.',
    fabricDetails: 'Linen-Crepe Blend · Elasticated Bishop Cuffs · Covered Front Buttons',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2900,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Chocolate',
        hex: '#4A3127',
        image: IMG.chocolateClosed,
        gallery: buildSixAngleGallery('hbr03-choc', IMG.chocolateClosed, {
          backSrc: IMG.chocolateBack,
          closeupOrigin: '52% 42%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.chocolateClosed],
  },
  {
    id: 'hbr-04',
    slug: 'ayesha-grey-zip-everyday-abaya',
    name: 'Ayesha Collared Zip-Front Abaya',
    silhouetteStyle: 'Everyday Utility · Zip Front',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Charcoal-grey tailored shirt-collar abaya with full concealed zip closure and angled welt pockets.',
    description:
      'Ideal for commuting and nursing-friendly convenience, the Ayesha Zip-Front Abaya pairs crisp shirt-collar tailoring with a smooth full-length zipper and durable matte crepe.',
    fabricDetails: 'Matte Turkish Crepe · Full Concealed Front Zip · Two Angled Pockets',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2750,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Grey',
        hex: '#55585C',
        image: IMG.zipGrey,
        gallery: buildSixAngleGallery('hbr04-gry', IMG.zipGrey, {
          closeupOrigin: '48% 36%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.zipGrey],
  },

  // 2. Luxury & Occasion Abayas
  {
    id: 'hbr-05',
    slug: 'zarina-maroon-zardozi-luxury-abaya',
    name: 'Zarina Maroon Zardozi Embroidered Abaya',
    silhouetteStyle: 'Luxury Embroidered · Flared Bell Sleeve',
    collection: 'luxury-abayas',
    categoryLabel: 'Luxury Abayas',
    shortDescription:
      'Deep maroon formal abaya adorned with intricate antique gold zardozi embroidery on bodice and bell cuffs.',
    description:
      'Crafted for Eid, nikah ceremonies, and festive evenings in Pakistan, the Zarina Abaya showcases traditional heritage gold motif embroidery along the flared bell sleeves and center neckline.',
    fabricDetails: 'Heavyweight Dubai Crepe · Antique Gold Zari & Silk Threadwork · Matching Waist Tie',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 4450,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Maroon',
        hex: '#5D1A22',
        image: IMG.luxuryMaroon,
        gallery: buildSixAngleGallery('hbr05-mrn', IMG.luxuryMaroon, {
          closeupOrigin: '54% 44%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.luxuryMaroon],
  },
  {
    id: 'hbr-06',
    slug: 'noorain-black-pearl-cuff-luxury-abaya',
    name: 'Noorain Gold & Pearl Cuff Couture Abaya',
    silhouetteStyle: 'Luxury Embroidered · Couture Bell Sleeve',
    collection: 'luxury-abayas',
    categoryLabel: 'Luxury Abayas',
    shortDescription:
      'Jet-black evening abaya accented with hand-beaded gold floral cuffs and matching embroidered shawl.',
    description:
      'Timeless black couture refined with shimmering gold-and-pearl cuff borders and a matching scalloped hijab border for understated wedding and dawat elegance.',
    fabricDetails: 'Satin-Back Korean Crepe · Hand-Applied Pearl & Zari Border · Matching Shawl',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 4300,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.luxuryBlackGold,
        gallery: buildSixAngleGallery('hbr06-blk', IMG.luxuryBlackGold, {
          backSrc: IMG.luxuryBlackGoldBack,
          closeupOrigin: '60% 44%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.luxuryBlackGold],
  },
  {
    id: 'hbr-07',
    slug: 'layla-champagne-pleated-occasion-abaya',
    name: 'Layla Champagne Pleated Occasion Abaya',
    silhouetteStyle: 'Occasion Pleated · Draped Sash',
    collection: 'luxury-abayas',
    categoryLabel: 'Luxury Abayas',
    shortDescription:
      'Champagne-beige diagonal pleated occasion abaya with shimmering gold-beaded border trim.',
    description:
      'Designed with sculptural diagonal pleats and delicate gold hand-embellished border trim, the Layla Occasion Abaya delivers graceful formal movement.',
    fabricDetails: 'Pleated Silk-Blend Crepe · Gold Sequined Border · Full Inner Lining',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 4500,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Beige',
        hex: '#D8C3A5',
        image: IMG.bannerModesty,
        gallery: buildSixAngleGallery('hbr07-bge', IMG.bannerModesty, {
          closeupOrigin: '50% 45%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.bannerModesty],
  },
  {
    id: 'hbr-08',
    slug: 'mehwish-grey-layered-chiffon-abaya',
    name: 'Mehwish Layered Chiffon Occasion Abaya',
    silhouetteStyle: 'Premium Occasion · Cascading Layers',
    collection: 'luxury-abayas',
    categoryLabel: 'Luxury Abayas',
    shortDescription:
      'Dove-grey cascading double-layer chiffon over crepe abaya with metallic beaded cuffs.',
    description:
      'Featherlight chiffon waterfall panels flutter gracefully over an opaque crepe base, finished with muted silver-gold embroidered cuffs.',
    fabricDetails: 'Double Georgette Chiffon & Crepe Base · Metallic Beaded Cuffs · Matching Hijab',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3950,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Grey',
        hex: '#B4B6B9',
        image: IMG.occasionGrey,
        gallery: buildSixAngleGallery('hbr08-gry', IMG.occasionGrey, {
          backSrc: IMG.occasionGreyBack,
          closeupOrigin: '52% 40%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.occasionGrey],
  },

  // 3. Butterfly, Pleated, Turkish & Belted Signature Silhouettes
  {
    id: 'hbr-09',
    slug: 'zoya-olive-butterfly-batwing-abaya',
    name: 'Zoya Olive Batwing Butterfly Abaya',
    silhouetteStyle: 'Butterfly Cut · Batwing Sleeve',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Flowing olive-green butterfly abaya featuring sweeping batwing sleeves and delicate tonal bead trim.',
    description:
      'Maximum modesty and airflow define the Zoya Butterfly Abaya. Cut in one wide, fluid drape with subtle vertical tonal stitching and wide batwing sleeves.',
    fabricDetails: 'Soft Flowing Nida-Crepe · Tonal Bead Cuff Trim · Wide Butterfly Drape',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2950,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Olive Green',
        hex: '#5F6638',
        image: IMG.butterflyOlive,
        gallery: buildSixAngleGallery('hbr09-olv', IMG.butterflyOlive, {
          backSrc: IMG.butterflyOliveBack,
          closeupOrigin: '45% 42%',
        }),
      },
    ],
    sizes: ['Free Size (54"–58" Drape)'],
    images: [IMG.butterflyOlive],
  },
  {
    id: 'hbr-10',
    slug: 'sana-dusty-pink-accordion-pleated-abaya',
    name: 'Sana Dusty-Pink Accordion Pleated Abaya',
    silhouetteStyle: 'Pleated Abaya · Pearl Cuff',
    collection: 'luxury-abayas',
    categoryLabel: 'Luxury Abayas',
    shortDescription:
      'Full-length dusty-pink micro-pleated abaya finished with pearl-buttoned long cuffs.',
    description:
      'Precision-pressed vertical pleats create an elongated, airy silhouette in soft dusty rose pink, complete with six luminous pearl buttons on each structured cuff.',
    fabricDetails: 'Accordion-Pleated Silk Chiffon · Full Opaque Lining · Pearl Button Cuffs',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3650,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Dusty Pink',
        hex: '#C69D9B',
        image: IMG.pleatedDustyPink,
        gallery: buildSixAngleGallery('hbr10-pnk', IMG.pleatedDustyPink, {
          closeupOrigin: '58% 45%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.pleatedDustyPink],
  },
  {
    id: 'hbr-11',
    slug: 'istanbul-turkish-belted-trench-abaya',
    name: 'Istanbul Turkish-Style Belted Trench Abaya',
    silhouetteStyle: 'Turkish-Style · Belted Trench',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Structured Turkish trench-coat abaya with notch collar, vertical princess seams, and waist belt.',
    description:
      'Inspired by Istanbul modest tailoring, featuring crisp lapels, structured bodice seams, and a matching tie belt. Available in Coffee Brown and Navy Blue — each switching to its exact matching color gallery.',
    fabricDetails: 'Structured Turkish Gabardine Crepe · Removable Waist Belt · Deep Pockets',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3800,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Coffee Brown',
        hex: '#6C4F3D',
        image: IMG.turkishCoffee,
        gallery: buildSixAngleGallery('hbr11-cof', IMG.turkishCoffee, {
          closeupOrigin: '52% 38%',
        }),
      },
      {
        name: 'Navy Blue',
        hex: '#1E2D4C',
        image: IMG.turkishNavy,
        gallery: buildSixAngleGallery('hbr11-nvy', IMG.turkishNavy, {
          closeupOrigin: '50% 38%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.turkishCoffee, IMG.turkishNavy],
  },
  {
    id: 'hbr-12',
    slug: 'sahar-belted-stormflap-aline-abaya',
    name: 'Sahar Belted Shoulder-Flap A-Line Abaya',
    silhouetteStyle: 'Belted Abaya · Asymmetric Flap',
    collection: 'everyday-abayas',
    categoryLabel: 'Everyday Abayas',
    shortDescription:
      'Warm sand-beige A-line abaya featuring an asymmetric buttoned shoulder cape flap and waist tie.',
    description:
      'Tailored architectural detailing on the bodice with three tonal horn buttons and a softly flared A-line skirt cinched cleanly at the waist.',
    fabricDetails: 'Matte Cotton-Twill Crepe · Buttoned Shoulder Yoke · Matching Belt',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 2950,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Beige',
        hex: '#D2B794',
        image: IMG.beltedBeige,
        gallery: buildSixAngleGallery('hbr12-bge', IMG.beltedBeige, {
          closeupOrigin: '52% 32%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.beltedBeige],
  },

  // 4. Open-Front & Kimono Abayas
  {
    id: 'hbr-13',
    slug: 'kinza-satin-piped-kimono-abaya',
    name: 'Kinza Belted Wide-Sleeve Kimono Abaya',
    silhouetteStyle: 'Kimono Abaya · Open Front',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Flowing wide-sleeve kimono abaya with contrast piping and braided waist tie. Switch between Mocha & Olive Green.',
    description:
      'Designed for effortless layering over inner dresses or kurta sets. Select Mocha for satin-trimmed sleeves with braided cord, or Olive Green for relaxed self-piped crepe over ivory.',
    fabricDetails: 'Fluid Korean Georgette-Crepe · Wide Kimono Sleeves · Matching Waist Belt',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3400,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Mocha',
        hex: '#846652',
        image: IMG.kimonoMocha,
        gallery: buildSixAngleGallery('hbr13-mch', IMG.kimonoMocha, {
          closeupOrigin: '50% 40%',
        }),
      },
      {
        name: 'Olive Green',
        hex: '#616B3E',
        image: IMG.kimonoOlive,
        gallery: buildSixAngleGallery('hbr13-olv', IMG.kimonoOlive, {
          closeupOrigin: '50% 40%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.kimonoMocha, IMG.kimonoOlive],
  },
  {
    id: 'hbr-14',
    slug: 'maham-navy-embroidered-lapel-open-abaya',
    name: 'Maham Navy Lapel-Trim Open Abaya',
    silhouetteStyle: 'Open-Front · Embroidered Collar',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Deep navy-blue flowing open abaya accented with delicate metallic embroidery along the collar and cuffs.',
    description:
      'Graceful open-front duster silhouette with crisp embroidered notch lapels and matching cuff motifs, styled effortlessly over cream ensembles.',
    fabricDetails: 'Lightweight Breeze Crepe · Embroidered Collar & Cuffs · Matching Hijab',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3550,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Navy Blue',
        hex: '#1C2C4B',
        image: IMG.openNavy,
        gallery: buildSixAngleGallery('hbr14-nvy', IMG.openNavy, {
          closeupOrigin: '50% 34%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.openNavy],
  },
  {
    id: 'hbr-15',
    slug: 'alia-cream-scalloped-lace-open-abaya',
    name: 'Alia Cream Lace-Hem Open Abaya',
    silhouetteStyle: 'Open-Front · Scalloped Lace',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Soft cream-ivory open-front abaya detailed with floral tonal lacework on the sleeves and scalloped hem.',
    description:
      'Feminine and light for daytime dawats and Eid mornings. Delicately finished with ivory botanical lace along the flared sleeves and scalloped hemline.',
    fabricDetails: 'Soft Matte Silk-Crepe · Tonal Floral Lace Hem & Cuffs · Matching Cream Hijab',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3900,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Cream',
        hex: '#F1EAD9',
        image: IMG.creamOpen,
        gallery: buildSixAngleGallery('hbr15-crm', IMG.creamOpen, {
          closeupOrigin: '56% 74%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.creamOpen],
  },
  {
    id: 'hbr-16',
    slug: 'meher-black-gold-cuff-open-abaya',
    name: 'Meher Black Gold-Border Open Abaya',
    silhouetteStyle: 'Open-Front · Heritage Border',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Flowing jet-black layered open abaya with antique gold brocade sleeve cuffs and hem border.',
    description:
      'Designed to drape fluidly over a matching inner slip, the Meher Abaya frames every step with woven gold geometric borders along the sleeves and hem.',
    fabricDetails: 'Korean Nida & Georgette Overlayer · Woven Gold Brocade Trim · Inner Slip Included',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 3750,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.bannerElegance,
        gallery: buildSixAngleGallery('hbr16-blk', IMG.bannerElegance, {
          closeupOrigin: '42% 48%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)', '58 (XL)'],
    images: [IMG.bannerElegance],
  },

  // 5. Premium Stoles
  {
    id: 'hbr-17',
    slug: 'habera-silk-modal-everyday-stole',
    name: 'HABERA Modal & Silk-Blend Stole',
    silhouetteStyle: 'Full-Coverage Modal Stole',
    collection: 'premium-stoles',
    categoryLabel: 'Premium Stoles',
    shortDescription:
      'Soft breathable Pakistani modal stole available in Warm Beige, Dusty Pink, and Embroidered Maroon.',
    description:
      'Generously cut at 195×75 cm for graceful shoulder and chest coverage. Select Beige for smooth matte modal, Dusty Pink for airy chiffon-modal drape, or Maroon for festive gold-bordered silk.',
    fabricDetails: '85% Bamboo Modal, 15% Viscose Silk · 195cm × 75cm · Soft Hand-Finished Edges',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 750,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Beige',
        hex: '#D6BEA2',
        image: IMG.stoleBeigePk,
        gallery: buildSixAngleGallery('hbr17-bge', IMG.stoleBeigePk, {
          closeupOrigin: '52% 45%',
        }),
      },
      {
        name: 'Dusty Pink',
        hex: '#BA8B88',
        image: IMG.bannerEssentials,
        gallery: buildSixAngleGallery('hbr17-pnk', IMG.bannerEssentials, {
          closeupOrigin: '64% 48%',
        }),
      },
      {
        name: 'Maroon',
        hex: '#641F29',
        image: IMG.stoleMaroonPk,
        gallery: buildSixAngleGallery('hbr17-mrn', IMG.stoleMaroonPk, {
          closeupOrigin: '56% 52%',
        }),
      },
    ],
    sizes: ['Standard (195×75 cm)'],
    images: [IMG.stoleBeigePk, IMG.bannerEssentials, IMG.stoleMaroonPk],
  },
  {
    id: 'hbr-18',
    slug: 'travertine-fringe-cashmere-touch-stole',
    name: 'Travertine Fringe Luxury Stole',
    silhouetteStyle: 'Eyelash Fringe Stole',
    collection: 'premium-stoles',
    categoryLabel: 'Premium Stoles',
    shortDescription:
      'Textured pashmina-touch modest stole with delicate eyelash fringe in warm neutral shades.',
    description:
      'Woven for cool mornings and air-conditioned offices, featuring refined eyelash fringe and soft non-slip drape.',
    fabricDetails: 'Modal-Cashmere Touch Blend · 200cm × 78cm · Eyelash Fringe',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 880,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Beige',
        hex: '#D4BF9F',
        image: IMG.stoleTravertine,
        gallery: buildSixAngleGallery('hbr18-bge', IMG.stoleTravertine, {
          closeupOrigin: '50% 42%',
        }),
      },
    ],
    sizes: ['Large (200×78 cm)'],
    images: [IMG.stoleTravertine],
  },

  // 6. Everyday Hijabs
  {
    id: 'hbr-19',
    slug: 'signature-georgette-medina-silk-hijab',
    name: 'Signature Georgette & Medina Silk Hijab',
    silhouetteStyle: 'Non-Slip Maxi Hijab',
    collection: 'everyday-hijabs',
    categoryLabel: 'Everyday Hijabs',
    shortDescription:
      'Breathable opaque everyday hijab with baby-hemmed edges. Choose Cream Georgette or Jet Black Medina Silk.',
    description:
      'Crafted specifically for Pakistani climates, offering complete opacity without layering bulk. Switch between soft Cream Georgette and matte Jet Black Medina Silk.',
    fabricDetails: 'Korean Matte Georgette / Medina Silk Twill · 195cm × 75cm · Zero Transparency',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 700,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Cream',
        hex: '#EFE7D6',
        image: IMG.hijabCreamPk,
        gallery: buildSixAngleGallery('hbr19-crm', IMG.hijabCreamPk, {
          closeupOrigin: '34% 38%',
        }),
      },
      {
        name: 'Black',
        hex: '#121212',
        image: IMG.hijabBlackPk,
        gallery: buildSixAngleGallery('hbr19-blk', IMG.hijabBlackPk, {
          closeupOrigin: '34% 38%',
        }),
      },
    ],
    sizes: ['Maxi (195×75 cm)'],
    images: [IMG.hijabCreamPk, IMG.hijabBlackPk],
  },

  // 7. Regular Niqabs
  {
    id: 'hbr-20',
    slug: 'classic-breathable-tie-regular-niqab',
    name: 'Classic Breathable Tie-Back Regular Niqab',
    silhouetteStyle: 'Single-Layer Regular Cut',
    collection: 'regular-niqabs',
    categoryLabel: 'Regular Niqabs',
    shortDescription:
      'Featherlight single-layer regular niqab with soft tie straps. Available in Jet Black and Slate Grey.',
    description:
      'Engineered for maximum breathability in warm weather with soft non-chafing cotton-chiffon interior lining and wide tie-back straps.',
    fabricDetails: 'Micro-Breathable Korean Chiffon · Soft Satin Tie Straps · Gentle Eye Opening',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 500,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: false,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.regularNiqabPk,
        gallery: buildSixAngleGallery('hbr20-blk', IMG.regularNiqabPk, {
          closeupOrigin: '50% 35%',
        }),
      },
      {
        name: 'Grey',
        hex: '#5E666E',
        image: IMG.regularNiqabGreyPk,
        gallery: buildSixAngleGallery('hbr20-gry', IMG.regularNiqabGreyPk, {
          closeupOrigin: '50% 35%',
        }),
      },
    ],
    sizes: ['Free Size (Adjustable Tie)'],
    images: [IMG.regularNiqabPk, IMG.regularNiqabGreyPk],
  },
  {
    id: 'hbr-21',
    slug: 'matte-everyday-comfort-niqab-set',
    name: 'Matte Comfort Regular Niqab & Hijab Set',
    silhouetteStyle: 'Attached Tie Regular Niqab',
    collection: 'regular-niqabs',
    categoryLabel: 'Regular Niqabs',
    shortDescription:
      'Complete matte black tie-back regular niqab styled with a coordinated everyday drape hijab.',
    description:
      'Ready-to-wear matching matte black niqab and wrap hijab combo offering smooth opacity and secure fit beneath glasses or undercaps.',
    fabricDetails: 'Double-Layered Matte Georgette · Includes Matching Wrap Hijab',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 680,
    isOnSale: false,
    discountPercent: 0,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.regularNiqabBust,
        gallery: buildSixAngleGallery('hbr21-blk', IMG.regularNiqabBust, {
          closeupOrigin: '50% 35%',
        }),
      },
    ],
    sizes: ['Free Size'],
    images: [IMG.regularNiqabBust],
  },

  // 8. Saudi Niqabs
  {
    id: 'hbr-22',
    slug: 'al-madinah-multi-layer-saudi-niqab',
    name: 'Al-Madinah Multi-Layer Saudi Niqab',
    silhouetteStyle: 'Authentic Saudi Layered Cut',
    collection: 'saudi-niqabs',
    categoryLabel: 'Saudi Niqabs',
    shortDescription:
      'Authentic multi-layer Saudi chiffon niqab with nose-string drape. Available in Jet Black and Mocha.',
    description:
      'Imported Saudi laser-cut chiffon offering adaptable eye-veil layers and a structured forehead band that stays neat all day without slipping.',
    fabricDetails: 'Authentic Saudi Chiffon · Nose-String & Flip-Over Veil · Forehead Tie Band',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 1100,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.saudiNiqabBlackPk,
        gallery: buildSixAngleGallery('hbr22-blk', IMG.saudiNiqabBlackPk, {
          closeupOrigin: '48% 34%',
        }),
      },
      {
        name: 'Mocha',
        hex: '#6B4837',
        image: IMG.saudiNiqabMochaPk,
        gallery: buildSixAngleGallery('hbr22-mch', IMG.saudiNiqabMochaPk, {
          closeupOrigin: '48% 36%',
        }),
      },
    ],
    sizes: ['Standard Saudi Cut (22")'],
    images: [IMG.saudiNiqabBlackPk, IMG.saudiNiqabMochaPk],
  },

  // 9. Premium Khimars
  {
    id: 'hbr-23',
    slug: 'french-overhead-butterfly-khimar-set',
    name: 'French Overhead & Butterfly Khimar Set',
    silhouetteStyle: 'Overhead Full-Coverage Khimar',
    collection: 'premium-khimars',
    categoryLabel: 'Premium Khimars',
    shortDescription:
      'Pin-free overhead French & butterfly khimar with fitted cuffs. Available in Mocha Two-Piece & Jet Black.',
    description:
      'Effortless full coverage in seconds. Integrated tie-back chin strap and fitted elastic wrist sleeves keep the khimar securely positioned during prayer, travel, and daily errands.',
    fabricDetails: 'Breathable Medina Silk-Crepe · Integrated Headband Tie · Elastic Wrist Cuffs',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 1950,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'In Stock',
    colors: [
      {
        name: 'Mocha',
        hex: '#8C705C',
        image: IMG.khimarFrenchMocha,
        gallery: buildSixAngleGallery('hbr23-mch', IMG.khimarFrenchMocha, {
          closeupOrigin: '50% 42%',
        }),
      },
      {
        name: 'Black',
        hex: '#101010',
        image: IMG.khimarButterflyBlack,
        gallery: buildSixAngleGallery('hbr23-blk', IMG.khimarButterflyBlack, {
          closeupOrigin: '50% 42%',
        }),
      },
    ],
    sizes: ['Free Size (Length 54"–58")'],
    images: [IMG.khimarFrenchMocha, IMG.khimarButterflyBlack],
  },

  // 10. Signature Atelier Couture Set
  {
    id: 'hbr-24',
    slug: 'habera-atelier-heritage-open-abaya',
    name: 'HABERA Atelier Belted & Gold-Clasp Abaya',
    silhouetteStyle: 'Atelier Couture · Belted / Clasp',
    collection: 'open-abayas',
    categoryLabel: 'Open Abayas',
    shortDescription:
      'Limited edition Pakistani atelier edit pairing structured coffee wool-crepe with cream gold-clasp kimono.',
    description:
      'Tailored in limited seasonal quantities at our Lahore studio. Choose the Coffee Brown belted winter-crepe edition or Cream Ivory gold-clasp kimono edition.',
    fabricDetails: 'Atelier Crepe & Wool-Touch Twill · Custom Gold Clasp / D-Ring Belt',
    deliveryInfo: DELIVERY_PAKISTAN,
    originalPrice: 4000,
    isOnSale: true,
    discountPercent: 30,
    isNewArrival: true,
    availability: 'Low Stock',
    colors: [
      {
        name: 'Coffee Brown',
        hex: '#573F31',
        image: IMG.bannerSale,
        gallery: buildSixAngleGallery('hbr24-cof', IMG.bannerSale, {
          closeupOrigin: '42% 38%',
        }),
      },
    ],
    sizes: ['52 (S)', '54 (M)', '56 (L)'],
    images: [IMG.bannerSale],
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Ayesha K.',
    city: 'Lahore',
    rating: 5,
    comment:
      'The Korean Nida fabric on the Noor Mandarin Abaya feels cool even in Lahore heat and drapes cleanly without clinging.',
    productPurchased: 'Noor Mandarin-Collar Plain Abaya',
    isDemoSample: true,
  },
  {
    id: 'rev-2',
    customerName: 'Fatima Z.',
    city: 'Karachi',
    rating: 5,
    comment:
      'Ordered the Zarina Maroon Zardozi Abaya on 30% OFF — the sleeve embroidery looks regal and arrived in 3 days via COD.',
    productPurchased: 'Zarina Maroon Zardozi Embroidered Abaya',
    isDemoSample: true,
  },
  {
    id: 'rev-3',
    customerName: 'Hira M.',
    city: 'Islamabad',
    rating: 5,
    comment:
      'Finally found a Saudi Niqab in both Black and Mocha that is genuinely breathable with zero harsh stitching.',
    productPurchased: 'Al-Madinah Multi-Layer Saudi Niqab',
    isDemoSample: true,
  },
  {
    id: 'rev-4',
    customerName: 'Sana R.',
    city: 'Rawalpindi',
    rating: 5,
    comment:
      'HABERA stoles and Medina silk hijabs stay neat all day at university without slipping.',
    productPurchased: 'HABERA Modal & Silk-Blend Stole',
    isDemoSample: true,
  },
  {
    id: 'rev-5',
    customerName: 'Maryam A.',
    city: 'Faisalabad',
    rating: 5,
    comment:
      'The Olive Batwing Butterfly Abaya has gorgeous movement and generous coverage. Great PKR value.',
    productPurchased: 'Zoya Olive Batwing Butterfly Abaya',
    isDemoSample: true,
  },
  {
    id: 'rev-6',
    customerName: 'Zainab T.',
    city: 'Multan',
    rating: 4,
    comment:
      'Loved switching between the Coffee and Navy Turkish Trench views before ordering. Stitching quality is superb.',
    productPurchased: 'Istanbul Turkish-Style Belted Trench Abaya',
    isDemoSample: true,
  },
];
