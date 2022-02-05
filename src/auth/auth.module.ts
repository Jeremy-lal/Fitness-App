import { SharedModule } from './shared/shared.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// third-party modules

import { AngularFireModule, FirebaseApp } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
        ]
    }
]

export const firebaseConfig = {
    apiKey: "AIzaSyAstOOd6_TOR1rrjNR6YerQkajHDBFz23w",
    authDomain: "fitness-app-1c08f.firebaseapp.com",
    databaseURL: "https://fitness-app-1c08f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitness-app-1c08f",
    storageBucket: "fitness-app-1c08f.appspot.com",
    messagingSenderId: "688390771356",
    appId: "1:688390771356:web:8d53f6f33d46bfd7199359",
    measurementId: "G-0MCTTCBVHZ"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ],
})

export class AuthModule { }

