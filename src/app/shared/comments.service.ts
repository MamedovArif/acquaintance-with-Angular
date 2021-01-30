import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface realComment {
  id: number;
  parent_id: number | null;
  date_time: any;
  author_name: string;
  body: string;
}

@Injectable({providedIn: 'root'})
export class CommentsService {
  public comments: realComment[] = []

  constructor(public http: HttpClient) {}

  fetchTodos(): Observable<Comment[]> {
    return this.http.get<Comment[]>('https://jsonplaceholder.typicode.com/comments?_limit=131')
      .pipe(
        tap((data) => {
          const comments = data.map((item) => {
            let parentId;
            if (item.postId === 1) {
              parentId = null;
            } else {
              parentId = item.postId;
            }
            return {
              id: item.id,
              parent_id: parentId,
              date_time: new Date(),
              author_name: item.email,
              body: item.body
            };
          });
          console.log(comments);
          this.comments = comments;
        })
      );
  }
}
