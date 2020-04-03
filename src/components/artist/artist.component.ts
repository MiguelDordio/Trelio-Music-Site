import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service'
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { Artist } from '../../Artist';
import { Album } from '../../Album';
import { Song } from '../../Song';

@Component({
  moduleId: 'module.id',
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService]
})
export class ArtistComponent implements OnInit {

  id:string;
  artist: any;
  topTracks: Song[];
  albums: Album[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.spotifyService.getToken();
    setTimeout(()=>{
      this.route.params
        .pipe(map(params => params['id']))
        .subscribe((id) => {
          // Get Artist Info
          this.spotifyService.getArtistById(id)
            .subscribe(artist => {
              this.artist = artist;
            });
          // Get Artist top tracks
          this.spotifyService.getTopTracks(id)
            .subscribe(topTracks => {
              console.log('topT: ' + topTracks);
              this.topTracks = topTracks;
            });
          // Get Artist Albums    
          this.spotifyService.getArtistAlbums(id)
            .subscribe(albums => {
              this.albums = albums;
            });
        });
    }, 2500);
  }

}
