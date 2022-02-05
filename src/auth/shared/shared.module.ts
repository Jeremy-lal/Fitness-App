import { AuthService } from './services/auth/auth.service';
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from './containers/auth-form/auth-form.component'
import { ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from './guards/auth.guard'
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [AuthFormComponent],
    declarations: [AuthFormComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        }
    }
}