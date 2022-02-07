import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Observable, tap, map, of, filter } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'

export interface Workout {
    name: string,
    type: string,
    strength: any,
    endurance: any,
    timestamp?: number,
    $key: string,
    $exist?: () => boolean
}

@Injectable()
export class WorkoutsService {
    workouts$ = this.db.list(`workouts/${this.uid}`).snapshotChanges().pipe(
        map(items => {            // <== new way of chaining
            return items.map(a => {
                const data = a.payload.val() as Workout;
                data.$key = a.payload.key ?? ''
                return data;           // or {key, ...data} in case data is Obj
            })
        })
    ).pipe(
        tap(next => {
            this.store.set('workouts', next)
        })
    )

    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService, private afs: AngularFirestore) { }

    get uid() {
        const user = this.authService.user as any;
        return user.user.uid;
    }

    getWorkout(key: string) {
        if (!key) return of({})
        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map(workouts => workouts.find((workout: Workout) => workout.$key === key))
        )
    }

    addWorkout(workout: Workout) {
        return this.db.list(`workouts/${this.uid}`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeWorkout(key: string) {
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }
}