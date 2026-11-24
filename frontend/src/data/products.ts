import type { Product } from '../types/product'
import { applyPhotos } from '../utils/productImages'
import { colorLabels } from './colors'
const rawProducts: Product[] = [
 {
  "id": "robe-soiree-evasee",
  "name": {
   "fr": "Robe de Soirée",
   "en": "Evening Gown",
   "ar": "فستان سهرة"
  },
  "category": "robes",
  "subcategory": "Robes soirée",
  "price": 18900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   }
  ],
  "style": "Soirée",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux"
  ],
  "tags": [
   "robes",
   "robes soirée",
   "soirée",
   "bordeaux"
  ],
  "stock": {
   "XS": false,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "robe-manches-transparentes",
  "name": {
   "fr": "Robe Midi Brodée",
   "en": "Embroidered Midi Dress",
   "ar": "فستان ميدي مطرز"
  },
  "category": "robes",
  "subcategory": "Robes midi",
  "price": 11900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:noir",
  "images": [
   "placeholder:noir"
  ],
  "tags": [
   "robes",
   "robes midi",
   "élégant",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "robe-courte-noeud",
  "name": {
   "fr": "Robe à Nœud",
   "en": "Bow Dress",
   "ar": "فستان بعقدة"
  },
  "category": "robes",
  "subcategory": "Robes courtes",
  "price": 7900,
  "oldPrice": 9900,
  "discount": 20,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Soirée",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:noir"
  ],
  "tags": [
   "robes",
   "robes courtes",
   "soirée",
   "bordeaux",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": false
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "robe-tweed",
  "name": {
   "fr": "Robe Tweed",
   "en": "Tweed Dress",
   "ar": "فستان تويد"
  },
  "category": "robes",
  "subcategory": "Robes midi",
  "price": 12900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:noir"
  ],
  "tags": [
   "robes",
   "robes midi",
   "élégant",
   "bordeaux",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "robe-maille",
  "name": {
   "fr": "Robe en Maille",
   "en": "Knit Dress",
   "ar": "فستان تريكو"
  },
  "category": "robes",
  "subcategory": "Robes midi",
  "price": 8900,
  "oldPrice": 10900,
  "discount": 18,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "gris",
    "hex": "#8b8985"
   }
  ],
  "style": "Casual",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:gris"
  ],
  "tags": [
   "robes",
   "robes midi",
   "casual",
   "beige",
   "gris"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "jupe-crayon",
  "name": {
   "fr": "Jupe Crayon",
   "en": "Pencil Skirt",
   "ar": "تنورة قلم"
  },
  "category": "jupes",
  "subcategory": "Jupes courtes",
  "price": 5900,
  "oldPrice": 7500,
  "discount": 21,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "noir",
    "hex": "#1D1A19"
   },
   {
    "key": "gris",
    "hex": "#8b8985"
   }
  ],
  "style": "Office",
  "image": "placeholder:noir",
  "images": [
   "placeholder:noir",
   "placeholder:gris"
  ],
  "tags": [
   "jupes",
   "jupes courtes",
   "office",
   "noir",
   "gris"
  ],
  "stock": {
   "XS": false,
   "S": true,
   "M": true,
   "L": true,
   "XL": false
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "jupe-portefeuille-satinee",
  "name": {
   "fr": "Jupe Satin",
   "en": "Satin Skirt",
   "ar": "تنورة ساتان"
  },
  "category": "jupes",
  "subcategory": "Jupes longues",
  "price": 8500,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "marron",
    "hex": "#7a5a45"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Chic",
  "image": "placeholder:marron",
  "images": [
   "placeholder:marron",
   "placeholder:noir"
  ],
  "tags": [
   "jupes",
   "jupes longues",
   "chic",
   "marron",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "jupe-portefeuille-nouee",
  "name": {
   "fr": "Jupe Portefeuille",
   "en": "Wrap Skirt",
   "ar": "تنورة متقاطعة"
  },
  "category": "jupes",
  "subcategory": "Jupes midi",
  "price": 6900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Office",
  "image": "placeholder:noir",
  "images": [
   "placeholder:noir"
  ],
  "tags": [
   "jupes",
   "jupes midi",
   "office",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "jupe-plissee",
  "name": {
   "fr": "Jupe Plissée",
   "en": "Pleated Skirt",
   "ar": "تنورة مطوية"
  },
  "category": "jupes",
  "subcategory": "Jupes midi",
  "price": 7900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:beige"
  ],
  "tags": [
   "jupes",
   "jupes midi",
   "élégant",
   "bordeaux",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "pantalon-taille-haute",
  "name": {
   "fr": "Pantalon Taille Haute",
   "en": "High-Waist Trousers",
   "ar": "بنطلون عالي الخصر"
  },
  "category": "pantalons",
  "subcategory": "Pantalons taille haute",
  "price": 8900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bleu",
    "hex": "#3f5673"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Office",
  "image": "placeholder:bleu",
  "images": [
   "placeholder:bleu",
   "placeholder:noir"
  ],
  "tags": [
   "pantalons",
   "pantalons taille haute",
   "office",
   "bleu",
   "noir"
  ],
  "stock": {
   "XS": false,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "pantalon-large-plisse",
  "name": {
   "fr": "Pantalon à Pinces",
   "en": "Pleated Trousers",
   "ar": "بنطلون بثنيات"
  },
  "category": "pantalons",
  "subcategory": "Pantalons larges",
  "price": 8500,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "vert",
    "hex": "#5a6b55"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:vert",
  "images": [
   "placeholder:vert",
   "placeholder:beige"
  ],
  "tags": [
   "pantalons",
   "pantalons larges",
   "minimal",
   "vert",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "pantalon-large",
  "name": {
   "fr": "Pantalon Large",
   "en": "Wide-Leg Trousers",
   "ar": "بنطلون واسع"
  },
  "category": "pantalons",
  "subcategory": "Pantalons larges",
  "price": 8200,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Chic",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:noir"
  ],
  "tags": [
   "pantalons",
   "pantalons larges",
   "chic",
   "bordeaux",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "veste-peau-lainee",
  "name": {
   "fr": "Veste Shearling",
   "en": "Shearling Jacket",
   "ar": "جاكيت شيربا"
  },
  "category": "vestes",
  "subcategory": "Vestes",
  "price": 16900,
  "oldPrice": 21900,
  "discount": 23,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "marron",
    "hex": "#7a5a45"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Casual",
  "image": "placeholder:marron",
  "images": [
   "placeholder:marron",
   "placeholder:beige"
  ],
  "tags": [
   "vestes",
   "vestes",
   "casual",
   "marron",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": false
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "veste-courte-tweed",
  "name": {
   "fr": "Veste Tweed",
   "en": "Tweed Jacket",
   "ar": "جاكيت تويد"
  },
  "category": "vestes",
  "subcategory": "Vestes",
  "price": 10900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Chic",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:noir"
  ],
  "tags": [
   "vestes",
   "vestes",
   "chic",
   "ivoire",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "veste-col-rond",
  "name": {
   "fr": "Veste en Laine",
   "en": "Wool Jacket",
   "ar": "جاكيت صوف"
  },
  "category": "vestes",
  "subcategory": "Vestes",
  "price": 11500,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "marron",
    "hex": "#7a5a45"
   },
   {
    "key": "gris",
    "hex": "#8b8985"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:marron",
  "images": [
   "placeholder:marron",
   "placeholder:gris"
  ],
  "tags": [
   "vestes",
   "vestes",
   "minimal",
   "marron",
   "gris"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "manteau-fourrure",
  "name": {
   "fr": "Manteau Fausse Fourrure",
   "en": "Faux Fur Coat",
   "ar": "معطف فرو صناعي"
  },
  "category": "manteaux",
  "subcategory": "Manteaux",
  "price": 17900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "rose",
    "hex": "#D9A6B0"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Chic",
  "image": "placeholder:rose",
  "images": [
   "placeholder:rose",
   "placeholder:beige"
  ],
  "tags": [
   "manteaux",
   "manteaux",
   "chic",
   "rose",
   "beige"
  ],
  "stock": {
   "XS": false,
   "S": false,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "manteau-ceinture",
  "name": {
   "fr": "Manteau Ceinturé",
   "en": "Belted Coat",
   "ar": "معطف بحزام"
  },
  "category": "manteaux",
  "subcategory": "Manteaux",
  "price": 16900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "marron",
    "hex": "#7a5a45"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:marron"
  ],
  "tags": [
   "manteaux",
   "manteaux",
   "élégant",
   "bordeaux",
   "marron"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "manteau-col-chale",
  "name": {
   "fr": "Manteau Col Châle",
   "en": "Shawl-Collar Coat",
   "ar": "معطف بياقة شال"
  },
  "category": "manteaux",
  "subcategory": "Manteaux",
  "price": 18900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "marron",
    "hex": "#7a5a45"
   },
   {
    "key": "gris",
    "hex": "#8b8985"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:marron",
  "images": [
   "placeholder:marron",
   "placeholder:gris"
  ],
  "tags": [
   "manteaux",
   "manteaux",
   "minimal",
   "marron",
   "gris"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "manteau-oversize",
  "name": {
   "fr": "Manteau Oversize",
   "en": "Oversized Coat",
   "ar": "معطف واسع"
  },
  "category": "manteaux",
  "subcategory": "Manteaux",
  "price": 18500,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "marron",
    "hex": "#7a5a45"
   }
  ],
  "style": "Chic",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:marron"
  ],
  "tags": [
   "manteaux",
   "manteaux",
   "chic",
   "beige",
   "marron"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "trench-ceinture",
  "name": {
   "fr": "Trench Ceinturé",
   "en": "Belted Trench",
   "ar": "ترنش بحزام"
  },
  "category": "manteaux",
  "subcategory": "Trenchs",
  "price": 14900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "rose",
    "hex": "#D9A6B0"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Chic",
  "image": "placeholder:rose",
  "images": [
   "placeholder:rose",
   "placeholder:beige"
  ],
  "tags": [
   "manteaux",
   "trenchs",
   "chic",
   "rose",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "trench-classique",
  "name": {
   "fr": "Trench Classique",
   "en": "Classic Trench Coat",
   "ar": "ترنش كلاسيكي"
  },
  "category": "manteaux",
  "subcategory": "Trenchs",
  "price": 14500,
  "oldPrice": 17500,
  "discount": 17,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Office",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:noir"
  ],
  "tags": [
   "manteaux",
   "trenchs",
   "office",
   "beige",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": false,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "chemise-satinee",
  "name": {
   "fr": "Chemise Satinée",
   "en": "Satin Shirt",
   "ar": "قميص ساتان"
  },
  "category": "tops",
  "subcategory": "Chemises",
  "price": 5900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "vert",
    "hex": "#5a6b55"
   },
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   }
  ],
  "style": "Office",
  "image": "placeholder:vert",
  "images": [
   "placeholder:vert",
   "placeholder:ivoire"
  ],
  "tags": [
   "tops",
   "chemises",
   "office",
   "vert",
   "ivoire"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "pull-col-roule",
  "name": {
   "fr": "Pull Col Roulé",
   "en": "Turtleneck Sweater",
   "ar": "بلوفر بياقة عالية"
  },
  "category": "tops",
  "subcategory": "Pulls",
  "price": 7500,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:beige"
  ],
  "tags": [
   "tops",
   "pulls",
   "minimal",
   "ivoire",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "cardigan-long",
  "name": {
   "fr": "Cardigan Long",
   "en": "Long Cardigan",
   "ar": "كارديغان طويل"
  },
  "category": "tops",
  "subcategory": "Cardigans",
  "price": 7900,
  "oldPrice": 9500,
  "discount": 17,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "marron",
    "hex": "#7a5a45"
   }
  ],
  "style": "Casual",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:marron"
  ],
  "tags": [
   "tops",
   "cardigans",
   "casual",
   "beige",
   "marron"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "cardigan-fleurs",
  "name": {
   "fr": "Cardigan à Fleurs",
   "en": "Floral Cardigan",
   "ar": "كارديغان بالزهور"
  },
  "category": "tops",
  "subcategory": "Cardigans",
  "price": 8900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "bleu",
    "hex": "#3f5673"
   }
  ],
  "style": "Casual",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:bleu"
  ],
  "tags": [
   "tops",
   "cardigans",
   "casual",
   "ivoire",
   "bleu"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": false,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "ensemble-tweed",
  "name": {
   "fr": "Ensemble Tweed",
   "en": "Tweed Set",
   "ar": "طقم تويد"
  },
  "category": "ensembles",
  "subcategory": "Ensembles",
  "price": 15900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:beige"
  ],
  "tags": [
   "ensembles",
   "ensembles",
   "élégant",
   "ivoire",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": false
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "ensemble-maille",
  "name": {
   "fr": "Ensemble Maille",
   "en": "Knit Set",
   "ar": "طقم تريكو"
  },
  "category": "ensembles",
  "subcategory": "Ensembles",
  "price": 13500,
  "oldPrice": 16500,
  "discount": 18,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:beige"
  ],
  "tags": [
   "ensembles",
   "ensembles",
   "minimal",
   "ivoire",
   "beige"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "ensemble-tailleur",
  "name": {
   "fr": "Ensemble Tailleur",
   "en": "Suit Set",
   "ar": "طقم رسمي"
  },
  "category": "ensembles",
  "subcategory": "Ensembles",
  "price": 13900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Office",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:noir"
  ],
  "tags": [
   "ensembles",
   "ensembles",
   "office",
   "bordeaux",
   "noir"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "ensemble-blazer-oversize",
  "name": {
   "fr": "Tailleur Oversize",
   "en": "Oversized Suit",
   "ar": "بدلة واسعة"
  },
  "category": "ensembles",
  "subcategory": "Ensembles",
  "price": 16900,
  "sizes": [
   "XS",
   "S",
   "M",
   "L",
   "XL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "gris",
    "hex": "#8b8985"
   }
  ],
  "style": "Chic",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:gris"
  ],
  "tags": [
   "ensembles",
   "ensembles",
   "chic",
   "beige",
   "gris"
  ],
  "stock": {
   "XS": true,
   "S": true,
   "M": true,
   "L": true,
   "XL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "abaya-jacquard",
  "name": {
   "fr": "Abaya Jacquard",
   "en": "Jacquard Abaya",
   "ar": "عباية جاكار"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 9900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "vert",
    "hex": "#5a6b55"
   },
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Casual",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:vert",
   "placeholder:bordeaux",
   "placeholder:noir"
  ],
  "tags": [
   "abayas",
   "abayas",
   "casual",
   "beige",
   "vert",
   "bordeaux",
   "noir"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": false
  },
  "isNew": true,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "abaya-kimono",
  "name": {
   "fr": "Abaya Kimono",
   "en": "Kimono Abaya",
   "ar": "عباية كيمونو"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 12900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:ivoire",
  "images": [
   "placeholder:ivoire",
   "placeholder:beige"
  ],
  "tags": [
   "abayas",
   "abayas",
   "minimal",
   "ivoire",
   "beige"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "abaya-dentelle",
  "name": {
   "fr": "Abaya Dentelle",
   "en": "Lace Abaya",
   "ar": "عباية دانتيل"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 14900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "marron",
    "hex": "#7a5a45"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:marron",
  "images": [
   "placeholder:marron",
   "placeholder:noir"
  ],
  "tags": [
   "abayas",
   "abayas",
   "élégant",
   "marron",
   "noir"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "abaya-boutons-coeur",
  "name": {
   "fr": "Abaya Boutons Cœur",
   "en": "Heart-Button Abaya",
   "ar": "عباية بأزرار قلب"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 14500,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "bordeaux",
    "hex": "#6E1F32"
   },
   {
    "key": "beige",
    "hex": "#D9C6AE"
   }
  ],
  "style": "Élégant",
  "image": "placeholder:bordeaux",
  "images": [
   "placeholder:bordeaux",
   "placeholder:beige"
  ],
  "tags": [
   "abayas",
   "abayas",
   "élégant",
   "bordeaux",
   "beige"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": true
 },
 {
  "id": "abaya-classique",
  "name": {
   "fr": "Abaya Classique",
   "en": "Classic Abaya",
   "ar": "عباية كلاسيكية"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 11900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "noir",
    "hex": "#1D1A19"
   },
   {
    "key": "marron",
    "hex": "#7a5a45"
   }
  ],
  "style": "Minimal",
  "image": "placeholder:noir",
  "images": [
   "placeholder:noir",
   "placeholder:marron"
  ],
  "tags": [
   "abayas",
   "abayas",
   "minimal",
   "noir",
   "marron"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "abaya-ouverte",
  "name": {
   "fr": "Abaya Marbrée",
   "en": "Marble-Print Abaya",
   "ar": "عباية بنقشة رخامية"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 10900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "beige",
    "hex": "#D9C6AE"
   },
   {
    "key": "marron",
    "hex": "#7a5a45"
   }
  ],
  "style": "Casual",
  "image": "placeholder:beige",
  "images": [
   "placeholder:beige",
   "placeholder:marron"
  ],
  "tags": [
   "abayas",
   "abayas",
   "casual",
   "beige",
   "marron"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 },
 {
  "id": "kimono-imprime",
  "name": {
   "fr": "Kimono Imprimé",
   "en": "Printed Kimono",
   "ar": "كيمونو مطبوع"
  },
  "category": "abayas",
  "subcategory": "Abayas",
  "price": 11900,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "bleu",
    "hex": "#3f5673"
   },
   {
    "key": "noir",
    "hex": "#1D1A19"
   }
  ],
  "style": "Chic",
  "image": "placeholder:bleu",
  "images": [
   "placeholder:bleu",
   "placeholder:noir"
  ],
  "tags": [
   "abayas",
   "abayas",
   "chic",
   "bleu",
   "noir"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": false,
  "isBestSeller": true,
  "isTrending": false
 },
 {
  "id": "tunique-col-claudine",
  "name": {
   "fr": "Tunique Col Claudine",
   "en": "Peter Pan Collar Tunic",
   "ar": "تونيك بياقة كبيرة"
  },
  "category": "abayas",
  "subcategory": "Tuniques",
  "price": 5500,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "colors": [
   {
    "key": "bleu",
    "hex": "#3f5673"
   },
   {
    "key": "ivoire",
    "hex": "#F3EBDD"
   }
  ],
  "style": "Casual",
  "image": "placeholder:bleu",
  "images": [
   "placeholder:bleu",
   "placeholder:ivoire"
  ],
  "tags": [
   "abayas",
   "tuniques",
   "casual",
   "bleu",
   "ivoire"
  ],
  "stock": {
   "S": true,
   "M": true,
   "L": true,
   "XL": true,
   "XXL": true
  },
  "isNew": true,
  "isBestSeller": false,
  "isTrending": false
 }
]

const baseProducts: Product[] = rawProducts.map(applyPhotos)

/** Articles added from the admin. Prototype: saved in this browser (localStorage); a backend will replace this. */
export const CUSTOM_KEY = 'lo_custom_products'
export function loadCustomProducts(): Product[] {
  try { return (JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]') as Product[]) } catch { return [] }
}
/** Ids of built-in articles hidden from the site by the admin (prototype: kept in this browser). */
export const DELETED_KEY = 'lo_deleted_products'
export function loadDeletedIds(): string[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]') as string[] } catch { return [] }
}
export const isBaseProduct = (id: string) => baseProducts.some((p) => p.id === id)

/** The list every component reads: new admin articles first, then the built-in catalogue (with the admin's edits,
 *  without the deleted ones). Same array object everywhere, refreshed in place by syncProducts(). */
export const products: Product[] = []
let version = 0
export const productsVersion = () => version
export function syncProducts() {
  const stored = loadCustomProducts()
  const overrides = new Map(stored.map((c) => [c.id, c]))
  const deleted = new Set(loadDeletedIds())
  const base = baseProducts
    .filter((p) => !deleted.has(p.id))
    .map((p) => { const o = overrides.get(p.id); return o ? { ...o, edited: true, custom: false, ...(o.keepBaseImages ? { image: p.image, images: p.images } : {}) } : p })
  const added = stored.filter((c) => !isBaseProduct(c.id)).map((c) => ({ ...c, custom: true }))
  products.length = 0
  products.push(...added, ...base)
  for (const p of products) for (const c of p.colors) if (c.label) colorLabels[c.key] = c.label
  version++
}
syncProducts()
