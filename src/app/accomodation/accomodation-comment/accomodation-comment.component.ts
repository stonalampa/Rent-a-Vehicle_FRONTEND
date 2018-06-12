import { Component, OnInit,Input,Output } from '@angular/core';
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
import {HttpCommentService} from "app/comment/comment.service"
import {RoomReservation} from "app/roomreservation/roomreservation.model"
import {Comment} from "app/comment/comment.model";

@Component({
  selector: 'app-accomodation-comment',
  templateUrl: './accomodation-comment.component.html',
  styleUrls: ['./accomodation-comment.component.css'],
  providers: [HttpCommentService]
})
export class AccomodationCommentComponent implements OnInit {
  public commentAccomodation:Accommodation;
  public comments : Array<Comment>;
  public managerRole:boolean;

  constructor(private httpCommentService: HttpCommentService,
              public dialogRef: MdDialogRef<AccomodationCommentComponent>,
              private router: Router,private thhtAccService : HttpAccommodationService,
              private snackBar:MdSnackBar) 
              {
              }

  ngOnInit() {
       this.thhtAccService.getAccommodation(this.commentAccomodation.Id).subscribe((res: any) => {
        this.commentAccomodation = res; console.log(this.commentAccomodation);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  saveComment(comment: Comment, form: NgForm){
            
       this.httpCommentService.postComment(comment).subscribe(
          ()=>{ 
            console.log('Comment successfully posted');
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
  
  getNotification(evt) {
      this.ngOnInit();
  }

  deleteComment(comment){
    this.httpCommentService.deleteComment(comment.Id).subscribe(
      ()=>{
        console.log('Comment ' + comment.Id + ' successfully deleted');
        this.snackBar.open("Comment" + comment.Id +  " successfully deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Comment " + comment.Id + " failed delete!"); console.log(error);}
    );
  }

}
