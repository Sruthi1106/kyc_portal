import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  profile: any = null;
  constructor(private auth: AuthService, private kyc: KycService) {}

  async ngOnInit() {
    this.profile = await this.kyc.getMyProfile();
  }

  logout() {
    this.auth.logout();
  }
}
