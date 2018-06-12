import { Component, OnInit } from '@angular/core';
import {Country} from "./country.model"
import { Http, Response } from '@angular/http';
import {HttpCountryService} from "./country.service"
import { Observable } from "rxjs/Observable";
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {
  
  private countries:Array<Country>;
  private editFlag:boolean;
  private adminRole:boolean;
  private role:string;
  country:any;

  constructor(private httpCountryService:HttpCountryService,
              private snackBar:MdSnackBar) {
  }
    
  ngOnInit() {
    this.editFlag = false;
    this.adminRole=false;
    this.createPermisions();
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {this.countries = res; console.log(this.countries)},
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

  editClick(country:Country){
    this.editFlag=true;
    this.country=country;
  }

  delete(country:Country){

    this.httpCountryService.deleteCountry(country.Id).subscribe(
      ()=>{
      console.log('Country ' + country.Name + ' successfuly deleted');
      this.snackBar.open("Country " + country.Name + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert("Country ' + country.Name + ' failed delete!"); console.log(error);}
    );
  }
}
