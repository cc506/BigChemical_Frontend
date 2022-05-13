import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  data: any;
  employee_accesses: Array<any> = [];
  office_info: any;
  tracking_log: Array<any> = [];
  @Input()
  startDate: string = '01-01-2000';
  @Input()
  endDate: string = '12-31-2050';

  constructor(private hs: HttpService, private router: Router) { 
    this.hs.getEmployeeAccess(1, '04-11', '04-15').subscribe(
      data => {
        this.data = data;
        this.employee_accesses = this.data.accesses;
        this.office_info = this.data.office_info;
        for (let i = 0; i < this.employee_accesses.length; i++){
          if (this.employee_accesses[i].direction == 'in') {
            this.tracking_log.push({ // concat or push?
                  accesses_index    : i,
                  time_in           : this.employee_accesses[i].time,
                  location          : this.employee_accesses[i].building + ' ' + 
                                        this.employee_accesses[i].roomID,
                  time_out          : '',
                  door              : this.employee_accesses[i].doorID
            });
          }
          else { // access direction is 'out'
            // back track to other employee_accesses within the same day
            let j = i - 1;
            let found_match = false;
            while (j >= 0 && !found_match &&
                  this.employee_accesses[j].date == this.employee_accesses[i].date) {
              // check that access direction is 'in' and to the same room
              // to edit 'time-out'
              if (this.employee_accesses[j].direction == 'in' &&
                    this.employee_accesses[j].roomID == this.employee_accesses[i].roomID) {
                // find 'in' in tracking log
                let in_index = this.tracking_log.findIndex(access => access.accesses_index == j);
                this.tracking_log[in_index].time_out = this.employee_accesses[i].time;
                found_match = true;
              }
              j--;
            }
            // can't find employee 'in', must be error 
            if (!found_match) {
              this.tracking_log.concat({
                'index'    : i,
                'time_in': '',
                'Location': this.employee_accesses[i].building + ' ' +
                    this.employee_accesses[i].roomID,
                'time_out': this.employee_accesses[i].time,
                'Door': this.employee_accesses[i].doorID
              });
            }
          }
        }
        console.log(this.data);
      }
    )
  }

  ngOnInit(): void {
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
