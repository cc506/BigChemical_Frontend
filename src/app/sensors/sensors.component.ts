import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  sensors: any;

  constructor(private hs: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.hs.getSensors().subscribe(
      res =>
        this.sensors = res['sensors']
    )
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
