import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {AccomodationType} from 'app/accomodationtype/accomodationtype.model'
import {Place} from 'app/place/place.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpAccommodationService} from "../accommodation.service"
import {HttpAccomodationTypeService} from "app/accomodationtype/accomodationtype.service"
import {HttpPlaceService} from "app/place/place.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdSnackBar} from '@angular/material';
import {Room} from "app/room/room.model";
import {HttpRoomReservationService} from "app/roomreservation/roomreservation.service"
import {RoomReservation} from "app/roomreservation/roomreservation.model"
import {HttpRoomService} from "app/room/room.service"
import {RoomEditComponent} from "app/room/room-edit/room-edit.component"

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.css'],
  providers: [HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccomodationDetailsComponent implements OnInit {

 public detAccomodation : Accommodation;
 public detAccomodationCopy : any;
 public rooms : Array<Room>;
 public nRoomReservation:RoomReservation;
 public managerRole:boolean;
 public role:string;
 
  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private router: Router,
              private httpRoomReservationService:HttpRoomReservationService,
              public dialogRef: MdDialogRef<AccomodationDetailsComponent>,
              private httpRoomService:HttpRoomService,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) 
              {
               // this.detAccomodationCopy = this.detAccomodation;
              }
 
  ngOnInit() {
    this.managerRole=false;
    this.createPermisions();

    this.httpAccommodationService.getAccommodation(this.detAccomodation.Id).subscribe(
      (res: any) => {this.detAccomodationCopy = res; console.log(this.detAccomodationCopy)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }
  
  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Manager"){
      this.managerRole=true;
    }
  }
  
  saveRoomReservation(roomRes: RoomReservation, form: NgForm){
    
       this.httpRoomReservationService.postRoomReservations(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfully posted');
            this.snackBar.open("Room reservation successfully posted", "", { duration: 2500,});
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
  
  getNotification(evt) {
      this.ngOnInit();
  }

  deleteRoom(room:Room){
    this.httpRoomService.deleteRoom(room.Id).subscribe(
      ()=>{
        console.log('Room ' + room.Id + ' successfuly deleted');
        this.snackBar.open("Room " + room.Id + " successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Room ' + room.ID + ' failed delete!"); console.log(error);}
    );
  }

  editRoom(room:Room){
      let dialogRef = this.dialog.open(RoomEditComponent);
      dialogRef.componentInstance.eRoom=room;

      dialogRef.afterClosed().subscribe(result => {
        console.log('Room ' + room.Id + ' successfuly edited.');
        this.ngOnInit();
    })
  }

}
