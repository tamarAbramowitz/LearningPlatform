import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // מומלץ להוסיף בשביל הצגת הודעות שגיאה

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  // המשתנים המחוברים ל-ngModel ב-HTML
  name: string = '';
  phone: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  onRegister() {
    const userData = {
      name: this.name,
      phone: this.phone
    };

    console.log('מנסה להירשם עם הנתונים:', userData);

    this.apiService.register(userData).subscribe({
      next: (res: any) => {
        console.log('התשובה המלאה מהשרת:', res); 

        const user = res.data || res;

        if (user && (user._id || user.id)) {
          localStorage.setItem('userId', user._id || user.id);
          localStorage.setItem('userName', user.name);

          console.log('הרישום הצליח, מנווט ל-dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          console.warn('השרת החזיר תשובה מוצלחת אבל ללא מזהה משתמש (ID)');
        }
      },
      error: (err: any) => {
        console.error('שגיאה בתהליך הרישום:', err);
      }
    });
  }
}