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
  repairForm!: FormGroup
  sensor_ID: any

  ngOnInit(): void {
      this.repairForm= this.fb.group({
        sensorID: [null, [Validators.required]],
        technicianID: [null, [Validators.required]],
        dateDown: [null, [Validators.required]],
        dateRestored: [null, [Validators.required]],
        cause: [null, [Validators.required]],
        repair: [null, [Validators.required]],
      });
  }

  searchRepair(id: any){
    console.log(id)
    this.hs.getSensorRepairs(id).subscribe(
      data => {
        // console.log(data);
        this.data = data;
        this.sensor_repairs = this.data.sensor_repairs;
        console.log(this.data);
      });
  }

  onSubmit() {
    console.log(this.repairForm.value);

    this.hs.createSensorRepair(this.repairForm.value)
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
