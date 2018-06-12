import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Comment} from "../comment.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCommentService} from "../comment.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {Accommodation} from "app/accomodation/accommodation.model"
import {HttpAccommodationService} from "app/accomodation/accommodation.service"

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
  providers : [HttpCommentService]
})
export class CommentEditComponent implements OnInit {

  @Input() eComment:Comment;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  public accomodations:Array<Accommodation>;

  constructor(private httpCommentService:HttpCommentService,private httpAccService:HttpAccommodationService,
  private router: Router) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
    this.httpAccService.getAccommodations().subscribe((res: any) => {
        this.accomodations = res; console.log(this.accomodations);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  editComment(comment: Comment, form: NgForm){
    
      this.httpCommentService.editComment(comment).subscribe(
          ()=>{ 
            console.log('Comment successfuly edited');
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
