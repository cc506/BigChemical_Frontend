import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {

  constructor(private hs: HttpService, private router: Router) { }
  data: any;
  sensor_activations: any;

  ngOnInit(): void {
    this.hs.getActivations().subscribe(
      data => {
        this.data = data;
        this.sensor_activations = this.data.sensor_activations;
        console.log(this.data);
      }
    )
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
