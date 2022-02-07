import { Workout, WorkoutsService } from './../../../shared/services/workout/workout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
    selector: 'workouts',
    templateUrl: 'workouts.component.html',
    styleUrls: ['workouts.component.scss']
})

export class WorkoutsComponent implements OnInit, OnDestroy {
    workouts$: Observable<Workout[]>;
    subscription: Subscription;

    constructor(private workoutsService: WorkoutsService, private store: Store) { }

    ngOnInit() {
        this.workouts$ = this.store.select<Workout[]>('workouts')
        this.subscription = this.workoutsService.workouts$.subscribe()

    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    removeWorkout(event: Workout) {
        this.workoutsService.removeWorkout(event.$key)
    }

}