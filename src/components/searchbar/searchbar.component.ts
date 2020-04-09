import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../Artist';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [SpotifyService]
})
export class SearchbarComponent implements OnInit {

  searchStr: String;
  searchRes: Artist[];


  sortBy(prop: string) {
    return this.searchRes.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  constructor(
    private spotifyService: SpotifyService) { }

  searchMusic() {
    this.spotifyService.getArtist(this.searchStr)
      .subscribe(artist => {
        this.searchRes = artist.items;
        this.sortBy('popularity');
      }
      );
  }

  ngOnInit(): void {
    this.spotifyService.getToken();
  }

}
