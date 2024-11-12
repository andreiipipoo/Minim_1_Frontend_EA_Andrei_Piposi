
// src/app/services/session-time.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionTime } from '../models/session-time.model';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeService {
  private apiUrl = 'http://localhost:3000/api/sessionTimes';

  constructor(private http: HttpClient) {}

  createSessionTime(sessionTime: SessionTime): Observable<SessionTime> {
    return this.http.post<SessionTime>(this.apiUrl, sessionTime);
  }

  getSessionTimes(userId: string): Observable<SessionTime[]> {
    return this.http.get<SessionTime[]>(`${this.apiUrl}/${userId}`);
  }

  updateSessionTime(id: string, sessionTime: SessionTime): Observable<SessionTime> {
    return this.http.put<SessionTime>(`${this.apiUrl}/${id}`, sessionTime);
  }

  deleteSessionTime(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export type { SessionTime };
