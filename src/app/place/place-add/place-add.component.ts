import {Component, OnInit } from '@angular/core';
import {Place} from "../place.model"
import {Region} from 'app/region/region.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpPlaceService} from "../place.service"
import {HttpRegionService} from "app/region/region.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css'],
  providers: [HttpPlaceService,HttpRegionService]
})
export class PlaceAddComponent implements OnInit {

  nPlace:any={};
  public regions: Array<Region>;
  private postPlace:Place;
  
  constructor(private httpPlaceService:HttpPlaceService,
              private httpRegionService:HttpRegionService,
              private router: Router,
              private snackBar:MdSnackBar) {
  }

  ngOnInit() {
    
    this.httpRegionService.getRegions().subscribe((res: any) => {
        this.regions = res; console.log(this.regions);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  savePlace(place: Place, form: NgForm){
       this.postPlace=new Place();
       this.postPlace.Name=place.Name;
       this.postPlace.Region_Id=place.Region_Id;

       this.httpPlaceService.postPlace(this.postPlace).subscribe(
          ()=>{ 
            console.log('Place successfuly posted');
            this.snackBar.open("Place successfuly posted", "", { duration: 2500,});
            this.router.navigate(['/place']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }

}
