import { Component, OnInit } from '@angular/core';
import {Comment} from "./comment.model"
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {HttpCommentService} from "./comment.service";
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [HttpCommentService]
})
export class CommentComponent implements OnInit {


  private comments:Array<Comment>;
  private editFlag;
  comment:any;

constructor(private httpCommentService:HttpCommentService,
            private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.editFlag=false;
    this.httpCommentService.getComments().subscribe(
      (res: any) => {this.comments = res; console.log(this.comments)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(comment:Comment){
    this.editFlag=true;
    this.comment=comment;
  }

  delete(comment:Comment){

    this.httpCommentService.deleteComment(comment.Id).subscribe(
      ()=>{
        console.log('Comment ' + comment.Id + ' successfuly deleted');
        this.snackBar.open("Comment " + comment.Id + " successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Comment ' + comment.ID + ' failed delete!"); console.log(error);}
    );
  }
}
