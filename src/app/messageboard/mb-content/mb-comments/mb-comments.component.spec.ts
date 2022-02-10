import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbCommentsComponent } from './mb-comments.component';

describe('MbCommentsComponent', () => {
  let component: MbCommentsComponent;
  let fixture: ComponentFixture<MbCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
