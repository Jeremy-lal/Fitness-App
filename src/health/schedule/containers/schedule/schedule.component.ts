import { MealsService } from './../../../shared/services/meals/meals.service';
import { WorkoutsService } from './../../../shared/services/workout/workout.service';
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
    selected$: Observable<any>;
    list$: Observable<any>; // Meal[] | Workout[]
    schedule$: Observable<ScheduleItem[]>;
    subscriptions: Subscription[] = [];

    open = false;

    constructor(
        private store: Store,
        private mealService: MealsService,
        private workoutsService: WorkoutsService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected')
        this.list$ = this.store.select('list')

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.mealService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe(),
        ];
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    assignItem(items: string[]) {
        this.scheduleService.updateItems(items);
        this.closeAssign()
    }

    closeAssign() {
        this.open = false;
    }
}