import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { Store } from '../store';

// feature module
import { AuthModule } from 'src/auth/auth.module';
import { HealthModule } from 'src/health/heals.module';


//components
import { HeaderComponent } from './components/app-header/app-header.component';
import { NavComponent } from './components/app-nav/app-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
