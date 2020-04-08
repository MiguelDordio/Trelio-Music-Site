import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ArtistComponent } from '../components/artist/artist.component';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { HomeComponent } from '../components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlbumComponent } from '../components/album/album.component';
import { AlbumItemComponent } from './album-item/album-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    ArtistComponent,
    HomeComponent,
    AlbumComponent,
    AlbumItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
