import { ScheduleItem, ScheduleList } from './../../../shared/services/schedule/schedule.service';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    styleUrls: ['schedule-calendar.component.scss'],
    templateUrl: 'schedule-calendar.component.html'
})
export class ScheduleCalendarComponent {
    @Input() items: ScheduleList | null;
    @Input() set date(date: Date | null) {
        if (date !== null) {
            this.selectedDay = new Date(date.getTime());
        }
    };
    @Output() change = new EventEmitter<Date>();

    selectedDay: Date;
    selectedWeek: Date;
    selectedDayIndex: number;

    sections = [
        { key: 'morning', name: 'Morning' },
        { key: 'lunch', name: 'Lunch' },
        { key: 'evening', name: 'Evening' },
        { key: 'snaks', name: 'Snaks and Drinks' },
    ]

    constructor() { }

    ngOnChanges() {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
    }

    selectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);
        selectedDay.setDate(selectedDay.getDate() + index);
        this.change.emit(selectedDay);
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.change.emit(startDate);
    }

    private getToday(date: Date) {
        let today = date.getDay() - 1;
        if (today < 0) {
            today = 6;
        }
        return today;
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        return new Date(date.setDate(diff))
    }
}