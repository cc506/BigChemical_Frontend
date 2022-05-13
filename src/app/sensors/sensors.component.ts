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
  employeeForm!: FormGroup;
  sensors: any;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.hs.getSensors().subscribe(
      res =>
        this.sensors = res['sensors']
    )

    this.employeeForm= this.fb.group({
      sensorID: [this.hs.getEmployeeID()],
      doorID: [null, [Validators.required, Validators.minLength(10)]],
      sensor_type: [null, [Validators.required, Validators.minLength(10)]],
      date_installed: [null, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }
}
