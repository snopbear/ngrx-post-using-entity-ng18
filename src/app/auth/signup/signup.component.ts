import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state/app.state';
import { setLoadingSpinner } from '../../shared/store/shared.actions';
import { signupStart } from '../state/auth.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,NgIf], // Add necessary imports here if any. For example, HttpClientModule, MatInputModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatInputModule in the
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}