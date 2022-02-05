import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "app-nav.component.html",
    styleUrls: ["app-nav.component.scss"]
})

export class NavComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}