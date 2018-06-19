import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "../map/map.model";
import {MapComponent} from "../map/map.component";
import {HttpBranchService} from "./branch.service"
import {Branch} from "./branch.model";
import {BranchAddComponent} from "./branch-add/branch-add.component"
import {BranchEditComponent} from "./branch-edit/branch-edit.component"

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
  providers:[HttpBranchService]
})
export class BranchComponent implements OnInit {

  private branches:Array<Branch>;
  branch:Branch;
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

  constructor(private httpBranchService:HttpBranchService,
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
        this.httpBranchService.getBranches().subscribe(
          (res: any) => {
            this.branches = res; 
            console.log(this.branches);
            this.setImagesForAccommodations();},
            error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );
   // }
  }

  setImagesForAccommodations(){
    
    this.branches.forEach(element => {
        this.httpBranchService.getLogoUrlForBranch(element.Id).subscribe(
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

  editClick(branch:Branch){
    this.editFlag=true;
    this.branch=branch;
  }

  delete(branch:Branch){

    this.httpBranchService.deleteBranch(branch.Id).subscribe(
      ()=>{
        console.log('Branch successfuly deleted');
        this.snackBar.open("Branch successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Branch ' + branch.Name + ' failed delete!"); console.log(error);}
    );
  }

  openAccNewDialog(){
    let dialogRef = this.dialog.open(BranchAddComponent);
    //dialogRef.componentInstance.userManager=this.userManager;

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  
    editAccNewDialog(branch:Branch){
      let config = new MdDialogConfig();
      config.data = branch;

      let dialogRef = this.dialog.open(BranchEditComponent,config);
      dialogRef.componentInstance.eBranch = branch;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
}