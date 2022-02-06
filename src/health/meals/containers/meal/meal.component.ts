import { Meal } from './../../../shared/services/meals/meals.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.scss'],
})

export class MealComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    addMeal(event: Meal) {
        console.log(event);
    }
}