import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ScanImage {
  imageUrl: string;
  organ: string;
  findings: string;
}

export interface PatientReport {
  _id?: string;
  user?: string;
  patient: string;
  scanImages: ScanImage[];
  diagnosticName: string;
  instructions?: string;
  conditionDetails?: string;
  additionalNotes?: string;
  reportText?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  savePatientReport(report: Omit<PatientReport, '_id' | 'user' | 'createdAt'>): Observable<PatientReport> {
    return this.http.post<any>(this.apiUrl, report).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error saving patient report:', error);
        return of(null as any);
      })
    );
  }

  getPatientReports(): Observable<PatientReport[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching patient reports:', error);
        return of([]);
      })
    );
  }

  getPatientReport(id: string): Observable<PatientReport> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching patient report:', error);
        return of(null as any);
      })
    );
  }
}
