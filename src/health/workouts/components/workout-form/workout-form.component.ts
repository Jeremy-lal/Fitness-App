import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workout/workout.service';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    templateUrl: 'workout-form.component.html'
})
export class WorkoutFormComponent implements OnChanges {
    @Input() workout: Workout;
    @Output() create = new EventEmitter<Workout>();
    @Output() update = new EventEmitter<Workout>();
    @Output() remove = new EventEmitter<Workout>();

    toggled = false;
    exists = false;

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0
        })
    });

    constructor(private fb: FormBuilder) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.workout && this.workout.name) {
            this.exists = true

            const value = this.workout;
            this.form.patchValue(value);
        }
    }

    get placeholder() {
        return `e.g. ${this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
    }

    get required() {
        const control = this.form.get('name');
        return control?.hasError('required') && control?.touched
    }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled
    }
}