import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  sensorForm!: FormGroup;
  sensors: any;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.hs.getSensors().subscribe(
      res =>
        this.sensors = res['sensors']
    )

    this.sensorForm= this.fb.group({
      sensorID: [null, [Validators.required]],
      doorID: [null, [Validators.required]],
      sensor_type: [null, [Validators.required]],
      date_installed: [null, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.sensorForm.value);

    let sensor = {
      "sensorID": 1,
      "doorID": 0,
      "sensor_type": "string",
      "date_installed": "string"
    }

    this.hs.createSensor(sensor).subscribe();
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }
}
