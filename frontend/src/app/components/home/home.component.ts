import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

      <section class="features-section">
        <h2>Why Choose SonoSmart?</h2>
        <div class="features-grid">
          <div class="feature-card animate-fade-in">
            <span class="material-icons-outlined">speed</span>
            <h3>Real-Time Detection</h3>
            <p>Instant organ detection and analysis during ultrasound procedures</p>
          </div>
          <div class="feature-card animate-fade-in">
            <span class="material-icons-outlined">psychology</span>
            <h3>AI-Powered Accuracy</h3>
            <p>Advanced YOLOv8 model for precise organ identification</p>
          </div>
          <div class="feature-card animate-fade-in">
            <span class="material-icons-outlined">school</span>
            <h3>Learning Platform</h3>
            <p>Interactive training for medical students and professionals</p>
          </div>
          <div class="feature-card animate-fade-in">
            <span class="material-icons-outlined">verified</span>
            <h3>Clinically Validated</h3>
            <p>Tested and verified by healthcare professionals</p>
          </div>
        </div>
      </section>

      <section class="ai-showcase">
        <div class="showcase-content">
          <h2>Advanced AI Capabilities</h2>
          <p>Our system detects and identifies multiple abdominal organs:</p>
          <ul class="organ-list">
            <li>Bladder</li>
            <li>Bowel</li>
            <li>Gallbladder</li>
            <li>Kidney</li>
            <li>Liver</li>
            <li>Spleen</li>
          </ul>
        </div>
        <div class="showcase-visual animate-fade-in">
          <div class="demo-placeholder">
            <span class="material-icons-outlined">biotech</span>
            <p>Interactive Demo</p>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <h2>Benefits for Healthcare</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <h3>For Clinicians</h3>
            <ul>
              <li>Reduced diagnostic time</li>
              <li>Enhanced accuracy</li>
              <li>Streamlined workflow</li>
              <li>Decision support</li>
            </ul>
          </div>
          <div class="benefit-card">
            <h3>For Students</h3>
            <ul>
              <li>Hands-on training</li>
              <li>Real-world cases</li>
              <li>Immediate feedback</li>
              <li>Skill development</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      scroll-behavior: smooth;
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
    }
  `]
})
export class HomeComponent {}
