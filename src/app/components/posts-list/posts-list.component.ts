import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state/app.state';
import { Observable } from 'rxjs';
import { IPost } from '../../models/posts.interface';
import { getPosts } from '../../state/posts.selector';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddPostComponent } from '../add-post/add-post.component';
import { deletePost, loadPosts } from '../../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, RouterOutlet, AddPostComponent], // Add necessary imports here if any. For example, HttpClientModule, MatTableModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatTableModule in the component's
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<IPost[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts()); // Load posts on component initialization.
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
