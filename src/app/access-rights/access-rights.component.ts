import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-access-rights',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.css']
})
export class AccessRightsComponent implements OnInit {
  show = true; // example: https://angular.io/api/common/NgIf

  data: any = {};
  access_rights: Array<any> = [];
  employee: any;
  buildings: any;


  constructor(private hs: HttpService, private router: Router) { 
    this.hs.getEmployeeAccessRights(this.hs.getEmployeeID()).subscribe(
      data => {
        this.data = data;
        this.access_rights = this.data.access_rights;
        this.employee = this.access_rights[0];
        console.log(this.data); 
        
        this.buildings = [... new Set(this.access_rights.map(item => item.buildingID))];
        console.log(this.buildings);
      }
    );
  }
  
  ngOnInit(): void {
  }

  goToLoginPage(){
    this.hs.removeEmployeeID();
    this.router.navigate(['generate-id'], { replaceUrl: true });
  }

}
