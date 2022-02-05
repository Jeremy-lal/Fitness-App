import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        return this.authService.authState
            .pipe(map(user => {
                if (!user) {
                    this.router.navigateByUrl('/auth/login')
                }
                return !!user
            }));
    }
}