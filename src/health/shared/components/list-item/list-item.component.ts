import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'list-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'list-item.component.html',
    styleUrls: ['list-item.component.scss']
})

export class ListItemComponent {
    @Input() item: any;
    @Output() remove = new EventEmitter<any>();

    toggled = false;

    constructor() { }

    toggle() {
        this.toggled = !this.toggled;
    }

    removeItem() {
        this.remove.emit(this.item);
    }

    getRoute(item: any) {
        return [`../${item.ingredients ? 'meals' : 'workouts'}`, item.$key];
    }
}