import { Meal, MealsService } from './../../../shared/services/meals/meals.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
    selector: 'meals',
    templateUrl: 'meals.component.html',
    styleUrls: ['meals.component.scss']
})

export class MealsComponent implements OnInit, OnDestroy {
    meals$: Observable<Meal[]>;
    subscription: Subscription;

    constructor(private mealsService: MealsService, private store: Store) { }

    ngOnInit() {
        this.meals$ = this.store.select<Meal[]>('meals')
        this.subscription = this.mealsService.meals$.subscribe()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}