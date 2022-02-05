import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Store } from '../store';

// feature module
import { AuthModule } from 'src/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }

// <script type="module">
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAstOOd6_TOR1rrjNR6YerQkajHDBFz23w",
//     authDomain: "fitness-app-1c08f.firebaseapp.com",
//     databaseURL: "https://fitness-app-1c08f-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "fitness-app-1c08f",
//     storageBucket: "fitness-app-1c08f.appspot.com",
//     messagingSenderId: "688390771356",
//     appId: "1:688390771356:web:8d53f6f33d46bfd7199359",
//     measurementId: "G-0MCTTCBVHZ"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// </script>