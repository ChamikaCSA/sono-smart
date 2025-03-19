import { Injectable } from '@angular/core';
import { PatientReportWithPatient, ScanImage } from './report.service';
import jsPDF from 'jspdf';
import { Patient } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  /**
   * Generates a PDF report from a patient report object
   * @param report The patient report to generate a PDF for
   * @param patient The patient information
   * @returns Promise that resolves when PDF generation is complete
   */
  async generatePdfReport(report: PatientReportWithPatient, patient: Patient): Promise<void> {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let yPos = margin;

    // Add header with logo
    this.addHeader(doc, pageWidth, margin, yPos);
    yPos += 30;

    // Add patient information
    this.addPatientInfo(doc, patient, pageWidth, margin, yPos);
    yPos += 40;

    // Add report title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ULTRASOUND CHEST', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Add impression
    this.addImpression(doc, report, margin, yPos);
    yPos += 20;

    // Add advice
    if (report.instructions) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ADVICE', margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(report.instructions, margin, yPos);
      yPos += 10;
    }

    // Add clinical correlation
    if (report.conditionDetails) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CLINICAL CORRELATION', margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(report.conditionDetails, margin, yPos);
      yPos += 20;
    }

    // Add scan images
    if (report.scanImages && report.scanImages.length > 0) {
      await this.addScanImages(doc, report.scanImages, pageWidth, margin, yPos);
    }

    // Add footer
    this.addFooter(doc, pageWidth, pageHeight);

    // Save the PDF
    doc.save(`${patient.firstName.replace(/\s+/g, '_')}_report.pdf`);
  }

  private addHeader(doc: jsPDF, pageWidth: number, margin:number, yPos: number): void {
    // Add logo
    const logoUrl = 'assets/images/logo.png';
    const img = new Image();
    img.src = logoUrl;

    // Add clinic name and info
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 153); // Dark blue color
    doc.setFont('helvetica', 'bold');
    doc.text('DRLOGY IMAGING CENTER', 60, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('X-Ray | CT-Scan | MRI | USG', 60, yPos + 16);

    // Add contact info
    doc.setFontSize(9);
    doc.text('01234-56789 | 0912-345678', pageWidth - margin, yPos + 6, { align: 'right' });
    doc.text('drlogyimaging@drlogy.com', pageWidth - margin, yPos + 12, { align: 'right' });
    doc.text('www.drlogy.com', pageWidth - margin, yPos + 18, { align: 'right' });

    // Add address
    doc.setFontSize(8);
    doc.text('105-108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE COMPLEX, MUMBAI - 609578', pageWidth / 2, yPos + 24, { align: 'center' });

    // Add horizontal line
    doc.setDrawColor(51, 102, 204); // Blue color
    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 28, pageWidth - margin, yPos + 28);
  }

  private addPatientInfo(doc: jsPDF, patientInfo: any, pageWidth: number, margin:number, yPos: number): void {
    // Left column - Patient details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${patientInfo.name}`, margin, yPos);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Age : ${patientInfo.age}`, margin, yPos + 8);
    doc.text(`Sex : ${patientInfo.gender}`, margin, yPos + 16);

    // Right column - Report details
    const rightColX = pageWidth - 80;
    doc.setFontSize(10);
    doc.text('Registered on:', rightColX, yPos);
    doc.text(`${new Date().toLocaleString()}`, rightColX + 60, yPos, { align: 'right' });

    doc.text('Reported on:', rightColX, yPos + 8);
    doc.text(`${new Date().toLocaleString()}`, rightColX + 60, yPos + 8, { align: 'right' });

    // Middle column - Patient ID
    const midColX = pageWidth / 2 - 20;
    doc.text('PID', midColX, yPos);
    doc.text(': ' + (patientInfo.id || 'N/A'), midColX + 20, yPos);

    doc.text('Ref. By', midColX, yPos + 16);
    doc.text(': Dr. ' + (patientInfo.referredBy || 'N/A'), midColX + 20, yPos + 16);

    // Add horizontal line
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos + 24, pageWidth - margin, yPos + 24);
  }

  private addImpression(doc: jsPDF, report: PatientReportWithPatient, margin:number, yPos: number): void {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('IMPRESSION', margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    if (report.diagnosticName) {
      doc.text(report.diagnosticName, margin, yPos);
    } else {
      doc.text('NO SIGNIFICANT ABNORMALITY DETECTED.', margin, yPos);
    }
  }

  private async addScanImages(doc: jsPDF, scanImages: ScanImage[], pageWidth: number, margin:number, yPos: number): Promise<void> {
    // Add images section title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SCAN IMAGES:', margin, yPos);
    yPos += 10;

    // Calculate image dimensions
    const imageWidth = (pageWidth - (margin * 3)) / 2; // Two images per row
    const imageHeight = imageWidth * 0.75; // Maintain aspect ratio

    // Add each scan image
    for (let i = 0; i < scanImages.length; i++) {
      const image = scanImages[i];
      const xPos = i % 2 === 0 ? margin : margin + imageWidth + margin;
      const currentYPos = yPos + Math.floor(i / 2) * (imageHeight + 10);

      try {
        // Load image
        const img = new Image();
        img.src = image.imageUrl;
        await new Promise<void>((resolve) => {
          img.onload = () => {
            // Add image to PDF
            doc.addImage(img, 'JPEG', xPos, currentYPos, imageWidth, imageHeight);

            // Add image label
            doc.setFontSize(9);
            doc.text(`${String.fromCharCode(65 + i)}`, xPos + 5, currentYPos + 10);

            resolve();
          };
          img.onerror = () => {
            // Handle image loading error
            doc.text('Image not available', xPos, currentYPos + imageHeight / 2);
            resolve();
          };
        });
      } catch (error) {
        console.error('Error adding image to PDF:', error);
        doc.text('Image not available', xPos, currentYPos + imageHeight / 2);
      }
    }
  }

  private addFooter(doc: jsPDF, pageWidth: number, pageHeight: number): void {
    const footerY = pageHeight - 20;
    const margin = 10; // Define margin for footer

    // Add horizontal line
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Add radiologist signature
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Dr. Payal Shah', pageWidth / 2, footerY + 10, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('(MD, Radiologist)', pageWidth / 2, footerY + 15, { align: 'center' });

    // Add page number
    doc.setFontSize(8);
    doc.text(`Page 1 of 1`, pageWidth - margin, footerY + 15, { align: 'right' });

    // Add generated timestamp
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, footerY + 15);
  }
}
