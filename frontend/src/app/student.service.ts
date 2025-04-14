import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) { }

  createSurvey(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getAllSurveys(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  updateSurvey(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSurveyById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }
}
