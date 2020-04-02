import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { Artist } from 'src/Artist';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  constructor(private http:HttpClient) {

  }

  private clientID = '04125d702de5446eb37484f00ff91d24';
  private clientSecret = 'd304efe096bf46ba8418354ca8d32a3e';
  token = '';

  private spotifyApiUrl : string = 'https://api.spotify.com/v1/';

  base64 = new Buffer(this.clientID + ':' + this.clientSecret).toString('base64');

  authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + this.base64
    },
    params: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  reqOptions = {
    headers : {'Authorization' : 'Bearer ' + this.token},
    json: true
  };

  getNewReleases(){
    return this.http.get(this.spotifyApiUrl+`browse/new-releases?country=US&limit=8`, this.reqOptions)
        .pipe( map(data => data['albums']));
  }

  getArtist(txt:String){
    return this.http.get('https://api.spotify.com/v1/search?q='+txt+'&type=artist&limit=8&offset=5', this.reqOptions)
    .pipe( map(data => data['artists']));
  }

  getArtistById(id:string){
    return this.http.get(this.spotifyApiUrl + `artists/${id}`, this.reqOptions)
  }

  getArtistAlbums(id:string){
    return this.http.get('https://api.spotify.com/v1/artists/'+id+'/albums?market=US&limit=3', this.reqOptions)
            .pipe( map(data => data['items']));
  }

  getTopTracks(id:string){
    return this.http.get(this.spotifyApiUrl + `artists/${id}/top-tracks?country=us`, this.reqOptions)
        .pipe(map(data => data['tracks']))
  }

  getAlbumTracks(id:string){
    return this.http.get('https://api.spotify.com/v1/albums/'+id+'/tracks?offset=0&limit=20&market=US', this.reqOptions)
            .pipe( map(data => data['items']));
  }

  getToken(){
    this.http.post('https://accounts.spotify.com/api/token', null, this.authOptions)
      .pipe(map(data => {this.token = data['access_token']}))
      .subscribe(res => {
        this.reqOptions = {
          headers : {'Authorization' : 'Bearer ' + this.token},
          json: true
        };
        console.log('get: ' + this.token);
      },
      err => {
        console.log(err.message);
      });
  }
}

