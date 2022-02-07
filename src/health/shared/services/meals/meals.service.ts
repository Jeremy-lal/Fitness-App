import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Observable, tap, map, of, filter } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'
export interface Meal {
    name: string,
    ingredients: string[],
    timestamp?: number,
    $key: string,
    $exist?: () => boolean
}

@Injectable()
export class MealsService {
    meals$ = this.db.list(`meals/${this.uid}`).snapshotChanges().pipe(
        map(items => {            // <== new way of chaining
            return items.map(a => {
                const data = a.payload.val() as Meal;
                data.$key = a.payload.key ?? ''
                return data;           // or {key, ...data} in case data is Obj
            })
        })
    ).pipe(
        tap(next => {
            this.store.set('meals', next)
        })
    )

    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService, private afs: AngularFirestore) { }

    get uid() {
        const user = this.authService.user as any;
        return user.user.uid;
    }

    getMeal(key: string) {
        if (!key) return of({})
        return this.store.select<Meal[]>('meals').pipe(
            filter(Boolean),
            map(meals => meals.find((meal: Meal) => meal.$key === key))
        )
    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    updateMeal(key: string, meal: Meal) {
        return this.db.object(`meals/${this.uid}/${key}`).update(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}