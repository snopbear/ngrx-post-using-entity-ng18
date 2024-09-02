import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state/app.state';
import { NgIf } from '@angular/common';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../shared/store/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,NgIf], // Add necessary imports here if any. For example, HttpClientModule, MatInputModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatInputModule in the
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginSubmit() {
    
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
