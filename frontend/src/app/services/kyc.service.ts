import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private readonly API = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  async submitKyc(data: any, files: Record<string, File | null>) {
    const form = new FormData();
    for (const key of Object.keys(data)) form.append(key, data[key]);
    if (files['aadhaar']) form.append('aadhaar', files['aadhaar'] as Blob);
    if (files['pan']) form.append('pan', files['pan'] as Blob);
    if (files['photo']) form.append('photo', files['photo'] as Blob);
    const res = await firstValueFrom(this.http.post(`${this.API}/register`, form));
    return res;
  }

  async getMyProfile() {
    return await firstValueFrom(this.http.get(`${this.API}/me`));
  }
}
