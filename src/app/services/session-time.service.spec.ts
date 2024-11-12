import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SessionTimeService } from './session-time.service';
import { SessionTime } from '../models/session-time.model';
import { HttpClient } from '@angular/common/http';

describe('SessionTimeService', () => {
  let service: SessionTimeService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    // Creamos un mock manual del servicio HttpClient utilizando jasmine.createSpyObj
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    
    // Configuramos el módulo de pruebas para proporcionar el mock del HttpClient
    TestBed.configureTestingModule({
      providers: [
        SessionTimeService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    
    // Inyectamos el servicio SessionTimeService
    service = TestBed.inject(SessionTimeService);
  });

  // Verificamos que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba para obtener tiempos de sesión
  it('should fetch session times', () => {
    const dummySessionTimes: SessionTime[] = [
      { userId: '1', startTime: new Date(), endTime: new Date(), duration: 3600 },
      { userId: '1', startTime: new Date(), endTime: new Date(), duration: 7200 }
    ];

    // Simulamos una respuesta GET utilizando el mock del HttpClient
    httpClientSpy.get.and.returnValue(of(dummySessionTimes));

    // Llamamos al método getSessionTimes y verificamos que los datos se obtienen correctamente
    service.getSessionTimes('1').subscribe(sessionTimes => {
      expect(sessionTimes.length).toBe(2);
      expect(sessionTimes).toEqual(dummySessionTimes);
    });
  });

  // Prueba para crear un tiempo de sesión
  it('should create a session time', () => {
    const newSessionTime: SessionTime = { userId: '1', startTime: new Date(), endTime: new Date(), duration: 3600 };

    // Simulamos una respuesta POST utilizando el mock del HttpClient
    httpClientSpy.post.and.returnValue(of(newSessionTime));

    // Llamamos al método createSessionTime y verificamos que los datos se crean correctamente
    service.createSessionTime(newSessionTime).subscribe(sessionTime => {
      expect(sessionTime).toEqual(newSessionTime);
    });
  });

  // Prueba para actualizar un tiempo de sesión
  it('should update a session time', () => {
    const updatedSessionTime: SessionTime = { userId: '1', startTime: new Date(), endTime: new Date(), duration: 7200 };

    // Simulamos una respuesta PUT utilizando el mock del HttpClient
    httpClientSpy.put.and.returnValue(of(updatedSessionTime));

    // Llamamos al método updateSessionTime y verificamos que los datos se actualizan correctamente
    service.updateSessionTime('1', updatedSessionTime).subscribe(sessionTime => {
      expect(sessionTime).toEqual(updatedSessionTime);
    });
  });

  // Prueba para eliminar un tiempo de sesión
  it('should delete a session time', () => {
    // Simulamos una respuesta DELETE utilizando el mock del HttpClient
    httpClientSpy.delete.and.returnValue(of(undefined));

    // Llamamos al método deleteSessionTime y verificamos que los datos se eliminan correctamente
    service.deleteSessionTime('1').subscribe(response => {
      expect(response).toBeUndefined();
    });
  });
});