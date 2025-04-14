// survey-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css'
})
export class SurveyFormComponent implements OnInit {
  surveyForm!: FormGroup;
  isEditMode = false;
  surveyId?: number;
  likedMostOptions = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
  interestOptions = ['Friends', 'Television', 'Internet', 'Other'];
  recommendationOptions = ['Very Likely', 'Likely', 'Unlikely'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    
    // Check if we're in edit mode by looking for an ID parameter
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.surveyId = +params['id'];
        this.loadSurveyData();
      }
    });
  }

  initializeForm() {
    this.surveyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      surveyDate: ['', Validators.required],
      likedMost: this.fb.array([]),
      interestSource: ['', Validators.required],
      recommendationLikelihood: ['', Validators.required],
      comments: ['']
    });
  }

  loadSurveyData() {
    if (this.surveyId) {
      this.studentService.getSurveyById(this.surveyId).subscribe({
        next: (survey) => {
          // Reset the form with existing values
          const likedMostArray = this.surveyForm.get('likedMost') as FormArray;
          
          // Clear existing array
          while (likedMostArray.length) {
            likedMostArray.removeAt(0);
          }
          
          // Add existing selections
          if (Array.isArray(survey.likedMost)) {
            survey.likedMost.forEach(item => {
              likedMostArray.push(this.fb.control(item));
            });
          }

          // Update form with survey data
          this.surveyForm.patchValue({
            firstName: survey.firstName,
            lastName: survey.lastName,
            streetAddress: survey.streetAddress,
            city: survey.city,
            state: survey.state,
            zip: survey.zip,
            telephone: survey.telephone,
            email: survey.email,
            surveyDate: survey.surveyDate,
            interestSource: survey.interestSource,
            recommendationLikelihood: survey.recommendationLikelihood,
            comments: survey.comments
          });
        },
        error: (error) => {
          console.error('Error loading survey:', error);
          this.router.navigate(['/surveys']);
        }
      });
    }
  }

  // Helper method to check if an option is selected
  isLikedMostSelected(option: string): boolean {
    const likedMostArray = this.surveyForm.get('likedMost') as FormArray;
    return likedMostArray.controls.some(control => control.value === option);
  }

  onLikedMostChange(event: any, option: string) {
    const likedMostArray = this.surveyForm.get('likedMost') as FormArray;
    if (event.target.checked) {
      likedMostArray.push(this.fb.control(option));
    } else {
      const index = likedMostArray.controls.findIndex(x => x.value === option);
      if (index >= 0) {
        likedMostArray.removeAt(index);
      }
    }
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      const surveyData = this.surveyForm.value;
      
      if (this.isEditMode && this.surveyId) {
        // Update existing survey
        this.studentService.updateSurvey(this.surveyId, surveyData).subscribe({
          next: () => {
            this.router.navigate(['/surveys']);
          },
          error: (error) => {
            console.error('Error updating survey:', error);
          }
        });
      } else {
        // Create new survey
        this.studentService.createSurvey(surveyData).subscribe({
          next: () => {
            this.router.navigate(['/surveys']);
          },
          error: (error) => {
            console.error('Error creating survey:', error);
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/surveys']);
  }
}