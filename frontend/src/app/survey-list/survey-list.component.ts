import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './survey-list.component.html',
  imports: [CommonModule],
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent implements OnInit {
  surveys: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSurveys();
  }

  loadSurveys() {
    this.studentService.getAllSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
      }
    });
  }

  deleteSurvey(id: number) {
    if (confirm('Are you sure you want to delete this survey?')) {
      this.studentService.deleteSurvey(id).subscribe({
        next: () => {
          this.loadSurveys();
        },
        error: (error) => {
          console.error('Error deleting survey:', error);
        }
      });
    }
  }

  editSurvey(id: number) {
    this.router.navigate(['/survey/edit', id]);
  }
}
