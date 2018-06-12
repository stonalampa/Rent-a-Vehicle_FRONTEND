import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css'],
  providers: [HttpCountryService]
})
export class CountryEditComponent implements OnInit {

  @Input() eCountry:Country;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpCountryService:HttpCountryService,
              private router: Router,
              private snackBar:MdSnackBar) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
  }

  editCountry(country: Country, form: NgForm){
    
      this.httpCountryService.editCountry(country).subscribe(
          ()=>{ 
            console.log('Country successfuly edited');
            this.snackBar.open("Country successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
