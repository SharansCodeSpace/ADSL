import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditStudentComponent implements OnInit {
  studentId: string | null = null;
  currentStudent: Partial<Omit<Student, 'student_id'>> = { age: null!, department: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      if (this.studentId) {
        // For simplicity, we are not fetching the full student details for editing in this basic example.
        // In a real application, you would fetch the student data based on the ID.
      }
    });
  }

  updateStudent(): void {
    if (this.studentId) {
      this.studentService.updateStudent(this.studentId, this.currentStudent).subscribe({
        next: () => {
          this.successMessage = 'Student updated successfully!';
          this.errorMessage = '';
          this.router.navigate(['/students']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update student.';
          this.successMessage = '';
          console.error('Error updating student', error);
        },
      });
    }
  }
}