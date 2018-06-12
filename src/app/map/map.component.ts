import { Component, OnInit,Input } from '@angular/core';
import {MapModel} from './map.model'
import { MdDialogRef } from '@angular/material';
import {Accommodation} from "app/accomodation/accommodation.model"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 600px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {


  latitudeOnClick:number;
  longitudeOnClick:number;
  public accomodation:Accommodation;
  public mapInfo: MapModel;
  public watching:boolean;
  public adding:boolean;

  constructor(public dialogRef: MdDialogRef<MapComponent>) {
  }

  onClick(res:any){
    this.latitudeOnClick=res.coords.lat;
    this.longitudeOnClick=res.coords.lng;
  }

  setLocation(){
    this.dialogRef.close({latitude : this.latitudeOnClick, longitude : this.longitudeOnClick});
  }

  ngOnInit() {
  }

}
