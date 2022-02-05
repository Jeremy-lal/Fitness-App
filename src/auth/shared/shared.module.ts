import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from './containers/auth-form/auth-form.component'
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [AuthFormComponent],
    declarations: [AuthFormComponent]
})

export class SharedModule { }