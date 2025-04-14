import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'survey', component: SurveyFormComponent },
  { path: 'survey/edit/:id', component: SurveyFormComponent },
  { path: 'surveys', component: SurveyListComponent },
];