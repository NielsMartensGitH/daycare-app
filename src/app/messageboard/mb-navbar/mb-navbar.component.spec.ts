import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbNavbarComponent } from './mb-navbar.component';

describe('MbNavbarComponent', () => {
  let component: MbNavbarComponent;
  let fixture: ComponentFixture<MbNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
