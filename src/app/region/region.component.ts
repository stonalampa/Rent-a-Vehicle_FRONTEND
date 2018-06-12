import { Component, OnInit } from '@angular/core';
import {Country} from "../country/country.model"
import {Region} from "./region.model"
import { Http, Response } from '@angular/http';
import {HttpRegionService} from "./region.service"
import { Observable } from "rxjs/Observable";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers:[HttpRegionService]
})
export class RegionComponent implements OnInit {

  private regions:Array<Region>;
  private editFlag;
  region:any;
  private adminRole:boolean;
  private role:string;

  constructor(private httpRegionService:HttpRegionService,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.editFlag=false;
    this.adminRole=false;
    this.createPermisions();
    this.httpRegionService.getRegions().subscribe(
      (res: any) => {this.regions = res; console.log(this.regions)},
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

  editClick(region:Region){
    this.editFlag=true;
    this.region=region;
  }

  delete(region:Region){

    this.httpRegionService.deleteRegion(region.Id).subscribe(
      ()=>{
      console.log('Region ' + region.Name + ' successfuly deleted');
      this.snackBar.open("Region " + region.Name + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert("Region ' + region.Name + ' failed delete!"); console.log(error);}
    );
  }

}
