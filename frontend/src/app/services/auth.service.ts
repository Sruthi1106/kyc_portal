import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    const res: any = await firstValueFrom(this.http.post(`${this.API}/login`, { email, password }));
    this.storeAuth(res);
    return res;
  }

  async adminLogin(email: string, password: string) {
    const res: any = await firstValueFrom(this.http.post(`${this.API}/admin/login`, { email, password }));
    this.storeAuth(res, 'admin');
    return res;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  private storeAuth(res: any, role?: string) {
    if (res?.token) localStorage.setItem('token', res.token);
    if (res?.role || role) localStorage.setItem('role', res.role || role);
  }
}
