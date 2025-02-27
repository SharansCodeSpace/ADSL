import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="flex items-center justify-center bg-zinc-800 p-4 text-white">
      <div>
        <a routerLink="/students" class="mr-4 hover:underline">Students</a>
        <a routerLink="/instructors" class="mr-4 hover:underline">Instructors</a>
        <a routerLink="/courses" class="mr-4 hover:underline">Courses</a>
        <a routerLink="/departments" class="mr-4 hover:underline">Departments</a>
        <a routerLink="/classrooms" class="mr-4 hover:underline">Classrooms</a>
        <a routerLink="/advisors" class="mr-4 hover:underline">Advisors</a>
        <a routerLink="/prereqs" class="mr-4 hover:underline">Prerequisites</a>
        <a routerLink="/sections" class="mr-4 hover:underline">Sections</a>
        <a routerLink="/time-slots" class="mr-4 hover:underline">Time Slots</a>
        <a routerLink="/teaches" class="mr-4 hover:underline">Teaches</a>
        <a routerLink="/takes" class="mr-4 hover:underline">Takes</a>
      </div>
    </nav>
    <div class="p-4 !pt-12">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
