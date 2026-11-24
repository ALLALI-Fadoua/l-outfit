import { products } from '../data/products'
import type { CartItem, Order, OrderStatus } from '../types/product'

/** Example orders so the admin can be previewed with data. Generated on the fly, flagged `demo`, never mixed into real orders. */
const FEE = 700, FREE_FROM = 15000
// [number, status, days ago, first name, last name, phone, wilaya code, commune, address, note, items [productId, size, colour, qty][]]
type Row = [number, OrderStatus, number, string, string, string, number, string, string, string, [string, string, string, number][]]
const ROWS: Row[] = [
  [123, 'new',       0.1, 'Amina',    'Expérimental',    '05 123 456 78', 16, 'Bab Ezzouar',  'Cité 5 Juillet, bât. 12',        'Appeler avant la livraison', [['robe-tweed', 'M', 'bordeaux', 1]]],
  [122, 'new',       0.4, 'Yasmine',  'Expérimental',   '06 123 456 78', 31, 'Es Senia',     'Rue des Frères Bouazza, n° 8',   '',                           [['abaya-jacquard', 'L', 'beige', 1], ['chemise-satinee', 'M', 'vert', 1]]],
  [121, 'new',       1.1, 'Nesrine',  'Expérimental',   '07 123 456 78', 25, 'El Khroub',    'Lotissement Ziadia, villa 4',    '',                           [['manteau-ceinture', 'S', 'bordeaux', 1]]],
  [120, 'confirmed', 1.8, 'Meriem',   'Expérimental',    '05 123 456 78', 9,  'Boufarik',     'Cité Les Orangers',              'Livraison après 17h',        [['ensemble-tweed', 'M', 'ivoire', 1], ['pull-col-roule', 'S', 'ivoire', 1]]],
  [119, 'confirmed', 2.6, 'Sara',     'Expérimental',   '06 123 456 78', 19, 'El Eulma',     'Rue Larbi Ben M’hidi',           '',                           [['jupe-plissee', 'M', 'bordeaux', 2]]],
  [118, 'confirmed', 3.4, 'Lina',     'Expérimental',    '07 123 456 78', 23, 'El Bouni',     'Cité Seybouse, bloc C',          '',                           [['trench-classique', 'M', 'beige', 1]]],
  [117, 'shipped',   5.2, 'Hanane',   'Expérimental',     '05 123 456 78', 15, 'Azazga',       'Village Ath Ghobri',             'Laisser chez le voisin',     [['cardigan-fleurs', 'S', 'ivoire', 1], ['jupe-crayon', 'S', 'noir', 1]]],
  [116, 'shipped',   7.5, 'Ikram',    'Expérimental',     '06 123 456 78', 5,  'Barika',       'Cité 1000 logements',            '',                           [['abaya-classique', 'L', 'noir', 1]]],
  [115, 'shipped',   9.3, 'Rania',    'Expérimental',  '07 123 456 78', 13, 'Mansourah',    'Résidence El Feth, n° 21',       '',                           [['manteau-oversize', 'M', 'beige', 1], ['pantalon-large', 'M', 'bordeaux', 1]]],
  [114, 'delivered', 12,  'Khadija',  'Expérimental',  '05 123 456 78', 39, 'Robbah',       'Quartier El Moudjahidine',       '',                           [['abaya-dentelle', 'M', 'marron', 1]]],
  [113, 'delivered', 15,  'Samira',   'Expérimental',  '06 123 456 78', 6,  'Akbou',        'Cité Tazaghart',                 '',                           [['robe-maille', 'M', 'beige', 1], ['veste-courte-tweed', 'M', 'ivoire', 1]]],
  [112, 'delivered', 19,  'Imane',    'Expérimental',   '07 123 456 78', 27, 'Sidi Ali',     'Rue de la Corniche',             '',                           [['ensemble-maille', 'L', 'ivoire', 1]]],
  [111, 'delivered', 24,  'Asma',     'Expérimental',    '05 123 456 78', 35, 'Bordj Menaïel','Cité du 1er Novembre',           'Cadeau : emballage soigné',  [['tunique-col-claudine', 'M', 'bleu', 2], ['jupe-portefeuille-nouee', 'M', 'noir', 1]]],
  [110, 'delivered', 29,  'Fatima Zohra', 'Expérimental', '06 123 456 78', 47, 'Metlili',    'Quartier Hadj Messaoud',         '',                           [['robe-soiree-evasee', 'M', 'bordeaux', 1]]],
]

export function makeDemoOrders(): Order[] {
  const now = Date.now()
  return ROWS.map(([n, status, daysAgo, firstName, lastName, phone, wilaya, commune, address, note, lines]) => {
    const items: CartItem[] = lines.filter(([id]) => products.some((p) => p.id === id)).map(([productId, size, color, qty]) => ({ productId, size, color, qty }))
    const subtotal = items.reduce((s, i) => s + i.qty * (products.find((p) => p.id === i.productId)?.price ?? 0), 0)
    const delivery = subtotal >= FREE_FROM ? 0 : FEE
    return { id: `#LO-${String(n).padStart(6, '0')}`, items, subtotal, delivery, total: subtotal + delivery, status, demo: true,
      date: new Date(now - daysAgo * 86400000).toISOString(), customer: { firstName, lastName, phone, wilaya, commune, address, note } }
  }).filter((o) => o.items.length > 0)
}
