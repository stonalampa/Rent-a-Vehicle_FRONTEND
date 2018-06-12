import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {Place} from 'app/place/place.model'
import {AccomodationType} from 'app/accomodationtype/accomodationtype.model'
import { Http, Headers, Response } from '@angular/http';
import {HttpPlaceService} from 'app/place/place.service'
import {HttpAccommodationService} from 'app/accomodation/accommodation.service'
import {HttpAccomodationTypeService} from 'app/accomodationtype/accomodationtype.service'
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {AppComponent} from "app/app.component";
import {ImageuploadComponent} from "app/imageupload/imageupload.component"

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css'],
  providers:[HttpPlaceService,HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccommodationEditComponent implements OnInit {

  private accommodationForEdit:Accommodation;
  public places: Array<Place>;
  public accommodationTypes:Array<AccomodationType>;
  public eAccommodation : Accommodation;
  mapInfo:MapModel;
  private role:string;
  private adminRole:boolean;

  constructor(private httpPlaceService:HttpPlaceService,
              private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              public dialogRef: MdDialogRef<AccommodationEditComponent>,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) {
               
               }

  ngOnInit() {

    this.adminRole=false;
    this.createPermisions();

    this.httpAccommodationTypeService.getAccomodationTypes().subscribe((res: any) => {
        this.accommodationTypes = res; console.log(this.accommodationTypes);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
      this.httpPlaceService.getPlaces().subscribe((res: any) => {
        this.places = res; console.log(this.places);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
      
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.adminRole=true;
    }
  }

  openChangeImageDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.accommodation=this.eAccommodation;
  }

  openMapChangeLocation(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    this.mapInfo = new MapModel(this.eAccommodation.Latitude,this.eAccommodation.Longitude, 
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent);
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.adding=true;
    dialogRef.componentInstance.watching=false;

    dialogRef.afterClosed().subscribe((res) => {
            console.log("Successfully checked coordinates.");
            this.snackBar.open("Successfully checked coordinates.", "", { duration: 2500,});

            if (res == undefined) {
                return;
            }
            this.eAccommodation.Latitude = res.latitude;
            this.eAccommodation.Longitude = res.longitude;
        });
  }

  editAccommodation(accommodation: Accommodation, form: NgForm){
    
      this.accommodationForEdit=new Accommodation();
      this.accommodationForEdit.Id=this.eAccommodation.Id;
      this.accommodationForEdit.Name=accommodation.Name;
      this.accommodationForEdit.Address=accommodation.Address;
      this.accommodationForEdit.AccommodationType_Id=accommodation.AccommodationType_Id;
      this.accommodationForEdit.AppUser_Id=this.eAccommodation.AppUser_Id;
      this.accommodationForEdit.AverageGrade=this.eAccommodation.AverageGrade;
      this.accommodationForEdit.Description=accommodation.Description;
      this.accommodationForEdit.ImageURL=accommodation.ImageURL;
      this.accommodationForEdit.Latitude=accommodation.Latitude;
      this.accommodationForEdit.Longitude=accommodation.Longitude;
      this.accommodationForEdit.Place_Id=accommodation.Place_Id;
      if(this.adminRole==true){
        if (accommodation.Approved == true)
          {
            this.httpAccommodationService.approveAccommodation(this.eAccommodation.Id).subscribe(
              ()=>{
                 console.log('Approve changed to true.');
              },
              error => {alert("Close change approve!"); console.log(error);}

            );
          }else{
            this.httpAccommodationService.banAccommodation(this.eAccommodation.Id).subscribe(
              ()=>{
                 console.log('Approve changed to false.');
              },
              error => {alert("Close change approve!"); console.log(error);}

            );
          }
      }else{
        this.accommodationForEdit.Approved=this.eAccommodation.Approved;
        this.httpAccommodationService.editAccommodation(this.accommodationForEdit).subscribe(
          ()=>{ 
            console.log('Accommodation successfully edited');
            this.snackBar.open("Accommodation successfully edited", "", { duration: 2500,});
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
      }
  }

}
