import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Service} from "../service.model"
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig,MdSnackBar} from '@angular/material';
import {AppComponent} from "../../app.component";
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import { HttpServiceService } from '../service.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css'],
  providers:[HttpServiceService]
})
export class ServiceEditComponent implements OnInit {

  private serviceForEdit:Service;
  public eService : Service;
  private role:string;
  private adminRole:boolean;

  constructor(private httpServiceService:HttpServiceService,
              public dialogRef: MdDialogRef<ServiceEditComponent>,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar)
               {
               
               }


  ngOnInit() {

    this.adminRole=false;
    this.createPermisions();
      
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.adminRole=true;
    }
  }

  openChangeLogoDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.service=this.eService;
  }
  
  editService(service: Service, form: NgForm){
    
      this.serviceForEdit=new Service();
      this.serviceForEdit.Id=this.eService.Id;
      this.serviceForEdit.Name=service.Name;
      this.serviceForEdit.Email=service.Email;
      this.serviceForEdit.Description=service.Description;
      this.serviceForEdit.Logo=service.Logo;
  

      this.httpServiceService.editService(this.serviceForEdit).subscribe(
          ()=>{ 
            console.log('Service successfully edited');
            this.snackBar.open("Service successfully edited", "", { duration: 2500,});
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
     /*   if(this.adminRole==true){
          if (accommodation.Approved == true)
          {
            this.httpAccommodationService.approveAccommodation(accommodation.Id).subscribe(
              ()=>{
                 console.log('Approve changed.');
              },
              error => {alert("Close!"); console.log(error);}

            );
          }
        }*/
       
  }

}
