import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authService.isLogged;
        if (isAuthenticated) {
            this.router.navigate(['/dashboard']);
        }
        return !isAuthenticated;
    }
}
