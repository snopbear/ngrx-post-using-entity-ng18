import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../../models/posts.interface';
import { AppState } from '../../app-state/app.state';
import { getPostById } from '../../state/posts.selector';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  standalone:true,
  imports:[RouterLink,NgIf,AsyncPipe]
})
export class SinglePostComponent implements OnInit {
  post!: Observable<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }
}
