import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        padding: '0',
        margin: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  template: `
    <div class="home-container">
      <section class="hero-section">
        <div class="hero-content animate-fade-in">
          <h1>AI-Powered <span class="text-highlight">Ultrasound</span><br>Organ Detection</h1>
          <p class="hero-description">Revolutionizing medical imaging with real-time AI assistance for faster, more accurate diagnoses.</p>
          <div class="cta-buttons">
            <button class="btn-primary animate-slide-up">Try Demo</button>
            <button class="btn-secondary animate-slide-up">Learn More</button>
          </div>
        </div>
        <div class="hero-image animate-slide-in">
          <span class="material-icons-outlined medical-icon">medical_services</span>
        </div>
      </section>

      <section class="our-solution-section" id="solutions">
        <h2>What We Offer?</h2>
        <p class="section-description">AI-driven ultrasound organ detection system that enhances diagnostic accuracy and efficiency</p>

        <div class="solution-grid">
          <div class="solution-card animate-fade-in">
            <span class="material-icons-outlined">visibility</span>
            <h3>Real-Time Detection</h3>
            <p>Instantly identifies and highlights organs during ultrasound procedures</p>
          </div>
          <div class="solution-card animate-fade-in">
            <span class="material-icons-outlined">medical_information</span>
            <h3>Multi-Organ Recognition</h3>
            <p>Accurately detects bladder, bowel, gallbladder, kidney, liver, and spleen</p>
          </div>
          <div class="solution-card animate-fade-in">
            <span class="material-icons-outlined">health_and_safety</span>
            <h3>Clinical Assistance</h3>
            <p>Helps medical professionals improve diagnostic efficiency and accuracy</p>
          </div>
          <div class="solution-card animate-fade-in">
            <span class="material-icons-outlined">school</span>
            <h3>Training Platform</h3>
            <p>Assists medical students in practicing and verifying their predictions</p>
          </div>
        </div>
      </section>

      <section class="for-users-section">
         <div class="section-header">
          <button class="toggle-btn" (click)="toggleUsersSection()">
            <span class="material-icons-outlined">{{ isUsersSectionExpanded ? 'expand_less' : 'expand_more' }}</span>
            {{ isUsersSectionExpanded ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="users-grid" [@expandCollapse]="isUsersSectionExpanded ? 'expanded' : 'collapsed'" *ngIf="isUsersSectionExpanded || isAnimating">
          <div class="user-card animate-fade-in">
            <h3>For Medical Professionals</h3>
            <p>We provide an AI-driven ultrasound organ detection system that delivers real-time, accurate identification of abdominal organs, including bladder, bowel, gallbladder, kidney, liver, and spleen. This system significantly reduces cognitive load, enhancing diagnostic efficiency and allowing you to focus more on patient care and clinical decision-making.</p>
            <ul class="benefits-list">
              <li><span class="material-icons-outlined">speed</span>Real-time organ detection</li>
              <li><span class="material-icons-outlined">psychology</span>Reduced cognitive load</li>
              <li><span class="material-icons-outlined">verified</span>Enhanced diagnostic accuracy</li>
              <li><span class="material-icons-outlined">schedule</span>Improved workflow efficiency</li>
            </ul>
          </div>

          <div class="user-card animate-fade-in">
            <h3>For Medical Students</h3>
            <p>We offer an AI-driven ultrasound organ detection system to help medical students refine their diagnostic skills. You can upload ultrasound images and predict the organs bladder, bowel, gallbladder, kidney, liver, and spleen. And the system will verify whether your predictions are correct. Additionally, the QA Session with MCQs featuring ultrasound images of abnormal organs will further help improve your diagnostic accuracy and prepare you for real-world medical imaging tasks.</p>
            <ul class="benefits-list">
              <li><span class="material-icons-outlined">school</span>Practice predictions</li>
              <li><span class="material-icons-outlined">quiz</span>MCQ sessions</li>
              <li><span class="material-icons-outlined">check_circle</span>Instant verification</li>
              <li><span class="material-icons-outlined">trending_up</span>Skill improvement tracking</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about">
        <app-about></app-about>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      scroll-behavior: smooth;
      scroll-padding-top: 2rem;
    }

    /* Hero Section */
    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4rem;
      padding: 4rem calc((100vw - 1200px) / 2);
      gap: 2rem;
      background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--primary-rgb), 0.02) 100%);
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      border-radius: 16px;
    }

    .hero-content {
      flex: 1;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .text-highlight {
      color: var(--primary-color);
    }

    .hero-description {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
    }

    .btn-primary {
      background-color: var(--primary-color);
      color: var(--text-on-primary);
      padding: 1rem 2rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-primary:hover {
      background-color: var(--primary-dark);
    }

    .btn-secondary {
      background-color: var(--surface-1);
      color: var(--primary-color);
      padding: 1rem 2rem;
      border-radius: 8px;
      border: 2px solid var(--primary-color);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background-color: var(--bg-hover);
    }

    .hero-image {
      flex: 1;
      max-width: 500px;
    }

    .hero-image .medical-icon {
      font-size: 15rem;
      color: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }

    /* Our Solution Section */
    .our-solution-section {
      margin-bottom: 4rem;
      text-align: center;
    }

    .our-solution-section h2 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .section-description {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 3rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .solution-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin: 0 auto;
    }

    .solution-card {
      background-color: var(--surface-1);
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .solution-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    }

    .solution-card .material-icons-outlined {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      background: rgba(var(--primary-rgb), 0.1);
      padding: 1rem;
      border-radius: 50%;
    }

    .solution-card h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .solution-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Features Section */
    .features-section {
      margin-bottom: 4rem;
      text-align: center;
    }

    .features-section h2 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 3rem;
    }

    .features-grid {
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
      margin: 0 auto;
      max-width: 1200px;
      overflow-x: auto;
      padding: 1rem;
    }

    .feature-card {
      flex: 1;
      min-width: 250px;
      background-color: var(--surface-1);
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    }

    .feature-card .material-icons-outlined {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .feature-card p {
      color: var(--text-secondary);
    }

    /* AI Showcase Section */
    .ai-showcase {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
      padding: 3rem;
      background: var(--surface-1);
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    .ai-showcase:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    }

    .showcase-content h2 {
      color: var(--text-primary);
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
    }

    .showcase-content p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .organ-list {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .organ-list li {
      color: var(--text-secondary);
      background: var(--bg-secondary);
      padding: 1rem;
      border-radius: 8px;
      font-weight: 500;
    }

    .demo-placeholder {
      background: var(--bg-accent);
      border-radius: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
    }

    .demo-placeholder .material-icons-outlined {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    /* For Users Section */
    .for-users-section {
      margin-bottom: 4rem;
      text-align: center;
    }

    .for-users-section h2 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      margin-top: 2rem;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--primary-color);
      color: var(--text-on-primary);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .toggle-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin: 0 auto;
      margin-top: 1rem;
    }

    .user-card {
      background-color: var(--surface-1);
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .user-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    }

    .user-card h3 {
      font-size: 1.8rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
      position: relative;
      display: inline-block;
    }

    .user-card h3::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: var(--primary-color);
      border-radius: 2px;
    }

    .user-card p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      max-width: 90%;
      margin-left: auto;
      margin-right: auto;
    }

    .benefits-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0 0 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .benefits-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      background-color: var(--bg-secondary);
      padding: 0.75rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .benefits-list li:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .benefits-list li .material-icons-outlined {
      color: var(--primary-color);
      font-size: 1.25rem;
    }

    @media screen and (max-width: 768px) {
      .users-grid {
        grid-template-columns: 1fr;
      }

      .benefits-list {
        grid-template-columns: 1fr;
      }
    }

    /* Benefits Section */
    .benefits-section {
      margin-bottom: 4rem;
    }

    .benefits-section h2 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 3rem;
      text-align: center;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .benefit-card {
      background: var(--surface-1);
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    .benefit-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    }

    .benefit-card h3 {
      color: var(--text-primary);
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }

    .benefit-card ul {
      list-style: none;
      padding: 0;
    }

    .benefit-card li {
      color: var(--text-secondary);
      margin-bottom: 0.8rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .benefit-card li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background-color: var(--primary-color);
      border-radius: 50%;
    }

    @media screen and (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 2rem;
      }

      .hero-content h1 {
        font-size: 2.5rem;
      }

      .cta-buttons {
        justify-content: center;
      }

      .ai-showcase {
        grid-template-columns: 1fr;
        padding: 2rem;
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .solution-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Animation Classes */
    .animate-fade-in {
      animation: fadeIn 1s ease-in-out;
    }

    .animate-slide-up {
      animation: slideUp 0.8s ease-in-out;
    }

    .animate-slide-in {
      animation: slideIn 0.8s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class HomeComponent {
  isUsersSectionExpanded = false;
  isAnimating = false;

  toggleUsersSection() {
    this.isAnimating = true;
    this.isUsersSectionExpanded = !this.isUsersSectionExpanded;

    if (!this.isUsersSectionExpanded) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }
}
