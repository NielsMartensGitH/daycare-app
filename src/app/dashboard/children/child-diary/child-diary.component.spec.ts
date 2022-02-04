import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDiaryComponent } from './child-diary.component';

describe('ChildDiaryComponent', () => {
  let component: ChildDiaryComponent;
  let fixture: ComponentFixture<ChildDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
