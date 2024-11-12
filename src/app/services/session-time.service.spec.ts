// src/app/services/session-time.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionTimeService, SessionTime } from './session-time.service';

describe('SessionTimeService', () => {
  let service: SessionTimeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionTimeService]
    });
    service = TestBed.inject(SessionTimeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch session times', () => {
    const dummySessionTimes: SessionTime[] = [
      { userId: '1', startTime: new Date(), endTime: new Date(), duration: 3600 },
      { userId: '1', startTime: new Date(), endTime: new Date(), duration: 7200 }
    ];

    service.getSessionTimes('1').subscribe(sessionTimes => {
      expect(sessionTimes.length).toBe(2);
      expect(sessionTimes).toEqual(dummySessionTimes);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySessionTimes);
  });

  it('should create a session time', () => {
    const newSessionTime: SessionTime = { userId: '1', startTime: new Date(), endTime: new Date(), duration: 3600 };

    service.createSessionTime(newSessionTime).subscribe(sessionTime => {
      expect(sessionTime).toEqual(newSessionTime);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newSessionTime);
  });

  it('should update a session time', () => {
    const updatedSessionTime: SessionTime = { userId: '1', startTime: new Date(), endTime: new Date(), duration: 7200 };

    service.updateSessionTime('1', updatedSessionTime).subscribe(sessionTime => {
      expect(sessionTime).toEqual(updatedSessionTime);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSessionTime);
  });

  it('should delete a session time', () => {
    service.deleteSessionTime('1').subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});