import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: []
})

export class RegisterComponent {
    error: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    async registerUser(event: FormGroup) {
        const { email, password } = event.value;
        try {
            await this.authService.createUser(email, password)
            this.router.navigateByUrl('/')
        } catch (err) {
            this.error = (err as Error).message
        }
    }
}
