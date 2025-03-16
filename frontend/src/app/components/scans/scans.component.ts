import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PatientService, Patient } from '../../services/patient.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-scans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class ScansComponent implements OnInit {
  isLoading = false;

  // Interface for scan section data
  scanSections: {
    id: number;
    selectedFile: File | null;
    imagePreview: string | null;
    predictionResult: string | null;
    predictionSuccess: boolean | null;
    detectedOrgans: { name: string, confidence: number }[];
    userPrediction: string;
  }[] = [];

  // Current active scan section (for backward compatibility)
  get selectedFile(): File | null { return this.scanSections[0]?.selectedFile || null; }
  get imagePreview(): string | null { return this.scanSections[0]?.imagePreview || null; }
  get predictionResult(): string | null { return this.scanSections[0]?.predictionResult || null; }
  get predictionSuccess(): boolean | null { return this.scanSections[0]?.predictionSuccess || null; }
  get detectedOrgans(): { name: string, confidence: number }[] { return this.scanSections[0]?.detectedOrgans || []; }
  get userPrediction(): string { return this.scanSections[0]?.userPrediction || ''; }
  set userPrediction(value: string) { if (this.scanSections[0]) this.scanSections[0].userPrediction = value; }

  // For professionals
  reportText: string = '';
  isReportGenerated: boolean = false;

  // For patient selection
  patients: Patient[] = [];
  selectedPatientId: string = '';

  constructor(
    public authService: AuthService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Initialize component with first scan section
    this.addScanSection();
  }

  onFileSelected(event: Event, sectionIndex: number = 0): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.scanSections[sectionIndex].selectedFile = input.files[0];
      this.previewImage(sectionIndex);
      // Reset previous results
      this.scanSections[sectionIndex].predictionResult = null;
      this.scanSections[sectionIndex].predictionSuccess = null;
      this.scanSections[sectionIndex].detectedOrgans = [];
      this.isReportGenerated = false;
      this.reportText = '';
    }
  }

  previewImage(sectionIndex: number = 0): void {
    const section = this.scanSections[sectionIndex];
    if (!section || !section.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      section.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(section.selectedFile);
  }

  submitForTrainee(sectionIndex: number = 0): void {
    const section = this.scanSections[sectionIndex];
    if (!section || !section.selectedFile || !section.userPrediction) return;

    this.isLoading = true;

    // Simulate API call for trainee prediction verification
    setTimeout(() => {
      // Mock response - in a real app, this would come from the backend
      const correctOrgan = this.mockGetCorrectOrgan();
      section.predictionSuccess = section.userPrediction.toLowerCase() === correctOrgan.toLowerCase();
      section.predictionResult = correctOrgan;
      this.isLoading = false;
    }, 1500);
  }

  submitForProfessional(sectionIndex: number = 0): void {
    const section = this.scanSections[sectionIndex];
    if (!section || !section.selectedFile) return;

    this.isLoading = true;

    // Simulate API call for professional organ detection
    setTimeout(() => {
      // Mock response - in a real app, this would come from the backend
      section.detectedOrgans = this.mockDetectOrgans();
      this.isLoading = false;
    }, 1500);
  }

  // Dialog properties
  showReportDialog = false;
  reportNotes: string = '';

  openReportDialog(): void {
    this.showReportDialog = true;
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }

  closeReportDialog(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay') || target.classList.contains('close-btn') || target.closest('.close-btn') || target.classList.contains('btn-secondary')) {
      this.showReportDialog = false;
    }
  }

  generateReport(): void {
    if (!this.selectedPatientId) {
      return; // Require patient selection
    }

    this.isLoading = true;

    // Get selected patient information
    let patientInfo = '';

    const selectedPatient = this.patients.find(p => p._id === this.selectedPatientId);
    if (selectedPatient) {
      patientInfo = `${selectedPatient.firstName} ${selectedPatient.lastName}`;
    }

    // Simulate report generation with form data
    setTimeout(() => {
      this.reportText = this.mockGenerateReport(patientInfo, this.reportNotes);
      this.isReportGenerated = true;
      this.isLoading = false;
      this.showReportDialog = false;

      // Reset form fields
      this.reportNotes = '';
      this.selectedPatientId = '';
    }, 1000);
  }

  resetForm(sectionIndex: number = 0): void {
    if (sectionIndex >= 0 && sectionIndex < this.scanSections.length) {
      this.scanSections[sectionIndex] = {
        id: this.scanSections[sectionIndex].id,
        selectedFile: null,
        imagePreview: null,
        predictionResult: null,
        predictionSuccess: null,
        userPrediction: '',
        detectedOrgans: []
      };
      this.reportText = '';
      this.isReportGenerated = false;
    }
  }

  // Add a new scan section
  addScanSection(): void {
    const newId = this.scanSections.length > 0 ?
      Math.max(...this.scanSections.map(s => s.id)) + 1 : 1;

    this.scanSections.push({
      id: newId,
      selectedFile: null,
      imagePreview: null,
      predictionResult: null,
      predictionSuccess: null,
      detectedOrgans: [],
      userPrediction: ''
    });
  }

  // Remove a scan section
  removeScanSection(sectionIndex: number): void {
    if (this.scanSections.length > 1 && sectionIndex >= 0 && sectionIndex < this.scanSections.length) {
      this.scanSections.splice(sectionIndex, 1);
    }
  }

  // Mock functions to simulate backend responses
  private mockGetCorrectOrgan(): string {
    const organs = ['Liver', 'Kidney', 'Spleen', 'Gallbladder', 'Bladder', 'Bowel'];
    return organs[Math.floor(Math.random() * organs.length)];
  }

  private mockDetectOrgans(): { name: string, confidence: number }[] {
    const organs = [
      { name: 'Liver', confidence: Math.random() * 0.3 + 0.7 },
      { name: 'Kidney', confidence: Math.random() * 0.5 + 0.3 },
      { name: 'Spleen', confidence: Math.random() * 0.4 + 0.5 },
      { name: 'Gallbladder', confidence: Math.random() * 0.6 + 0.2 }
    ];

    // Sort by confidence level (highest first)
    return organs.sort((a, b) => b.confidence - a.confidence);
  }

  private mockGenerateReport(patientName: string = '', notes: string = ''): string {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const patientInfo = patientName ? `Patient: ${patientName}` : '';
    const additionalNotes = notes ? `
ADDITIONAL NOTES:
${notes}` : '';

    return `ULTRASOUND SCAN REPORT
Date: ${date}
Time: ${time}
${patientInfo}

FINDINGS:
The ultrasound scan shows normal liver parenchyma with no focal lesions. The liver measures within normal limits. No intrahepatic biliary dilatation is seen.

The gallbladder is normal in size with no stones or wall thickening.

Both kidneys appear normal in size and echogenicity. No hydronephrosis or renal calculi are identified.

The spleen is normal in size with homogeneous echotexture.

IMPRESSION:
Normal abdominal ultrasound study with no significant abnormalities detected.${additionalNotes}`;
  }
}