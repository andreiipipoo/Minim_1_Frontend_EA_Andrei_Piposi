import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimesComponent } from './session-times.component';

describe('SessionTimesComponent', () => {
  let component: SessionTimesComponent;
  let fixture: ComponentFixture<SessionTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
