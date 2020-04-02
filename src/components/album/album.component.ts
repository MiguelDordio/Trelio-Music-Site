import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { Song } from '../../Song';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {

  songs: Song[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spotifyService.getToken();
    setTimeout(()=>{
      this.route.params
            .pipe(map(params => params['id']))
            .subscribe((id) => {
              this.spotifyService.getAlbumTracks(id)
                  .subscribe(songs => {
                    console.log('songs: ' + songs);
                      this.songs = songs;
                  })
          })
    }, 2500);
  }

}
