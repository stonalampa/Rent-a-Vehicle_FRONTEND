import { Component, OnInit } from '@angular/core';
import {Branch} from "../branch.model"
import {Http, Headers, Response } from '@angular/http';
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "../../appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import {HttpBranchService} from "../branch.service";
import{MapModel} from "../../map/map.model";
import {MapComponent} from "../../map/map.component";
import { Service } from '../../service/service.model';
import {HttpServiceService} from "../../service/service.service";


@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {

  nBranch:any={};
  private postBranch:Branch;
  mapInfo:MapModel;
  public services: Array<Service>;

  constructor(private httpBranchService:HttpBranchService,
              private httpServiceService: HttpServiceService,
              private router: Router,
              public dialogRef: MdDialogRef<BranchAddComponent>,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.httpServiceService.getServices().subscribe((res: any) => {
      this.services = res; console.log(this.services);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.branch=this.nBranch;
  }

  openMapAdd(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    this.mapInfo = new MapModel(45.242268, 19.842954, 
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent);
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.adding=true;
    dialogRef.componentInstance.watching=false;

    dialogRef.afterClosed().subscribe((res) => {
            console.log("Successfuly checked coordinates.")
            this.snackBar.open("Successfuly checked coordinates.", "", { duration: 2500,});
            if (res == undefined) {
                return;
            }
            this.nBranch.Latitude = res.longitude;
            this.nBranch.Longitude = res.latitude;
        });
  }

  

  saveAccommodation(branch: Branch, form: NgForm){
       this.postBranch=new Branch();
       this.postBranch.Address=branch.Address;
       this.postBranch.Longitude=branch.Longitude;
       this.postBranch.Latitude=branch.Latitude;
       this.postBranch.Logo=branch.Logo;
       this.postBranch.Service_Id = branch.Service_Id;
 
       this.httpBranchService.postBranch(this.postBranch).subscribe(
          ()=>{ 
            console.log('Branch successfuly posted');
            this.snackBar.open("Branch successfuly posted.", "", { duration: 2500,});
            this.router.navigate(['/branch']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}