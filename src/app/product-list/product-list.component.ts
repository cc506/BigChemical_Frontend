import { Component, OnInit, SimpleChanges } from '@angular/core';
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

  employeeForm1!: FormGroup;
  educationForm1!: FormGroup;
  drugForm1!: FormGroup;

  employee: any;
  education: any;
  drug: any;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router, private dp: DatePipe) {
    
  }

  ngOnInit(): void {
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
      name: [null, [Validators.required]],
      title: "string",
      department: [null, [Validators.required]],
      taxpayer_id: [null, [Validators.required]],
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


    this.employeeForm1= this.fb.group({
      employeeID: [null],
      supervisorID: [null],
      name: [null, [Validators.required]],
      title: "string",
      department: [null, [Validators.required]],
      taxpayer_id: [null, [Validators.required]],
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

    this.educationForm1 = this.fb.group({
      school_name: '',
      degree_name: '',
      GPA: '',
    });

    this.drugForm1 = this.fb.group({
      employeeID: [{value: this.employeeForm.value['employeeID'], disabled: true }, [Validators.required]],
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

  deleteAccount(): void {
    alert(`Are you sure you want to delete employeeID ${this.hs.getEmployeeID()} ?`)

    this.hs.deleteEmployee(this.hs.getEmployeeID()).subscribe()
    this.hs.removeEmployeeID()
    this.router.navigate(['generate-id'], { replaceUrl: true });
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
        "supervisorID": 21,
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
      console.log(employee)
    
      this.hs.createDrugs(employee['employeeID'], medicine).subscribe();
      this.hs.createEmployee(employee, addr, edu).subscribe();
  }

  onUpdate(){

    let employee = {
      "employeeID": this.employeeForm1.value['employeeID'],
      "supervisorID": 21,
      "name": this.employeeForm1.value['name'],
      "title": "Checmical Engineer",
      "department": this.employeeForm1.value['department'],
      "taxpayer_id": 5,
      "securityClearance": "3",
      "date_hired": "05-13-22",
      "phone": this.employeeForm1.value['phone'],
      "dob": "04-30-1972",
      "deleted": true
    }
  
    let addr = {
      address: "123 Alton Drive",
      city: "Fullerton",
      state: "CA",
      zip: "92831",
    }
  
    let edu = {
      
      "degrees": [{
        "school_name": "UC Irvine",
        "startDate": "05-01-2022",
        "endDate": "05-30-2022",
        "degree_name": "MS Chemical Engineering",
        "GPA": 3.5
        }
      ]
  }
  
    let medicine = {
      "employeeID": '3',
      "date": "5-13-2022",
      "lab_used": 'THE LAB',
      "test_used": "COVID PCR TEST",
      "labTestID": "54",
      "results": "1",
      "comments": "Tested Positive",
    }

    this.hs.updateDrugs(employee['employeeID'], medicine['labTestID'], medicine).subscribe()
    this.hs.updateEmployee(employee['employeeID'], employee, addr, edu).subscribe()
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/