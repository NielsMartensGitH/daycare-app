import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbDiariesComponent } from './mb-diaries.component';

describe('MbDiariesComponent', () => {
  let component: MbDiariesComponent;
  let fixture: ComponentFixture<MbDiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbDiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
