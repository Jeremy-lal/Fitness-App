import { User } from './../../../auth/shared/services/auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "app-header.component.html",
    styleUrls: ["app-header.component.scss"]
})

export class HeaderComponent {
    @Input() user: User | null;
    @Output() logout = new EventEmitter<any>()

    logoutUser() {
        this.logout.emit();
    }
}