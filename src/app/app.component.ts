import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router, private hs: HttpService){}

  ngOnInit(): void {
      if(this.router.url.startsWith('')){
        if(this.hs.checkAuth()){
          console.log("SUCCESS")
        } else {
          this.router.navigate(['generate-id'], { replaceUrl: true });
        }
      } else {
        this.router.navigate(['generate-id'], { replaceUrl: true });
      }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/