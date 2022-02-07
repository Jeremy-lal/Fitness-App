import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

//third party modules
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { MealsService } from './services/meals/meals.service'
import { WorkoutsService } from './services/workout/workout.service';
import { ListItemComponent } from './components/list-item/list-item.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule
    ],
    declarations: [
        ListItemComponent
    ],
    exports: [
        ListItemComponent
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService
            ]
        }
    }
}
