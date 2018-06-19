import { Component, OnInit } from '@angular/core';
import {TypeOfVehicle} from "./vehicleType.model"
import { Http, Response } from '@angular/http';
import {HttpVehicleTypeService} from "./vehicleType.service"
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdSnackBar} from "@angular/material"
import { VehicleAddComponent } from '../vehicle/vehicle-add/vehicle-add.component';
import { VehicleTypeAddComponent } from './vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './vehicle-type-edit/vehicle-type-edit.component';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
  providers: [HttpVehicleTypeService]
})
export class VehicleTypeComponent implements OnInit {
  
  private vehicleTypes:Array<TypeOfVehicle>;
  private editFlag:boolean;
  private adminRole:boolean;
  private role:string;
  constructor(private httpVehicleTypeService:HttpVehicleTypeService,
              private snackBar:MdSnackBar,
              public dialog:MdDialog,) {
  }
    
  ngOnInit() {
    this.editFlag = false;
    this.adminRole=false;
    this.createPermisions();
    this.httpVehicleTypeService.getVehicleTypes().subscribe(
      (res: any) => {this.vehicleTypes = res; console.log(this.vehicleTypes)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
      }
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  openAccNewDialog(){
    let dialogRef = this.dialog.open(VehicleTypeAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editClickDialog(vehicleType:TypeOfVehicle){
    let config = new MdDialogConfig();
      config.data = vehicleType;

      let dialogRef = this.dialog.open(VehicleTypeEditComponent,config);
      dialogRef.componentInstance.eVehicleType = vehicleType;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      });
  }

  delete(vehicleType:TypeOfVehicle){

    this.httpVehicleTypeService.deleteVehicleType(vehicleType.Id).subscribe(
      ()=>{
      console.log('VehicleType ' + vehicleType.Name + ' successfuly deleted');
      this.snackBar.open("VehicleType " + vehicleType.Name + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert("VehicleType ' + VehicleType.Name + ' failed delete!"); console.log(error);}
    );
  }
}
