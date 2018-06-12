import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {RoomReservation} from "../roomreservation.model"
import {Room} from "app/room/room.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomService} from "app/room/room.service";
import {HttpRoomReservationService} from "../roomreservation.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-room-reservation-edit',
  templateUrl: './room-reservation-edit.component.html',
  styleUrls: ['./room-reservation-edit.component.css'],
 providers: [HttpRoomReservationService]
})
export class RoomReservationEditComponent implements OnInit {

  @Input() eRoomReservation:RoomReservation;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

   public rooms : Array<Room>;

  constructor(private httpRoomResService:HttpRoomReservationService,
              private httRoomService : HttpRoomService,
              private router: Router,
              private snackBar:MdSnackBar) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
    this.httRoomService.getRooms().subscribe((res: any) => {
        this.rooms = res; console.log(this.rooms);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  editRoomReservation(roomRes: RoomReservation, form: NgForm){
    
      this.httpRoomResService.editRoomReservation(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly edited');
            this.snackBar.open("Room Reservation successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
