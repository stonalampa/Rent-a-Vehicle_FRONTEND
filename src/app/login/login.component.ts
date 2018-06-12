import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpAuthenticationService } from 'app/login/userAuthentication.service'
import { FormsModule, NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpAuthenticationService]
})
export class LoginComponent implements OnInit {

  constructor(private httpAuthenticationService:HttpAuthenticationService,
              public dialogRef: MdDialogRef<LoginComponent>) {
               }

  ngOnInit() {
  }

  login(user:any,form:NgForm){

    this.httpAuthenticationService.login(user.username,user.password).subscribe(

      response=>{
        localStorage.setItem('id_token',response.json().access_token);
        localStorage.setItem('role',response.headers.get('Role'));
        localStorage.setItem('username',user.username);
        console.log(response.json());                    
        this.dialogRef.close("success");
      },
      error=>{
        console.log(error.text());
      }

    );
  }

}
