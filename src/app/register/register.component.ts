import { Component, OnInit } from '@angular/core';
import {User} from "./user.model"
import { Http, Response } from '@angular/http';
import {HttpRegisterService} from "./register.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import { MdDialogRef } from '@angular/material';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[HttpRegisterService]
})
export class RegisterComponent implements OnInit {

  nUser:any={};

  constructor(private httpRegisterService:HttpRegisterService,
              public dialogRef: MdDialogRef<RegisterComponent>,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
  }

  registerUser(user: any, form: NgForm) {

    this.httpRegisterService.registerUser(user).subscribe(
      data => {
        console.log('User successfuly registered');
        this.snackBar.open("User successfuly registered", "", { duration: 2500,});
        this.dialogRef.close("success");
      },
      error => { alert(error); console.log(error); })
  }

}
