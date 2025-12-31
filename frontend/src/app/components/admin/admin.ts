import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatToolbarModule, MatButtonModule, MatIcon, RouterLink, MatPaginatorModule],
  templateUrl: './admin.html'
})
export class Admin implements OnInit {
  allUsers: any[] = [];
  allHistory: any[] = [];
  totalUsers: number = 0;
  totalHistory: number = 0;
  userPageSize: number = 10;
  historyPageSize: number = 10;
  userPageIndex: number = 0;
  historyPageIndex: number = 0;

  userColumns: string[] = ['name', 'phone', 'role', 'actions'];
  historyColumns: string[] = ['userName', 'date', 'prompt', 'view'];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadUsers();
    this.loadGlobalHistory();
  }

  loadUsers(page: number = 1, limit: number = 10) {
    this.api.getAllUsers(page, limit).subscribe({
      next: (res: any) => {
        this.allUsers = res.data || [];
        this.totalUsers = res.total || 0;
        console.log('Users loaded:', this.allUsers);
      },
      error: (err) => console.error('Error loading users', err)
    });
  }

  loadGlobalHistory(page: number = 1, limit: number = 10) {
    this.api.getAllHistory(page, limit).subscribe({
      next: (res: any) => {
        this.allHistory = res.data || [];
        this.totalHistory = res.total || 0;
        console.log('History loaded:', this.allHistory);
      },
      error: (err) => console.error('Error loading history', err)
    });
  }

  onUserPageChange(event: PageEvent) {
    this.userPageIndex = event.pageIndex;
    this.userPageSize = event.pageSize;
    this.loadUsers(event.pageIndex + 1, event.pageSize);
  }

  onHistoryPageChange(event: PageEvent) {
    this.historyPageIndex = event.pageIndex;
    this.historyPageSize = event.pageSize;
    this.loadGlobalHistory(event.pageIndex + 1, event.pageSize);
  }

  viewHistory(userId: string) {
    this.allHistory = this.allHistory.filter(entry =>
      (entry.user_id?._id || entry.user_id) === userId
    );
    console.log('מסנן היסטוריה למשתמש:', userId);
  }

  resetView() {
    this.loadGlobalHistory();
  }
}