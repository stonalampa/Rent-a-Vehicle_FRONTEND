import { Component, OnInit } from '@angular/core';
import {Service} from "../service.model"
import {Http, Headers, Response } from '@angular/http';
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "../../appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import {HttpServiceService} from "../service.service";

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css'],
  providers: [HttpServiceService]
})
export class ServiceAddComponent implements OnInit {

  nService:any={};
  private postService:Service;

  constructor(private httpServiceService:HttpServiceService,
              private router: Router,
              public dialogRef: MdDialogRef<ServiceAddComponent>,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    
  }

  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.service=this.nService;
  }

  

  saveAccommodation(service: Service, form: NgForm){
       this.postService=new Service();
       this.postService.Name=service.Name;
       this.postService.Email=service.Email;
       this.postService.Description=service.Description;
       this.postService.Logo=service.Logo;

       this.httpServiceService.postService(this.postService).subscribe(
          ()=>{ 
            console.log('Service successfuly posted');
            this.snackBar.open("Service successfuly posted.", "", { duration: 2500,});
            this.router.navigate(['/service']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}