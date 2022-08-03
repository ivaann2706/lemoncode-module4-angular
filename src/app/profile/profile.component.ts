import { Component } from '@angular/core';

import { User } from '../core/models/user.model';
import { AuthenticationService } from '../core/services/authentication/authentication.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    user!: User;

    constructor(private auth: AuthenticationService) {
        this.auth.user.subscribe((user) => {
            this.user = user;
        });
    }
}
