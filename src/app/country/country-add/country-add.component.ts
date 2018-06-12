import { Component, OnInit,Input } from '@angular/core';
import {Country} from "../country.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCountryService} from "../country.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css'],
  providers: [HttpCountryService]
})
export class CountryAddComponent implements OnInit {

  nCountry:any={};

  constructor(private httpCountryService:HttpCountryService,
              private router: Router,
              private snackBar:MdSnackBar) {
  }

  ngOnInit() {
  }

  saveCountry(country: Country, form: NgForm){
            
       this.httpCountryService.postCountry(country).subscribe(
          ()=>{ 
            console.log('Country successfuly posted');
            this.snackBar.open("Country successfuly posted", "", { duration: 2500,});
            this.router.navigate(['/country']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
}
