import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  setEmployeeID(id: string){
    localStorage.setItem("employeeID", id)
  }

  getEmployeeID(): any{
    return localStorage.getItem("employeeID")
  }

  removeEmployeeID(){
    localStorage.removeItem("employeeID")
  }

  checkAuth(): Boolean{
    if(this.getEmployeeID()){
      return true;
    } else {
      return false;
    }
  }


  getEmployees(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employees/${id}`);
  }

  createEmployee(id: number, employee: any, address: any,  education: any): Observable<any> {
    return this.http.post(`${environment.url}/employees/${id}`, {
      'employee': employee,  'address': address, 'education': education });
  }

  updateEmployee(id: string, employee: string, education: string): Observable<any> {
    return this.http.put(`${environment.url}/employees/${id}`, {
      'employee': employee, 'education': education });
  }

  getDrugs(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employees/${id}/drug-test-results/`);
  }

  createDrugs(id:string, drugForm: any): Observable<any> {
    return this.http.post(`${environment.url}/employees/${id}/drug-test-results`, drugForm);
  }

  updateDrugs(id: string, employee: string, address: string, education: string): Observable<any> {
    return this.http.put(`${environment.url}/employees/${id}`, {
      'employee': employee, 'address': address, 'education': education });
  }

  getSensors(): Observable<any> {
    return this.http.get(`${environment.url}/sensors`);
  }

  createSensor(sensorForm: any): Observable<any> {
    return this.http.post(`${environment.url}/sensors`, sensorForm)
  }

  getSensorRepairs(id: string){
    return this.http.get(`${environment.url}/sensor-repairs/${id}`);
  }

  createSensorRepair(sensorForm: any): Observable<any> {
    return this.http.post(`${environment.url}/sensor-repairs`,  sensorForm)
  }

  getEmployeeAccess(id: number, startDate: string, endDate: string): Observable<any> {
    let url = `${environment.url}/tracking-log/`+ `${id}` + '?startDate=' + `${startDate}` + '&endDate=' + `${endDate}`
    return this.http.get(url);
  }

  getActivations(): Observable<any> {
    return this.http.get(`${environment.url}/sensor-activations`);
  }

  getEmployeeAccessRights(id: string): Observable<any> {
    return this.http.get(`${environment.url}/employee-access-rights/${id}`);
  }
}
