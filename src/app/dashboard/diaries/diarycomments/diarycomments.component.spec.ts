import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarycommentsComponent } from './diarycomments.component';

describe('DiarycommentsComponent', () => {
  let component: DiarycommentsComponent;
  let fixture: ComponentFixture<DiarycommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarycommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
