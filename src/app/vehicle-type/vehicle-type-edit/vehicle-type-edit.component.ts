import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {TypeOfVehicle} from "../vehicleType.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpVehicleTypeService} from "../vehicleType.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar, MdDialogRef} from "@angular/material"


@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrls: ['./vehicle-type-edit.component.css'],
  providers: [HttpVehicleTypeService]
})
export class VehicleTypeEditComponent implements OnInit {

  public eVehicleType:TypeOfVehicle;
  public vehicleTyleForEdit:TypeOfVehicle;
  constructor(private httpVehicleTypeService:HttpVehicleTypeService,
              private router: Router,
              private snackBar:MdSnackBar,
              public dialogRef: MdDialogRef<VehicleTypeEditComponent>) {
   }
   

  ngOnInit() {
  }
  editVehicleType(vehicleType: TypeOfVehicle, form: NgForm){
    this.vehicleTyleForEdit = new TypeOfVehicle();
    this.vehicleTyleForEdit.Id = this.eVehicleType.Id;
    this.vehicleTyleForEdit.Name = vehicleType.Name;

    this.httpVehicleTypeService.editVehicleType(this.vehicleTyleForEdit).subscribe(
        ()=>{ 
          console.log('VehicleType successfuly edited');
          this.snackBar.open("VehicleType successfuly edited", "", { duration: 2500,});
          this.dialogRef.close();
        },
        error => {alert("Close!"); console.log(error);}
      );
     
}

}
