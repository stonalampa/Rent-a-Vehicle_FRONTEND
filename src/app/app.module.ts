import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationtypeComponent } from './accomodationtype/accomodationtype.component';
import { CommentComponent } from './comment/comment.component';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { AccomodationAddComponent } from './accomodation-add/accomodation-add.component';
import { AccomodationEditComponent } from './accomodation-edit/accomodation-edit.component';
import { AccomodationCommentComponent } from './accomodation-comment/accomodation-comment.component';
import { AccomodationDetailsComponent } from './accomodation-details/accomodation-details.component';
import { AccomodationtypeAddComponent } from './accomodationtype-add/accomodationtype-add.component';
import { AccomodationtypeEditComponent } from './accomodationtype-edit/accomodationtype-edit.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent,
    AccomodationComponent,
    AccomodationtypeComponent,
    CommentComponent,
    CountryComponent,
    HomeComponent,
    ImageuploadComponent,
    AccomodationAddComponent,
    AccomodationEditComponent,
    AccomodationCommentComponent,
    AccomodationDetailsComponent,
    AccomodationtypeAddComponent,
    AccomodationtypeEditComponent,
    CommentAddComponent,
    CommentEditComponent,
    CountryAddComponent,
    CountryEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
