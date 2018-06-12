import { Component,OnInit,Input,NgZone } from '@angular/core';
import { HttpAuthenticationService } from 'app/login/userAuthentication.service';
import { Http, Headers, Response } from '@angular/http';
import { MdDialog,MdSnackBar } from '@angular/material';
import {LoginComponent} from "app/login/login.component"
import {RegisterComponent} from "app/register/register.component"
import {Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from './appservice/notification.service';
import {AppUrl} from "app/appservice/AppUrl.services"

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
  zone: NgZone;

  constructor(private httpAuthService:HttpAuthenticationService,public dialog: MdDialog,private router:Router,
             private notificationService: NotificationService,
             public snackBar: MdSnackBar,
              private appUrl:AppUrl){
     }

  ngOnInit(){
      this.adminRole=false;
      this.appUser=false;
      this.managerRole=false;
      this.createPermision();
      this.checkForUser();
       if (this.role == "Admin") {
            this.notificationService.adminNotReceived.subscribe(e => this.notify(e));
        } else if (this.role == "Manager") {
            this.notificationService.managerNotRecieved.subscribe(e => this.notify(e));
        }
        this.zone = new NgZone({ enableLongStackTrace: false });
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
        let dialogRef = this.dialog.open(RegisterComponent);
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
              this.router.navigate(['/home']);
          },
          error=>{console.log(error); alert("Logout failed!");}
      );
  }
  notify(data: any) {
        this.zone.run(() => {
            if (this.role == "Admin")
             {
               //this.openSnackBar("You have "+ data +" accommodation(s) for approve","");
               this.snackBar.open("You have "+ data +" accommodation(s) for approve", "", { duration: 2500,});
            } else if(this.role == "Manager")
            {
                 //this.openSnackBar("Your accommodation "+ data + " is approved ","");
                 this.snackBar.open("Your accommodation "+ data + " is approved ", "", { duration: 5000,});
            }
        });

    }

    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  routeForLink = [
        {
            route:['/home'],
            label: "Home"

        },
        {
            route: ['/country'],
            label: "Country"
        },
        {
            route: ['/region'],
            label: "Region"
        },
        {
            route: ['/place'],
            label: "Place"
        },
        {
            route: ['/accomodation'],
            label: "Accomodation"
        },
        {
            route: ['/accomodation-type'],
            label: "Accomodation Type"
        },
        {
          route: ['/comment'],
          label: "Comment"
        },
        {
          route: ['/room'],
          label: "Room"
        },
        {
          route: ['/room-reservation'],
          label: "RoomReservation"
        },
        {
          route: ['/managers'],
          label: "Managers"
        }
    ]
     
}
