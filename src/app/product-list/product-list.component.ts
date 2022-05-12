import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  employeeForm!: FormGroup;
  educationForm!: FormGroup;

  constructor(private fb: FormBuilder, private hs: HttpService) {
    
  }

  

  ngOnInit(): void {
    //  this.hs.getEmployees().subscribe((res) =>{
    //     console.log(res)
    //  })
    this.initForms()
  }

  initForms(){
    this.employeeForm= this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(10)]],
      lastname: [null, [Validators.required, Validators.minLength(10)]],
      hired: [null, [Validators.required]],
      address: [null],
      country: [null],
      gender: [null],
    });

    this.educationForm = this.fb.group({
      education: this.fb.array([]),
    });
  }

  newEducation(): FormGroup{
    return this.fb.group({
      schoolName: [null],
      start: [null],
      end: [null],
      degree: [null],
      gpa: [null]
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
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/