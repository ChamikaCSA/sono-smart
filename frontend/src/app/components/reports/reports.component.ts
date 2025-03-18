import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ReportService, PatientReport } from '../../services/report.service';
import { QuizService, QuizResult } from '../../services/quiz.service';
import { ScanService, ScanResult } from '../../services/scan.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ReportsComponent implements OnInit {
  patientReports: PatientReport[] = [];
  quizResults: QuizResult[] = [];
  scanResults: ScanResult[] = [];
  isLoading = true;
  errorMessage = '';
  selectedReport: PatientReport | null = null;
  currentReport: Partial<PatientReport> = {};
  showDetailsModal = false;
  showDeleteModal = false;
  showForm = false;
  isEditing = false;

  constructor(
    public authService: AuthService,
    private reportService: ReportService,
    private quizService: QuizService,
    private scanService: ScanService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.isLoading = true;

    if (this.authService.getCurrentUser()?.role === 'professional') {
      this.loadPatientReports();
    } else if (this.authService.getCurrentUser()?.role === 'trainee') {
      this.loadTraineeReports();
    }
  }

  loadPatientReports(): void {
    this.reportService.getPatientReports().subscribe({
      next: (reports) => {
        this.patientReports = reports;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load patient reports. Please try again later.';
        this.isLoading = false;
        console.error('Error loading patient reports:', error);
      }
    });
  }

  loadTraineeReports(): void {
    // Load both quiz and scan results for trainees
    this.quizService.getQuizResults().subscribe({
      next: (results) => {
        this.quizResults = results;
        this.loadScanResults(); // Load scan results after quiz results
      },
      error: (error) => {
        this.errorMessage = 'Failed to load quiz results. Please try again later.';
        this.isLoading = false;
        console.error('Error loading quiz results:', error);
      }
    });
  }

  loadScanResults(): void {
    this.scanService.getScanResults().subscribe({
      next: (results) => {
        this.scanResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load scan results. Please try again later.';
        this.isLoading = false;
        console.error('Error loading scan results:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuration(startTime: Date | null | undefined, endTime: Date | null | undefined): string {
    if (!startTime || !endTime) return 'N/A';

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();

    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  }

  // Action button functionality
  viewReport(report: PatientReport): void {
    this.selectedReport = report;
    this.showDetailsModal = true;
  }

  editReport(report: PatientReport): void {
    this.currentReport = { ...report };
    this.isEditing = true;
    this.showForm = true;
    this.showDetailsModal = false;
  }

  confirmDelete(report: PatientReport): void {
    this.selectedReport = report;
    this.showDeleteModal = true;
  }

  deleteReport(): void {
    if (this.selectedReport && this.selectedReport._id) {
      this.isLoading = true;
      this.errorMessage = '';
      this.reportService.deletePatientReport(this.selectedReport._id).subscribe({
        next: (success) => {
          if (success) {
            this.showDeleteModal = false;
            this.selectedReport = null;
            this.loadPatientReports();
          } else {
            this.errorMessage = 'Failed to delete report. Please try again.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting report:', error);
          this.errorMessage = 'Failed to delete report. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  closeModal(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay') || target.classList.contains('close-btn') || target.closest('.close-btn') || target.classList.contains('btn-secondary')) {
      this.showDetailsModal = false;
      this.showDeleteModal = false;
    }
  }
}