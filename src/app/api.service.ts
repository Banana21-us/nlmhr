import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/'; // Laravel API URL
  
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  // Fetch users from Laravel API
  login(data:any){
    return this.http.post(this.apiUrl + 'login',data);
  }
  logout(): Observable<any> {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.apiUrl + 'logout', {}, { headers });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}users`);
  }
  postusers(userData:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'regusers',userData)
  }
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employees');
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}employees/${id}`);
  }


  createLeaveType(leaveData:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'leave-types',leaveData)
  }
  getleave(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'leave-types');
  }
  deleteleave(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}leave-types/${id}`);
  }
}