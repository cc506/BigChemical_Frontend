import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';;

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  data: any;
  sensor_repairs: any;

  constructor(private hs: HttpService, private router: Router, private fb: FormBuilder) { }
  employeeForm!: FormGroup

  ngOnInit(): void {
    this.hs.getSensorRepairs('202').subscribe(
      data => {
        // console.log(data);
        this.data = data;
        this.sensor_repairs = this.data.sensor_repairs;
        console.log(this.data);
      }
    );

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
