import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "../map/map.model";
import {MapComponent} from "../map/map.component";
import {HttpServiceService} from "./service.service"
import {Service} from "./service.model";
import {ServiceAddComponent} from "./service-add/service-add.component"
import {ServiceEditComponent} from "./service-edit/service-edit.component"

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers:[HttpServiceService]
})
export class ServiceComponent implements OnInit {

  private services:Array<Service>;
  service:Service;
  private editFlag;
  mapInfo:MapModel;
  public imageUrl:string;
  public count : number;
  private userUndefined:boolean;
  private adminRole:boolean;
  private managerRole:boolean;
  private managerBanned:boolean;
  private appUser:boolean;
  private role:string;

  constructor(private httpServiceService:HttpServiceService,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
     
    this.editFlag=false;
    this.adminRole=false;
    this.managerRole=false;
    this.appUser=false;
    this.userUndefined=true;
    this.createPermisions();
    
   /* if(this.managerRole){
        this.httpServiceService.getManagerAccommodations(localStorage.getItem('username')).subscribe(
          (res: any) => {
            this.accommodations = res; 
            console.log(this.accommodations);
            this.setImagesForAccommodations();},
            error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );*/
    //}else{
        this.httpServiceService.getServices().subscribe(
          (res: any) => {
            this.services = res; 
            console.log(this.services);
            this.setImagesForAccommodations();},
            error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );
   // }
  }

  setImagesForAccommodations(){
    
    this.services.forEach(element => {
        this.httpServiceService.getLogoUrlForService(element.Id).subscribe(
          (result:any)=>{
            result=result.json();
            if(result!=undefined){
              var str=result.replace(/\\/g,"/");
              element.Logo=str;
            }
          }
        );
    });
  }

  createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
          this.userUndefined=false;
      }else if(this.role=="User"){
          this.appUser=true;
          this.userUndefined=false;
      }else if(this.role=="Manager"){
          this.managerRole=true;
          this.userUndefined=false;
          //this.setUserManager();
          
      }
  }

  /*setUserManager(){
    this.httpUsersService.getUser(localStorage.getItem('username')).subscribe(
      (res: any) => {
        this.userManager=res;
        if(this.userManager.isBanned!=undefined){
            this.managerBanned=this.userManager.isBanned;
          }
        console.log(this.userManager);},
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }*/

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(service:Service){
    this.editFlag=true;
    this.service=service;
  }

  delete(service:Service){

    this.httpServiceService.deleteService(service.Id).subscribe(
      ()=>{
        console.log('Service ' + service.Name + ' successfuly deleted');
        this.snackBar.open("Service " + service.Name + " successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Service ' + service.Name + ' failed delete!"); console.log(error);}
    );
  }

  openAccNewDialog(){
    let dialogRef = this.dialog.open(ServiceAddComponent);
    //dialogRef.componentInstance.userManager=this.userManager;

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  
    editAccNewDialog(service:Service){
      let config = new MdDialogConfig();
      config.data = service;

      let dialogRef = this.dialog.open(ServiceEditComponent,config);
      dialogRef.componentInstance.eService = service;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  

  /*detailsDialog(acc:Accommodation){
    let config = new MdDialogConfig();
    config.data = acc;
    config.height = '700px';
    config.width = '850px';
    let dialogRef = this.dialog.open(AccomodationDetailsComponent,config);
    dialogRef.componentInstance.detAccomodation = acc;
    
    dialogRef.afterClosed().subscribe(result => {
     
     if (result != null)
     {
     this.ngOnInit();
     }
  });
  }*/

 /*commentDialog(acc:Accommodation){
    let config = new MdDialogConfig();
    config.data = acc;
    config.height = '700px';
    config.width = '850px';
    
    let dialogRef = this.dialog.open(AccomodationCommentComponent,config);
    dialogRef.componentInstance.commentAccomodation = acc;
    dialogRef.componentInstance.managerRole=this.managerRole;
    dialogRef.afterClosed().subscribe(result => {
    
    this.ngOnInit();
     
  });
 }
*/
/*
 openSearchDialog(){
   let config = new MdDialogConfig();
    config.height = '500px';
    config.width = '450px'; 
    let dialogRef = this.dialog.open(SearchComponent,config);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result != null)
      {
        this.accommodations = result;
      }
  });

 }*/
}