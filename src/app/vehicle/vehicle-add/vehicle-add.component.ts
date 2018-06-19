import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../vehicle.model"
import {Http, Headers, Response } from '@angular/http';
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "../../appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import {HttpVehicleService} from "../vehicle.service";
import { Service } from '../../service/service.model';
import {HttpServiceService} from "../../service/service.service";
import {HttpVehicleTypeService} from "../../vehicle-type/vehicleType.service";
import { TypeOfVehicle } from '../../vehicle-type/vehicleType.model';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css'],
  providers: [HttpVehicleService]
})
export class VehicleAddComponent implements OnInit {

  nVehicle:any={};
  private postVehicle:Vehicle;
  public services: Array<Service>;
  public typesOfVehicle: Array<TypeOfVehicle>;

  constructor(private httpVehicleService:HttpVehicleService,
              private httpServiceService: HttpServiceService,
              private httpVehicleTypeService: HttpVehicleTypeService,
              private router: Router,
              public dialogRef: MdDialogRef<VehicleAddComponent>,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.httpServiceService.getServices().subscribe((res: any) => {
      this.services = res; console.log(this.services);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    this.httpVehicleTypeService.getVehicleTypes().subscribe((res: any) => {
      this.typesOfVehicle = res; console.log(this.typesOfVehicle);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.vehicle=this.nVehicle;
  }
  

  saveVehicle(vehicle: Vehicle, form: NgForm){
       this.postVehicle=new Vehicle();
       this.postVehicle.PricePerHour=vehicle.PricePerHour;
       this.postVehicle.CarModel = vehicle.CarModel;
       this.postVehicle.Manufactor=vehicle.Manufactor;
       this.postVehicle.Year=vehicle.Year;
       this.postVehicle.Description=vehicle.Description;
       this.postVehicle.Image=vehicle.Image;
       this.postVehicle.Service_Id = vehicle.Service_Id;
       this.postVehicle.TypeOfVehicle_Id = vehicle.TypeOfVehicle_Id;
 
       this.httpVehicleService.postVehicle(this.postVehicle).subscribe(
          ()=>{ 
            console.log('Vehicle successfuly posted');
            this.snackBar.open("Vehicle successfuly posted.", "", { duration: 2500,});
            this.router.navigate(['/vehicle']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}