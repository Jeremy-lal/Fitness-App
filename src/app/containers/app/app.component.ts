import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from 'store'
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>
  subscription: Subscription

  constructor(private store: Store, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe()
    this.user$ = this.store.select<User>('user')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigateByUrl('/auth/login')
  }
}
