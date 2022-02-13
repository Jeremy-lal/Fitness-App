import { Meal } from './../meals/meals.service';
import { Store } from 'store';
import { BehaviorSubject, Observable, tap, map, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Workout } from '../workout/workout.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList {
    mornings?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snaks?: ScheduleItem,
    [key: string]: any
}

@Injectable()
export class ScheduleService {
    private date$ = new BehaviorSubject(new Date());
    schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
        tap((next: any) => this.store.set('date', next)),
        map((day: any) => {
            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endtAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endtAt }
        }),
        // switchMap((next) => {
        //     return this.getSchedule(startAt, endtAt);
        // }),
        map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }

            return mapped;
        }),
        tap((next: any) => this.store.set('schedule', next))
    );

    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) { }

    get uid() {
        const user = this.authService.user as any;
        return user.user.uid;
    }

    updateDate(date: Date) {
        this.date$.next(date)
    }

    private getSchedule(start: number, end: number) {
        return this.db.list(`schedule/${this.uid}`, ref => {
            let query = ref.startAt(start).endAt(end).orderByChild('timestamp')
            return query;
        })
    }

}