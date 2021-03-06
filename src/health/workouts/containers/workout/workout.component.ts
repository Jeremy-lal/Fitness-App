import { Workout, WorkoutsService } from './../../../shared/services/workout/workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';

@Component({
    selector: 'app-workout',
    templateUrl: 'workout.component.html',
    styleUrls: ['workout.component.scss'],
})

export class WorkoutComponent implements OnInit, OnDestroy {
    workout$: Observable<any>;
    subscription: Subscription;

    constructor(private workoutsService: WorkoutsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.workoutsService.workouts$.subscribe()
        this.workout$ = this.route.params.pipe(
            switchMap((param: any) => this.workoutsService.getWorkout(param.id)))
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    async addWorkout(event: Workout) {
        await this.workoutsService.addWorkout(event)
        this.backToWorkouts();
    }

    async updateWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.updateWorkout(key, event)
        this.backToWorkouts();
    }

    async removeWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.removeWorkout(key)
        this.backToWorkouts();
    }


    backToWorkouts() {
        this.router.navigateByUrl('workouts')
    }
}