import { Store } from 'store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { tap } from 'rxjs/operators';


export interface User {
    email: string,
    uid: string,
    authenticated: boolean
}

@Injectable()
// { providedIn: 'root' }

export class AuthService {
    auth$ = this.af.authState.pipe(tap(next => {
        if (!next) {
            this.store.set('user', null)
            return;
        } else {
            const user: User = {
                email: next.email ?? '',
                uid: next.uid,
                authenticated: true
            }
            this.store.set('user', user)
        }
    }))

    constructor(private af: AngularFireAuth, private store: Store) { }

    get user() {
        return this.store.value
    }

    get authState() {
        return this.af.authState;
    }

    createUser(email: string, password: string) {
        return this.af.createUserWithEmailAndPassword(email, password)
    }

    loginUser(email: string, password: string) {
        return this.af.signInWithEmailAndPassword(email, password)
    }

    logoutUser() {
        return this.af.signOut();
    }

}