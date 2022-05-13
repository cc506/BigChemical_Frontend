import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  employeeForm!: FormGroup;
  educationForm!: FormGroup;
  drugForm!: FormGroup;
  public isAddMode!: boolean;

  employee: any;
  education: any;
  drug: any;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router, private dp: DatePipe) {
    
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
      employeeID: [null],
      supervisorID: [null],
      name: [null, [Validators.required, Validators.minLength(10)]],
      title: "string",
      department: [null, [Validators.required]],
      taxpayer_id: [null, [Validators.required, Validators.minLength(10)]],
      securityClearance: "string",
      date_hired: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      dob: "string",
      deleted: true,
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]]
    });

    this.educationForm = this.fb.group({
      degrees: this.fb.array([]),
    });

    this.drugForm = this.fb.group({
      employeeID: [this.employeeForm.value['employeeID']],
      date: [null, [Validators.required]],
      lab_used: [null, [Validators.required]],
      test_used: [null, [Validators.required]],
      labTestID: [null, [Validators.required]],
      results: [null, [Validators.required]],
      comments: [null, [Validators.required]],
    });

    // if (!this.isAddMode) {
    //   this.hs.getEmployees(this.hs.getEmployeeID()).subscribe((res) =>{
    //     this.employeeForm.patchValue(res['employee_info']);
    //     this.educationForm.patchValue(res['employee_education']);
    //     console.log(this.isAddMode)
    //  })
    // }
  }

  newEducation(): FormGroup{
    return this.fb.group({
      employeeID: [this.employeeForm.value['employeeID']],
      degree_name: [null],
      school_name: [null],
      startDate: [null],
      endDate: [null],
      GPA: [null]
    })
  }

  edu() : FormArray {

    return this.educationForm.get("degrees") as FormArray
  }

  addEdu() {

    this.edu().push(this.newEducation());
  }

  removeEdu(i:number) {

    this.edu().removeAt(i);
  }

  transformDate(date:any) {
    return this.dp.transform(date, 'MM-dd-yyyy'); 
  }

  onSubmit() {
    console.log(this.educationForm.value);
    //console.log(this.transformDate("2022-05-13T07:00:00.000Z"))

      let employee = {
        "employeeID": this.employeeForm.value['employeeID'],
        "supervisorID": 0,
        "name": this.employeeForm.value['name'],
        "title": "Checmical Engineer",
        "department": this.employeeForm.value['department'],
        "taxpayer_id": 5,
        "securityClearance": "3",
        "date_hired": this.transformDate(this.employeeForm.value['date_hired']),
        "phone": this.employeeForm.value['phone'],
        "dob": "04-30-1972",
        "deleted": true
      }

      let addr = {
        address: "123 Alton Drive",
        city: "Fullerton",
        state: "CA",
        zip: "92831",
      }

      let edu = this.educationForm.value

      // let edu = [
      //   {
      //     "school_name": "CSU Fullerton",
      //     "startDate": "05-01-2022",
      //     "endDate": "05-30-2022",
      //     "degree_name": "MS Chemical Engineering",
      //     "GPA": 3.5
      //   }
      // ]

      let medicine = {
        "employeeID": this.employeeForm.value['employeeID'],
        "date": this.transformDate(this.drugForm.value['date']),
        "lab_used": this.drugForm.value['lab_used'],
        "test_used": this.drugForm.value['test_used'],
        "labTestID": this.drugForm.value['labTestID'],
        "results": this.drugForm.value['results'],
        "comments": this.drugForm.value['comments'],
      }
      

      console.log(medicine)
      console.log(employee['employeeID'])
    
      this.hs.createDrugs(employee['employeeID'], medicine).subscribe();
      this.hs.createEmployee(employee['employeeID'], employee, addr, edu).subscribe();

   
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/