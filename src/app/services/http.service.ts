import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getEmployees(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employees/${id}`);
  }

  createEmployee(id: string, employee: string, address: string, education: string): Observable<any> {
    return this.http.post(`${environment.url}/employees/${id}`, {
      'employee': employee, 'address': address, 'education': education });
  }

  updateEmployee(id: string, employee: string, address: string, education: string): Observable<any> {
    return this.http.put(`${environment.url}/employees/${id}`, {
      'employee': employee, 'address': address, 'education': education });
  }

  getDrugs(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employees/${id}/drug-test-results/`);
  }

  createDrugs(id:string, employee: string, address: string, education: string): Observable<any> {
    return this.http.post(`${environment.url}/employees/${id}`, {
      'employee': employee, 'address': address, 'education': education });
  }

  updateDrugs(id: string, employee: string, address: string, education: string): Observable<any> {
    return this.http.put(`${environment.url}/employees/${id}`, {
      'employee': employee, 'address': address, 'education': education });
  }

  getEmployeeAccess(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employee-accesses/${id}`);
  }

  getEmployeeAccessRights(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employee-access-rights/${id}`);
  }
}
