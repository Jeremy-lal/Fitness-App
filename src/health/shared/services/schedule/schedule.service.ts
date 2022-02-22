import { Meal } from './../meals/meals.service';
import { Store } from 'store';
import { BehaviorSubject, Observable, tap, map, switchMap, Subject, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Workout } from '../workout/workout.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
    meals: Meal[] | null,
    workouts: Workout[] | null,
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
    private section$ = new Subject();
    private itemList$ = new Subject();

    items$ = this.itemList$.pipe(
        withLatestFrom(this.section$),
        map(([items, section]: any) => {
            const id = section.data.$key;

            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            };

            const payload = {
                ...(id ? section.data : defaults),
                ...items
            };

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }

        })
    )

    selected$ = this.section$.pipe(
        tap((next: any) => this.store.set('selected', next))
    )

    list$ = this.section$.pipe(
        map((value: any) => this.store.value[value.type]),
        tap((next: any) => this.store.set('list', next))
    );

    schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
        tap((next: any) => this.store.set('date', next)),
        map((day: any) => {

            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endAt };

        }),
        switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt).valueChanges()),
        map((data: any) => {

            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }

            return mapped;

        }),
        tap((next: any) => this.store.set('schedule', next)));


    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) { }

    get uid() {
        const user = this.authService.user as any;
        return user.user.uid;
    }

    updateItems(items: string[]) {
        this.itemList$.next(items)
    }

    updateDate(date: Date) {
        this.date$.next(date)
    }


    selectSection(event: any) {
        this.section$.next(event)
    }

    private createSection(payload: ScheduleItem) {
        return this.db.list(`schedule/${this.uid}`).push(payload);
    }

    private updateSection(key: string, payload: ScheduleItem) {
        return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
    }

    private getSchedule(start: number, end: number) {
        return this.db.list(`schedule/${this.uid}`, ref => {
            let query = ref.startAt(start).endAt(end).orderByChild('timestamp')
            return query;
        })
    }

}