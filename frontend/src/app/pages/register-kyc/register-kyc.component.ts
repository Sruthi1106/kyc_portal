import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KycService } from '../../services/kyc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-kyc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-kyc.component.html',
  styleUrl: './register-kyc.component.scss'
})
export class RegisterKycComponent {
  form: FormGroup;
  loading = false;
  files: Record<string, File | null> = { aadhaar: null, pan: null, photo: null };

  constructor(private fb: FormBuilder, private kyc: KycService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      aadhaar: [''],
      pan: [''],
      password: ['', Validators.required]
    });
  }

  onFile(event: Event, key: 'aadhaar' | 'pan' | 'photo') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.files[key] = input.files[0];
    }
  }

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    try {
      await this.kyc.submitKyc(this.form.value, this.files);
      this.form.reset();
      this.files = { aadhaar: null, pan: null, photo: null };
      alert('KYC submitted');
    } finally {
      this.loading = false;
    }
  }
}
