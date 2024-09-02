import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-state/app.state';
import { autoLogout } from '../../../auth/state/auth.actions';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { isAuthenticated } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone:true,
  imports:[RouterLink,NgIf,AsyncPipe]
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
