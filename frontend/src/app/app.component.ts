import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sono Smart';
  backendMessage = 'Connecting to backend...';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHealthStatus().subscribe({
      next: (response) => {
        this.backendMessage = response.message || 'Connected to backend';
      },
      error: (error) => {
        this.backendMessage = 'Error connecting to backend: ' + (error.message || 'Unknown error');
        console.error('Backend connection error:', error);
      }
    });
  }
}
