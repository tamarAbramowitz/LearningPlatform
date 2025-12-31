import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule
  ],
  templateUrl: './register.html'
})
export class Register {
  // התאמה למבנה ה-Backend: id, name, phone
  userData = {
    id: '',    // תעודת זהות (הופך ל-_id בשרת)
    name: '',
    phone: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    // בדיקה בסיסית לפני השליחה
    if (!this.userData.id || !this.userData.name || !this.userData.phone) {
      return;
    }

    // שליחה ל-ApiService
    this.api.register(this.userData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}