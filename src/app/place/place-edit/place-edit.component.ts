import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Place} from "../place.model"
import {Region} from 'app/region/region.model'
import { Http, Headers, Response } from '@angular/http';
import {HttpPlaceService} from "../place.service"
import {HttpRegionService} from "app/region/region.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css'],
  providers: [HttpPlaceService,HttpRegionService]
})
export class PlaceEditComponent implements OnInit {

  @Input() ePlace:Place;
  private placeForEdit:Place;
  public regions: Array<Region>;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpPlaceService:HttpPlaceService,
              private httpRegionService:HttpRegionService,
              private router:Router,
              private snackBar:MdSnackBar) { 
    this.notifyParent=new EventEmitter();
  }

  ngOnInit() {
    this.httpRegionService.getRegions().subscribe((res: any) => {
        this.regions = res; console.log(this.regions);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  editPlace(place: Place, form: NgForm){
    
      this.placeForEdit=new Place();
      this.placeForEdit.Id=this.ePlace.Id;
      this.placeForEdit.Name=place.Name;
      this.placeForEdit.Region_Id=place.Region_Id;

      this.httpPlaceService.editPlace(this.placeForEdit).subscribe(
          ()=>{ 
            console.log('Place successfuly edited');
            this.snackBar.open("Place successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}
