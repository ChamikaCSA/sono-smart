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

    // Add report title - determine from scan images if available
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    let reportTitle = 'ULTRASOUND REPORT';

    // Try to determine report type from scan images
    if (report.scanImages && report.scanImages.length > 0) {
      const organs = report.scanImages.map(img => img.organ.toUpperCase()).filter(Boolean);
      if (organs.length > 0) {
        // Get unique organs
        const uniqueOrgans = [...new Set(organs)];
        if (uniqueOrgans.length === 1) {
          reportTitle = `ULTRASOUND ${uniqueOrgans[0]}`;
        } else if (uniqueOrgans.length <= 3) {
          reportTitle = `ULTRASOUND ${uniqueOrgans.join(' & ')}`;
        }
      }
    }

    doc.text(reportTitle, pageWidth / 2, yPos, { align: 'center' });
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

  private addPatientInfo(doc: jsPDF, patientInfo: Patient, pageWidth: number, margin:number, yPos: number): void {
    // Left column - Patient details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${patientInfo.firstName} ${patientInfo.lastName}`, margin, yPos);

    // Calculate age from date of birth
    const dob = new Date(patientInfo.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Age : ${age} Years`, margin, yPos + 8);
    doc.text(`Sex : ${patientInfo.gender}`, margin, yPos + 16);

    if (patientInfo.phone) {
      doc.text(`Phone : ${patientInfo.phone}`, margin, yPos + 24);
    }

    // Right column - Report details
    const rightColX = pageWidth - 80;
    doc.setFontSize(10);
    doc.text('Registered on:', rightColX, yPos);
    doc.text(`${new Date(patientInfo.createdAt || new Date()).toLocaleDateString()}`, pageWidth - margin, yPos, { align: 'right' });

    doc.text('Reported on:', rightColX, yPos + 8);
    doc.text(`${new Date().toLocaleDateString()}`, pageWidth - margin, yPos + 8, { align: 'right' });

    // Middle column - Patient ID
    const midColX = pageWidth / 2 - 20;
    doc.text('PID', midColX, yPos);
    doc.text(': ' + (patientInfo._id || 'N/A'), midColX + 20, yPos);

    if (patientInfo.medicalHistory) {
      doc.text('Medical History', midColX, yPos + 16);
      doc.text(': ' + patientInfo.medicalHistory.substring(0, 30) + (patientInfo.medicalHistory.length > 30 ? '...' : ''), midColX + 20, yPos + 16);
    }

    // Add horizontal line
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos + 32, pageWidth - margin, yPos + 32);
  }

  private addImpression(doc: jsPDF, report: PatientReportWithPatient, margin:number, yPos: number): void {
    // Add section title with background
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(margin, yPos - 5, 80, 7, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('IMPRESSION', margin + 2, yPos);
    yPos += 8;

    // Add diagnostic information with bullet points
    doc.setFont('helvetica', 'normal');
    if (report.diagnosticName) {
      // Split diagnostic name by line breaks or periods to create bullet points
      const diagnosticPoints = report.diagnosticName.split(/[\n\.]+/).filter(point => point.trim().length > 0);

      if (diagnosticPoints.length > 1) {
        // Multiple points - use bullet format
        diagnosticPoints.forEach((point, index) => {
          doc.text(`• ${point.trim()}`, margin + 5, yPos + (index * 6));
        });
      } else {
        // Single point - no bullet needed
        doc.text(report.diagnosticName, margin, yPos);
      }
    } else {
      doc.text('NO SIGNIFICANT ABNORMALITY DETECTED.', margin, yPos);
    }

    // Add additional notes if available
    if (report.additionalNotes) {
      yPos += (report.diagnosticName ?
        (report.diagnosticName.split(/[\n\.]+/).filter(point => point.trim().length > 0).length * 6) + 6 :
        10);

      doc.setFont('helvetica', 'italic');
      doc.text('Additional Notes:', margin, yPos);
      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.text(report.additionalNotes, margin + 5, yPos);
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
    const captionHeight = 20; // Height for caption text
    const totalImageBlockHeight = imageHeight + captionHeight;

    // Check if we need to add a new page for images
    if (yPos + totalImageBlockHeight > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPos = margin + 10;
    }

    // Add each scan image
    for (let i = 0; i < scanImages.length; i++) {
      const image = scanImages[i];
      const xPos = i % 2 === 0 ? margin : margin + imageWidth + margin;
      const currentYPos = yPos + Math.floor(i / 2) * totalImageBlockHeight;

      // Check if we need to add a new page
      if (i > 0 && i % 2 === 0 && currentYPos + totalImageBlockHeight > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPos = margin + 10;
      }

      try {
        // Load image
        const img = new Image();
        img.src = image.imageUrl;
        await new Promise<void>((resolve) => {
          img.onload = () => {
            // Add image to PDF with border
            doc.setDrawColor(200, 200, 200); // Light gray border
            doc.setLineWidth(0.5);
            doc.rect(xPos, currentYPos, imageWidth, imageHeight);
            doc.addImage(img, 'JPEG', xPos, currentYPos, imageWidth, imageHeight);

            // Add image label and caption
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const imageLabel = `${String.fromCharCode(65 + i)}: ${image.organ || 'Unspecified'}`;
            doc.text(imageLabel, xPos + 2, currentYPos + imageHeight + 5);

            resolve();
          };
          img.onerror = () => {
            // Handle image loading error
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.rect(xPos, currentYPos, imageWidth, imageHeight);
            doc.text('Image not available', xPos + imageWidth/2, currentYPos + imageHeight/2, { align: 'center' });
            resolve();
          };
        });
      } catch (error) {
        console.error('Error adding image to PDF:', error);
        doc.text('Image not available', xPos + imageWidth/2, currentYPos + imageHeight/2, { align: 'center' });
      }
    }
  }

  private addFooter(doc: jsPDF, pageWidth: number, pageHeight: number): void {
    const footerY = pageHeight - 25;
    const margin = 10; // Define margin for footer

    // Add horizontal line
    doc.setDrawColor(51, 102, 204); // Blue color to match header
    doc.setLineWidth(0.5);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Add radiologist signature box
    const signatureBoxWidth = 70;
    const signatureBoxX = pageWidth - margin - signatureBoxWidth;

    // Digital signature box
    doc.setDrawColor(200, 200, 200); // Light gray
    doc.setLineWidth(0.2);
    doc.rect(signatureBoxX, footerY + 2, signatureBoxWidth, 18);

    // Add radiologist signature
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Dr. Payal Shah', signatureBoxX + signatureBoxWidth/2, footerY + 10, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('(MD, Radiologist)', signatureBoxX + signatureBoxWidth/2, footerY + 15, { align: 'center' });

    // Add QR code placeholder for digital verification
    doc.setDrawColor(200, 200, 200);
    doc.rect(margin, footerY + 2, 18, 18);
    doc.setFontSize(6);
    doc.text('SCAN TO VERIFY', margin + 9, footerY + 22, { align: 'center' });

    // Add disclaimer
    doc.setFontSize(6);
    doc.text('This is a computer-generated report and does not require physical signature.', pageWidth/2, footerY + 22, { align: 'center' });

    // Add page number
    doc.setFontSize(8);
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, footerY + 15, { align: 'right' });
    }

    // Add generated timestamp
    doc.setPage(1); // Return to first page
    doc.setFontSize(8);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin + 25, footerY + 10);
  }
}
