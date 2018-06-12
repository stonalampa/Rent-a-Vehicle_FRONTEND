import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {AppUrl} from "app/appservice/AppUrl.services"
import {Accommodation} from "app/accomodation/accommodation.model"
import{MdSnackBar} from '@angular/material'

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  public accommodation:Accommodation;
  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  private token:string;
  public fileChoosed:boolean;

  constructor(private appUrl:AppUrl,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.fileChoosed=false;
    this.uploader=new FileUploader({url:this.appUrl.RootLocation+"acc/image/upload"});
    this.token=localStorage.getItem("id_token");
    this.uploader.authToken=this.token;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; this.fileChoosed=true; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log(item.file.name);
            console.log(response);
            this.accommodation.ImageURL=item.file.name;
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
