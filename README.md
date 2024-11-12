# Angular_FrontEnd_Wine

## Versió 1:
- Components Home, Usuaris i Experiències creats
- Els HTML d'usuaris i experiencies no creats
- Serveis i models creats i crec que connectats a l'API
- Routes creades però no funciona bé el botó de Home.html

# Gestor de Tiempos de Uso - Ejercicio Tipo 5 - Andrei Piposi

Este proyecto implementa un Gestor de Tiempos de Uso que registra la duración de las sesiones de los usuarios y permite visualizar un resumen de su actividad en la aplicación web.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes directorios y archivos relevantes:

### Frontend

- **src/**: Contiene el código fuente de la aplicación Angular.
	- **app/**:
		- **components/**:
			- **session-times/**:
				- `session-times.component.css`
				- `session-times.component.html`
				- `session-times.component.spec.ts`
				- `session-times.component.ts`
		- **models/**:
			- `session-time.model.ts` (Nuevo)
		- **services/**:
			- `session-time.service.ts` (Nuevo)
			- `session-time.service.spec.ts` (Nuevo)
		- `app.component.css`
		- `app.component.html`
		- `app.component.ts`
		- `app.module.ts`
	- `index.html`
	- `main.ts`

## Implementación del Gestor de Tiempos de Uso

### Modelo session-time.model.ts:
Se ha creado un modelo para SessionTime.

```typescript
export interface SessionTime {
	_id?: string;
	userId: string;
	startTime: Date;
	endTime: Date;
	duration: number;
}
```

### Servicio session-time.service.ts:
Se ha implementado un servicio para gestionar la comunicación con el API.

```typescript
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
```

### Componente session-times.component.ts:
Se ha creado un componente para visualizar los tiempos de uso.

```typescript
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
```

### Plantilla session-times.component.html:
Se ha creado la plantilla HTML para el componente session-times.

```html
<div class="session-times-container">
	<h2>Session Times</h2>
	<button (click)="createSessionTime()">Create Session Time</button>
	<ul>
		<li *ngFor="let sessionTime of sessionTimes" class="session-time-item">
			<div class="session-time-details">
				<p><strong>Start Time:</strong> {{ sessionTime.startTime | date:'short' }}</p>
				<p><strong>End Time:</strong> {{ sessionTime.endTime | date:'short' }}</p>
				<p><strong>Duration:</strong> {{ sessionTime.duration }} seconds</p>
			</div>
			<div class="session-time-actions">
				<button (click)="updateSessionTime(sessionTime)">Update</button>
				<button (click)="deleteSessionTime(sessionTime._id)">Delete</button>
			</div>
		</li>
	</ul>
</div>
```

### Estilos session-times.component.css:
Se han añadido estilos básicos para mejorar la apariencia del componente.

```css
.session-times-container {
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.session-times-container h2 {
	margin-bottom: 20px;
}

.session-time-item {
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.session-time-details p {
	margin: 0;
}

.session-time-actions button {
	margin-left: 10px;
}
```

### Módulo principal app.module.ts:
Se ha actualizado el módulo principal para incluir el nuevo componente y servicio.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SessionTimesComponent } from './components/session-times/session-times.component';
import { SessionTimeService } from './services/session-time.service';

@NgModule({
	declarations: [
		AppComponent,
		SessionTimesComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [SessionTimeService],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

## Conclusión

En el frontend, se ha creado un nuevo componente, un nuevo servicio, la lógica de comunicación con el API y al menos tres de las llamadas al nuevo endpoint.
