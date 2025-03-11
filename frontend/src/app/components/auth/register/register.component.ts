import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Create an Account</h2>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                formControlName="firstName"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['firstName'].errors}"
              >
              <div *ngIf="submitted && f['firstName'].errors" class="error-text">
                <span *ngIf="f['firstName'].errors['required']">First name is required</span>
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                formControlName="lastName"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['lastName'].errors}"
              >
              <div *ngIf="submitted && f['lastName'].errors" class="error-text">
                <span *ngIf="f['lastName'].errors['required']">Last name is required</span>
              </div>
            </div>

            <div class="form-group full-width">
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

            <div class="form-group full-width">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['password'].errors}"
              >
              <div class="password-strength" *ngIf="f['password'].value">
                <div class="strength-bar" [ngClass]="passwordStrength">
                  <div class="strength-segment" *ngFor="let _ of [1,2,3]"></div>
                </div>
                <span class="strength-text" [ngClass]="passwordStrength">{{passwordStrengthText}}</span>
              </div>
              <div *ngIf="submitted && f['password'].errors" class="error-text">
                <span *ngIf="f['password'].errors['required']">Password is required</span>
                <span *ngIf="f['password'].errors['minlength']">Password must be at least 8 characters</span>
                <span *ngIf="f['password'].errors['pattern']">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character</span>
              </div>
            </div>

            <div class="form-group full-width">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                formControlName="confirmPassword"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['confirmPassword'].errors}"
              >
              <div *ngIf="submitted && f['confirmPassword'].errors" class="error-text">
                <span *ngIf="f['confirmPassword'].errors['required']">Password confirmation is required</span>
                <span *ngIf="f['confirmPassword'].errors['mustMatch']">Passwords must match</span>
              </div>
            </div>

            <div class="form-group">
              <label for="role">I am a</label>
              <select
                id="role"
                formControlName="role"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['role'].errors}"
              >
                <option value="">Select your role</option>
                <option value="professional">Professional</option>
                <option value="trainee">Trainee</option>
              </select>
              <div *ngIf="submitted && f['role'].errors" class="error-text">
                <span *ngIf="f['role'].errors['required']">Role is required</span>
              </div>
            </div>

            <div class="form-group">
              <label for="proficiency">Proficiency</label>
              <select
                id="proficiency"
                formControlName="proficiency"
                class="form-control"
                [ngClass]="{'invalid': submitted && f['proficiency'].errors}"
              >
                <option value="">Select your proficiency</option>
                <option value="MO">Medical Officer</option>
                <option value="sonographer">Sonographer</option>
                <option value="radiologist">Radiologist</option>
              </select>
              <div *ngIf="submitted && f['proficiency'].errors" class="error-text">
                <span *ngIf="f['proficiency'].errors['required']">Proficiency is required</span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            <span *ngIf="loading">Registering...</span>
            <span *ngIf="!loading">Register</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Login</a></p>
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
      max-width: 450px;
      padding: 3rem;
      transform: translateY(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
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

    .password-strength {
      margin-top: 0.75rem;
    }

    .strength-bar {
      height: 4px;
      background: var(--border-color);
      border-radius: 2px;
      margin-bottom: 0.5rem;
      display: flex;
      gap: 4px;
    }

    .strength-segment {
      flex: 1;
      height: 100%;
      background: var(--border-color);
      border-radius: 2px;
      transition: background-color 0.3s ease;
    }

    .strength-bar.weak .strength-segment:first-child,
    .strength-bar.medium .strength-segment:not(:last-child),
    .strength-bar.strong .strength-segment {
      background: currentColor;
    }

    .strength-bar.weak { color: var(--error-color); }
    .strength-bar.medium { color: var(--warning-color); }
    .strength-bar.strong { color: var(--success-color); }

    .strength-text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .strength-text.weak { color: var(--error-color); }
    .strength-text.medium { color: var(--warning-color); }
    .strength-text.strong { color: var(--success-color); }

    select.form-control {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.25rem;
      padding-right: 2.5rem;
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

    @media (max-width: 480px) {
      .auth-card {
        padding: 2rem;
      }

      .auth-title {
        font-size: 2rem;
      }
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-bottom: 1.75rem;
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
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
      .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .auth-card {
        padding: 1.5rem;
      }

      .form-group {
        gap: 0.5rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  passwordStrength = '';
  passwordStrengthText = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      proficiency: ['', Validators.required],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordStrength(value);
    });
  }

  get f() { return this.registerForm.controls; }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrength = '';
      this.passwordStrengthText = '';
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let strength = 0;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;
    if (length >= 8) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'weak';
      this.passwordStrengthText = 'Weak password';
    } else if (strength <= 4) {
      this.passwordStrength = 'medium';
      this.passwordStrengthText = 'Medium strength password';
    } else {
      this.passwordStrength = 'strong';
      this.passwordStrengthText = 'Strong password';
    }
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.loading = false;

        // Redirect to home page after successful registration
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }
}
