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

  constructor(
    private spotifyService: SpotifyService) { }

  searchMusic(){
    console.log('l: ' + this.searchRes.length);
    if(this.searchRes.length == 0){
      this.searchRes = [];
    }
    this.spotifyService.getArtist(this.searchStr)
      .subscribe(artist => {
        this.searchRes = artist.items;
        }
      );

  }

  ngOnInit(): void {
    this.spotifyService.getToken();
  }

}
