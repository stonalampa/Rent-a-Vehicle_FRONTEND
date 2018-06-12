import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Region} from "../region.model"
import {Country} from 'app/country/country.model'
import { Http, Headers, Response } from '@angular/http';
import {HttpCountryService} from "app/country/country.service"
import {HttpRegionService} from "app/region/region.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css'],
  providers:[HttpCountryService,HttpRegionService]
})
export class RegionEditComponent implements OnInit {

  @Input() eRegion:Region;
  private regionForEdit:Region;
  public countries: Array<Country>;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpCountryService:HttpCountryService,
              private httpRegionService:HttpRegionService,
              private router:Router,
              private snackBar:MdSnackBar) {
                this.notifyParent=new EventEmitter();
               }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe((res: any) => {
        this.countries = res; console.log(this.countries);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  editRegion(region: Region, form: NgForm){
    
      this.regionForEdit=new Region();
      this.regionForEdit.Id=this.eRegion.Id;
      this.regionForEdit.Name=region.Name;
      this.regionForEdit.Country_Id=region.Country_Id;

      this.httpRegionService.editRegion(this.regionForEdit).subscribe(
          ()=>{ 
            console.log('Region successfuly edited');
            this.snackBar.open("Region successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}
