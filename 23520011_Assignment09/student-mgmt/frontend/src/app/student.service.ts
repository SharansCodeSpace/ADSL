import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  addStudent(studentData: Omit<Student, 'student_id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, studentData);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  updateStudent(studentId: string, studentData: Partial<Omit<Student, 'student_id'>>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${studentId}`, studentData);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${studentId}`);
  }
}