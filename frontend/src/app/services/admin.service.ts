import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  async getUsers() {
    return await firstValueFrom(this.http.get<any[]>(`${this.API}/users`));
  }

  async getUser(id: string) {
    return await firstValueFrom(this.http.get(`${this.API}/user/${id}`));
  }

  async updateStatus(id: string, status: 'Approved'|'Rejected', reason?: string) {
    return await firstValueFrom(this.http.put(`${this.API}/user/${id}/status`, { status, reason }));
  }
}
