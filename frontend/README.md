# L’Outfit — React + Vite + TypeScript + pnpm

```
pnpm install
pnpm dev
```

## Où mettre les photos des produits

Dossier : `src/assets/images/products/`

| Fichier | Rôle |
|---|---|
| `robe-tweed-1.jpg` | photo principale (carte produit + 1ʳᵉ image de la fiche) |
| `robe-tweed-2.jpg` | 2ᵉ photo (affichée au survol de la carte + galerie) |
| `robe-tweed-3.jpg` … | photos supplémentaires de la galerie |

- Le nom = l'`id` du produit dans `src/data/products.ts` + `-1`, `-2`… (formats : jpg, jpeg, png, webp).
- Aucun code à modifier : le site détecte les fichiers tout seul (`src/utils/productImages.ts`).
- Un produit sans photo garde sa tuile de couleur.
- L'admin (`/admin/products`) affiche, pour chaque produit, le nom de fichier attendu et si la photo est déjà ajoutée.
- Format conseillé : portrait 3:4 (ex. 900×1200 px).

Les photos de catégories sont dans `src/assets/images/categories/` (une par catégorie).

## Autres repères
- Produits (mock data) : `src/data/products.ts` — Langues (fr/en/ar, RTL auto) : `src/i18n/translations.ts`
- Connexion admin de démonstration : `/admin/login` — admin@loutfit.dz / admin123 (fictif, à remplacer par le backend)

## Admin : ajouter / modifier / supprimer un article
`/admin/products` → « Ajouter un article » : noms (fr/en/ar), descriptions, catégorie + sous-catégorie, style, prix (+ ancien prix → réduction automatique),
tailles + stock par taille, couleurs, **jusqu'à 8 photos** (la 1ʳᵉ = principale, la 2ᵉ = survol, réordonnables), mise en avant (nouveauté / best seller / trending).
Prototype : les articles et leurs photos sont gardés dans le navigateur (localStorage, ~35 photos au total). Avec le backend NestJS, ils iront en base de données et les photos sur un stockage de fichiers.
