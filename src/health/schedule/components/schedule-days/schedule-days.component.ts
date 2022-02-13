import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-days.component.scss'],
    templateUrl: 'schedule-days.component.html'
})
export class ScheduleDaysComponent {
    @Input() selected: number;
    @Output() select = new EventEmitter<number>()

    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    selectDay(index: number) {
        this.select.emit(index)
    }
}