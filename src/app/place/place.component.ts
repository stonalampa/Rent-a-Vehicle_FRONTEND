import { Component, OnInit } from '@angular/core';
import {Place} from "./place.model"
import {Region} from "../region/region.model"
import { Http, Response } from '@angular/http';
import {HttpPlaceService} from "./place.service"
import { Observable } from "rxjs/Observable";
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [HttpPlaceService]
})
export class PlaceComponent implements OnInit {

  private places:Array<Place>;
  private editFlag;
  private adminRole:boolean;
  private role:string;
  place:any;

  constructor(private httpPlaceService:HttpPlaceService,
              private snackBar:MdSnackBar) {
  }

  ngOnInit() {
    this.editFlag=false;
    this.adminRole=false;
    this.createPermisions();
    this.httpPlaceService.getPlaces().subscribe(
      (res: any) => {this.places = res; console.log(this.places)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
      }
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(place:Place){
    this.editFlag=true;
    this.place=place;
  }

  delete(place:Place){

    this.httpPlaceService.deletePlace(place.Id).subscribe(
      ()=>{
      console.log('Place ' + place.Name + ' successfuly deleted');
      this.snackBar.open("Place " + place.Name + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert("Place ' + place.Name + ' failed delete!"); console.log(error);}
    );
  }

}
