
import { Component, OnInit } from '@angular/core';
import { SessionTimeService } from '../../services/session-time.service';
import { SessionTime } from '../../models/session-time.model';

@Component({
  selector: 'app-session-times',
  templateUrl: './session-times.component.html',
  styleUrls: ['./session-times.component.css']
})
export class SessionTimesComponent implements OnInit {
  sessionTimes: SessionTime[] = [];
  userId: string = 'user-id-placeholder'; // Reemplaza con el ID del usuario actual

  constructor(private sessionTimeService: SessionTimeService) {}

  ngOnInit(): void {
    this.getSessionTimes();
  }

  getSessionTimes(): void {
    this.sessionTimeService.getSessionTimes(this.userId).subscribe(
      (data) => {
        this.sessionTimes = data;
      },
      (error) => {
        console.error('Error fetching session times', error);
      }
    );
  }

  createSessionTime(): void {
    const newSessionTime: SessionTime = {
      userId: this.userId,
      startTime: new Date(),
      endTime: new Date(),
      duration: 3600 // Ejemplo de duración en segundos
    };

    this.sessionTimeService.createSessionTime(newSessionTime).subscribe(
      (data) => {
        this.sessionTimes.push(data);
      },
      (error) => {
        console.error('Error creating session time', error);
      }
    );
  }

  updateSessionTime(sessionTime: SessionTime): void {
    if (!sessionTime._id) {
      console.error('Session time ID is missing');
      return;
    }

    this.sessionTimeService.updateSessionTime(sessionTime._id, sessionTime).subscribe(
      (data) => {
        const index = this.sessionTimes.findIndex(st => st._id === data._id);
        if (index !== -1) {
          this.sessionTimes[index] = data;
        }
      },
      (error) => {
        console.error('Error updating session time', error);
      }
    );
  }

  deleteSessionTime(id: string): void {
    this.sessionTimeService.deleteSessionTime(id).subscribe(
      () => {
        this.sessionTimes = this.sessionTimes.filter(st => st._id !== id);
      },
      (error) => {
        console.error('Error deleting session time', error);
      }
    );
  }
}