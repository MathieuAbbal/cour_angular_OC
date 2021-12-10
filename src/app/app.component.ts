import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OCbooks';
  constructor() {
   const firebaseConfig = {
      apiKey: "AIzaSyDimDzK448nN4mlpe6bhFdlDl6NRn6QPGw",
      authDomain: "my-project-ocbooks.firebaseapp.com",
      projectId: "my-project-ocbooks",
      storageBucket: "my-project-ocbooks.appspot.com",
      messagingSenderId: "432821653758",
      appId: "1:432821653758:web:1cd5063d3cc42c99a395af",
      measurementId: "G-6E6DMPRJ9G"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app)
    const analytics = getAnalytics(app);
  }
}
