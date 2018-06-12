import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; //for datetime
import {AppUrl} from "./appservice/AppUrl.services"
import {HttpCountryService} from "./country/country.service";
import {HttpRoomService} from "./room/room.service";
import {HttpPlaceService} from "./place/place.service";
import {HttpRegionService} from "./region/region.service";
import {HttpAccomodationTypeService} from "./accomodationtype/accomodationtype.service";
import {HttpAccommodationService} from "./accomodation/accommodation.service"
import {HttpRegisterService} from "./register/register.service"
import {HttpAuthenticationService} from "./login/userAuthentication.service"
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { PlaceComponent } from './place/place.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationtypeComponent } from './accomodationtype/accomodationtype.component';
import { CommentComponent } from './comment/comment.component';
import { RegionComponent } from './region/region.component';
import { RoomReservationComponent } from './roomreservation/roomreservation.component';
import { RoomComponent } from './room/room.component';
import { CountryEditComponent } from './country/country-edit/country-edit.component';
import { RoomAddComponent } from './room/room-add/room-add.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import { RoomReservationAddComponent } from './roomreservation/room-reservation-add/room-reservation-add.component';
import { RoomReservationEditComponent } from './roomreservation/room-reservation-edit/room-reservation-edit.component';
import {HttpRoomReservationService}  from './roomreservation/roomreservation.service';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,MdNativeDateModule,MdSnackBarModule} from '@angular/material/';
import { PlaceAddComponent } from './place/place-add/place-add.component';
import { PlaceEditComponent } from './place/place-edit/place-edit.component';
import { AccomodationtypeAddComponent } from './accomodationtype/accomodationtype-add/accomodationtype-add.component';
import { AccomodationtypeEditComponent } from './accomodationtype/accomodationtype-edit/accomodationtype-edit.component';
import { AccommodationAddComponent } from './accomodation/accommodation-add/accommodation-add.component';
import { AccommodationEditComponent } from './accomodation/accommodation-edit/accommodation-edit.component';
import { RegionAddComponent } from './region/region-add/region-add.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegionEditComponent } from './region/region-edit/region-edit.component'
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {AdminGuard} from './adminGuard';
import {ManagerGuard} from './managerGuard';
import { AccomodationDetailsComponent } from './accomodation/accomodation-details/accomodation-details.component';
import { AccomodationCommentComponent } from './accomodation/accomodation-comment/accomodation-comment.component';
import {HttpCommentService} from "app/comment/comment.service";
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { SearchComponent } from './search/search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ManagersComponent } from './managers/managers.component';
import {HttpUsersService} from "app/managers/users.service";
import {FilterService} from "app/search/search.service";
import {NotificationService} from "app/appservice/notification.service"


const Routes=[
  {path: "country",component:CountryComponent, canActivate: [AdminGuard]},
  {path: "country-add",component:CountryAddComponent, canActivate: [AdminGuard]},
  {path: "country-edit",component:CountryEditComponent, canActivate: [AdminGuard]},
  {path: "place",component:PlaceComponent, canActivate: [AdminGuard]},
  {path: "place-add",component:PlaceAddComponent, canActivate: [AdminGuard]},
  {path: "place-edit",component:PlaceEditComponent, canActivate: [AdminGuard]},
  {path: "accomodation",component:AccomodationComponent},
  {path: "accommodation-add",component:AccommodationAddComponent, canActivate: [ManagerGuard]},
  {path: "accommodation-edit",component:AccommodationEditComponent, canActivate: [ManagerGuard]},
  {path: "accomodation-type",component:AccomodationtypeComponent, canActivate: [AdminGuard]},
  {path: "accomodation-type-edit",component:AccomodationtypeEditComponent, canActivate: [AdminGuard]},
  {path: "accomodation-type-add",component:AccomodationtypeAddComponent, canActivate: [AdminGuard]},
  {path: "comment",component:CommentComponent,canActivate: [AdminGuard]},
  {path: "region",component:RegionComponent, canActivate: [AdminGuard]},
  {path: "room-reservation",component:RoomReservationComponent,canActivate: [AdminGuard]},
  {path: "region-add",component:RegionAddComponent, canActivate: [AdminGuard]},
  {path: "region-edit",component:RegionEditComponent, canActivate: [AdminGuard]},
  {path: "room",component:RoomComponent,canActivate: [AdminGuard]},
  {path: "register",component:RegisterComponent},
  {path: "login",component:LoginComponent},
  {path: "room-add",component:RoomAddComponent,canActivate: [AdminGuard]},
  {path: "room-edit",component:RoomEditComponent,canActivate: [AdminGuard]},
  {path: "room-reservation-add",component:RoomReservationAddComponent,canActivate: [AdminGuard]},
  {path: "room-reservation-edit",component:RoomReservationEditComponent,canActivate: [AdminGuard]},
  {path: "comment-add",component:CommentAddComponent,canActivate: [AdminGuard]},
  {path: "comment-edit",component:CommentEditComponent,canActivate: [AdminGuard]},
  {path: "home",component:HomeComponent},
  {path:"managers",component:ManagersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CountryAddComponent,
    PlaceComponent,
    AccomodationComponent,
    AccomodationtypeComponent,
    CommentComponent,
    RegionComponent,
    RoomReservationComponent,
    RoomComponent,
    CountryEditComponent,
    RoomAddComponent,
    RoomEditComponent,
    RoomReservationComponent,
    RoomReservationAddComponent,
    RoomReservationEditComponent,
    CommentAddComponent,
    CommentEditComponent,
    PlaceAddComponent,
    PlaceEditComponent,
    AccomodationtypeAddComponent,
    AccomodationtypeEditComponent,
    AccommodationAddComponent,
    AccommodationEditComponent,
    RegionAddComponent,
    RegionEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccomodationDetailsComponent,
    AccomodationCommentComponent,
    MapComponent,
    FileSelectDirective,
    FileDropDirective,
    ImageuploadComponent,
    SearchComponent,
    ManagersComponent
  ],
  
  entryComponents: [AccomodationDetailsComponent,AccomodationCommentComponent,ImageuploadComponent,SearchComponent,RoomAddComponent,RoomEditComponent,MapComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    NguiDatetimePickerModule,
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,MdNativeDateModule,MdSnackBarModule,
    BrowserAnimationsModule,NgxPaginationModule,
    //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAtvp71DTpNaEw59EcmxvFMQOKRyRUiArg'})
   
  ],
   
  providers: [HttpCountryService,AppUrl,HttpPlaceService,HttpRegionService,HttpAccomodationTypeService,
  HttpAccommodationService,HttpRoomService,HttpRoomReservationService,HttpRegisterService,HttpCommentService,
  HttpAuthenticationService,AdminGuard,ManagerGuard,HttpUsersService,FilterService,NotificationService],

  bootstrap: [AppComponent]
})
export class AppModule { }
