import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { Store } from '../store';

// feature module
import { AuthModule } from 'src/auth/auth.module';
import { HealthModule } from 'src/health/health.module';


//components
import { HeaderComponent } from './components/app-header/app-header.component';
import { NavComponent } from './components/app-nav/app-nav.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HealthModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
