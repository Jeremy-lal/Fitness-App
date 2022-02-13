import { Store } from 'store';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleService {
    private date$ = new BehaviorSubject(new Date());
    schedule$: Observable<any[]> = this.date$.pipe(
        tap((next: any) => this.store.set('date', next))
    );

    constructor(private store: Store) { }

    updateDate(date: Date) {
        this.date$.next(date)
    }

}