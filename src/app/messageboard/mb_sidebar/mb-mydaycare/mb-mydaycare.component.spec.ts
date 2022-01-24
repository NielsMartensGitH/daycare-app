import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMydaycareComponent } from './mb-mydaycare.component';

describe('MbMydaycareComponent', () => {
  let component: MbMydaycareComponent;
  let fixture: ComponentFixture<MbMydaycareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbMydaycareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMydaycareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
