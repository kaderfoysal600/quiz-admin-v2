import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}




  onLogin(data: any) {
    return this.http.post('http://localhost:3000/api/v1/login', data);
  }

  getProtectedData(): Observable<any> {
    const token = sessionStorage.getItem('token'); // Get token from session storage

    if (!token) {
      console.error('No token found');
      this.router.navigate(['/auth/login']);
      return new Observable();
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/api/protected-route', {
      headers,
    });
  }



  //divisions

  addDivisions(data: any) {
    return this.http.post('http://localhost:3000/api/v1/category', data);
  }

  getAllTask() {
    return this.http.get('http://localhost:3000/api/v1/category',);
  }

  updateDivisionById(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updateDivision/' + id,
      data
    );
  }
  deleteDivision(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteDivision/' + id);
  }

  
}
