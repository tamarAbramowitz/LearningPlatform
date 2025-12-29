import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../../services/api'; 

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  
  selectedCategoryName: string = '';
  selectedSubCategoryName: string = '';
  userPrompt: string = '';
  
  aiLesson: string = ''; 
  loading: boolean = false;

  constructor(private apiService: ApiService) {}
  

  ngOnInit() {
  this.apiService.getAllCategories().subscribe({ // ודאי שכתוב getAll ולא get
    next: (res) => this.categories = res.data,
    error: (err) => console.error('שגיאה בטעינת קטגוריות', err)
  });
}
  generateLesson() {
    if (!this.userPrompt || !this.selectedSubCategoryName) {
      alert("אנא מלאי את כל השדות");
      return;
    }

    this.loading = true;
    this.aiLesson = ''; 

    this.apiService.generateLesson(
      this.selectedCategoryName, 
      this.selectedSubCategoryName, 
      this.userPrompt
    ).subscribe({
      next: (res) => {
        this.aiLesson = res.data.response; 
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה ביצירת השיעור:', err);
        this.loading = false;
        alert('קרתה שגיאה בחיבור לשרת');
      }
    });
  }
}