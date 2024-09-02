import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './shared/component/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app-state/app.state';
import { autoLogin } from './auth/state/auth.actions';
import { getLoading, getErrorMessage } from './shared/store/shared.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { HeaderComponent } from './shared/component/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, LoadingSpinnerComponent,NgIf,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-post-using-entity-ng18';
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
