import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm!: FormGroup;

    loading: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private auth: AuthenticationService,
    ) {
        this.initForm();
    }

    get username(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    login(): void {
        const { username, password } = this.loginForm.value;
        if (!username || !password) {
            return;
        }
        this.loading = true;
        this.auth.login(username, password).subscribe((response) => {
            this.loading = false;
            if (response) {
                this.router.navigate(['/dashboard']);
            } else {
                this.snackBar.open('The username or password is incorrect\nTry with: admin/admin', 'Close', { duration: 5000 });
            }
        });
    }

    private initForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
