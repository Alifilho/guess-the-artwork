import { Artist } from '../models/Artist';
import { Artwork } from '../models/Artwork';

export interface GameProps {
  artwork: Artwork;
  artists: Artist[];
}
