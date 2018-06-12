import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "app/accomodation/accommodation.model"
import { Http, Response } from '@angular/http';
import {HttpAccommodationService} from "app/accomodation/accommodation.service"
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {AccommodationAddComponent} from "app/accomodation/accommodation-add/accommodation-add.component";
import {AccommodationEditComponent} from "app/accomodation/accommodation-edit/accommodation-edit.component";
import { AccomodationDetailsComponent} from "app/accomodation/accomodation-details/accomodation-details.component";
import {AccomodationCommentComponent} from "app/accomodation/accomodation-comment/accomodation-comment.component";
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {Room} from "app/room/room.model";
import {AccomodationType} from "app/accomodationtype/accomodationtype.model"
import {Place} from "app/place/place.model"
import {Country}  from "app/country/country.model"
import {Region} from "../region/region.model"
import {HttpRoomService} from "app/room/room.service"
import {HttpPlaceService} from "app/place/place.service"
import {HttpRegionService} from "app/region/region.service"
import {HttpAccomodationTypeService} from "app/accomodationtype/accomodationtype.service";
import {HttpCountryService} from "app/country/country.service";
import  {SearchModel} from "app/search/search.model";
import {FilterService} from "app/search/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[FilterService]
})
export class SearchComponent implements OnInit {
  public nSearch : SearchModel; 
  private accommodations:Array<Accommodation>;
  private accommodationsTypes:Array<AccomodationType>;
  private rooms :Array<Room>;
  private places : Array<Place>;
  private regions : Array<Region>;
  private countries : Array<Country>;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  checkedPlace = false;
  checkedBedCount = false;
  checkedMinPrice = false;
  checkedMaxPrice = false;
  checkedMinRate = false;

  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpRoomService:HttpRoomService,
              private httpPlaceService:HttpPlaceService,
              private httpRegionService:HttpRegionService,
              private httpCountryService:HttpCountryService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private httpFilterService: FilterService,
              public dialogRef:MdDialogRef<SearchComponent>) { }

  ngOnInit() {

    this.nSearch = new SearchModel();
    this.nSearch.MinPrice = 0;
    this.nSearch.MaxPrice = 500;
    this.nSearch.MinRate = 1;
    this.nSearch.MaxRate = 5;
    this.nSearch.BedCount = "2";
    this.nSearch.Place = "";
   /* this.httpAccommodationService.getAccommodations().subscribe(
      (res: any) => {this.accommodations = res; console.log(this.accommodations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    this.httpAccommodationTypeService.getAccomodationTypes().subscribe(
      (res: any) => {this.accommodationsTypes = res; console.log(this.accommodationsTypes)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {this.countries = res; console.log(this.countries)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    this.httpRegionService.getRegions().subscribe(
      (res: any) => {this.regions = res; console.log(this.regions)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
     this.httpPlaceService.getPlaces().subscribe(
      (res: any) => {this.places = res; console.log(this.places)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );*/
  }

  applyFilter(){
       var place,bedcount,minprice,maxprice,minrate,maxrate;

       if (this.checkedPlace == true) 
       place = 'Place/Name eq \'' + this.nSearch.Place +'\'';
       else 
       place = '';

       if (this.checkedBedCount == true && this.checkedPlace == false)
       bedcount = ' Rooms/any(tag:tag/BedCount eq '+this.nSearch.BedCount+ ')';
       else if (this.checkedBedCount == true && this.checkedPlace == true)
       bedcount = ' and Rooms/any(tag:tag/BedCount eq '+this.nSearch.BedCount+ ')';
       else 
       bedcount = '';

         if (this.checkedMinPrice == true && this.checkedBedCount == false  && this.checkedPlace == false)
       minprice = ' Rooms/any(r:r/PricePerNight gt ' + this.nSearch.MinPrice + ' or r/PricePerNight eq ' + this.nSearch.MinPrice+ ')';
       else if (this.checkedMinPrice == true && (this.checkedBedCount == true || this.checkedPlace == true))
       minprice = ' and Rooms/any(r:r/PricePerNight gt ' + this.nSearch.MinPrice + ' or r/PricePerNight eq ' + this.nSearch.MinPrice+ ')';
       else 
       minprice = '';

       if (this.checkedMaxPrice == true && this.checkedBedCount == false  && this.checkedPlace == false && this.checkedMinPrice == false)
       maxprice = 'Rooms/any(r:r/PricePerNight lt ' + this.nSearch.MaxPrice + ' or r/PricePerNight eq ' + this.nSearch.MaxPrice+ ')';
       else if (this.checkedMaxPrice == true && (this.checkedBedCount == true || this.checkedMinPrice == true || this.checkedPlace == true))
       maxprice = ' and Rooms/any(r:r/PricePerNight lt ' + this.nSearch.MaxPrice + ' or r/PricePerNight eq ' + this.nSearch.MaxPrice + ')';
       else 
       maxprice = '';

       if (this.checkedMinRate == true && this.checkedBedCount == false  && this.checkedPlace == false && this.checkedMinPrice == false &&
       this.checkedMaxPrice == false)
       minrate = ' AverageGrade gt ' +  this.nSearch.MinRate + ' or AverageGrade eq ' +  this.nSearch.MinRate ;
       else if (this.checkedMaxPrice == true && (this.checkedBedCount == true || this.checkedMinPrice == true || this.checkedPlace == true ||
       this.checkedMaxPrice == true))
       minrate = ' and AverageGrade gt ' +  this.nSearch.MinRate + ' or AverageGrade eq ' +  this.nSearch.MinRate ;
       else 
       minrate = '';
       
       

     var filter :string;
     filter = `odata/Accommodations1?$filter= `+place +  bedcount + minprice + maxprice + minrate +
    `&$inlinecount=allpages`;
  

    this.httpFilterService.filterAccommodations(filter).subscribe((result: Array<Accommodation>) => {
      this.accommodations = result;
      console.log(this.accommodations);
      console.log('filter :');
      console.log(this.nSearch); 
      this.notify.emit(this.accommodations);
      this.dialogRef.close(this.accommodations);
    },
      error => {
        console.log(error);
      });

  }

}
