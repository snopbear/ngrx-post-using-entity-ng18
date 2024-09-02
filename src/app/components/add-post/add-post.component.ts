import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state/app.state';
import { IPost } from '../../models/posts.interface';
import { addPost } from '../../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule], // Add necessary imports here if any. For example, HttpClientModule, MatInputModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatInputModule in the component's
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
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
  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');

    // Check if descriptionForm is not null
    if (descriptionForm && descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.['required']) {
        return 'Description is required';
      }

      if (descriptionForm.errors?.['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }
    }

    // Return an empty string or null if there are no errors to display
    return ''; // or return null;
  }
  onAddPost() {
    
    if (!this.postForm.valid) {
      return;
    }

    const post: IPost = {
      // id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the post. This could be replaced with a real ID generation logic.
    id:'',
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({ post }));
  }
}
