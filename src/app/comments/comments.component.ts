import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../shared/comments.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public loading: boolean = true
  public parentComment = []

  constructor(public commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.fetchTodos()
      .pipe(
        delay(500)
      )
      .subscribe(() => {
        this.loading = false
        this.parentComment = this.commentsService.comments.filter((item) => {
          return item.parent_id === null
        })
      });
  }


}
