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

  searchRes: any;
  songs: Song[];
  s:Song = new Song();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spotifyService.getToken();
    setTimeout(()=>{
      this.route.params
            .pipe(map(params => params['id']))
            .subscribe((id) => {
              this.spotifyService.getAlbumById(id)
                  .subscribe(searchRes => {
                    console.log('searchRes: ' + searchRes);
                    this.searchRes = searchRes;
                    console.log('tracks: ' + searchRes['tracks'].items);
                    this.songs = searchRes['tracks'].items;
                    this.s.getTracksDuration(this.songs);
                });
          })
    }, 500);
  }

}
