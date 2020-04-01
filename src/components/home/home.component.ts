import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../Album';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SpotifyService]
})
export class HomeComponent implements OnInit {

  releases: Album[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getToken();
    setTimeout(()=>{
      this.spotifyService.getNewReleases()
        .subscribe(releases => {
          console.log('releases: ' + releases.items[0].name);
          this.releases = releases.items;
        });
    }, 2500);
  }

}
