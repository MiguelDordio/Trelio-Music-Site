import { Image } from './image'

export class Album {
    album_group: string;
    id: string;
    image: Image[];
    name: string;
    realease_date: string;
    total_tracks: number;
    uri: string;
}