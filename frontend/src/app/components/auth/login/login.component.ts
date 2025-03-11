import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Login to SonoSmart</h2>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [ngClass]="{'invalid': submitted && f['email'].errors}"
            >
            <div *ngIf="submitted && f['email'].errors" class="error-text">
              <span *ngIf="f['email'].errors['required']">Email is required</span>
              <span *ngIf="f['email'].errors['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-control"
              [ngClass]="{'invalid': submitted && f['password'].errors}"
            >
            <div *ngIf="submitted && f['password'].errors" class="error-text">
              <span *ngIf="f['password'].errors['required']">Password is required</span>
              <span *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-group remember-me">
            <label class="checkbox-label">
              <input
                type="checkbox"
                formControlName="rememberMe"
              >
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            <span *ngIf="loading">Logging in...</span>
            <span *ngIf="!loading">Login</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Register</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 240px);
      padding: 1rem;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--surface-1) 100%);
    }

    .auth-card {
      background: var(--surface-1);
      border-radius: 24px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
      width: 100%;
      max-width: 600px;
      padding: 2.5rem;
      transform: translateY(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    @media (max-width: 640px) {
      .auth-card {
        padding: 1.5rem;
      }

      .form-group {
        gap: 0.5rem;
      }
    }

    .auth-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    }

    .auth-title {
      font-size: 2.25rem;
      color: var(--primary-color);
      margin-bottom: 2.5rem;
      text-align: center;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      position: relative;
    }

    label {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }

    .form-control {
      padding: 1rem 1.25rem;
      border: 2px solid var(--border-color);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: var(--surface-2);
    }

    .form-control:focus {
      border-color: var(--primary-color);
      outline: none;
      background: var(--surface-1);
      box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
    }

    .form-control.invalid {
      border-color: var(--error-color);
      background: rgba(var(--error-rgb), 0.05);
    }

    .error-text {
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0;
      transform: translateY(-10px);
      animation: slideDown 0.3s ease forwards;
    }

    @keyframes slideDown {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-message {
      background-color: rgba(var(--error-rgb), 0.1);
      color: var(--error-color);
      padding: 1rem 1.25rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      text-align: center;
      border: 1px solid rgba(var(--error-rgb), 0.2);
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .btn-primary {
      background-color: var(--primary-color);
      color: var(--text-on-primary);
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
      position: relative;
      overflow: hidden;
    }

    .btn-primary:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.25);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .btn-primary:disabled {
      background-color: var(--disabled-color);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .auth-footer {
      margin-top: 2.5rem;
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .auth-footer a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      position: relative;
    }

    .auth-footer a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: var(--primary-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .auth-footer a:hover::after {
      transform: scaleX(1);
    }

    .remember-me {
      flex-direction: row !important;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 2rem;
      }

      .auth-title {
        font-size: 2rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
