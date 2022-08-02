import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, shareReplay } from 'rxjs';

import { User } from '../../models/user.model';

const USER_KEY = 'user';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    private user$: Observable<User>;

    constructor() {
        this.userSubject = new BehaviorSubject<User>({} as User);
        this.user$ = this.userSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
        this.loadDataFromStore();
    }
    get user(): Observable<User> {
        return this.user$;
    }

    get isLogged(): boolean {
        const user = this.userSubject.value;
        return !!user.username && !!user.password;
    }

    login(username: string, password: string): boolean {
        if (username === 'admin' && password === 'admin') {
            const user = { username, password };
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            this.userSubject.next(user);
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(USER_KEY);
        this.userSubject.next({} as User);
    }

    private loadDataFromStore(): void {
        const user = localStorage.getItem(USER_KEY);
        if (!!user) {
            this.userSubject.next(JSON.parse(user));
        }
    }
}
