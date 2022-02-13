import { ScheduleItem } from './../../../shared/services/schedule/schedule.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'store';

@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.scss']
})

export class ScheduleComponent implements OnInit, OnDestroy {

    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    subscriptions: Subscription[] = [];

    constructor(
        private store: Store,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
        ];
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        console.log(event);

        this.scheduleService.selectSection(event);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}