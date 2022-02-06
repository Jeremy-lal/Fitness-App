import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Meal, MealsService } from './../../../shared/services/meals/meals.service';

@Component({
    selector: 'app-meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.scss'],
})

export class MealComponent implements OnInit {
    constructor(private mealsService: MealsService, private router: Router) { }

    ngOnInit() { }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event)
        this.backToMeals();
    }

    backToMeals() {
        this.router.navigateByUrl('meals')
    }
}