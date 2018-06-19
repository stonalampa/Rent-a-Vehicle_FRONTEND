import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {AppUrl} from "../appservice/AppUrl.services"
import {Service} from "../service/service.model"
import{MdSnackBar} from '@angular/material'
import { Branch } from '../branch/branch.model';
import { Vehicle } from '../vehicle/vehicle.model';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  public service:Service;
  public branch : Branch;
  public vehicle : Vehicle;
  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  private token:string;
  public fileChoosed:boolean;

  constructor(private appUrl:AppUrl,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.fileChoosed=false;
    this.uploader=new FileUploader({url:this.appUrl.RootLocation+"service/image/upload"});
    this.token=localStorage.getItem("id_token");
    this.uploader.authToken=this.token;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; this.fileChoosed=true; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log(item.file.name);
            console.log(response);
            if (this.branch !== undefined)
            {
              this.branch.Logo=item.file.name;
            }
           else if (this.service !== undefined)
            {
              this.service.Logo=item.file.name;
            }
            else if (this.vehicle !== undefined)
            {
              this.vehicle.Image=item.file.name;
            }
            this.snackBar.open(response, "", {
                                duration: 2000,
    });
        };
  }

  enableChoose(){
    this.fileChoosed=false;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }  
}
