import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IPost } from '../../models/posts.interface';
import { AppState } from '../../app-state/app.state';
import { updatePost } from '../../state/posts.actions';
import { NgIf } from '@angular/common';
import { getPostById } from '../../state/posts.selector';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  // Add necessary imports here if any. For example, HttpClientModule, MatInputModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatInputModule in the component's
})
export class EditPostComponent implements OnInit {
  post!: IPost;
  postForm!: FormGroup;
  postSubscription!: Subscription;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store.select(getPostById).subscribe((post) => {
      debugger
      if (post) {
        this.post = post;
        this.postForm.patchValue({ 
          title: post.title,
          description: post.description,
        });
      }
    });
  }
  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: IPost = {
      id: this.post.id,
      title,
      description,
    };
    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['list']);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
