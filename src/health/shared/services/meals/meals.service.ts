import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Observable, tap } from 'rxjs';

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exist: () => boolean
}

@Injectable()
export class MealsService {
    meals$: Observable<Meal[]> = (this.db.list(`meals/${this.uid}`).valueChanges() as Observable<Meal[]>).pipe(
        tap(next => this.store.set('meals', next))
    )

    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) { }

    get uid() {
        const user = this.authService.user as any;
        return user.user.uid;
    }
}