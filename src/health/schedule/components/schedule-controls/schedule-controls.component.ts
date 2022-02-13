import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-controls.component.scss'],
    templateUrl: 'schedule-controls.component.html'
})
export class ScheduleControlsComponent {
    @Input() selected: Date;
    @Output() move = new EventEmitter<number>()

    offset = 0;

    moveDate(offset: number) {
        this.offset = offset;
        this.move.emit(offset)
    }

}