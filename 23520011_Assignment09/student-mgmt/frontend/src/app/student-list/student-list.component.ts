import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  age: number;
  department: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  errorMessage: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students.';
        console.error('Error loading students', error);
      },
    });
  }

  deleteStudent(studentId: string): void {
    this.studentService.deleteStudent(studentId).subscribe({
      next: () => {
        this.loadStudents(); // Reload the student list after deletion
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete student.';
        console.error('Error deleting student', error);
      },
    });
  }
}