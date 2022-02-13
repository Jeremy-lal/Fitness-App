import { Meal } from './../../../shared/services/meals/meals.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Workout } from 'src/health/shared/services/workout/workout.service';

@Component({
    selector: 'schedule-section',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-section.component.scss'],
    templateUrl: 'schedule-section.component.html'
})
export class ScheduleSectionComponent {

    @Input()
    name: string;

    @Input()
    section: ScheduleItem;

    @Output()
    select = new EventEmitter<any>();

    onSelect(type: string, assigned: Meal[] | Workout[] = []) {
        const data = this.section;
        this.select.emit({
            type,
            assigned,
            data
        });
    }

}