import { Component,OnInit,Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { MdDialog,MdSnackBar } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import {AppUrl} from "./appservice/AppUrl.services"
import { HttpAuthenticationService } from './login/userAuthentication.service';
import {MdDialogConfig} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpAuthenticationService]

})
export class AppComponent {

  username: string;
  isLoggedIn:boolean;
  private role:string;
  private adminRole:boolean;
  private managerRole:boolean;
  private appUser:boolean;
  public static adminR:boolean;
  public static managerR: boolean;

  constructor(private httpAuthService:HttpAuthenticationService,public dialog: MdDialog,private router:Router,
             public snackBar: MdSnackBar,
              private appUrl:AppUrl){
     }

  ngOnInit(){
      this.adminRole=false;
      this.appUser=false;
      this.managerRole=false;
      this.createPermision();
      this.checkForUser();
       
  }

  createPermision(){
      this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
          AppComponent.adminR = true;
      }else if(this.role=="User"){
          this.appUser=true;
      }else if(this.role=="Manager"){
          this.managerRole=true;
          AppComponent.managerR = true;
      }
  }

  openLoginDialog() {

        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined){
                return;
            }
            location.reload();
        },
            error => { alert("Close!"); console.log(error); }
        );
    }

    openRegistrationDialog() {
        let config = new MdDialogConfig();
        config.height='530px';
        config.width='350px';
        let dialogRef = this.dialog.open(RegisterComponent,config);
        
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined)
                return;

            if (result == "success") {
                this.ngOnInit();            
            }
        },
            error => { alert("Close!"); console.log(error); }
        );
    }

  checkForUser(){
      this.username=localStorage.getItem('username');
      if(this.username==null || this.username==undefined){
          this.isLoggedIn=false;
          return;
      }
      this.isLoggedIn=true;
  }

  logout(){
      this.httpAuthService.logout().subscribe(
          response=>{
              localStorage.clear();
              AppComponent.adminR = false;
              AppComponent.managerR = false;
              this.ngOnInit();
              this.router.navigate(['/vehicle']);
          },
          error=>{console.log(error); alert("Logout failed!");}
      );
  }

  routeForLink = [
        {
            route:['/home'],
            label: "Home"

        },
        {
            route: ['/service'],
            label: "Service"
        },
        {
            route: ['/branch'],
            label: "Branch"
        },
        {
            route: ['/vehicle'],
            label: "Vehicle"
        },
        {
            route: ['/vehicleType'],
            label: "VehicleType"
        },
    ]
     
}
