import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import {AccomodationType} from "../accomodationtype.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpAccomodationTypeService} from "../accomodationtype.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material"


@Component({
  selector: 'app-accomodationtype-edit',
  templateUrl: './accomodationtype-edit.component.html',
  styleUrls: ['./accomodationtype-edit.component.css'],
  providers:[HttpAccomodationTypeService]
})
export class AccomodationtypeEditComponent implements OnInit {

  @Input() eAccomodationType:AccomodationType;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpAccomodationTypeService:HttpAccomodationTypeService,
              private router: Router,
              private snackBar:MdSnackBar) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {  }

  editAccomodationType(accomodationType: AccomodationType, form: NgForm){
    
      this.httpAccomodationTypeService.editAccomodationType(accomodationType).subscribe(
          ()=>{ 
            console.log('AccomodationType successfuly edited');
            this.snackBar.open("AccomodationType successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}
