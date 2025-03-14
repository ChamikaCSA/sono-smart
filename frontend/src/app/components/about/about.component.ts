import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container animate-fade-in">
      <section class="hero-section">
        <div class="hero-content">
          <h1>About <span class="text-highlight">SonoSmart</span></h1>
          <p class="hero-description">
            Revolutionizing healthcare through the power of artificial intelligence
          </p>
        </div>
      </section>

      <section class="content-section">
        <div class="mission-vision">
          <h2>Our Mission</h2>
          <p>
            SonoSmart is dedicated to enhancing diagnostic accuracy and efficiency by providing advanced AI-driven ultrasound organ detection systems. We aim to assist both medical professionals and students by automating complex imaging tasks, improving workflow, and supporting better clinical decision-making.
          </p>
          <p>
            Our team combines expertise in deep learning, medical imaging, and clinical workflows to create reliable, real-time solutions. At SonoSmart, we strive to make healthcare more accessible and efficient, empowering healthcare providers with cutting-edge tools for better patient outcomes.
          </p>
        </div>

        <div class="vision">
          <h2>Our Vision</h2>
          <p>
            To become a leader in medical imaging technology, driving innovation and improving patient care worldwide by integrating AI into everyday healthcare practices.
          </p>
        </div>

        <div class="services">
          <h2>What We Do</h2>
          <div class="service-cards">
            <div class="service-card">
              <h3>For Medical Professionals</h3>
              <p>
                We provide tools that automate organ detection in ultrasound images, helping clinicians make faster, more accurate diagnoses.
              </p>
            </div>
            <div class="service-card">
              <h3>For Medical Students</h3>
              <p>
                We offer a training platform that allows students to practice identifying abdominal organs and improve their diagnostic skills.
              </p>
            </div>
          </div>
        </div>

        <div class="technology">
          <h2>Our Technology</h2>
          <p>
            Leveraging YOLOv8, a state-of-the-art deep learning model, our system delivers real-time organ detection for bladder, bowel, gallbladder, kidney, liver, and spleen. This technology aims to reduce clinician workload and help students better prepare for real-world medical imaging challenges.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      scroll-behavior: smooth;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--primary-rgb), 0.02) 100%);
      padding: 2rem calc((100vw - 1200px) / 2);
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
    }

    .hero-content h1 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
      background: var(--primary-color);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-description {
      font-size: 1.2rem;
      color: var(--text-secondary);
    }

    .content-section {
      display: grid;
      gap: 1.5rem;
    }

    .content-section > div {
      background: var(--surface-1);
      padding: 1.8rem;
      margin-bottom: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .content-section > div:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    }

    h2 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin-bottom: 1rem;
      position: relative;
      display: inline-block;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--primary-color);
      border-radius: 2px;
    }

    h3 {
      color: var(--text-on-primary);
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .service-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .service-card {
      background: var(--bg-secondary);
      padding: 1.8rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .service-card h3 {
      color: var(--text-secondary);
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }

    .service-card p {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 0;
      opacity: 0.9;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @media screen and (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .content-section > div {
        padding: 2rem;
      }

      .service-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
