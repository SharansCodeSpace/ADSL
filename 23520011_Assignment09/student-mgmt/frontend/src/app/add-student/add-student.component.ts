import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  first_name: string;
  last_name: string;
  age: number;
  department: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  imports: [CommonModule, FormsModule], // Add FormsModule to the imports array
})
export class AddStudentComponent {
  newStudent: Student = { first_name: '', last_name: '', age: null!, department: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private studentService: StudentService, private router: Router) {}

  addStudent(): void {
    this.studentService.addStudent(this.newStudent).subscribe({
      next: (response) => {
        this.successMessage = 'Student added successfully!';
        this.errorMessage = '';
        // Optionally, navigate back to the student list after adding
        this.router.navigate(['/students']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to add student.';
        this.successMessage = '';
        console.error('Error adding student', error);
      },
    });
  }
}