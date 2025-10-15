import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  q = '';
  constructor(private admin: AdminService) {}
  async ngOnInit() {
    this.users = await this.admin.getUsers();
  }
  filtered() {
    const q = this.q.toLowerCase();
    return this.users.filter(u => (u.name+u.email+u.status).toLowerCase().includes(q));
  }
  async updateStatus(id: string, status: 'Approved'|'Rejected') {
    await this.admin.updateStatus(id, status);
    this.users = this.users.map(u => u._id === id ? { ...u, status } : u);
  }
}
