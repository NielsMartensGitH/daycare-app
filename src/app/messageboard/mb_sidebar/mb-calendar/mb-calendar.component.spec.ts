import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbCalendarComponent } from './mb-calendar.component';

describe('MbCalendarComponent', () => {
  let component: MbCalendarComponent;
  let fixture: ComponentFixture<MbCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
