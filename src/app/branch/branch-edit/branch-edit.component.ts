import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Branch} from "../branch.model"
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig,MdSnackBar} from '@angular/material';
import {AppComponent} from "../../app.component";
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import { HttpBranchService } from '../../branch/branch.service';
import {Service} from "../../service/service.model"
import {HttpServiceService} from "../../service/service.service";
import{MapModel} from "../../map/map.model";
import {MapComponent} from "../../map/map.component";


@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  private branchforEdit:Branch;
  public eBranch : Branch;
  private role:string;
  private adminRole:boolean;
  public services: Array<Service>;
  mapInfo:MapModel;

  constructor(private httpBranchService:HttpBranchService,
              public dialogRef: MdDialogRef<BranchEditComponent>,
              private httpServiceService: HttpServiceService,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar)
               {
               
               }


  ngOnInit() {

    this.adminRole=false;
    this.createPermisions();
    this.httpServiceService.getServices().subscribe((res: any) => {
      this.services = res; console.log(this.services);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
      
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.adminRole=true;
    }
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
            this.eBranch.Latitude = res.latitude;
            this.eBranch.Longitude = res.longitude;
        });
  }


  openChangeLogoDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.branch=this.eBranch;
  }
  
  editBranch(branch: Branch, form: NgForm){
    
      this.branchforEdit=new Branch();
      this.branchforEdit.Id=this.eBranch.Id;
      this.branchforEdit.Address=branch.Address;
      this.branchforEdit.Longitude=branch.Longitude;
      this.branchforEdit.Latitude=branch.Latitude;
      this.branchforEdit.Logo=branch.Logo;
      this.branchforEdit.Service_Id = branch.Service_Id;
  

      this.httpBranchService.editBranch(this.branchforEdit).subscribe(
          ()=>{ 
            console.log('Branch successfully edited');
            this.snackBar.open("Branch successfully edited", "", { duration: 2500,});
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
