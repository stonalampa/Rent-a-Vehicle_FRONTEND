import { Component, OnInit } from '@angular/core';
import {Country} from "app/country/country.model"
import {Region} from 'app/region/region.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpCountryService} from "app/country/country.service"
import {HttpRegionService} from "app/region/region.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css'],
  providers:[HttpCountryService,HttpRegionService]
})
export class RegionAddComponent implements OnInit {

  nRegion:any={};
  public contries: Array<Country>;
  private postRegion:Region;

  constructor(private httpCountryService:HttpCountryService,
              private httpRegionService:HttpRegionService,
              private router: Router,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe((res: any) => {
        this.contries = res; console.log(this.contries);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  saveRegion(region: Region, form: NgForm){
       this.postRegion=new Region();
       this.postRegion.Name=region.Name;
       this.postRegion.Country_Id=region.Country_Id;

       this.httpRegionService.postRegion(this.postRegion).subscribe(
          ()=>{ 
            console.log('Region successfuly posted');
            this.snackBar.open("Region successfuly posted", "", { duration: 2500,});
            this.router.navigate(['/region']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }

}
