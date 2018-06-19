import { Component, OnInit,Input } from '@angular/core';
import {TypeOfVehicle} from "../vehicleType.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpVehicleTypeService} from "../vehicleType.service"
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from "@angular/material"


@Component({
  selector: 'app-vehicle-type-add',
  templateUrl: './vehicle-type-add.component.html',
  styleUrls: ['./vehicle-type-add.component.css'],
  providers: [HttpVehicleTypeService]
})
export class VehicleTypeAddComponent implements OnInit {

  nVehicleType:any={};

  constructor(private httpVehicleTypeService:HttpVehicleTypeService,
              private router: Router,
              private snackBar:MdSnackBar,
              public dialogRef: MdDialogRef<VehicleTypeAddComponent>,) {
  }

  ngOnInit() {
  }

  saveVehicle(vehicleType: TypeOfVehicle, form: NgForm){
            
       this.httpVehicleTypeService.postVehicleType(vehicleType).subscribe(
          ()=>{ 
            console.log('Vehicle Type successfuly posted');
            this.snackBar.open("Vehicle Type successfuly posted", "", { duration: 2500,});
            this.router.navigate(['/vehicleType']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
  }

}
