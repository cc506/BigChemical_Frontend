import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  employeeForm!: FormGroup;
  educationForm!: FormGroup;
  public isAddMode!: boolean;

  employee: any;
  education: any;
  drug: any;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.isAddMode = false;
    console.log(this.isAddMode)
    this.initForms()
    this.initTables()
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

  initTables(){
     this.hs.getEmployees(this.hs.getEmployeeID()).subscribe((res) =>{
        this.employee = res['employee_info']
        this.education = res['employee_education']
     })
     this.hs.getDrugs(this.hs.getEmployeeID()).subscribe(
      res =>
        this.drug = res['drug_test_results']
    )
  }

  initForms(){
    this.employeeForm= this.fb.group({
      employeeID: [this.hs.getEmployeeID()],
      name: [null, [Validators.required, Validators.minLength(10)]],
      taxpayer_id: [null, [Validators.required, Validators.minLength(10)]],
      date_hired: [null, [Validators.required]],
      department: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      supervisor: [null, [Validators.required]],
    });

    this.educationForm = this.fb.group({
      education: this.fb.array([]),
    });

    if (!this.isAddMode) {
      this.hs.getEmployees(this.hs.getEmployeeID()).subscribe((res) =>{
        this.employeeForm.patchValue(res['employee_info']);
        this.educationForm.patchValue(res['employee_education']);
        console.log(this.isAddMode)
     })
  }
  }

  newEducation(): FormGroup{
    return this.fb.group({
      employeeID: [this.hs.getEmployeeID()],
      degree_name: [null],
      school_name: [null],
      startDate: [null],
      endDate: [null],
      GPA: [null]
    })
  }

  edu() : FormArray {

    return this.educationForm.get("education") as FormArray
  }

  addEdu() {

    this.edu().push(this.newEducation());
  }

  removeEdu(i:number) {

    this.edu().removeAt(i);
  }

  onSubmit() {
    console.log(this.educationForm.value, this.employeeForm.value);
    
    if (this.isAddMode) {
      this.hs.createEmployee(this.hs.getEmployeeID(),this.educationForm.value, this.employeeForm.value).subscribe();
  } else {
      this.hs.updateEmployee(this.hs.getEmployeeID(),this.educationForm.value, this.employeeForm.value).subscribe();
  }

   
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/