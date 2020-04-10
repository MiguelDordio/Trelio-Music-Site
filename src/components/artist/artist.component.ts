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

  id: string;
  artist: any;
  topTracks: Song[];
  albums: Album[];

  msToTime(ms: number) {
    var seconds: number = Number(Math.floor((ms % 60000) / 1000).toFixed(0));
    var minutes: number = Math.floor((ms / 60000));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  getTracksDuration(topTracks: Song[]) {
    for (var i = 0; i < topTracks.length; i++) {
      topTracks[i].durantion_out = this.msToTime(topTracks[i].duration_ms);
    }
  }

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.spotifyService.getToken();
    setTimeout(() => {
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
              this.topTracks = topTracks;
              this.getTracksDuration(this.topTracks);
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
