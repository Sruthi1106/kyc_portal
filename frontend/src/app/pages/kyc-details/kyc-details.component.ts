import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-kyc-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-details.component.html',
  styleUrl: './kyc-details.component.scss'
})
export class KycDetailsComponent implements OnInit {
  kyc: any;
  reason = '';
  constructor(private route: ActivatedRoute, private admin: AdminService) {}
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.kyc = await this.admin.getUser(id);
  }
  async update(status: 'Approved'|'Rejected') {
    await this.admin.updateStatus(this.kyc._id, status, this.reason);
    this.kyc.status = status;
  }
}
