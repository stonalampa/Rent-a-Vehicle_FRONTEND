import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {RoomReservation} from "../roomreservation.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomReservationService} from "../roomreservation.service"
import {HttpRoomService} from "app/room/room.service";
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {Room} from "app/room/room.model";
import{MdSnackBar} from '@angular/material';


@Component({
  selector: 'app-room-reservation-add',
  templateUrl: './room-reservation-add.component.html',
  styleUrls: ['./room-reservation-add.component.css'],
  providers: [HttpRoomReservationService,HttpRoomService]
})
export class RoomReservationAddComponent implements OnInit {

public nRoomReservation: any={};
@Input() roomForCheckReserv:Room;
@Output() notifyParent: EventEmitter<any> = new EventEmitter();
public rooms : Array<Room>;
public role:string;
public managerRole:boolean;
public userRole:boolean;


constructor(private httpRoomResService:HttpRoomReservationService,
            private httpRoomService : HttpRoomService,private router: Router,
            public snackBar: MdSnackBar) {
    this.notifyParent=new EventEmitter();
  }

  ngOnInit() {

    this.userRole=false;
    this.managerRole=false;
    this.createPermisions();

     this.httpRoomService.getRooms().subscribe((res: any) => {
        this.rooms = res; console.log(this.rooms);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

   createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="User"){
          this.userRole=true;
      }else if(this.role=="Manager"){
          this.managerRole=true;
          
      }
  }

 saveRoomReservation(roomRes: RoomReservation, form: NgForm,room:Room){
      roomRes.Room_Id = room.Id;
      var date = new Date();
      var startDate = new Date(roomRes.StartDate);
      var endDate = new Date(roomRes.EndDate);
      if (date > startDate)
      {
        this.openSnackBar("Start date cant be later then current date","");
        return;
      }
      if (endDate < startDate)
      {
        this.openSnackBar("End date must be later or equal then start date","");
        return;
      }
      var g = false;

      g = this.checkRoomReservations(room,roomRes);

      if (g)
      {
       this.httpRoomResService.postRoomReservations(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly posted');
            this.snackBar.open("Room Reservation successfuly posted", "", { duration: 2500,});
            this.router.navigate(['/room-reservation']);
            this.openSnackBar("Succesfuly reserve","");
            
          },
          error => {alert("Close!"); console.log(error);}
        );
        this.ngOnInit();
        this.notifyParent.emit('Some value to send to the parent');
      }
      else 
      {
         this.openSnackBar("Another user is reserved this room in this period","");
      }
        
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  checkRoomReservations(room:Room,roomRes:RoomReservation):boolean{
    if (room.RoomReservations.length == 0)
    {
      return true;
    }
    var res = false;
     room.RoomReservations.forEach(element => {
          var sd = element.StartDate.toString();
          var k = sd.split('T');
          var sdCom = new Date(k[0]);
          
          var ed = element.EndDate.toString();
          var k = ed.split('T');
          var edCom = new Date(k[0]);
          var StartDate = new Date(roomRes.StartDate);
          var EndDate = new Date(roomRes.EndDate);
                              /// provera da li se datumi rezervacije preklapaju
        if ((StartDate >= sdCom && StartDate <= edCom) ||
                 (EndDate >=sdCom && EndDate <=edCom))
        {
            return res = false;
        }
        else 
        {
            res = true;
        }
      });
      return res;
  }
}
