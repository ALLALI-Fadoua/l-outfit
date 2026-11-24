import robes from './robes.jpg'
import jupes from './jupes.jpg'
import pantalons from './pantalons.jpg'
import vestes from './vestes.jpg'
import manteaux from './manteaux.jpg'
import tops from './tops.jpg'
import ensembles from './ensembles.jpg'
import abayas from './abayas.jpg'

/** One photo per category. `pack` = white-background product shot (blended into the card tone). */
export const categoryImages: Record<string, { src: string; pack: boolean }> = {
  robes: { src: robes, pack: false },
  jupes: { src: jupes, pack: true },
  pantalons: { src: pantalons, pack: true },
  vestes: { src: vestes, pack: true },
  manteaux: { src: manteaux, pack: true },
  tops: { src: tops, pack: true },
  ensembles: { src: ensembles, pack: false },
  abayas: { src: abayas, pack: false },
}
