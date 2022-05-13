import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  sensor_repairs: any;

  constructor(private hs: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.hs.getSensorRepairs('202').subscribe(
      res => {
        // this.sensor_repairs = res['sensor_repairs']
        // console.log(res['sensor_repairs'])
      })
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
