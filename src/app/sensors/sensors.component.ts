import { DatePipe } from '@angular/common';
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

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router, private dp: DatePipe) {
    
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

  transformDate(date:any) {
    return this.dp.transform(date, 'MM-dd-yyyy'); 
  }

  onSubmit() {
    console.log(this.sensorForm.value);

    let sensor = {
      "sensorID": this.sensorForm.value['sensorID'],
      "doorID": this.sensorForm.value['doorID'],
      "sensor_type": this.sensorForm.value['sensor_type'],
      "date_installed": this.transformDate(this.sensorForm.value['date_installed'])
    }

    this.hs.createSensor(sensor).subscribe();
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }
}
