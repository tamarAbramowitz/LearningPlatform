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
  
  selectedCategoryId: string = '';
  selectedSubCategoryId: string = '';
  userPrompt: string = '';
  
  aiLesson: string = ''; 
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // כאן תוכלי לקרוא לסרוויס כדי לטעון את הקטגוריות הראשוניות ממונגו
  }

  generateLesson() {
    if (!this.userPrompt || !this.selectedSubCategoryId) {
      alert("אנא מלאי את כל השדות");
      return;
    }

    this.loading = true;
    this.aiLesson = ''; 

    this.apiService.generateLesson(
      this.selectedCategoryId, 
      this.selectedSubCategoryId, 
      this.userPrompt
    ).subscribe({
      next: (res) => {
        this.aiLesson = res.data.response; 
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה בשליחת הפרומפט:', err);
        this.loading = false;
      }
    });
  }

  onCategorySelect() {
    console.log('נבחרה קטגוריה:', this.selectedCategoryId);
    // כאן תוכלי לסנן את subCategories לפי הקטגוריה שנבחרה
  }
}