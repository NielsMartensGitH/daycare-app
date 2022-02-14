import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbDiarycommentsComponent } from './mb-diarycomments.component';

describe('MbDiarycommentsComponent', () => {
  let component: MbDiarycommentsComponent;
  let fixture: ComponentFixture<MbDiarycommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbDiarycommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbDiarycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
