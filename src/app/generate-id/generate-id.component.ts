import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-generate-id',
  templateUrl: './generate-id.component.html',
  styleUrls: ['./generate-id.component.css']
})
export class GenerateIdComponent implements OnInit {
  signin!: FormGroup;

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.signin = this.fb.group({
      employee_id: [null, [Validators.required]]
    });
  }

  employeeID(id: string){
    this.hs.getEmployees(id).subscribe((res) =>{
      console.log(res['employee_info'])
      if(res['employee_info'] === null){
        alert(`EmployeeID ${id} does not exist. Please Try Again`)
      } else {
        this.hs.setEmployeeID(id);
        this.router.navigateByUrl('/home');
      }
    }, (err) => {
      alert('Error sending login request. Please try again.')
    });
  }

  onSignIn(form_data: any){
    const id = form_data.employee_id;
    console.log(form_data.employee_id)
    if(id === ''){
      alert('Missing EmployeeID. Please Try Again')
    } else {
      this.employeeID(id);
    }
  }
}
