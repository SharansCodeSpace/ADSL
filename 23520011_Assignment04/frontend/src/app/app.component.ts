import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 text-white">
      <a routerLink="/login" class="mr-4 hover:underline">Login</a>
      <a routerLink="/dashboard" class="mr-4 hover:underline">Dashboard</a>
      <a routerLink="/question-bank" class="mr-4 hover:underline">Question Bank</a>
      <a routerLink="/test-creation" class="mr-4 hover:underline">Create Test</a>
      <a routerLink="/test-administration" class="mr-4 hover:underline">Take Test</a>
      <a routerLink="/report" class="mr-4 hover:underline">Reports</a>
    </nav>
    <div class="p-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
