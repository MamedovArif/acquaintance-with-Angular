import { Component, OnInit, Input } from '@angular/core';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-inner-comments',
  templateUrl: './inner-comments.component.html',
  styleUrls: ['./inner-comments.component.css']
})
export class InnerCommentsComponent implements OnInit {
  @Input() inner: Component[] = []
  @Input() parent: number | null = null

  public full = []
  public extract = []

  constructor() { }

  ngOnInit() {
    this.full = this.inner;
    this.extract = this.full
      .filter((item) => item.parent_id !== null)
      .filter((item) => item.parent_id === this.parent)
  }
}
