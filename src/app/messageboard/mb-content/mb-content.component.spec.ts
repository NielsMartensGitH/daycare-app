import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbContentComponent } from './mb-content.component';

describe('MbContentComponent', () => {
  let component: MbContentComponent;
  let fixture: ComponentFixture<MbContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
