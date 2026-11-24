import type { Lang } from '../types/product'
import { products } from './products'
export interface MenuItem { sub: string; category: string; label: Record<Lang, string> }
export interface MenuGroup { key: string; label: Record<Lang, string>; items: MenuItem[] }
export const menu: MenuGroup[] = [
 {
  "key": "robes",
  "label": {
   "fr": "Robes",
   "en": "Dresses",
   "ar": "فساتين"
  },
  "items": [
   {
    "sub": "Robes courtes",
    "category": "robes",
    "label": {
     "fr": "Robes courtes",
     "en": "Short dresses",
     "ar": "فساتين قصيرة"
    }
   },
   {
    "sub": "Robes midi",
    "category": "robes",
    "label": {
     "fr": "Robes midi",
     "en": "Midi dresses",
     "ar": "فساتين ميدي"
    }
   },
   {
    "sub": "Robes longues",
    "category": "robes",
    "label": {
     "fr": "Robes longues",
     "en": "Long dresses",
     "ar": "فساتين طويلة"
    }
   },
   {
    "sub": "Robes soirée",
    "category": "robes",
    "label": {
     "fr": "Robes soirée",
     "en": "Evening dresses",
     "ar": "فساتين سهرة"
    }
   }
  ]
 },
 {
  "key": "jupes",
  "label": {
   "fr": "Jupes",
   "en": "Skirts",
   "ar": "تنانير"
  },
  "items": [
   {
    "sub": "Jupes courtes",
    "category": "jupes",
    "label": {
     "fr": "Jupes courtes",
     "en": "Short skirts",
     "ar": "تنانير قصيرة"
    }
   },
   {
    "sub": "Jupes midi",
    "category": "jupes",
    "label": {
     "fr": "Jupes midi",
     "en": "Midi skirts",
     "ar": "تنانير ميدي"
    }
   },
   {
    "sub": "Jupes longues",
    "category": "jupes",
    "label": {
     "fr": "Jupes longues",
     "en": "Long skirts",
     "ar": "تنانير طويلة"
    }
   }
  ]
 },
 {
  "key": "pantalons",
  "label": {
   "fr": "Pantalons",
   "en": "Trousers",
   "ar": "سراويل"
  },
  "items": [
   {
    "sub": "Pantalons classiques",
    "category": "pantalons",
    "label": {
     "fr": "Pantalons classiques",
     "en": "Classic trousers",
     "ar": "سراويل كلاسيكية"
    }
   },
   {
    "sub": "Pantalons larges",
    "category": "pantalons",
    "label": {
     "fr": "Pantalons larges",
     "en": "Wide-leg trousers",
     "ar": "سراويل واسعة"
    }
   },
   {
    "sub": "Pantalons taille haute",
    "category": "pantalons",
    "label": {
     "fr": "Pantalons taille haute",
     "en": "High-waist trousers",
     "ar": "سراويل عالية الخصر"
    }
   },
   {
    "sub": "Jeans",
    "category": "pantalons",
    "label": {
     "fr": "Jeans",
     "en": "Jeans",
     "ar": "جينز"
    }
   }
  ]
 },
 {
  "key": "hauts",
  "label": {
   "fr": "Hauts",
   "en": "Tops",
   "ar": "القطع العلوية"
  },
  "items": [
   {
    "sub": "Tops",
    "category": "tops",
    "label": {
     "fr": "Tops",
     "en": "Tops",
     "ar": "توبات"
    }
   },
   {
    "sub": "Blouses",
    "category": "tops",
    "label": {
     "fr": "Blouses",
     "en": "Blouses",
     "ar": "بلوزات"
    }
   },
   {
    "sub": "Chemises",
    "category": "tops",
    "label": {
     "fr": "Chemises",
     "en": "Shirts",
     "ar": "قمصان"
    }
   },
   {
    "sub": "Pulls",
    "category": "tops",
    "label": {
     "fr": "Pulls",
     "en": "Sweaters",
     "ar": "بلوفرات"
    }
   },
   {
    "sub": "Cardigans",
    "category": "tops",
    "label": {
     "fr": "Cardigans",
     "en": "Cardigans",
     "ar": "كارديغان"
    }
   }
  ]
 },
 {
  "key": "vestes",
  "label": {
   "fr": "Vestes & manteaux",
   "en": "Jackets & coats",
   "ar": "جاكيتات ومعاطف"
  },
  "items": [
   {
    "sub": "Vestes",
    "category": "vestes",
    "label": {
     "fr": "Vestes",
     "en": "Jackets",
     "ar": "جاكيتات"
    }
   },
   {
    "sub": "Blazers",
    "category": "vestes",
    "label": {
     "fr": "Blazers",
     "en": "Blazers",
     "ar": "بليزرات"
    }
   },
   {
    "sub": "Manteaux",
    "category": "manteaux",
    "label": {
     "fr": "Manteaux",
     "en": "Coats",
     "ar": "معاطف"
    }
   },
   {
    "sub": "Trenchs",
    "category": "manteaux",
    "label": {
     "fr": "Trenchs",
     "en": "Trench coats",
     "ar": "ترنشات"
    }
   },
   {
    "sub": "Gilets",
    "category": "manteaux",
    "label": {
     "fr": "Gilets",
     "en": "Vests",
     "ar": "جيليهات"
    }
   }
  ]
 },
 {
  "key": "autres",
  "label": {
   "fr": "Autres",
   "en": "Other",
   "ar": "أخرى"
  },
  "items": [
   {
    "sub": "Combinaisons",
    "category": "ensembles",
    "label": {
     "fr": "Combinaisons",
     "en": "Jumpsuits",
     "ar": "بذلات"
    }
   },
   {
    "sub": "Ensembles",
    "category": "ensembles",
    "label": {
     "fr": "Ensembles",
     "en": "Sets",
     "ar": "أطقم"
    }
   },
   {
    "sub": "Abayas",
    "category": "abayas",
    "label": {
     "fr": "Abayas",
     "en": "Abayas",
     "ar": "عبايات"
    }
   },
   {
    "sub": "Tuniques",
    "category": "abayas",
    "label": {
     "fr": "Tuniques",
     "en": "Tunics",
     "ar": "تونيك"
    }
   }
  ]
 }
]

/** Mega menu / accordion: only sub-categories that currently have products (computed on each call, so new articles appear). */
export const getVisibleMenu = (): MenuGroup[] => menu
  .map((g) => ({ ...g, items: g.items.filter((it) => products.some((p) => p.subcategory === it.sub)) }))
  .filter((g) => g.items.length > 0)
